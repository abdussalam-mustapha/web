"use client";

import { useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Pin } from "@/components/ui/Pin";
import { PIN_TILT } from "@/lib/notes";
import { confetti } from "@/lib/browser";
import { useSite } from "@/components/site/SiteProvider";

/**
 * Guestbook store. Notes live only in each visitor's own browser (localStorage "gb").
 * To make the wall shared, swap load()/save() for a backend with moderation and rate limiting.
 */
interface Entry { n: string; m: string; c: number }
const KEY = "gb";
function load(): Entry[] {
  try {
    const a = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(a) ? a : [];
  } catch {
    return [];
  }
}
const subs = new Set<() => void>();
let cache: { raw: string | null; list: Entry[] } = { raw: null, list: [] };
/** Snapshot for useSyncExternalStore: re-parses only when the stored string changes. */
function snapshot(): Entry[] {
  let raw: string | null = null;
  try { raw = localStorage.getItem(KEY); } catch {}
  if (raw !== cache.raw) cache = { raw, list: load() };
  return cache.list;
}
const EMPTY: Entry[] = [];
function save(a: Entry[]) {
  try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {}
  subs.forEach((f) => f());
}
function subscribe(f: () => void) {
  subs.add(f);
  addEventListener("storage", f);
  return () => { subs.delete(f); removeEventListener("storage", f); };
}

const CC = ["#ffe66d", "#ffb3d1", "#a8f0cf", "#ffc58a", "#d2bfff"];
const CP = ["#e63946", "#2a9d8f", "#e63946", "#06a77d", "#f4a261"];
const FIRST: Entry = { n: "Mustapha", m: "Be the first to pin a note here. Never miss a lucky day.", c: 0 };

export function Guestbook() {
  const { toast } = useSite();
  const entries = useSyncExternalStore(subscribe, snapshot, () => EMPTY);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [ci, setCi] = useState(0);
  const ta = useRef<HTMLTextAreaElement>(null);

  function pin() {
    const t = msg.trim();
    if (!t) { toast("Write a note first"); ta.current?.focus(); return; }
    const a = [...load(), { n: name.trim().slice(0, 30), m: t.slice(0, 140), c: ci }].slice(-40);
    save(a);
    setMsg("");
    confetti();
    toast("Pinned to the wall");
  }

  function clear() {
    save([]);
    toast("Cleared");
  }

  return (
    <>
      <div className="gbf">
        <label htmlFor="gbn">Your name (optional)
          <input id="gbn" maxLength={30} autoComplete="off" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label htmlFor="gbm">Your note
          <textarea id="gbm" ref={ta} maxLength={140} rows={3} placeholder="Write something kind, funny or lucky" value={msg} onChange={(e) => setMsg(e.target.value)} />
        </label>
        <div className="sw" role="group" aria-label="Note color">
          {CC.map((c, i) => (
            <button key={c} type="button" style={{ background: c }} aria-label={`Color ${i + 1}`} aria-pressed={ci === i} onClick={() => setCi(i)} />
          ))}
        </div>
        <div>
          <button className="btn" type="button" onClick={pin}>Pin it</button>
          <button className="btn o" type="button" onClick={clear}>Clear my notes</button>
          <span className="gbc">{140 - msg.length} left</span>
        </div>
      </div>
      <div className="board" id="gbw">
        {[FIRST, ...entries].map((o, i) => {
          const c = Math.min(Math.max(+o.c || 0, 0), 4);
          return (
            <div
              key={i}
              className="note"
              style={{ "--c": CC[c], "--r": `${((i % 5) - 2) * 1.1}deg`, "--pin": CP[c], "--pt": `${PIN_TILT[i % 6]}deg` } as CSSProperties}
            >
              <Pin />
              {/* Visitor text is always rendered as plain text */}
              <h3>{String(o.n || "A visitor").slice(0, 30)}</h3>
              <p>{String(o.m || "").slice(0, 140)}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
