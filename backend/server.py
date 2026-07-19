from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import resend
import asyncio

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
JWT_SECRET = os.environ.get('JWT_SECRET')

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

logger = logging.getLogger(__name__)

# Models
class AdminCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str

class ReporterCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str
    district: Optional[str] = None
    id_number: Optional[str] = None
    address: Optional[str] = None
    photo: Optional[str] = None
    role: str = "reporter"

class ReporterUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    district: Optional[str] = None
    address: Optional[str] = None
    password: Optional[str] = None
    photo: Optional[str] = None
    role: Optional[str] = None

class Reporter(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    district: Optional[str] = None
    id_number: Optional[str] = None
    address: Optional[str] = None
    photo: Optional[str] = None
    role: str = "reporter"
    created_at: datetime
    updated_at: datetime

class NewsArticleCreate(BaseModel):
    title: str
    content: str
    category: str
    district: Optional[str] = None
    author: str
    image: Optional[str] = None
    video_url: Optional[str] = None
    excerpt: str
    status: str = "draft"
    featured: bool = False
    trending: bool = False
    tags: Optional[List[str]] = []

class NewsArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    district: Optional[str] = None
    author: Optional[str] = None
    image: Optional[str] = None
    video_url: Optional[str] = None
    excerpt: Optional[str] = None
    status: Optional[str] = None
    featured: Optional[bool] = None
    trending: Optional[bool] = None
    tags: Optional[List[str]] = None

class NewsArticle(BaseModel):
    id: str
    title: str
    content: str
    category: str
    district: Optional[str] = None
    author: str
    author_id: Optional[str] = None
    author_role: Optional[str] = None
    image: Optional[str] = None
    video_url: Optional[str] = None
    excerpt: str
    status: str
    featured: bool
    trending: bool
    tags: Optional[List[str]] = []
    created_at: datetime
    updated_at: datetime

class Category(BaseModel):
    id: str
    name: str
    slug: str

class CategoryCreate(BaseModel):
    name: str
    slug: str

class NewsTipCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
    tip_category: str

class NewsTip(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    message: str
    tip_category: str
    status: str
    submitted_at: datetime

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class Newsletter(BaseModel):
    id: str
    email: str
    subscribed_at: datetime
    status: str

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class Contact(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    message: str
    submitted_at: datetime

class DashboardStats(BaseModel):
    total_articles: int
    published_articles: int
    draft_articles: int
    total_tips: int
    pending_tips: int
    total_subscribers: int
    total_contacts: int
    total_reporters: int = 0
    my_articles: int = 0

# Auth helper
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

# Seed admin user
async def seed_admin():
    admin_exists = await db.admins.find_one({"email": "admin@livepoint.in"}, {"_id": 0})
    if not admin_exists:
        hashed = bcrypt.hashpw("admin123".encode('utf-8'), bcrypt.gensalt())
        admin_doc = {
            "id": str(uuid.uuid4()),
            "email": "admin@livepoint.in",
            "password_hash": hashed.decode('utf-8'),
            "name": "Admin User",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.admins.insert_one(admin_doc)
        logger.info("Admin user seeded: admin@livepoint.in / admin123")

# Seed categories
async def seed_categories():
    categories = [
        {"id": str(uuid.uuid4()), "name": "Himachal", "slug": "himachal"},
        {"id": str(uuid.uuid4()), "name": "Shimla", "slug": "shimla"},
        {"id": str(uuid.uuid4()), "name": "Theog", "slug": "theog"},
        {"id": str(uuid.uuid4()), "name": "Kullu", "slug": "kullu"},
        {"id": str(uuid.uuid4()), "name": "Mandi", "slug": "mandi"},
        {"id": str(uuid.uuid4()), "name": "Kangra", "slug": "kangra"},
        {"id": str(uuid.uuid4()), "name": "Solan", "slug": "solan"},
        {"id": str(uuid.uuid4()), "name": "National", "slug": "national"},
        {"id": str(uuid.uuid4()), "name": "Politics", "slug": "politics"},
        {"id": str(uuid.uuid4()), "name": "Business", "slug": "business"},
        {"id": str(uuid.uuid4()), "name": "Sports", "slug": "sports"},
        {"id": str(uuid.uuid4()), "name": "Entertainment", "slug": "entertainment"},
        {"id": str(uuid.uuid4()), "name": "Weather", "slug": "weather"},
    ]
    for cat in categories:
        exists = await db.categories.find_one({"slug": cat["slug"]}, {"_id": 0})
        if not exists:
            await db.categories.insert_one(cat)
    logger.info("Categories seeded")

@app.on_event("startup")
async def startup_event():
    await seed_admin()
    await seed_categories()

# Auth routes
@api_router.post("/auth/login")
async def login(credentials: AdminLogin):
    admin = await db.admins.find_one({"email": credentials.email}, {"_id": 0})
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode('utf-8'), admin['password_hash'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode(
        {"id": admin["id"], "email": admin["email"], "role": admin["role"], "exp": datetime.now(timezone.utc) + timedelta(days=7)},
        JWT_SECRET,
        algorithm="HS256"
    )
    
    return {
        "token": token,
        "user": {"id": admin["id"], "email": admin["email"], "name": admin["name"], "role": admin["role"]}
    }

@api_router.post("/auth/reporter/login")
async def reporter_login(credentials: AdminLogin):
    reporter = await db.reporters.find_one({"email": credentials.email}, {"_id": 0})
    if not reporter:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(credentials.password.encode('utf-8'), reporter['password_hash'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    role = reporter.get("role", "reporter")
    token = jwt.encode(
        {"id": reporter["id"], "email": reporter["email"], "role": role, "exp": datetime.now(timezone.utc) + timedelta(days=7)},
        JWT_SECRET,
        algorithm="HS256"
    )
    
    return {
        "token": token,
        "user": {
            "id": reporter["id"], 
            "email": reporter["email"], 
            "name": reporter["name"], 
            "role": role,
            "photo": reporter.get("photo")
        }
    }

# Reporter routes (Admin only - manage reporters)
@api_router.post("/admin/reporters", response_model=Reporter)
async def create_reporter(reporter_data: ReporterCreate, user=Depends(verify_token)):
    existing = await db.reporters.find_one({"email": reporter_data.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Reporter with this email already exists")
    
    reporter_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    hashed = bcrypt.hashpw(reporter_data.password.encode('utf-8'), bcrypt.gensalt())
    
    doc = {
        "id": reporter_id,
        "name": reporter_data.name,
        "email": reporter_data.email,
        "password_hash": hashed.decode('utf-8'),
        "phone": reporter_data.phone,
        "district": reporter_data.district,
        "id_number": reporter_data.id_number,
        "address": reporter_data.address,
        "photo": reporter_data.photo,
        "role": reporter_data.role,
        "created_at": now.isoformat(),
        "updated_at": now.isoformat()
    }
    
    await db.reporters.insert_one(doc)
    
    return Reporter(
        id=reporter_id,
        name=reporter_data.name,
        email=reporter_data.email,
        phone=reporter_data.phone,
        district=reporter_data.district,
        id_number=reporter_data.id_number,
        address=reporter_data.address,
        photo=reporter_data.photo,
        role=reporter_data.role,
        created_at=now,
        updated_at=now
    )

@api_router.get("/admin/reporters", response_model=List[Reporter])
async def get_all_reporters(user=Depends(verify_token)):
    reporters = await db.reporters.find({}, {"_id": 0, "password_hash": 0}).sort("created_at", -1).to_list(1000)
    for reporter in reporters:
        reporter['created_at'] = datetime.fromisoformat(reporter['created_at'])
        reporter['updated_at'] = datetime.fromisoformat(reporter['updated_at'])
    return reporters

@api_router.delete("/admin/reporters/{reporter_id}")
async def delete_reporter(reporter_id: str, user=Depends(verify_token)):
    result = await db.reporters.delete_one({"id": reporter_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Reporter not found")
    return {"message": "Reporter deleted successfully"}

# Reporter self-service routes (only for the logged-in reporter)
@api_router.get("/reporter/profile", response_model=Reporter)
async def get_reporter_profile(user=Depends(verify_token)):
    if user.get("role") != "reporter":
        raise HTTPException(status_code=403, detail="Access denied. Reporters only.")
    
    reporter = await db.reporters.find_one({"id": user["id"]}, {"_id": 0, "password_hash": 0})
    if not reporter:
        raise HTTPException(status_code=404, detail="Reporter not found")
    
    reporter['created_at'] = datetime.fromisoformat(reporter['created_at'])
    reporter['updated_at'] = datetime.fromisoformat(reporter['updated_at'])
    return Reporter(**reporter)

@api_router.put("/reporter/profile", response_model=Reporter)
async def update_reporter_profile(update: ReporterUpdate, user=Depends(verify_token)):
    if user.get("role") != "reporter":
        raise HTTPException(status_code=403, detail="Access denied. Reporters only.")
    
    reporter = await db.reporters.find_one({"id": user["id"]}, {"_id": 0})
    if not reporter:
        raise HTTPException(status_code=404, detail="Reporter not found")
    
    update_data = {k: v for k, v in update.model_dump().items() if v is not None and k != "password"}
    
    if update.password:
        hashed = bcrypt.hashpw(update.password.encode('utf-8'), bcrypt.gensalt())
        update_data["password_hash"] = hashed.decode('utf-8')
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.reporters.update_one({"id": user["id"]}, {"$set": update_data})
    
    updated = await db.reporters.find_one({"id": user["id"]}, {"_id": 0, "password_hash": 0})
    updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    return Reporter(**updated)

# Dashboard stats
@api_router.get("/admin/stats", response_model=DashboardStats)
async def get_dashboard_stats(user=Depends(verify_token)):
    # All users see team-wide stats
    total_articles = await db.news_articles.count_documents({})
    published = await db.news_articles.count_documents({"status": "published"})
    draft = await db.news_articles.count_documents({"status": "draft"})
    total_tips = await db.news_tips.count_documents({})
    pending_tips = await db.news_tips.count_documents({"status": "pending"})
    total_subscribers = await db.newsletter_subscribers.count_documents({})
    total_contacts = await db.contact_messages.count_documents({})
    total_reporters = await db.reporters.count_documents({})
    
    # For reporters, also show their own count
    my_articles = 0
    if user.get("role") == "reporter":
        my_articles = await db.news_articles.count_documents({"author_id": user["id"]})
    
    return DashboardStats(
        total_articles=total_articles,
        published_articles=published,
        draft_articles=draft,
        total_tips=total_tips,
        pending_tips=pending_tips,
        total_subscribers=total_subscribers,
        total_contacts=total_contacts,
        total_reporters=total_reporters,
        my_articles=my_articles
    )

# News articles routes
@api_router.post("/admin/news", response_model=NewsArticle)
async def create_news_article(article: NewsArticleCreate, user=Depends(verify_token)):
    article_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    doc = {
        "id": article_id,
        **article.model_dump(),
        "author_id": user.get("id"),
        "author_role": user.get("role", "admin"),
        "created_at": now.isoformat(),
        "updated_at": now.isoformat()
    }
    
    await db.news_articles.insert_one(doc)
    return NewsArticle(**{**doc, "created_at": now, "updated_at": now})

@api_router.get("/admin/news", response_model=List[NewsArticle])
async def get_all_news_admin(user=Depends(verify_token)):
    # All users (admin, editor, reporter) can see all articles - team collaboration
    articles = await db.news_articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for article in articles:
        article['created_at'] = datetime.fromisoformat(article['created_at'])
        article['updated_at'] = datetime.fromisoformat(article['updated_at'])
    return articles

@api_router.get("/news", response_model=List[NewsArticle])
async def get_published_news(
    category: Optional[str] = None,
    district: Optional[str] = None,
    featured: Optional[bool] = None,
    trending: Optional[bool] = None,
    search: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    tag: Optional[str] = None,
    limit: int = 50
):
    query = {"status": "published"}
    if category:
        query["category"] = category
    if district:
        query["district"] = district
    if featured is not None:
        query["featured"] = featured
    if trending is not None:
        query["trending"] = trending
    if tag:
        query["tags"] = tag
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"content": {"$regex": search, "$options": "i"}},
            {"excerpt": {"$regex": search, "$options": "i"}},
        ]
    if date_from or date_to:
        date_query = {}
        if date_from:
            date_query["$gte"] = date_from
        if date_to:
            date_query["$lte"] = date_to
        query["created_at"] = date_query
    
    articles = await db.news_articles.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    for article in articles:
        article['created_at'] = datetime.fromisoformat(article['created_at'])
        article['updated_at'] = datetime.fromisoformat(article['updated_at'])
    return articles

@api_router.get("/news/{article_id}", response_model=NewsArticle)
async def get_news_article(article_id: str):
    article = await db.news_articles.find_one({"id": article_id, "status": "published"}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    article['created_at'] = datetime.fromisoformat(article['created_at'])
    article['updated_at'] = datetime.fromisoformat(article['updated_at'])
    return NewsArticle(**article)

@api_router.put("/admin/news/{article_id}", response_model=NewsArticle)
async def update_news_article(article_id: str, update: NewsArticleUpdate, user=Depends(verify_token)):
    article = await db.news_articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # All team members (admin, editor, reporter) can edit any article
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.news_articles.update_one({"id": article_id}, {"$set": update_data})
    
    updated = await db.news_articles.find_one({"id": article_id}, {"_id": 0})
    updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    updated['updated_at'] = datetime.fromisoformat(updated['updated_at'])
    return NewsArticle(**updated)

@api_router.delete("/admin/news/{article_id}")
async def delete_news_article(article_id: str, user=Depends(verify_token)):
    article = await db.news_articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Only admins and editors can delete - reporters cannot delete
    role = user.get("role", "admin")
    if role == "reporter":
        raise HTTPException(status_code=403, detail="Reporters cannot delete articles. Contact your admin.")
    
    await db.news_articles.delete_one({"id": article_id})
    return {"message": "Article deleted successfully"}

# Categories
@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    categories = await db.categories.find({}, {"_id": 0}).to_list(100)
    return categories

@api_router.post("/admin/categories", response_model=Category)
async def create_category(category: CategoryCreate, user=Depends(verify_token)):
    cat_id = str(uuid.uuid4())
    doc = {"id": cat_id, **category.model_dump()}
    await db.categories.insert_one(doc)
    return Category(**doc)

# News tips
@api_router.post("/news-tips")
async def submit_news_tip(tip: NewsTipCreate):
    tip_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    doc = {
        "id": tip_id,
        **tip.model_dump(),
        "status": "pending",
        "submitted_at": now.isoformat()
    }
    
    await db.news_tips.insert_one(doc)
    return {"message": "News tip submitted successfully", "id": tip_id}

@api_router.get("/admin/news-tips", response_model=List[NewsTip])
async def get_news_tips(user=Depends(verify_token)):
    tips = await db.news_tips.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(1000)
    for tip in tips:
        tip['submitted_at'] = datetime.fromisoformat(tip['submitted_at'])
    return tips

class TipStatusUpdate(BaseModel):
    status: str

@api_router.put("/admin/news-tips/{tip_id}/status")
async def update_tip_status(tip_id: str, status_update: TipStatusUpdate, user=Depends(verify_token)):
    await db.news_tips.update_one({"id": tip_id}, {"$set": {"status": status_update.status}})
    return {"message": "Status updated"}

# Newsletter
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscriber: NewsletterSubscribe):
    existing = await db.newsletter_subscribers.find_one({"email": subscriber.email}, {"_id": 0})
    if existing:
        return {"message": "Already subscribed"}
    
    sub_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    doc = {
        "id": sub_id,
        "email": subscriber.email,
        "subscribed_at": now.isoformat(),
        "status": "active"
    }
    
    await db.newsletter_subscribers.insert_one(doc)
    
    # Send confirmation email
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [subscriber.email],
            "subject": "Welcome to Live Point News Newsletter!",
            "html": f"""
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1A1A1A;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #C8102E;">Welcome to Live Point News!</h1>
                    <p>Thank you for subscribing to our newsletter.</p>
                    <p>You'll now receive the latest news from Himachal Pradesh directly in your inbox.</p>
                    <p style="margin-top: 30px;">Stay informed with trusted, timely, and transparent news.</p>
                    <p style="color: #595959; font-size: 14px; margin-top: 40px;">Live Point News<br>Theog, Shimla, Himachal Pradesh</p>
                </div>
            </body>
            </html>
            """
        }
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error(f"Failed to send confirmation email: {str(e)}")
    
    return {"message": "Subscribed successfully"}

@api_router.get("/admin/newsletter/subscribers", response_model=List[Newsletter])
async def get_subscribers(user=Depends(verify_token)):
    subscribers = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    for sub in subscribers:
        sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    return subscribers

# Contact
@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    contact_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    doc = {
        "id": contact_id,
        **contact.model_dump(),
        "submitted_at": now.isoformat()
    }
    
    await db.contact_messages.insert_one(doc)
    return {"message": "Message sent successfully"}

@api_router.get("/admin/contacts", response_model=List[Contact])
async def get_contacts(user=Depends(verify_token)):
    contacts = await db.contact_messages.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(1000)
    for contact in contacts:
        contact['submitted_at'] = datetime.fromisoformat(contact['submitted_at'])
    return contacts

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()