"use client";

import { useEffect, useRef, useState } from "react";

/* A short AI-generated film (provenance in the matching .mp4.json) that fades in over its still, plays once
   and rests on its final frame. Visitors who prefer reduced motion never download it. */
export function HeroVideo({ src, className = "hero-video" }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [wanted, setWanted] = useState(false);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setWanted(true);
  }, []);
  useEffect(() => {
    if (wanted) ref.current?.play().catch(() => {});
  }, [wanted]);
  if (!wanted) return null;
  return (
    <video
      ref={ref}
      className={`${className}${on ? " is-on" : ""}`}
      muted
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setOn(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
