import { useId } from "react";
import { MARK_CUTS, MARK_PATHS, MARK_VIEWBOX } from "@/lib/mark";

export function Mark({ className = "mark" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <defs>
        <mask id={`cut-${id}`}>
          <rect x="0" y="0" width="2048" height="2048" fill="#fff" />
          <g fill="#000">
            {MARK_CUTS.map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </g>
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#cut-${id})`}>
        {MARK_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
    </svg>
  );
}
