import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { PriceTicket } from "@/components/PriceTicket";
import { ProductCard } from "@/components/ProductCard";
import { Seals } from "@/components/Seals";
import { TrousseauToggle } from "@/components/Trousseau";
import { COLLECTIONS, getProduct, PRODUCTS, SHOP } from "@/lib/data";
import { formatINR, priceOf } from "@/lib/price";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.description } : {};
}

const SIZE_NOTES: Partial<Record<string, string>> = {
  "Bangles & Kadas": "Kadas come in Indian sizes 2.2 to 2.10. Measure the widest part of your hand with fingers folded in; we'll size it at your sitting.",
  "Hand ornaments": "Rings are adjusted to each finger at your sitting; the chain lengths are set to your hand.",
  Necklaces: "Collar pieces are fitted with an adjustable dori (silk cord) at the back, so one size sits right on most necks.",
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const coll = COLLECTIONS.find((c) => c.id === p.collection)!;
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && (x.collection === p.collection || x.category === p.category)).slice(0, 4);
  const msg = encodeURIComponent(`Namaste Swarnika, I'd like to know more about the ${p.name} (${formatINR(priceOf(p))}, HUID ${p.huid}).`);

  return (
    <>
      <section className="gaddi product">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/collections">Collections</Link>
            <span aria-hidden>/</span>
            <Link href={`/collections?collection=${coll.id}`}>{coll.name}</Link>
          </nav>
          <div className="product-grid">
            <div className="product-media">
              <div className="product-frame">
                <Image src={p.image} alt={p.alt} fill priority sizes="(max-width: 900px) 100vw, 55vw" />
              </div>
              <div className="prov prov-block">
                <span>Set by {p.karigar}</span>
                <span className="num">{p.hours} karigar hours · HUID {p.huid}</span>
              </div>
            </div>
            <div className="product-info">
              <h1 className="display display-md">{p.name}</h1>
              {p.hindi ? (
                <p className="hindi" lang="hi">
                  {p.hindi}
                </p>
              ) : null}
              <p className="product-price num">{formatINR(priceOf(p))}</p>
              <p className="muted small">
                {p.karat} gold · {p.netGold} g net · {p.grossWeight} g gross · GST included
              </p>
              <p className="product-desc">{p.description}</p>

              <div className="product-actions">
                <Link href={`/contact?piece=${p.slug}`} className="btn btn-velvet">
                  <Icon name="calendar" /> Book a sitting to see it
                </Link>
                <a className="btn btn-ghost" href={`https://wa.me/${SHOP.whatsapp}?text=${msg}`} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" /> Ask on WhatsApp
                </a>
                <TrousseauToggle slug={p.slug} name={p.name} variant="button" />
              </div>

              <PriceTicket product={p} />

              <details className="fold">
                <summary>Size &amp; fit</summary>
                <p>{SIZE_NOTES[p.category] ?? "Earrings and head ornaments are one size; hooks and chains are adjusted at your sitting."}</p>
              </details>
              <details className="fold">
                <summary>Care</summary>
                <p>Keep kundan away from water and perfume; the foil behind each stone is pure gold and can lift if soaked. Store flat, wrapped in the muslin it arrives in. Bring it to us once a year for a free clean and check.</p>
              </details>
              <details className="fold">
                <summary>Exchange &amp; buyback</summary>
                <p>Exchange it any time for the full gold value at the day's rate. Buyback is paid on gold value; stones are bought back at the value listed on your bill, less 10%.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="velvet seals-band">
        <div className="wrap">
          <Seals compact />
        </div>
      </section>

      {related.length ? (
        <section className="gaddi section">
          <div className="wrap">
            <h2 className="h2">From the same tray</h2>
            <div className="piece-grid piece-grid-4">
              {related.map((r) => (
                <ProductCard key={r.slug} p={r} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
