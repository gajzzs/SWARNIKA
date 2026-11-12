import Link from "next/link";
import { SHOP } from "@/lib/data";
import { Icon } from "./Icon";

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <p className="wordmark foot-wordmark">Swarnika</p>
          <p className="foot-line">{SHOP.line}</p>
          <p className="foot-sample">
            A demonstration storefront. The shop name, address, rates, prices and craftspeople are sample content. All photography and film is AI-generated concept imagery, see <Link href="/credits">image credits</Link>.
          </p>
        </div>
        <div>
          <h2 className="foot-h">Visit</h2>
          <address>
            {SHOP.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p className="foot-muted">{SHOP.hours}</p>
        </div>
        <div>
          <h2 className="foot-h">Speak to us</h2>
          <ul className="foot-links">
            <li>
              <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={16} /> WhatsApp
              </a>
            </li>
            <li>
              <a href={SHOP.phoneHref}>
                <Icon name="phone" size={16} /> {SHOP.phone}
              </a>
            </li>
            <li>
              <Link href="/contact">
                <Icon name="video" size={16} /> Video consultation
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="foot-h">The house</h2>
          <ul className="foot-links">
            <li><Link href="/collections">All collections</Link></li>
            <li><Link href="/about">Atelier &amp; karigars</Link></li>
            <li><Link href="/contact#promises">Exchange &amp; buyback</Link></li>
            <li><Link href="/credits">Image credits</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} Swarnika (sample brand)</span>
        <span>Prices include 3% GST · BIS hallmark &amp; HUID on all gold</span>
      </div>
    </footer>
  );
}
