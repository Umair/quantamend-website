from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime
from .database import Base

class Campaign(Base):
    __tablename__ = "campaigns"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    owner = Column(String)
    avatar_url = Column(String, nullable=True)  # URL to GCS
    fallback_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    leads = relationship("Lead", back_populates="campaign", cascade="all, delete-orphan")

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    first_name = Column(String)
    last_name = Column(String, nullable=True)
    website_url = Column(String)
    status = Column(String, default="pending")  # pending, processing, completed, failed
    status_detail = Column(String, nullable=True) # Describes current progress step
    video_url = Column(String, nullable=True)   # URL to final generated video on GCS
    
    campaign = relationship("Campaign", back_populates="leads")
