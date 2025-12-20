# Application.py
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import select

from data import Meals
from db import get_session, engine
from models import Base, Meal

# Create FastAPI instance
app = FastAPI()

# Read all Base subclasses and create tables if they don't exist
Base.metadata.create_all(engine)

class MealIn(BaseModel):
    name: str
    recipe: str | None = None

# GET route
@app.get("/meals")
def read_meals(session: Session = Depends(get_session)):
    rows = session.execute(select(Meal)).scalars().all()  # Query rows
    return [{"id": m.id, "name": m.name, "recipe": m.recipe} for m in rows]

# POST route
@app.post("/meals")
def create_meal(meal: MealIn, session: Session = Depends(get_session)):
    m = Meal(name=meal.name, recipe=meal.recipe)
    session.add(m)
    session.commit()
    session.refresh(m)
    return {"id": m.id, "message": "Meal added successfully!"}