"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CATEGORIES, COLLECTIONS, OCCASIONS, PRODUCTS, type Category, type CollectionId, type Occasion } from "@/lib/data";
import { formatINR, priceOf } from "@/lib/price";
import { ProductCard } from "./ProductCard";

const BUDGETS = [
  { id: "u1", label: "Under ₹1.5 lakh", min: 0, max: 150000 },
  { id: "1-4", label: "₹1.5 – 4 lakh", min: 150000, max: 400000 },
  { id: "4-8", label: "₹4 – 8 lakh", min: 400000, max: 800000 },
  { id: "8+", label: "Above ₹8 lakh", min: 800000, max: Infinity },
];
const SORTS = [
  { id: "featured", label: "As laid on the tray" },
  { id: "low", label: "Price, low to high" },
  { id: "high", label: "Price, high to low" },
  { id: "light", label: "Lightest first" },
];

export function Catalogue() {
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category") as Category | null;
  const occasion = params.get("occasion") as Occasion | null;
  const collection = params.get("collection") as CollectionId | null;
  const budget = params.get("budget");
  const sort = params.get("sort") ?? "featured";

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || next.get(key) === value) next.delete(key);
    else next.set(key, value);
    router.replace(`/collections${next.size ? `?${next}` : ""}`, { scroll: false });
  };

  const items = useMemo(() => {
    const b = BUDGETS.find((x) => x.id === budget);
    const list = PRODUCTS.filter(
      (p) =>
        (!category || p.category === category) &&
        (!occasion || p.occasions.includes(occasion)) &&
        (!collection || p.collection === collection) &&
        (!b || (priceOf(p) >= b.min && priceOf(p) < b.max))
    );
    if (sort === "low") list.sort((a, z) => priceOf(a) - priceOf(z));
    if (sort === "high") list.sort((a, z) => priceOf(z) - priceOf(a));
    if (sort === "light") list.sort((a, z) => a.grossWeight - z.grossWeight);
    return list;
  }, [category, occasion, collection, budget, sort]);

  const active = [category, occasion, collection, budget].filter(Boolean).length;
  const coll = COLLECTIONS.find((c) => c.id === collection);

  return (
    <div className="catalogue">
      <aside className="filters" aria-label="Filter pieces">
        <fieldset>
          <legend>Collection</legend>
          {COLLECTIONS.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={collection === c.id} onClick={() => set("collection", c.id)}>
              {c.name}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Piece</legend>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => set("category", c)}>
              {c}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Occasion</legend>
          {OCCASIONS.map((o) => (
            <button key={o} type="button" className="chip" aria-pressed={occasion === o} onClick={() => set("occasion", o)}>
              {o}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Budget</legend>
          {BUDGETS.map((b) => (
            <button key={b.id} type="button" className="chip" aria-pressed={budget === b.id} onClick={() => set("budget", b.id)}>
              {b.label}
            </button>
          ))}
        </fieldset>
        {active ? (
          <button type="button" className="link-btn" onClick={() => router.replace("/collections", { scroll: false })}>
            Clear all filters
          </button>
        ) : null}
      </aside>

      <div className="results">
        <div className="results-bar">
          <p aria-live="polite">
            {coll ? <strong>{coll.name}. </strong> : null}
            {items.length} {items.length === 1 ? "piece" : "pieces"}
            {items.length ? ` · from ${formatINR(Math.min(...items.map((p) => priceOf(p))))}` : ""}
          </p>
          <label className="sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => set("sort", e.target.value === "featured" ? null : e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {items.length ? (
          <div className="piece-grid">
            {items.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p className="empty-h">Nothing on the tray matches all of that.</p>
            <p>Loosen a filter, or tell us what you have in mind. Much of what we make is made to order.</p>
            <button type="button" className="btn btn-ghost" onClick={() => router.replace("/collections", { scroll: false })}>
              Show every piece
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
