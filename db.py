# db.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# local SQLite file in repo folder
# Engine that Session will use for connection
engine = create_engine("sqlite:///app.db", echo=False, future=True)

# sessionmaker(), same scope as Engine
Session = sessionmaker(engine)

def get_session():
    """FastAPI dependency: yield a short-lived Session per request"""
    with Session.begin() as session:
        yield session
        #session.add(some_object)
        #session.add(some_other_object)