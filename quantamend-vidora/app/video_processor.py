import os
import time
import requests
from sqlalchemy.orm import Session
from playwright.sync_api import sync_playwright
from moviepy import VideoFileClip, CompositeVideoClip, ImageClip
import numpy as np

from . import models, database, storage

TEMP_DIR = "/tmp/vidora_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

def make_circular_mask(size):
    w, h = size
    frame = np.zeros((h, w), dtype=float)
    center_x, center_y = w / 2, h / 2
    radius = min(w, h) / 2
    y, x = np.ogrid[:h, :w]
    dist_from_center = np.sqrt((x - center_x)**2 + (y - center_y)**2)
    frame[dist_from_center <= radius] = 1.0
    return ImageClip(frame, is_mask=True, duration=1)

def record_website(url, duration, output_path):
    """
    Records a website scrolling down and up using Playwright.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video of the session
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720},
            record_video_dir=TEMP_DIR,
            record_video_size={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        
        # Get video object to retrieve path later
        video_obj = page.video
        
        try:
            # We change networkidle to domcontentloaded or load to avoid hanging on slow trackers
            # We also increase the timeout for slower sites
            try:
                page.goto(url, wait_until="load", timeout=45000)
            except Exception as load_err:
                pass
                
            # Extra wait for Javascript-heavy sites to finish animations/rendering
            time.sleep(3)
            
            # Calculate scroll distance
            total_height = page.evaluate("document.body.scrollHeight")
            viewport_height = 720
            max_possible_scroll = max(0, total_height - viewport_height)
            
            # Instead of scrolling the entire page super fast, we calculate a human-like
            # maximum scrolling speed (e.g., 600 pixels per second).
            human_speed_px_per_sec = 400 
            
            # Since we must go down and up within 'duration' seconds:
            down_duration = duration / 2.0
            capped_scroll_distance = min(max_possible_scroll, human_speed_px_per_sec * down_duration)
            
            SHOW_VIRTUAL_MOUSE = os.getenv("SHOW_VIRTUAL_MOUSE", "False").lower() == "true"
            
            # Javascript to execute a human-like staggered scroll with an optional mouse cursor
            js_scroll_script = """
            async ([totalDurationMs, scrollDist, showMouse]) => {
                return new Promise(resolve => {
                    let cursor = null;
                    if (showMouse) {
                        cursor = document.createElement('div');
                        cursor.style.width = '28px';
                        cursor.style.height = '28px';
                        cursor.style.position = 'fixed';
                        cursor.style.zIndex = '999999';
                        cursor.style.pointerEvents = 'none';
                        // Standard macOS cursor SVG
                        cursor.innerHTML = '<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1473 24.16L6.5 3.5L23.4727 15.6543L15.3444 16.925L10.1473 24.16Z" fill="black" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>';
                        document.body.appendChild(cursor);
                    }

                    // Keyframes for human-like behavior: pause -> scroll -> pause -> scroll -> pause...
                    // t = % of total time, y = % of target scroll distance
                    const keyframes = [
                        {t: 0.00, y: 0.0},
                        {t: 0.15, y: 0.0},  // pause at top
                        {t: 0.25, y: 0.4},  // scroll down
                        {t: 0.40, y: 0.4},  // pause
                        {t: 0.50, y: 1.0},  // scroll further down
                        {t: 0.65, y: 1.0},  // pause at bottom
                        {t: 0.75, y: 0.5},  // scroll up a bit
                        {t: 0.85, y: 0.5},  // pause
                        {t: 0.95, y: 0.0},  // scroll back to top
                        {t: 1.00, y: 0.0}
                    ];

                    function getScrollPosition(pct) {
                        let i = 0;
                        while(i < keyframes.length - 1 && pct > keyframes[i+1].t) i++;
                        if (i >= keyframes.length - 1) return keyframes[keyframes.length - 1].y * scrollDist;
                        
                        let kf1 = keyframes[i];
                        let kf2 = keyframes[i+1];
                        
                        let localPct = (pct - kf1.t) / (kf2.t - kf1.t);
                        // Smoothstep easing (ease-in-out cubic)
                        let ease = localPct < 0.5 ? 4 * localPct * localPct * localPct : 1 - Math.pow(-2 * localPct + 2, 3) / 2;
                        
                        return (kf1.y + (kf2.y - kf1.y) * ease) * scrollDist;
                    }

                    function getMousePosition(pct) {
                        const baseX = window.innerWidth * 0.65;
                        const baseY = window.innerHeight * 0.55;
                        // Organic drifting and slight bobbing
                        let x = baseX + Math.sin(pct * Math.PI * 4) * 60;
                        let y = baseY + Math.cos(pct * Math.PI * 6) * 40;
                        return {x, y};
                    }

                    let start = null;
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        let progress = timestamp - start;
                        let pct = Math.min(progress / totalDurationMs, 1.0);
                        
                        window.scrollTo(0, getScrollPosition(pct));
                        
                        if (cursor) {
                            let pos = getMousePosition(pct);
                            cursor.style.left = pos.x + 'px';
                            cursor.style.top = pos.y + 'px';
                        }
                        
                        if (progress < totalDurationMs) {
                            window.requestAnimationFrame(step);
                        } else {
                            window.scrollTo(0, 0); 
                            if (cursor) cursor.remove();
                            resolve();
                        }
                    }
                    window.requestAnimationFrame(step);
                });
            }
            """
            
            # Run the javascript, this blocks until the promise resolves (exactly 'duration' seconds)
            page.evaluate(js_scroll_script, [duration * 1000, capped_scroll_distance, SHOW_VIRTUAL_MOUSE])
            
        finally:
            # Explicitly close context to finalize video immediately
            # This ensures the END of the video perfectly aligns with the END of the scroll
            context.close()
            browser.close()
        
        # Wait for file to appear on disk if necessary
        video_path = video_obj.path()
        if not video_path:
            raise Exception("Video path not available")
            
        # Move/Rename to our desired path
        if os.path.exists(video_path):
            if os.path.exists(output_path):
                os.remove(output_path)
            os.rename(video_path, output_path)
        else:
            raise Exception(f"Recorded video file not found at {video_path}")

def create_personalized_video(website_video_path, avatar_video_path, output_path):
    web_clip = VideoFileClip(website_video_path)
    avatar_clip = VideoFileClip(avatar_video_path)
    
    target_height = web_clip.h // 3.5
    avatar_clip = avatar_clip.resized(height=target_height)
    
    min_dim = min(avatar_clip.w, avatar_clip.h)
    avatar_clip = avatar_clip.cropped(x_center=avatar_clip.w/2, y_center=avatar_clip.h/2, width=min_dim, height=min_dim)
    
    mask = make_circular_mask((min_dim, min_dim))
    avatar_clip = avatar_clip.with_mask(mask)
    
    padding = 30
    avatar_pos = (padding, web_clip.h - avatar_clip.h - padding)
    
    final_duration = avatar_clip.duration
    actual_web_duration = web_clip.duration
    
    if actual_web_duration > final_duration:
        start_time = max(0, actual_web_duration - final_duration)
        web_clip = web_clip.subclipped(start_time, actual_web_duration)
    else:
        web_clip = web_clip.with_duration(final_duration)
    
    final_clip = CompositeVideoClip(
        [web_clip, avatar_clip.with_position(avatar_pos)],
        size=web_clip.size
    ).with_duration(final_duration)
    
    if avatar_clip.audio is not None:
        final_clip = final_clip.with_audio(avatar_clip.audio)
    
    final_clip.write_videofile(output_path, codec="libx264", audio_codec="aac" if avatar_clip.audio else None, logger=None)
    web_clip.close()
    avatar_clip.close()

def process_lead_video(lead_id: int):
    """Background task to generate video for a specific lead."""
    db: Session = database.SessionLocal()
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if not lead:
        db.close()
        return
        
    lead.status = "processing"
    db.commit()
    
    campaign = lead.campaign
    
    # Needs to process...
    temp_web_video = os.path.join(TEMP_DIR, f"web_{lead.id}.webm")
    temp_avatar_video = os.path.join(TEMP_DIR, f"avatar_cmp_{campaign.id}.mp4")
    final_output = os.path.join(TEMP_DIR, f"final_{lead.id}.mp4")
    
    try:
        lead.status_detail = "Step 1/4: Retrieving Avatar from Cloud..."
        db.commit()
        
        # Download avatar if not exists locally
        if not os.path.exists(temp_avatar_video):
            r = requests.get(campaign.avatar_url)
            r.raise_for_status()  # Fails immediately if GCS bucket is not public (403 Forbidden)
            with open(temp_avatar_video, 'wb') as f:
                f.write(r.content)
        
        # Get duration
        clip = VideoFileClip(temp_avatar_video)
        duration = clip.duration
        clip.close()
        
        # Process
        lead.status_detail = f"Step 2/4: Recording Website (~{duration:.1f}s)..."
        db.commit()
        record_website(lead.website_url, duration, temp_web_video)
        
        lead.status_detail = "Step 3/4: Compositing Final Video (Merging layers)..."
        db.commit()
        create_personalized_video(temp_web_video, temp_avatar_video, final_output)
        
        # Upload final to GCS
        lead.status_detail = "Step 4/4: Uploading to Content Delivery Network..."
        db.commit()
        destination_name = f"campaigns/{campaign.id}/leads/{lead.id}.mp4"
        public_url = storage.upload_file_to_gcs(final_output, destination_name)
        
        if public_url:
            lead.video_url = public_url
            lead.status = "completed"
            lead.status_detail = "Done!"
        else:
            lead.status = "failed"
            lead.status_detail = "Failed to upload video to Cloud Storage."
            
    except Exception as e:
        print(f"Error processing lead {lead.id}: {e}")
        lead.status = "failed"
        lead.status_detail = f"Processing Error: {str(e)[:100]}"
    finally:
        db.commit()
        db.close()
        # Cleanup temp final video
        if os.path.exists(final_output):
            os.remove(final_output)
        if os.path.exists(temp_web_video):
            os.remove(temp_web_video)
