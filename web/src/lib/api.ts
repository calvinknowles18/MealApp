// web/src/lib/api.ts

/**
 * Base URL for the FastAPI backend
 * In dev we read NEXT_PUBLIC_API_BASE from .env.local (client-exposed var).
 * Fallback keeps local DX simple if the env var is missing.
 */
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8001";

export type Meal = {
    id: number;
    name: string;
     /** Optional recipe URL; null when not provided. */
    recipe?: string | null
};

/**
 * Fetch all meals from the backend.
 * Uses `cache: "no-store"` to avoid stale lists in dev.
 * Throws on non-2xx so callers can handle errors centrally.
 */
export async function fetchMeals(): Promise<Meal[]> {
    const res = await fetch(`${BASE}/meals`, { cache: "no-store" });
    if (!res.ok) throw new Error(`GET /meals failed: ${res.status}`);
    return res.json();
}

export async function createMeal(data: { name: string; recipe?: string }) {
    const res = await fetch(`${BASE}/meals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
});
if (!res.ok) throw new Error(`POST /meals failed: ${res.status}`);
return res.json();
}
