// Certification as stamped seals, not small icons. Each seal is an authored SVG
// with its legend set on a circular path, the way assay and hallmark stamps read.

const SEALS = [
  { ring: "BUREAU OF INDIAN STANDARDS · HALLMARK ·", core: "916", sub: "22K gold", title: "BIS hallmarked", body: "Every gold piece carries the BIS mark, its purity in fineness (916 for 22K) and our jeweller's mark." },
  { ring: "HALLMARK UNIQUE ID · VERIFY ON BIS CARE ·", core: "HUID", sub: "6-digit code", title: "Traceable by HUID", body: "Each piece has its own six-character HUID. Check it yourself on the government's BIS Care app." },
  { ring: "CERTIFIED STONES · LAB REPORT INCLUDED ·", core: "IGI", sub: "diamonds & polki", title: "Certified stones", body: "Diamonds above 0.30 ct come with an independent lab report. Polki is weighed and listed on your bill." },
  { ring: "LIFETIME EXCHANGE · BUYBACK ON GOLD VALUE ·", core: "100%", sub: "gold value", title: "Lifetime exchange", body: "Bring any Swarnika piece back for its full gold value at the day's rate, in exchange or as buyback." },
];

function Seal({ ring, core, sub, id }: { ring: string; core: string; sub: string; id: string }) {
  return (
    <svg viewBox="0 0 160 160" className="seal-svg" aria-hidden>
      <defs>
        <path id={id} d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0" />
      </defs>
      <circle cx="80" cy="80" r="76" className="seal-o" />
      <circle cx="80" cy="80" r="46" className="seal-i" />
      <text className="seal-ring">
        <textPath href={`#${id}`} startOffset="0" textLength="372">
          {ring}
        </textPath>
      </text>
      <text x="80" y="84" textAnchor="middle" className="seal-core">
        {core}
      </text>
      <text x="80" y="104" textAnchor="middle" className="seal-sub">
        {sub}
      </text>
    </svg>
  );
}

export function Seals({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`seals ${compact ? "seals-compact" : ""}`}>
      {SEALS.map((s, i) => (
        <li key={s.core} className="seal">
          <Seal ring={s.ring} core={s.core} sub={s.sub} id={`seal-${compact ? "c" : "f"}-${i}`} />
          {compact ? (
            <span className="seal-title">{s.title}</span>
          ) : (
            <div>
              <h3 className="seal-title">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
