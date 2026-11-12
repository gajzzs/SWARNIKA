"use client";

import { useState } from "react";
import { GST_RATE, type Karat, type Product } from "@/lib/data";
import { formatGrams, formatINR, priceBreakup } from "@/lib/price";

type Line = { key: string; label: string; detail: string; value: number };

// The signature: a brass ticket that turns the price over. Switching karat
// re-weighs every line live; pointing at a line isolates its share of the bar.
export function PriceTicket({ product, heading = "What you pay for" }: { product: Product; heading?: string }) {
  const [karat, setKarat] = useState<Karat>(product.karat);
  const [focus, setFocus] = useState<string | null>(null);
  const b = priceBreakup(product, karat);

  const lines: Line[] = [
    { key: "gold", label: `Gold, ${karat}`, detail: `${formatGrams(b.netGold)} × ${formatINR(b.rate)}/g`, value: b.gold },
    ...(b.stones
      ? [{ key: "stones", label: "Stones", detail: product.stones.map((s) => s.name).join(" · "), value: b.stones }]
      : []),
    { key: "making", label: "Making", detail: `${product.makingPct}% of gold value, ${product.hours} karigar hours`, value: b.making },
    { key: "gst", label: "GST", detail: `${GST_RATE * 100}% on the subtotal`, value: b.gst },
  ];

  return (
    <section className="ticket-card" aria-labelledby={`pt-${product.slug}`}>
      <div className="tc-head">
        <h3 id={`pt-${product.slug}`}>{heading}</h3>
        <div className="karat-switch" role="radiogroup" aria-label="Gold purity">
          {(["22K", "18K"] as Karat[]).map((k) => (
            <button key={k} type="button" role="radio" aria-checked={karat === k} onClick={() => setKarat(k)}>
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="tc-bar" aria-hidden>
        {lines.map((l) => (
          <span
            key={l.key}
            className={`tc-seg seg-${l.key} ${focus && focus !== l.key ? "is-dim" : ""}`}
            style={{ flexGrow: l.value }}
          />
        ))}
      </div>

      <dl className="tc-lines" onMouseLeave={() => setFocus(null)}>
        {lines.map((l) => (
          <div
            key={l.key}
            className={`tc-line ${focus === l.key ? "is-focus" : ""} ${focus && focus !== l.key ? "is-dim" : ""}`}
            onMouseEnter={() => setFocus(l.key)}
            onFocus={() => setFocus(l.key)}
            onBlur={() => setFocus(null)}
            tabIndex={0}
          >
            <dt>
              <span className={`tc-dot seg-${l.key}`} aria-hidden />
              {l.label}
              <span className="tc-detail">{l.detail}</span>
            </dt>
            <dd className="num">{formatINR(l.value)}</dd>
          </div>
        ))}
        <div className="tc-line tc-total">
          <dt>Total, all inclusive</dt>
          <dd className="num" aria-live="polite">
            {formatINR(b.total)}
          </dd>
        </div>
      </dl>
      <p className="tc-note">
        Sample gold rate. Gross weight {formatGrams(product.grossWeight)} · HUID <span className="num">{product.huid}</span>
        {karat !== product.karat ? " · 18K is made to order, about 3 weeks" : ""}
      </p>
    </section>
  );
}
