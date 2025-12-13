# Application.py
from fastapi import FastAPI
from pydantic import BaseModel
from data import Meals


app = FastAPI()
meals_manager = Meals()

class MealIn(BaseModel):
    name: str
    recipe: str | None = None

@app.get("/meals")
def read_meals():
    return meals_manager.get_meals()

@app.post("/meals")
def create_meal(meal: MealIn):
    meals_manager.add_meal(meal.name, meal.recipe)
    return {"message": "Meal added successfully!"}