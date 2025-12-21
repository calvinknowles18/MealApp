# MealApp – API

## Base URL (dev)
`http://127.0.0.1:8001`


**OpenAPI / Docs:**
- Swagger UI: `http://127.0.0.1:8001/docs`
- OpenAPI JSON: `http://127.0.0.1:8001/openapi.json`

## Authentication
None (MVP). CORS is enabled in dev so the Next.js UI can call the API.

## Content Types
- Requests: `application/json`
- Responses: `application/json; charset=utf-8`

---

## Resources

### GET `/meals`
Return all meals.

**Response 200**
```json
[
  { "id": 1, "name": "Spaghetti", "recipe": "https://example.com/recipe" },
  { "id": 2, "name": "Taco Night", "recipe": null }
]
```

## cURL
```bash
curl -s http://127.0.0.1:8001/meals
```

## POST /meals
Create a new meal.
### Request Body
```
{
  "name": "Spaghetti",
  "recipe": "https://example.com/recipe"
}
```

### Fields
- name (string, required)
- recipe (string, optional URL; may be null or omitted)

### Response 200
```
{
  "id": 3,
  "message": "Meal added successfully!"
}
```

## cURL
```
curl -X POST http://127.0.0.1:8001/meals \
  -H "Content-Type: application/json" \
  -d '{ "name": "Spaghetti", "recipe": "https://example.com/recipe" }'
```

## Error Model (typical)

FastAPI returns structured validation errors for 422 responses. Example:
```
{
  "detail": [
    {
      "type": "string_type",
      "loc": ["body", "name"],
      "msg": "Input should be a valid string",
      "input": 123
    }
  ]
}
```

## Other common statuses:

- 400 Bad Request – malformed payloads.

- 404 Not Found – unknown route.

- 500 Internal Server Error – unhandled exceptions.

## Versioning

Unversioned (MVP). Plan: prefix with /api/v1 once surface expands.

Notes

In dev, CORS allows http://localhost:3000 (Next.js). Update the allowlist when deploying.

SQLite is created automatically on server start (backend/app.db).