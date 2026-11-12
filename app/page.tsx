import Image from "next/image";
import Link from "next/link";
import { HeroVideo } from "@/components/HeroVideo";
import { Icon } from "@/components/Icon";
import { Ornament } from "@/components/Ornament";
import { PriceTicket } from "@/components/PriceTicket";
import { ProductCard } from "@/components/ProductCard";
import { Rail } from "@/components/Rail";
import { Seals } from "@/components/Seals";
import { COLLECTIONS, FAQ, getProduct, PRODUCTS, SHOP } from "@/lib/data";
import { formatINR, priceOf } from "@/lib/price";

const ON_TRAY = ["gulnar-ruby-haar", "moti-chandbali", "gajmukh-kada", "noor-maang-tikka", "lakshmi-kasu-mala", "dogri-jhumka", "sheesh-mahal-kada"];
const CATEGORIES = ["Necklaces", "Earrings", "Bangles & Kadas", "Head ornaments"];
const ARCH = "M0,1 L0,0.34 C0,0.15 0.26,0.055 0.5,0 C0.74,0.055 1,0.15 1,0.34 L1,1 Z";

const SERVICES = [
  { icon: "calendar", title: "A sitting at the gaddi", points: ["Tea is poured and the tray is brought out", "About an hour; the whole family is welcome", "Nothing is shown that you didn't ask to see"] },
  { icon: "video", title: "Video consultation", points: ["Sit with us from anywhere on a video call", "Each piece shown in daylight with its price breakup", "Fully insured delivery across India"] },
  { icon: "scale", title: "Old gold exchange", points: ["Tested on an XRF machine in front of you", "Credited at full value at the day's rate"] },
  { icon: "heart", title: "Lifetime buyback", points: ["Swarnika gold bought back at full gold value", "Stones at their billed value less 10%", "Every piece traceable by its HUID"] },
] as const;

export default function Home() {
  const turned = getProduct("sheesh-mahal-kada")!;
  const floating = getProduct("gulnar-ruby-haar")!;
  return (
    <>
      <svg width="0" height="0" className="defs" aria-hidden="true">
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={ARCH} />
        </clipPath>
      </svg>

      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-h" className="display">
              Gold deserves the <em>whole</em> truth.
            </h1>
            <p className="lede">
              Hand-set kundan and uncut polki from our Jaipur atelier, every piece shown with its gold, stones, making and GST, line by line, before you ever ask.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-ink">
                Book a sitting
              </Link>
              <a className="btn btn-line" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" /> WhatsApp us
              </a>
            </div>
            <p className="hero-note">
              <Icon name="video" size={16} /> Not in Jaipur? <Link href="/contact?mode=video">Sit with us on a video call</Link>
            </p>
            <ul className="bracket-links" aria-label="Shop by category">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link href={`/collections?category=${encodeURIComponent(c)}`}>{c}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-stage">
            <svg className="arch-line" viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
              <path d={ARCH.replace(" Z", "")} pathLength={1} />
            </svg>
            <div className="arch-frame">
              <Image
                src="/images/hero-bride.webp"
                alt="A bride in an ivory silk dupatta wearing a kundan and polki choker with emerald drops, chandbali earrings and a maang tikka"
                fill
                priority
                sizes="(max-width: 960px) 80vw, 34vw"
              />
              <HeroVideo src="/videos/bride.mp4" />
            </div>
            <Link href="/collections" className="seal-cta">
              <svg viewBox="0 0 120 120" className="seal-cta-ring" aria-hidden="true">
                <defs>
                  <path id="seal-cta-path" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
                </defs>
                <text>
                  <textPath href="#seal-cta-path" textLength="290">
                    THE COLLECTIONS · HAND-SET IN JAIPUR ·
                  </textPath>
                </text>
              </svg>
              <span className="seal-cta-core">
                <Icon name="arrow" size={22} />
              </span>
              <span className="sr-only">Explore the collections</span>
            </Link>
            <Link href={`/collections/${floating.slug}`} className="float-card">
              <span className="float-thumb">
                <Image src={floating.image} alt="" fill sizes="96px" />
              </span>
              <span className="float-text">
                <span className="float-name">{floating.name}</span>
                <span className="float-meta">Worn here · {floating.karat}, {floating.netGold} g</span>
                <span className="float-price num">{formatINR(priceOf(floating))}</span>
              </span>
              <span className="float-go" aria-hidden="true">
                <Icon name="arrow" size={16} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="band seals-band" aria-labelledby="seals-h">
        <div className="wrap">
          <h2 id="seals-h" className="sr-only">
            Our guarantees
          </h2>
          <Seals />
        </div>
      </section>

      <section className="section" aria-labelledby="coll-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="coll-h" className="h2">
              Four collections, <em>one</em> workshop
            </h2>
            <Link href="/collections" className="text-link">
              Every piece <Icon name="arrow" size={16} />
            </Link>
          </div>
          <ul className="coll-grid">
            {COLLECTIONS.map((c) => (
              <li key={c.id}>
                <Link href={`/collections?collection=${c.id}`} className="coll-tile">
                  <span className="coll-media">
                    <Image src={c.image} alt={c.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 25vw" />
                    <span className="coll-still">
                      <Image src={c.still} alt="" fill sizes="(max-width: 640px) 90vw, (max-width: 960px) 45vw, 25vw" />
                    </span>
                  </span>
                  <span className="coll-cap">
                    <span className="coll-name">{c.name}</span>
                    <span className="coll-count num">{PRODUCTS.filter((p) => p.collection === c.id).length} pieces</span>
                  </span>
                  <span className="coll-line">{c.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band section tray-band" aria-labelledby="today-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="today-h" className="h2">
              On the tray this week
            </h2>
            <Link href="/collections" className="text-link">
              Open the full catalogue <Icon name="arrow" size={16} />
            </Link>
          </div>
          <Rail label="Pieces on the tray this week">
            {ON_TRAY.map((s) => (
              <ProductCard key={s} p={getProduct(s)!} sizes="(max-width: 700px) 72vw, 24vw" />
            ))}
          </Rail>
        </div>
      </section>

      <section className="section atelier" aria-labelledby="atelier-h">
        <div className="wrap atelier-grid">
          <div className="atelier-copy">
            <h2 id="atelier-h" className="h2">
              Made by hands you can <em>name</em>.
            </h2>
            <figure className="atelier-wrist">
              <Image src="/images/kada-wrist.webp" alt="A bride's hennaed wrist wearing a kundan kada with rubies and emeralds and thin gold bangles" fill sizes="180px" />
            </figure>
            <div className="atelier-foot">
              <p>
                Every piece passes through four benches in the workshop above the shop: the ghaat frame, the meena enamel, the kundan setting, the final polish. Each karigar&apos;s name goes on your bill.
              </p>
              <Link href="/about" className="btn btn-line">
                Meet the karigars <Icon name="arrow" />
              </Link>
            </div>
          </div>
          <figure className="atelier-small">
            <span className="atelier-img">
              <Image src="/images/atelier-bench.webp" alt="A low wooden workbench with gold wire, files, a brass lamp and a half-finished kundan necklace under a carved window" fill sizes="(max-width: 960px) 90vw, 22vw" />
            </span>
            <figcaption>The bench above the shop, Johari Bazaar</figcaption>
          </figure>
          <figure className="atelier-tall">
            <span className="atelier-img">
              <Image src="/images/atelier-hands.webp" alt="A goldsmith's hands pressing gold foil around an uncut diamond in a kundan pendant" fill sizes="(max-width: 960px) 90vw, 36vw" />
            </span>
            <figcaption>Kundan: pure gold foil pressed by hand around each uncut stone</figcaption>
          </figure>
        </div>
      </section>

      <section className="paper section turn" aria-labelledby="turn-h">
        <div className="wrap">
          <Ornament name="paisley-divider" className="orn-divider" />
        </div>
        <div className="wrap turn-grid">
          <div className="turn-photo">
            <Image src={turned.image} alt={turned.alt} fill sizes="(max-width: 960px) 100vw, 50vw" />
            <span className="prov">
              <span>Set by {turned.karigar}</span>
              <span className="num">
                {turned.hours} hours · HUID {turned.huid}
              </span>
            </span>
          </div>
          <div className="turn-copy">
            <h2 id="turn-h" className="h2">
              Turn the price <em>over</em>.
            </h2>
            <p className="lede">
              Most jewellers quote one number. We show you what it is made of: the gold at today&apos;s rate, each stone, the making and the tax. Switch the purity and watch every line re-weigh.
            </p>
            <PriceTicket product={turned} heading={turned.name} />
            <Link href={`/collections/${turned.slug}`} className="text-link">
              See the {turned.name} <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="services" aria-labelledby="svc-h">
        <div className="services-bg" aria-hidden="true">
          <HeroVideo src="/videos/hero.mp4" className="services-video" />
        </div>
        <div className="wrap services-inner">
          <h2 id="svc-h" className="h2">
            However you choose, <em>we sit with you</em>.
          </h2>
          <ul className="svc-list">
            {SERVICES.map((s) => (
              <li key={s.title}>
                <span className="svc-icon">
                  <Icon name={s.icon} size={22} />
                </span>
                <h3>{s.title}</h3>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bride" aria-labelledby="bride-h">
        <div className="wrap bride-grid">
          <div className="bride-photo">
            <Image
              src="/images/sitting.webp"
              alt="A mother and daughter seated on a white gaddi reaching towards a red velvet tray of kundan necklaces, jhumkas and bangles, a cup of chai beside it"
              fill
              sizes="(max-width: 960px) 100vw, 44vw"
            />
          </div>
          <div className="bride-copy">
            <Ornament name="peacock" className="orn-mark" />
            <h2 id="bride-h" className="h2">
              Plan the trousseau together, from <em>wherever</em> the family is.
            </h2>
            <p className="lede">
              Set pieces aside with the heart. Your trousseau keeps a running total at today&apos;s rate, and goes to the family WhatsApp group in one tap. Bring it to your sitting and we&apos;ll have every piece laid out.
            </p>
            <ul className="ticks">
              <li>
                <Icon name="check" size={18} /> Running total, GST included
              </li>
              <li>
                <Icon name="check" size={18} /> Share the list on WhatsApp
              </li>
              <li>
                <Icon name="check" size={18} /> Old gold weighed and exchanged at the day&apos;s rate
              </li>
            </ul>
            <Link href="/collections?occasion=Bridal" className="btn btn-ink">
              Start with bridal pieces <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section className="band section" aria-labelledby="faq-h">
        <div className="wrap faq">
          <div>
            <h2 id="faq-h" className="h2">
              Asked at <em>every</em> sitting
            </h2>
            <p className="lede">
              Anything else, ask us on <a href={`https://wa.me/${SHOP.whatsapp}`}>WhatsApp</a> or at the counter.
            </p>
          </div>
          <div>
            {FAQ.slice(0, 4).map((f) => (
              <details key={f.q} className="fold">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="paper visit" aria-labelledby="visit-h">
        <div className="wrap visit-grid">
          <div className="visit-window">
            <Ornament name="lotus" className="orn-mark" />
            <h2 id="visit-h" className="h2">
              Come and <em>sit</em> with us.
            </h2>
            <address>
              {SHOP.address.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
            <p className="visit-hours">{SHOP.hours}</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-ink">
                Book a sitting
              </Link>
              <a href={SHOP.phoneHref} className="btn btn-line">
                <Icon name="phone" /> {SHOP.phone}
              </a>
            </div>
          </div>
          <p className="visit-aside">
            Tea is poured, the tray is brought out, and nothing is shown that you didn&apos;t ask to see. Sittings run about an hour; families welcome.
          </p>
        </div>
      </section>
    </>
  );
}
