# MealApp (MVP)

A weekly dinner planner with a **FastAPI** backend and a **Next.js (TypeScript + Tailwind)** frontend.
- `backend/` — FastAPI + SQLAlchemy + SQLite
- `web/` — Next.js (App Router) UI

> Status: **Meals API (create/list) is live and persistent.**  
> Next: a simple meals UI page, then weekly planning and ICS reminders.

---

## Tech Stack

### Backend:
- **Python** 3.13
- **FastAPI** (web framework + OpenAPI docs)
- **Uvicorn** (ASGI server)
- **SQLAlchemy 2.x** (ORM)
- **SQLite** (local dev database)

### Frontend:
- **Next.js** 14
- **React** 18
- **Typescript**
- **Tailwind CSS**
- **ESLint**

---

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
├─ backend/ # FastAPI service
│ ├─ app.py # FastAPI app + /meals routes
│ ├─ db.py # SQLAlchemy engine + session
│ ├─ models.py # ORM models (Meal)
│ ├─ data.py # (legacy helpers if any)
│ ├─ requirements.txt # Python dependencies
│ └─ app.db # created at runtime (git-ignored)
├─ web/ # Next.js (App Router, TS, Tailwind)
│ ├─ package.json
│ ├─ next.config.js
│ ├─ tailwind.config.ts
│ ├─ postcss.config.js
│ └─ src/app/... # routes, pages, components
├─ .gitignore
└─ README.md

> If you don’t see `app.db` in VS Code, disable the setting
> **Explorer: Exclude Git Ignore**, or run `dir app.db`.

---

## Getting Started

### Clone and enter the repo

```bash
git clone https://github.com/calvinknowles18/MealApp.git
cd MealApp
```

### Run the backend (FastAPI)
```bash
cd backend

# (optional) create & activate a venv
# Windows
python -m venv .venv
.\.venv\Scripts\activate
# macOS/Linux
# python -m venv .venv && source .venv/bin/activate

pip install -r requirements.txt

# start API
uvicorn app:app --host 127.0.0.1 --port 8001 --reload
# Swagger UI: http://127.0.0.1:8001/docs
# OpenAPI:   http://127.0.0.1:8001/openapi.json
```

### Run the frontend (Next.js)
```bash
cd web
npm install

# point UI to your local API
# Windows (PowerShell):  echo NEXT_PUBLIC_API_BASE=http://127.0.0.1:8001 > .env.local
# macOS/Linux:           echo "NEXT_PUBLIC_API_BASE=http://127.0.0.1:8001" > .env.local

npm run dev
# App: http://localhost:3000
```
