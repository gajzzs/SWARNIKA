"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/* A horizontal tray with its own controls: a gold progress line and previous/next buttons stand in for the browser scrollbar. */
export function Rail({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ start: 0, size: 1, atStart: true, atEnd: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({
        start: max > 0 ? (el.scrollLeft / el.scrollWidth) : 0,
        size: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
        atStart: el.scrollLeft <= 2,
        atEnd: el.scrollLeft >= max - 2,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + gap), behavior: "smooth" });
  };

  return (
    <div className="rail">
      <div ref={ref} className="piece-rail" role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="rail-controls">
        <div className="rail-track" aria-hidden="true">
          <span className="rail-thumb" style={{ left: `${state.start * 100}%`, width: `${state.size * 100}%` }} />
        </div>
        <button type="button" className="rail-btn" onClick={() => step(-1)} disabled={state.atStart} aria-label="Previous pieces">
          <Icon name="arrow" size={18} />
        </button>
        <button type="button" className="rail-btn" onClick={() => step(1)} disabled={state.atEnd} aria-label="Next pieces">
          <Icon name="arrow" size={18} />
        </button>
      </div>
    </div>
  );
}
