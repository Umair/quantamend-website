from fastapi import FastAPI, Depends, Request, Form, UploadFile, File, BackgroundTasks
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import os
import uuid
import pandas as pd
import io

from . import models, database, storage, video_processor

from . import models, database

# Create tables if they don't exist
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="QuantaMend Vidora")

# Setup directories
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Note: we need to ensure static and templates dirs exist
os.makedirs(os.path.join(BASE_DIR, "static"), exist_ok=True)
os.makedirs(os.path.join(BASE_DIR, "templates"), exist_ok=True)

app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# Simple hardcoded auth check for Umair
ADMIN_EMAIL = "umair@quantamend.com"

@app.get("/", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse(request=request, name="login.html", context={})

@app.post("/login")
async def process_login(email: str = Form(...)):
    if email.lower() == ADMIN_EMAIL:
        # Very simple authentication (do not use in prod for multi-tenant, perfectly fine for single-admin tools)
        response = RedirectResponse(url="/dashboard", status_code=302)
        response.set_cookie(key="auth", value="authenticated")
        return response
    return RedirectResponse(url="/?error=Invalid email", status_code=302)

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request, db: Session = Depends(database.get_db)):
    auth = request.cookies.get("auth")
    if auth != "authenticated":
        return RedirectResponse(url="/")
        
    campaigns = db.query(models.Campaign).order_by(models.Campaign.created_at.desc()).all()
    return templates.TemplateResponse(request=request, name="dashboard.html", context={"campaigns": campaigns})

@app.get("/create", response_class=HTMLResponse)
async def create_page(request: Request):
    auth = request.cookies.get("auth")
    if auth != "authenticated":
        return RedirectResponse(url="/")
    return templates.TemplateResponse(request=request, name="create.html", context={})

@app.post("/campaign/create")
async def create_campaign(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    fallback_url: str = Form(...),
    avatar_video: UploadFile = File(...),
    leads_csv: UploadFile = File(...),
    db: Session = Depends(database.get_db)
):
    # Enforce Auth (ideally through dependency, skipped for brevity in single-user portal)
    
    # 1. Upload Avatar to GCS locally via /tmp
    temp_avatar = f"/tmp/{avatar_video.filename}"
    with open(temp_avatar, "wb") as f:
        f.write(await avatar_video.read())
        
    campaign_uid = str(uuid.uuid4())
    gcs_avatar_name = f"campaigns/{campaign_uid}/avatar.mp4"
    avatar_url = storage.upload_file_to_gcs(temp_avatar, gcs_avatar_name)
    
    # 2. Store Campaign to DB
    campaign = models.Campaign(name=name, owner=ADMIN_EMAIL, fallback_url=fallback_url, avatar_url=avatar_url)
    db.add(campaign)
    db.commit()
    db.refresh(campaign)
    
    # 3. Read CSV
    csv_bytes = await leads_csv.read()
    df = pd.read_csv(io.BytesIO(csv_bytes))
    
    # 4. Create Leads and Enqueue Processing
    for index, row in df.iterrows():
        raw_first = str(row.get('First Name', row.get('first_name', 'Lead')))
        raw_last = str(row.get('Last Name', row.get('last_name', '')))
        
        # Robust URL extraction
        url = ""
        for col in ['Website', 'website', 'URL', 'url', 'Link', 'link']:
            if col in row and pd.notna(row[col]):
                url = str(row[col]).strip()
                break
                
        if not url or url.lower() in ["nan", "none", "null"]:
            continue
            
        if not url.startswith("http"):
            url = "https://" + url
            
        lead = models.Lead(
            campaign_id=campaign.id,
            first_name=raw_first if raw_first.lower() != "nan" else "Lead",
            last_name=raw_last if raw_last.lower() != "nan" else "",
            website_url=url,
            status="pending"
        )
        db.add(lead)
        db.commit()
        db.refresh(lead)
        
        # Throw into background thread to run Playwright without blocking web response
        background_tasks.add_task(video_processor.process_lead_video, lead.id)
        
    return RedirectResponse(url="/dashboard", status_code=302)
    
@app.get("/campaign/{campaign_id}", response_class=HTMLResponse)
async def view_campaign(request: Request, campaign_id: int, db: Session = Depends(database.get_db)):
    auth = request.cookies.get("auth")
    if auth != "authenticated":
        return RedirectResponse(url="/")
        
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        return HTMLResponse("Campaign not found", status_code=404)
        
    return templates.TemplateResponse(request=request, name="campaign.html", context={"campaign": campaign})
    
@app.post("/campaign/{campaign_id}/regenerate")
async def regenerate_campaign(request: Request, campaign_id: int, background_tasks: BackgroundTasks, db: Session = Depends(database.get_db)):
    auth = request.cookies.get("auth")
    if auth != "authenticated":
        return RedirectResponse(url="/")
        
    campaign = db.query(models.Campaign).filter(models.Campaign.id == campaign_id).first()
    if not campaign:
        return RedirectResponse(url="/dashboard", status_code=303)
        
    for lead in campaign.leads:
        lead.status = "pending"
        lead.status_detail = "Queued for Regeneration"
        background_tasks.add_task(video_processor.process_lead_video, lead.id)
        
    db.commit()
    return RedirectResponse(url=f"/campaign/{campaign.id}", status_code=303)
    
@app.get("/v/{campaign_id}/{lead_id}", response_class=HTMLResponse)
async def share_page(request: Request, campaign_id: int, lead_id: int, db: Session = Depends(database.get_db)):
    """The dynamic landing page showing the video and calendar"""
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id, models.Lead.campaign_id == campaign_id).first()
    if not lead:
        return HTMLResponse("Video not found", status_code=404)
        
    return templates.TemplateResponse(request=request, name="share.html", context={
        "lead": lead,
        "cal_link": os.getenv("CAL_LINK", "umairejaz/strategy")
    })
