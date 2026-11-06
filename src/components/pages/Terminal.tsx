"use client";

import { useEffect, useRef, useState } from "react";
import { EMAIL } from "@/data/contact";
import { confetti, manga } from "@/lib/browser";
import { readStore } from "@/lib/readStore";
import { useSite } from "@/components/site/SiteProvider";

const C: Record<string, string> = {
  help: "help, whoami, port66, teach, stack, email, anime, lucky, reset, clear",
  whoami: "Mustapha. CTO, engineer, teacher.",
  port66: "Marketplace plus on-chain pools. Visit port66.xyz.",
  teach: "STEMTisha FutureCoders and TechGen Africa.",
  stack: "TypeScript, React, Next.js, Node, Python, Solidity, Rust.",
  email: EMAIL,
  anime: "Power level rising...",
  lucky: "Never miss a lucky day.",
  reset: "Story trail reset.",
  gym: "Reps, then more reps.",
};

export function Terminal() {
  const { toast } = useSite();
  const [out, setOut] = useState("Welcome. Type help to see commands.\n");
  const [val, setVal] = useState("");
  const o = useRef<HTMLDivElement>(null);
  const i = useRef<HTMLInputElement>(null);

  useEffect(() => { i.current?.focus(); }, []);
  useEffect(() => { if (o.current) o.current.scrollTop = o.current.scrollHeight; }, [out]);

  function onKey(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    const c = val.trim().toLowerCase();
    setVal("");
    if (c === "clear") { setOut(""); return; }
    if (c === "anime") manga();
    if (c === "lucky") { confetti(); toast("Never miss a lucky day."); }
    if (c === "reset") readStore.reset();
    setOut((s) => s + "$ " + c + "\n" + (C[c] || "Unknown command: " + c + ". Try help.") + "\n");
  }

  return (
    <div className="term">
      <div className="o" id="to" ref={o} aria-live="polite">{out}</div>
      <label>
        <b>$</b>
        <input id="ti" ref={i} autoComplete="off" spellCheck={false} aria-label="Terminal input" value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={onKey} />
      </label>
    </div>
  );
}
