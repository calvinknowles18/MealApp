# MealApp – Architecture

## Overview
MealApp is a small two-tier system:
- **Frontend**: Next.js 16 (App Router, TypeScript, Tailwind) served in dev at `http://localhost:3000`.
- **Backend**: FastAPI (Python 3.13) exposing REST endpoints, running in dev at `http://127.0.0.1:8001`.
- **Database**: SQLite (`backend/app.db`) persisted via SQLAlchemy 2.x ORM.

The frontend calls the backend over HTTP using a tiny client in `web/src/lib/api.ts`.

## High-level flow

```mermaid
sequenceDiagram
  autonumber
  participant UI as Next.js (web)
  participant API as FastAPI (backend)
  participant DB as SQLite

  UI->>API: GET /meals
  API->>DB: SELECT * FROM meals ORDER BY id
  DB-->>API: rows
  API-->>UI: 200 [ { id, name, recipe? }, ... ]

  UI->>API: POST /meals { name, recipe? }
  API->>DB: INSERT INTO meals (...)
  DB-->>API: id
  API-->>UI: 200 { id, message }
```