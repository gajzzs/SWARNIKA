import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogue } from "@/components/Catalogue";
import { RATE_DATE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Collections",
  description: "Kundan, polki and temple jewellery with every price broken down: necklaces, jhumkas, kadas, tikkas and the groom's sarpech.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="page-head gaddi">
        <div className="wrap">
          <h1 className="display display-md">The full tray</h1>
          <p className="lede">
            Every piece we have in the workshop this season, priced at the {RATE_DATE} gold rate with GST. Tap a piece to turn its price over.
          </p>
        </div>
      </section>
      <section className="gaddi section-tight">
        <div className="wrap">
          <Suspense fallback={<p className="muted">Laying out the tray…</p>}>
            <Catalogue />
          </Suspense>
        </div>
      </section>
    </>
  );
}
