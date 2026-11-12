"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GOLD_RATES, RATE_DATE, SHOP } from "@/lib/data";
import { formatINR } from "@/lib/price";
import { Icon } from "./Icon";
import { TrousseauCount } from "./Trousseau";

const LEFT = [
  { href: "/collections?occasion=Bridal", label: "Bridal" },
  { href: "/collections", label: "Collections" },
];
const RIGHT = [
  { href: "/about", label: "Atelier" },
  { href: "/contact", label: "Visit us" },
];

export function Header() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 48);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return base === "/" ? path === "/" : path.startsWith(base) && !href.includes("?");
  };

  return (
    <header className={`site-head${scrolled ? " is-scrolled" : ""}`}>
      <div className="rate-strip">
        <div className="wrap rate-inner">
          <span className="rate-label">
            Gold today · {RATE_DATE} · <span className="hide-sm">sample rate</span>
          </span>
          <span>
            22K <b className="num">{formatINR(GOLD_RATES["22K"])}/g</b>
          </span>
          <span className="hide-sm">
            18K <b className="num">{formatINR(GOLD_RATES["18K"])}/g</b>
          </span>
          <span className="hide-md">BIS hallmark &amp; HUID on every piece</span>
          <Link className="hide-md rate-link" href="/contact?mode=video">
            <Icon name="video" size={15} /> Video consultation
          </Link>
          <a className="rate-wa" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={15} /> <span className="hide-sm">WhatsApp</span>
          </a>
        </div>
      </div>

      <nav className="nav" aria-label="Main">
        <div className="wrap nav-row">
          <ul className="nav-links hide-nav">
            {[...LEFT, ...RIGHT].map((l) => (
              <li key={l.label}>
                <Link href={l.href} className={`nav-link ${isActive(l.href) ? "is-active" : ""}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/" className="brand" aria-label="Swarnika, home">
            <span className="wordmark">Swarnika</span>
            <span className="wordmark-sub">Jaipur</span>
          </Link>
          <div className="nav-tools">
            <TrousseauCount />
            <Link href="/contact" className="btn btn-ink btn-sm hide-sm">
              Book a sitting
            </Link>
            <button type="button" className="icon-btn menu-btn" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu((m) => !m)}>
              <Icon name={menu ? "close" : "menu"} />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menu ? "is-open" : ""}`} hidden={!menu}>
        <ul>
          {[{ href: "/", label: "Home" }, ...LEFT, ...RIGHT].map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="btn btn-ink">
          <Icon name="calendar" /> Book a sitting
        </Link>
      </div>
    </header>
  );
}
