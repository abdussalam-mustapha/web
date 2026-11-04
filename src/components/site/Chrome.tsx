"use client";

import { useEffect, useRef } from "react";
import { confetti, finePointer } from "@/lib/browser";
import { useSite } from "./SiteProvider";

/** Thin rainbow bar at the top that fills as you scroll. */
export function ScrollProgress() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function f() {
      const h = document.documentElement;
      if (el.current) el.current.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100 + "%";
    }
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  return <div id="sp" ref={el} aria-hidden="true" />;
}

const HAND =
  '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 13V5.5a1.5 1.5 0 013 0V11M11 10.5V4a1.5 1.5 0 013 0v6.5M14 10.5V5.5a1.5 1.5 0 013 0V14c0 4-2.2 7-6 7-3.2 0-4.5-1.6-6.4-4.2L3.7 14.5a1.6 1.6 0 012.5-2L8 14.6"/></svg>';

/** "Click to read the story" label that follows the cursor over notes (fine pointers only). */
export function CursorTag() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!finePointer()) return;
    const tg = el.current!;
    let lastLab = "";
    function move(e: PointerEvent) {
      const n = (e.target as Element).closest?.(".note") as HTMLElement | null;
      if (!n) { tg.classList.remove("on"); return; }
      const lab = n.classList.contains("drag")
        ? "Release to drop"
        : n.dataset.role !== undefined
          ? "Click to see what I did"
          : n.dataset.story !== undefined
            ? "Click to read the story"
            : n.tagName === "A"
              ? "Click to open"
              : "Drag me around";
      if (lab !== lastLab) { tg.innerHTML = HAND + lab; lastLab = lab; }
      tg.style.transform = `translate(${e.clientX + 18}px,${e.clientY + 22}px)`;
      tg.classList.add("on");
    }
    const leave = () => tg.classList.remove("on");
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return <div id="ctag" ref={el} aria-hidden="true" />;
}

const HANG: { label: string; href?: string; toast?: string; x?: boolean; t: number; c: string; cc: string; dl: string }[] = [
  { label: "Leave me a note", href: "/guestbook", t: 0.1, c: "#ffe66d", cc: "#ff6b81", dl: "0s" },
  { label: "Thanks for stopping by", toast: "Thanks for stopping by.", x: true, t: 0.3, c: "#ffb3d1", cc: "#2ee6a6", dl: "-1.2s" },
  { label: "Never miss a lucky day", toast: "Never miss a lucky day.", t: 0.5, c: "#a8f0cf", cc: "#ffd23f", dl: "-2.4s" },
  { label: "See you soon", toast: "See you again soon.", x: true, t: 0.7, c: "#d2bfff", cc: "#ff6b4a", dl: "-3.2s" },
  { label: "Meet the community", href: "/community", t: 0.9, c: "#ffc58a", cc: "#a78bfa", dl: "-4.1s" },
];

/** Clothesline of little notes above the footer, then the footer itself. */
export function Footer() {
  const { toast } = useSite();
  return (
    <>
      <div className="line" role="group" aria-label="Little notes hanging on a string">
        <svg className="ln" viewBox="0 0 1200 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 8Q600 44 1200 8" /></svg>
        {HANG.map((h) => {
          const style = { "--t": h.t, "--c": h.c, "--cc": h.cc, "--dl": h.dl } as React.CSSProperties;
          const cls = "ho" + (h.x ? " x" : "");
          return h.href ? (
            <a key={h.label} className={cls} href={h.href} style={style}><i className="cp" />{h.label}</a>
          ) : (
            <button key={h.label} className={cls} type="button" style={style} onClick={() => { confetti(); toast(h.toast!); }}>
              <i className="cp" />{h.label}
            </button>
          );
        })}
      </div>
      <footer>
        <span>Never miss a lucky day.</span>
        <span><a href="/rabbit-hole">Rabbit hole</a><a href="/about">Contact</a></span>
      </footer>
    </>
  );
}
