# data.py

class Meals:
    def __init__(self):
        self.meals = []
        
    def add_meal(self, name, recipe=None):
        meal = {'name' : name, "recipe" : recipe}
        return self.meals.append(meal)
    
    def get_meals(self):
        return self.meals