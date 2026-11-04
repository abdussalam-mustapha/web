"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Pin } from "@/components/ui/Pin";
import { reducedMotion, useClientValue } from "@/lib/browser";

const MSGS = ["Gathering stories...", "Sharpening pencils...", "Looking for a lucky day..."];

/**
 * The big welcome note. Plays on every full load of the landing page only
 * (initial state is fixed at first render, so client-side visits to "/" skip it).
 */
export function Intro() {
  const path = usePathname();
  const [show, setShow] = useState(() => (path || "/") === "/");
  const [phase, setPhase] = useState<"" | "open" | "open out">("");
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState(0);
  const [bar, setBar] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  // Arriving with an old-style hash link (/#about) skips the intro.
  const hashed = useClientValue(() => location.hash.length > 1, false);
  const active = show && !hashed && (path || "/") === "/";

  useEffect(() => {
    if (!active) return;
    const RM = reducedMotion();
    document.body.style.overflow = "hidden";
    const iv = setInterval(() => setMsg((k) => (k + 1) % MSGS.length), 600);
    const t1 = setTimeout(() => setBar(true), 60);
    const t2 = setTimeout(() => { clearInterval(iv); setReady(true); }, RM ? 300 : 1900);
    return () => { clearInterval(iv); clearTimeout(t1); clearTimeout(t2); document.body.style.overflow = ""; };
  }, [active]);

  useEffect(() => { if (ready) btn.current?.focus(); }, [ready]);

  function openNote() {
    if (phase) return;
    setPhase("open");
    document.body.style.overflow = "";
    const RM = reducedMotion();
    setTimeout(() => {
      setPhase("open out");
      setTimeout(() => setShow(false), 650);
    }, RM ? 100 : 800);
  }

  if (!active) return null;

  return (
    <div
      id="intro"
      className={phase || undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome note"
      onKeyDown={(e) => { if (e.key === "Escape") openNote(); }}
    >
      <div className="big">
        <Pin />
        <div className="w1">Welcome to Mustapha’s portfolio</div>
        <svg width="190" height="14" viewBox="0 0 190 14" aria-hidden="true">
          <path d="M3 9c12-9 24 9 36 0s24 9 36 0 24 9 36 0 24 9 36 0 24 9 36 0" fill="none" stroke="#2a2418" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="w2">
          Never miss a lucky day
          <svg className="ic" viewBox="0 0 24 24" fill="currentColor" fillOpacity=".25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="9" cy="9" r="3.2" /><circle cx="15" cy="9" r="3.2" /><circle cx="9" cy="15" r="3.2" /><circle cx="15" cy="15" r="3.2" /><path d="M12 15c0 3 1 5 4 6" />
          </svg>
        </div>
        <p className="hint">This note has a bunch of other stories folded inside.</p>
        <div className="lb" aria-hidden="true"><i id="lbi" style={bar ? { width: "100%" } : undefined} /></div>
        <button className="btn" id="open" ref={btn} type="button" disabled={!ready} onClick={openNote}>
          {ready ? "Open the note" : MSGS[msg]}
        </button>
      </div>
    </div>
  );
}
