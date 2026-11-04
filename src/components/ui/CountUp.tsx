"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/browser";

/** Counts from 0 to `n` with an ease-out, once on mount. */
export function CountUp({ n }: { n: number }) {
  const el = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const e = el.current!;
    if (reducedMotion()) { e.textContent = n.toLocaleString(); return; }
    const t0 = performance.now();
    let raf = 0;
    (function f(t: number) {
      const p = Math.min(1, (t - t0) / 1200);
      e.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))).toLocaleString();
      if (p < 1) raf = requestAnimationFrame(f);
    })(t0);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return <span ref={el}>0</span>;
}
