from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="FundSpark AI - Startup Intelligence Platform")

# CORS - Allow frontend to connect
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- In-memory storage (will replace with PostgreSQL later) ----
STARTUPS = {}
CONTENT = {}
INVESTORS = {}
STARTUP_COUNTER = 1
CONTENT_COUNTER = 1
INVESTOR_COUNTER = 1

# ---- Schemas ----

class StartupCreate(BaseModel):
    name: str
    website: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    stage: Optional[str] = None
    location: Optional[str] = None

class Startup(BaseModel):
    id: int
    name: str
    website: Optional[str] = None
    description: Optional[str] = None
    industry: Optional[str] = None
    stage: Optional[str] = None
    location: Optional[str] = None
    created_at: datetime

class ContentCreate(BaseModel):
    source_type: str  # "manual" | "website" | "document"
    source_identifier: Optional[str] = None  # URL or filename
    text: str

class ContentItem(BaseModel):
    id: int
    startup_id: int
    source_type: str
    source_identifier: Optional[str]
    text: str
    created_at: datetime

class SimpleAnalysis(BaseModel):
    summary: str
    target_customers: List[str]
    strengths: List[str]
    weaknesses: List[str]
    recommendations: List[str]

class InvestorCreate(BaseModel):
    name: str
    email: Optional[str] = None
    company: Optional[str] = None
    focus_areas: Optional[List[str]] = None
    investment_stage: Optional[str] = None
    check_size: Optional[str] = None
    location: Optional[str] = None

class Investor(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    company: Optional[str] = None
    focus_areas: Optional[List[str]] = None
    investment_stage: Optional[str] = None
    check_size: Optional[str] = None
    location: Optional[str] = None
    created_at: datetime

# ---- Routes ----

@app.get("/")
def root():
    return {"message": "FundSpark AI Backend API", "version": "1.0.0"}

@app.post("/api/startups", response_model=Startup)
def create_startup(data: StartupCreate):
    """Create a new startup profile"""
    global STARTUP_COUNTER
    startup_id = STARTUP_COUNTER
    STARTUP_COUNTER += 1

    startup = Startup(
        id=startup_id,
        name=data.name,
        website=data.website,
        description=data.description,
        industry=data.industry,
        stage=data.stage,
        location=data.location,
        created_at=datetime.utcnow()
    )
    STARTUPS[startup_id] = startup
    CONTENT[startup_id] = []
    return startup

@app.get("/api/startups", response_model=List[Startup])
def list_startups():
    """Get all startups"""
    return list(STARTUPS.values())

@app.get("/api/startups/{startup_id}", response_model=Startup)
def get_startup(startup_id: int):
    """Get startup details by ID"""
    startup = STARTUPS.get(startup_id)
    if not startup:
        raise HTTPException(status_code=404, detail="Startup not found")
    return startup

@app.post("/api/startups/{startup_id}/content", response_model=ContentItem)
def add_content(startup_id: int, data: ContentCreate):
    """Add content (text, URL, document) to a startup"""
    global CONTENT_COUNTER
    if startup_id not in STARTUPS:
        raise HTTPException(status_code=404, detail="Startup not found")
    
    item = ContentItem(
        id=CONTENT_COUNTER,
        startup_id=startup_id,
        source_type=data.source_type,
        source_identifier=data.source_identifier,
        text=data.text,
        created_at=datetime.utcnow()
    )
    CONTENT_COUNTER += 1
    CONTENT[startup_id].append(item)
    return item

@app.get("/api/startups/{startup_id}/content", response_model=List[ContentItem])
def list_content(startup_id: int):
    """Get all content for a startup"""
    if startup_id not in STARTUPS:
        raise HTTPException(status_code=404, detail="Startup not found")
    return CONTENT.get(startup_id, [])

@app.delete("/api/startups/{startup_id}/content/{content_id}")
def delete_content(startup_id: int, content_id: int):
    """Delete a content item"""
    if startup_id not in STARTUPS:
        raise HTTPException(status_code=404, detail="Startup not found")
    
    content_list = CONTENT.get(startup_id, [])
    CONTENT[startup_id] = [c for c in content_list if c.id != content_id]
    return {"message": "Content deleted successfully"}

@app.post("/api/startups/{startup_id}/analyze", response_model=SimpleAnalysis)
def analyze_startup(startup_id: int):
    """Run AI analysis on startup content"""
    if startup_id not in STARTUPS:
        raise HTTPException(status_code=404, detail="Startup not found")
    
    startup = STARTUPS[startup_id]
    items = CONTENT.get(startup_id, [])
    
    if not items:
        raise HTTPException(status_code=400, detail="No content to analyze. Please add content first.")

    # Combine all content
    combined_text = "\n\n".join([
        f"[{c.source_type}] {c.source_identifier or ''}\n{c.text}"
        for c in items
    ])

    # For MVP: Simple rule-based analysis (will replace with Gemini AI)
    # This gives you working endpoints immediately while you integrate real AI
    
    analysis = SimpleAnalysis(
        summary=f"{startup.name} is a {startup.stage or 'startup'} in the {startup.industry or 'technology'} space. "
                f"Based on the provided content, they appear to be building solutions focused on addressing market needs. "
                f"The company has documented {len(items)} content pieces describing their approach.",
        
        target_customers=[
            "Early-stage startups seeking growth",
            "SMBs looking for digital transformation",
            "Founders needing market intelligence"
        ],
        
        strengths=[
            "Clear documentation of business model",
            "Digital-first approach",
            "Focus on solving real problems",
            f"Active content creation ({len(items)} pieces)"
        ],
        
        weaknesses=[
            "Need more specific metrics and KPIs",
            "Value proposition could be sharper",
            "Competitive differentiation requires clarity",
            "Revenue model needs more detail"
        ],
        
        recommendations=[
            "Add quantifiable metrics (TAM, user growth, revenue)",
            "Conduct competitive analysis to sharpen positioning",
            "Develop clear go-to-market strategy",
            "Create pitch deck with financial projections",
            "Build case studies or early customer testimonials"
        ]
    )

    return analysis

# ---- Investor Routes ----

@app.post("/api/investors", response_model=Investor)
def create_investor(data: InvestorCreate):
    """Create a new investor profile"""
    global INVESTOR_COUNTER
    investor_id = INVESTOR_COUNTER
    INVESTOR_COUNTER += 1

    investor = Investor(
        id=investor_id,
        name=data.name,
        email=data.email,
        company=data.company,
        focus_areas=data.focus_areas or [],
        investment_stage=data.investment_stage,
        check_size=data.check_size,
        location=data.location,
        created_at=datetime.utcnow()
    )
    INVESTORS[investor_id] = investor
    return investor

@app.get("/api/investors", response_model=List[Investor])
def list_investors():
    """Get all investors"""
    return list(INVESTORS.values())

@app.get("/api/investors/{investor_id}", response_model=Investor)
def get_investor(investor_id: int):
    """Get investor details by ID"""
    investor = INVESTORS.get(investor_id)
    if not investor:
        raise HTTPException(status_code=404, detail="Investor not found")
    return investor

@app.put("/api/investors/{investor_id}", response_model=Investor)
def update_investor(investor_id: int, data: InvestorCreate):
    """Update investor profile"""
    if investor_id not in INVESTORS:
        raise HTTPException(status_code=404, detail="Investor not found")
    
    investor = INVESTORS[investor_id]
    updated_investor = Investor(
        id=investor_id,
        name=data.name,
        email=data.email,
        company=data.company,
        focus_areas=data.focus_areas or [],
        investment_stage=data.investment_stage,
        check_size=data.check_size,
        location=data.location,
        created_at=investor.created_at
    )
    INVESTORS[investor_id] = updated_investor
    return updated_investor

@app.delete("/api/investors/{investor_id}")
def delete_investor(investor_id: int):
    """Delete an investor"""
    if investor_id not in INVESTORS:
        raise HTTPException(status_code=404, detail="Investor not found")
    del INVESTORS[investor_id]
    return {"message": "Investor deleted successfully"}

# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "startups_count": len(STARTUPS), "investors_count": len(INVESTORS)}
