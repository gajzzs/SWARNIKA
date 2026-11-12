"use client";

import { useEffect, useRef, useState } from "react";

/* AI-generated gold line ornaments (Recraft vector model); each SVG carries its prompt in a <desc>. */
const ART = {
  "paisley-divider": { src: "/vectors/paisley-divider.svg", ratio: "2048 / 1170" },
  lotus: { src: "/vectors/lotus.svg", ratio: "1 / 1" },
  peacock: { src: "/vectors/peacock.svg", ratio: "2048 / 1331" },
  jhumka: { src: "/vectors/jhumka.svg", ratio: "1 / 1" },
  "mandala-arc": { src: "/vectors/mandala-arc.svg", ratio: "1 / 1" },
} as const;

export type OrnamentName = keyof typeof ART;

export function Ornament({ name, className = "" }: { name: OrnamentName; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <img
      ref={ref}
      src={ART[name].src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      style={{ aspectRatio: ART[name].ratio }}
      className={`orn orn-${name}${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
    />
  );
}
