"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, SHOP } from "@/lib/data";
import { formatINR, priceOf } from "@/lib/price";
import { Icon } from "./Icon";

type Ctx = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const TrousseauCtx = createContext<Ctx | null>(null);
const KEY = "swarnika.trousseau";

export function TrousseauProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw).filter((s: string) => getProduct(s)));
    } catch {}
  }, []);

  const persist = (next: string[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const toggle = useCallback((slug: string) => {
    setSlugs((cur) => {
      const next = cur.includes(slug) ? cur.filter((s) => s !== slug) : [...cur, slug];
      persist(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ slugs, has: (s: string) => slugs.includes(s), toggle, open, setOpen }), [slugs, toggle, open]);
  return (
    <TrousseauCtx.Provider value={value}>
      {children}
      <TrousseauDrawer />
    </TrousseauCtx.Provider>
  );
}

export function useTrousseau() {
  const c = useContext(TrousseauCtx);
  if (!c) throw new Error("useTrousseau outside provider");
  return c;
}

export function TrousseauToggle({ slug, name, variant = "icon" }: { slug: string; name: string; variant?: "icon" | "button" }) {
  const t = useTrousseau();
  const on = t.has(slug);
  if (variant === "button") {
    return (
      <button type="button" className="btn btn-ghost" aria-pressed={on} onClick={() => t.toggle(slug)}>
        <Icon name={on ? "heart-filled" : "heart"} />
        {on ? "In your trousseau" : "Add to trousseau"}
      </button>
    );
  }
  return (
    <button
      type="button"
      className="heart"
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from trousseau` : `Add ${name} to trousseau`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        t.toggle(slug);
      }}
    >
      <Icon name={on ? "heart-filled" : "heart"} size={18} />
    </button>
  );
}

export function TrousseauCount() {
  const t = useTrousseau();
  return (
    <button type="button" className="trousseau-btn" onClick={() => t.setOpen(true)} aria-haspopup="dialog">
      <Icon name="heart" size={18} />
      <span>Trousseau</span>
      <span className="count" aria-label={`${t.slugs.length} pieces`}>
        {t.slugs.length}
      </span>
    </button>
  );
}

function TrousseauDrawer() {
  const t = useTrousseau();
  const items = t.slugs.map((s) => getProduct(s)!).filter(Boolean);
  const total = items.reduce((s, p) => s + priceOf(p), 0);

  useEffect(() => {
    if (!t.open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && t.setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [t]);

  const message = encodeURIComponent(
    `Namaste Swarnika, I'd like to discuss my trousseau:\n${items.map((p) => `• ${p.name} (${formatINR(priceOf(p))})`).join("\n")}\nEstimated total: ${formatINR(total)}`
  );

  return (
    <div className={`drawer ${t.open ? "is-open" : ""}`} aria-hidden={!t.open}>
      <div className="drawer-scrim" onClick={() => t.setOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="trousseau-title">
        <header className="drawer-head">
          <h2 id="trousseau-title">Your trousseau</h2>
          <button type="button" className="icon-btn" onClick={() => t.setOpen(false)} aria-label="Close trousseau">
            <Icon name="close" />
          </button>
        </header>
        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Nothing on your tray yet.</p>
            <p className="muted">Tap the heart on any piece to set it aside here. We'll keep it on this device, ready to share with family or bring to your sitting.</p>
            <Link href="/collections" className="btn btn-velvet" onClick={() => t.setOpen(false)}>
              Browse the collections <Icon name="arrow" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer-list">
              {items.map((p) => (
                <li key={p.slug}>
                  <Link href={`/collections/${p.slug}`} onClick={() => t.setOpen(false)} className="drawer-item">
                    <span className="drawer-thumb">
                      <Image src={p.image} alt="" fill sizes="72px" />
                    </span>
                    <span>
                      <strong>{p.name}</strong>
                      <span className="muted">
                        {p.karat} · {p.netGold} g gold
                      </span>
                    </span>
                    <span className="num">{formatINR(priceOf(p))}</span>
                  </Link>
                  <button type="button" className="link-btn" onClick={() => t.toggle(p.slug)} aria-label={`Remove ${p.name}`}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <footer className="drawer-foot">
              <div className="drawer-total">
                <span>Estimated total</span>
                <span className="num">{formatINR(total)}</span>
              </div>
              <p className="muted small">At today's sample gold rate, GST included. Final weight is confirmed at your sitting.</p>
              <a className="btn btn-velvet" href={`https://wa.me/${SHOP.whatsapp}?text=${message}`} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> Share on WhatsApp
              </a>
              <Link href="/contact" className="btn btn-ghost" onClick={() => t.setOpen(false)}>
                <Icon name="calendar" /> Book a sitting for these
              </Link>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
