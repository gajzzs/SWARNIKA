import type { Metadata } from "next";
import { Suspense } from "react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Icon } from "@/components/Icon";
import { FAQ, SHOP } from "@/lib/data";

export const metadata: Metadata = {
  title: "Visit & book a sitting",
  description: "Book a showroom sitting on Johari Bazaar, Jaipur, or a video consultation from anywhere.",
};


export default function ContactPage() {
  return (
    <>
      <section className="page-head gaddi">
        <div className="wrap">
          <h1 className="display display-md">Book a sitting</h1>
          <p className="lede">An hour on the gaddi in Jaipur, or thirty minutes on video. Tell us what to bring out and we'll have it on the tray.</p>
        </div>
      </section>

      <section className="gaddi section-tight">
        <div className="wrap contact-grid">
          <Suspense fallback={null}>
            <AppointmentForm />
          </Suspense>
          <aside className="contact-side">
            <div className="contact-block">
              <h2 className="h3">The showroom</h2>
              <address>
                {SHOP.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <p className="muted">{SHOP.hours}</p>
            </div>
            <ul className="contact-lines">
              <li>
                <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
                  <Icon name="whatsapp" /> WhatsApp <span className="muted">usually within the hour</span>
                </a>
              </li>
              <li>
                <a href={SHOP.phoneHref}>
                  <Icon name="phone" /> {SHOP.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SHOP.email}`}>
                  <Icon name="arrow" /> {SHOP.email}
                </a>
              </li>
            </ul>
            <div className="map">
              <iframe
                title="Map of Johari Bazaar, Jaipur"
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${SHOP.map.lon - 0.006}%2C${SHOP.map.lat - 0.004}%2C${SHOP.map.lon + 0.006}%2C${SHOP.map.lat + 0.004}&layer=mapnik&marker=${SHOP.map.lat}%2C${SHOP.map.lon}`}
              />
            </div>
            <p className="sample-note">Sample address, phone and email. Replace with the real showroom details.</p>
          </aside>
        </div>
      </section>

      <section className="velvet section" id="promises" aria-labelledby="faq-h">
        <div className="wrap faq">
          <h2 id="faq-h" className="h2">
            Before you visit
          </h2>
          <div>
            {FAQ.map((f) => (
              <details key={f.q} className="fold fold-dark">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
