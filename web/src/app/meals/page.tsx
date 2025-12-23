"use client";

import { createMeal, fetchMeals, Meal } from "@/lib/api";
import { useEffect, useState } from "react";

export default function MealsPage() {
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

  // form state
    const [name, setName] = useState("");
    const [recipe, setRecipe] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function load() {
        try {
        setError(null);
        setLoading(true);
        const rows = await fetchMeals();
        setMeals(rows);
        } catch (e: any) {
        setError(e.message ?? "Failed to load meals");
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim()) return;

        try {
        setSubmitting(true);
        await createMeal({
            name: name.trim(),
            ...(recipe.trim() ? { recipe: recipe.trim() } : {}),
        });
        setName("");
        setRecipe("");
        await load(); // refresh list
        } catch (e: any) {
        alert(e.message ?? "Failed to create meal");
        } finally {
        setSubmitting(false);
        }
    }

    return (
        <div className="mx-auto max-w-2xl p-6 space-y-6">
        <header className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Meals</h1>
            <a
            className="text-sm underline text-blue-600"
            href="/"
            title="Home"
            >
            Home
            </a>
        </header>

        {/* Add form */}
        <form
            onSubmit={onSubmit}
            className="rounded-xl border p-4 space-y-3 bg-white"
        >
            <div>
            <label className="block text-sm font-medium">Meal name</label>
            <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Spaghetti"
                required
            />
            </div>
            <div>
            <label className="block text-sm font-medium">
                Recipe URL (optional)
            </label>
            <input
                className="mt-1 w-full rounded border px-3 py-2"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                placeholder="https://example.com/recipe"
            />
            </div>
            <button
            type="submit"
            disabled={submitting}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
            >
            {submitting ? "Adding..." : "Add meal"}
            </button>
        </form>

        {/* List */}
        <section className="rounded-xl border bg-white">
            <div className="border-b p-4 font-medium">Saved meals</div>
            <div className="divide-y">
            {loading ? (
                <div className="p-4 text-sm text-gray-500">Loading…</div>
            ) : error ? (
                <div className="p-4 text-sm text-red-600">{error}</div>
            ) : meals.length === 0 ? (
                <div className="p-4 text-sm text-gray-500">No meals yet.</div>
            ) : (
                meals.map((m) => (
                <div key={m.id} className="p-4 flex items-center gap-3">
                    <div className="font-medium">{m.name}</div>
                    {m.recipe ? (
                    <a
                        href={m.recipe}
                        target="_blank"
                        className="text-blue-600 underline text-sm"
                    >
                        recipe
                    </a>
                    ) : (
                    <span className="text-xs text-gray-500">no recipe</span>
                    )}
                </div>
                ))
            )}
            </div>
        </section>
        </div>
    );
}
