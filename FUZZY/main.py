from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Date, LargeBinary
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import date
import base64
from fuzzywuzzy import fuzz

# Database configuration (URL-encode password for special characters)
DATABASE_URL = "mysql+pymysql://root:admin%402004@localhost:3306/lostnfound"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Pydantic models
class LostItem(BaseModel):
    brand_model: str
    category: str
    color: str
    date_lost: date
    description: str
    email: str
    full_name: str
    id: int
    image_data: str
    image_name: str
    image_type: str
    item_name: str
    location_lost: str
    phone_number: str
    special_identifiers: str
    time_lost: str

    class Config:
        orm_mode = True

class FoundItem(BaseModel):
    brand_model: str
    category: str
    color: str
    date_found: date
    description: str
    email: str
    full_name: str
    id: int
    image_data: str
    image_name: str
    image_type: str
    item_name: str
    location_found: str
    phone_number: str
    special_identifiers: str
    time_found: str

    class Config:
        orm_mode = True

# Database models
class LostItemDB(Base):
    __tablename__ = "lost_items"
    
    id = Column(Integer, primary_key=True, index=True)
    brand_model = Column(String(255))
    category = Column(String(255))
    color = Column(String(255))
    date_lost = Column(Date)
    description = Column(String(255))
    email = Column(String(255))
    full_name = Column(String(255))
    image_data = Column(LargeBinary)
    image_name = Column(String(255))
    image_type = Column(String(255))
    item_name = Column(String(255))
    location_lost = Column(String(255))
    phone_number = Column(String(255))
    special_identifiers = Column(String(255))
    time_lost = Column(String(255))

class FoundItemDB(Base):
    __tablename__ = "found_items"
    
    id = Column(Integer, primary_key=True, index=True)
    brand_model = Column(String(255))
    category = Column(String(255))
    color = Column(String(255))
    date_found = Column(Date)
    description = Column(String(255))
    email = Column(String(255))
    full_name = Column(String(255))
    image_data = Column(LargeBinary)
    image_name = Column(String(255))
    image_type = Column(String(255))
    item_name = Column(String(255))
    location_found = Column(String(255))
    phone_number = Column(String(255))
    special_identifiers = Column(String(255))
    time_found = Column(String(255))

app = FastAPI()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/lostitems", response_model=list[LostItem])
async def get_lost_items(db: Session = Depends(get_db)):
    lost_items = db.query(LostItemDB).all()
    return [
        LostItem(
            **{k: v for k, v in item.__dict__.items() if k != "image_data" },
            image_data=base64.b64encode(item.image_data).decode("utf-8") if item.image_data else None
        )
        for item in lost_items
    ]

@app.get("/founditems", response_model=list[FoundItem])
async def get_found_items(db: Session = Depends(get_db)):
    found_items = db.query(FoundItemDB).all()
    return [
        FoundItem(
            **{k: v for k, v in item.__dict__.items() if k != "image_data"},
            image_data=base64.b64encode(item.image_data).decode("utf-8") if item.image_data else None
        ) for item in found_items
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

@app.get("/find-matches/", response_model=list[dict])
async def find_matches(db: Session = Depends(get_db)):
    # Fetch all found items and lost items from the database
    found_items = db.query(FoundItemDB).all()
    lost_items = db.query(LostItemDB).all()
    potential_matches = []

    # Compare each found item with all lost items
    for found_item in found_items:
        for lost_item in lost_items:
            match_score = 0

            # Helper function to safely compare attributes
            def compare(attr: str) -> bool:
                a = getattr(lost_item, attr, "") or ""
                b = getattr(found_item, attr.replace("lost", "found"), "") or ""
                return fuzz.ratio(a.lower(), b.lower()) > 80

            # Compare attributes
            if compare("item_name"): match_score += 1
            if compare("category"): match_score += 1
            if compare("color"): match_score += 1
            if compare("brand_model"): match_score += 1
            if compare("special_identifiers"): match_score += 1
            if compare("description"): match_score += 1
            if compare("location_lost"): match_score += 1  # Compares with location_found

            # If match score meets threshold
            if match_score >= 3:
                # Convert ORM objects to dictionaries
                lost_dict = {k: v for k, v in lost_item.__dict__.items() if not k.startswith("_")}
                found_dict = {k: v for k, v in found_item.__dict__.items() if not k.startswith("_")}
                
                # Remove image data to reduce payload size
                lost_dict.pop("image_data", None)
                found_dict.pop("image_data", None)

                potential_matches.append({
                    "found_item": found_dict,
                    "lost_item": lost_dict,
                    "match_score": match_score
                })

    return potential_matches or []