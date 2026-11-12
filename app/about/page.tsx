import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Ornament } from "@/components/Ornament";
import { KARIGARS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Atelier & karigars",
  description: "The four benches of the Swarnika workshop in Johari Bazaar, Jaipur, and the karigars who sit at them.",
};

const BENCHES = [
  { name: "Ghaat", body: "A frame of 22K gold is drawn, cut and soldered to the drawing. Every hollow that will hold a stone is shaped now." },
  { name: "Meena", body: "The reverse is engraved and filled with glass enamel, fired colour by colour, hardest first. Nobody sees it but the wearer." },
  { name: "Kundan", body: "Stones are bedded on lac and held in place with strips of pure gold foil, pushed in by hand with a steel tool called a salai." },
  { name: "Jilai", body: "Polishing, pearl stringing and the silk dori. The piece is weighed, hallmarked by BIS and given its HUID." },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-head gaddi about-head">
        <div className="wrap about-head-grid">
          <div>
            <h1 className="display display-md">A workshop above the shop.</h1>
            <p className="lede">
              Swarnika is a family atelier on Johari Bazaar, the jewellers' street of Jaipur. Upstairs are the benches; downstairs is the gaddi where families sit to choose. Nothing you see here was bought in.
            </p>
            <p className="sample-note">Sample story: replace with the house's real history, founding date and family names.</p>
          </div>
          <div className="about-photo">
            <Image src="/images/atelier-bench.webp" alt="A low wooden workbench with gold wire, files, a brass lamp and a half-finished kundan necklace under a carved window" fill priority sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="velvet section" aria-labelledby="bench-h">
        <div className="wrap">
          <h2 id="bench-h" className="h2">
            Four benches, in order
          </h2>
          <ol className="benches">
            {BENCHES.map((b) => (
              <li key={b.name}>
                <h3>{b.name}</h3>
                <p>{b.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="gaddi section" aria-labelledby="karigar-h">
        <div className="wrap">
          <h2 id="karigar-h" className="h2">
            The karigars
          </h2>
          <p className="lede">Their names go on your bill, beside the gold weight. Sample profiles.</p>
          <ul className="karigars">
            {KARIGARS.map((k) => (
              <li key={k.name}>
                <p className="k-craft">{k.craft}</p>
                <h3>{k.name}</h3>
                <p className="num k-years">{k.years} years at the bench</p>
                <p>{k.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="plaster section" aria-labelledby="promise-h">
        <div className="wrap">
          <Ornament name="paisley-divider" className="orn-divider" />
        </div>
        <div className="wrap promise">
          <h2 id="promise-h" className="h2">
            Why we show the price inside out
          </h2>
          <p>
            Indian families buy gold to keep it. A bride's mother should know what part of a price is metal she can always sell back, what part is stone, and what part is our labour. So we print it, for every piece, every day.
          </p>
          <Link href="/collections" className="btn btn-velvet">
            See it on any piece <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
