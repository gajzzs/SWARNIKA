import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/data";
import { formatINR, priceOf } from "@/lib/price";
import { TrousseauToggle } from "./Trousseau";

export function ProductCard({ p, sizes = "(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 25vw" }: { p: Product; sizes?: string }) {
  const stones = p.stones.map((s) => s.name.split(",")[0].toLowerCase()).join(", ");
  return (
    <article className="piece">
      <Link href={`/collections/${p.slug}`} className="piece-link">
        <span className="piece-frame">
          <Image src={p.image} alt={p.alt} fill sizes={sizes} />
        </span>
        <span className="piece-ticket">
          <span className="piece-row">
            <span className="piece-name">{p.name}</span>
            <span className="piece-price num">{formatINR(priceOf(p))}</span>
          </span>
          <span className="piece-meta">
            {p.karat} · {p.netGold} g gold{stones ? ` · ${stones}` : ""}
          </span>
        </span>
      </Link>
      <TrousseauToggle slug={p.slug} name={p.name} />
    </article>
  );
}
