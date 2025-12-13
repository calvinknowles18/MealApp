# MealApp (MVP)

A minimal backend for a weekly dinner planner. You can create and list favorite meals, which are stored in a local SQLite database. Swagger UI is enabled for quick testing.
> Status: **Backend for meals (create/list) is live and persistent.**
> Next: a simple meals UI page, then weekly planning and reminders.

## Tech Stack

- **Python** 3.13
- **FastAPI** (web framework + OpenAPI docs)
- **Uvicorn** (ASGI server)
- **SQLAlchemy 2.x** (ORM)
- **SQLite** (local dev database)

## Project Status

- ✅ `/meals` API:
  - `POST /meals` — add a meal (`name`, optional `recipe` URL)
  - `GET /meals` — list all meals
- ✅ Data persists to **SQLite** (`app.db`) via SQLAlchemy models.
- ✅ OpenAPI docs at `/docs` (Swagger UI) and `/openapi.json`.
- 🚧 Next: minimal UI (`/meals/ui`) to view/add meals from a form.
- 🚧 Next: weekly plan model + ICS export.

---

## Repository Structure
MealApp/
├─ app.py                 # FastAPI app + /meals routes (GET, POST)
├─ db.py                  # SQLAlchemy engine + get_session() dependency
├─ models.py              # ORM models (Base, Meal)
├─ requirements.txt       # Python dependencies
├─ .gitignore             # ignores app.db, venvs, editor files, etc.
├─ .gitattributes         # normalize line endings (LF in repo)
└─ app.db                 # created at runtime (git-ignored)

> If you don’t see `app.db` in VS Code, disable the setting  
> **Explorer: Exclude Git Ignore**, or run `dir app.db`.

---

## Getting Started

### Clone and enter the repo

```bash
git clone <your-repo-url>
cd MealApp
```

### Create a virtual environment
```bash
python -m venv .venv

# Windows
.\.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
```

### Install dependencies
```bash
pip install -r requirements.txt
# Optional: install Swagger UI extras if needed
pip install "fastapi[standard]" -U
```

### Run the server
```bash
uvicorn app:app --host 127.0.0.1 --port 8001 --workers 1
```
### Open:
> Swagger UI: http://127.0.0.1:8001/docs
OR
> OpenAPI JSON: http://127.0.0.1:8001/openapi.json

