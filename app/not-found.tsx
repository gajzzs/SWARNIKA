import Link from "next/link";

export default function NotFound() {
  return (
    <section className="gaddi section">
      <div className="wrap empty">
        <h1 className="display display-md">That piece isn't on the tray.</h1>
        <p className="lede">It may have found its family already. Plenty more are waiting.</p>
        <Link href="/collections" className="btn btn-velvet">
          See the full tray
        </Link>
      </div>
    </section>
  );
}
