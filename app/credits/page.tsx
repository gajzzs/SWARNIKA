import type { Metadata } from "next";

export const metadata: Metadata = { title: "Image provenance" };

export default function CreditsPage() {
  return (
    <section className="gaddi section">
      <div className="wrap credits">
        <h1 className="display display-md">Image provenance</h1>
        <p className="lede">
          Every photograph and film on this demonstration site is AI-generated concept imagery (Google Gemini image model; films by Gemini Omni; line ornaments by Recraft; November 2026), art-directed as one series in warm ivory daylight. The people shown are not real. The pieces shown do not exist; they stand in for the jeweller's own product photography and should be replaced with real, hallmarked inventory before launch. Each image file carries its full generation prompt in its metadata.
        </p>
        <ul className="credit-list">
          <li>
            <span>Hero, product, atelier and trousseau imagery</span>
            <span className="muted">AI-generated · synthetic · not real inventory</span>
          </li>
          <li>
            <span>Prices, weights, gold rates, HUIDs and karigar names</span>
            <span className="muted">Sample data for demonstration</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
