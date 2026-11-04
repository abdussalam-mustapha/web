"use client";

import { useEffect, useRef } from "react";
import { STRING_LINKS } from "@/data/site";

/** Red strings between the pin tips of keyed notes on the parent board. They follow dragged notes. */
export function Strings() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const s = svg.current;
    const b = s?.parentElement;
    if (!s || !b) return;
    const N: Record<string, HTMLElement> = {};
    b.querySelectorAll<HTMLElement>("[data-k]").forEach((n) => { N[n.dataset.k!] = n; });
    const paths = Array.from(s.querySelectorAll<SVGPathElement>("path"));

    const tip = (n: HTMLElement) => {
      const t = n.querySelector(".tip")!.getBoundingClientRect();
      const r = b.getBoundingClientRect();
      return [t.left - r.left, t.top - r.top];
    };

    let q = 0;
    function draw() {
      q = 0;
      paths.forEach((p) => {
        const A = N[p.dataset.a!], C = N[p.dataset.b!];
        if (!A || !C) return;
        const a = tip(A), c = tip(C);
        const dx = c[0] - a[0], dy = c[1] - a[1];
        const sag = Math.min(90, Math.hypot(dx, dy) * 0.18);
        p.setAttribute("d", `M${a[0]} ${a[1]}Q${a[0] + dx / 2} ${a[1] + dy / 2 + sag} ${c[0]} ${c[1]}`);
      });
    }
    const up = () => { if (!q) q = requestAnimationFrame(draw); };
    addEventListener("resize", up);
    addEventListener("notemove", up);
    draw();
    document.fonts?.ready.then(draw);

    const offs: (() => void)[] = [];
    Object.keys(N).forEach((k) => {
      const n = N[k];
      const enter = () => paths.forEach((p) => {
        const on = p.dataset.a === k || p.dataset.b === k;
        p.classList.toggle("hot", on);
        p.classList.toggle("dim", !on);
      });
      const leave = () => paths.forEach((p) => p.classList.remove("hot", "dim"));
      n.addEventListener("pointerenter", enter);
      n.addEventListener("pointerleave", leave);
      offs.push(() => { n.removeEventListener("pointerenter", enter); n.removeEventListener("pointerleave", leave); });
    });

    return () => {
      removeEventListener("resize", up);
      removeEventListener("notemove", up);
      cancelAnimationFrame(q);
      offs.forEach((f) => f());
    };
  }, []);

  return (
    <svg ref={svg} className="strings" aria-hidden="true">
      {STRING_LINKS.map(([a, b]) => (
        <path key={a + b} pathLength={1} data-a={a} data-b={b} />
      ))}
    </svg>
  );
}
