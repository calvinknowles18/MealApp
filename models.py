# models.py
from datetime import datetime
from sqlalchemy import String, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    """Base class for all ORM models."""
    pass

class Meal(Base):
    __tablename__ = "meals"
    
    # Primary key int
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    
    # variable str length up 200, None is not allowed
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    
    # Optional str column, None is allowed
    recipe: Mapped[str | None] = mapped_column(String(1000), nullable=True)
    
    # Timestamp when row was created
    created_at: Mapped[datetime] = mapped_column(
        default_factory=datetime.utcnow,            # Python-side default
        server_default=text("(datetime('now'))"))    # SQLite-side default)