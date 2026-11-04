"use client";

import { useSyncExternalStore } from "react";

/** Small browser helpers shared by client components. All are safe to call only in the browser. */

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/** Paper confetti burst from the lower middle of the screen. */
export function confetti() {
  if (reducedMotion()) return;
  const cs = ["--c1", "--c2", "--accent", "--c3", "--c4"];
  for (let i = 0; i < 28; i++) {
    const d = document.createElement("i");
    d.className = "cf";
    d.style.cssText = `left:50%;top:60%;background:var(${cs[i % 5]});--x:${Math.random() * 520 - 260}px;--y:${-(Math.random() * 340 + 60)}px;--r:${Math.random() * 720}deg`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 1000);
  }
}

/** "POWER UP!" manga flash (terminal `anime` command). */
export function manga() {
  if (reducedMotion()) return;
  document.body.classList.add("manga");
  setTimeout(() => document.body.classList.remove("manga"), 1800);
}

/** Tell the red strings to redraw (a note moved). */
export const emitNoteMove = () => window.dispatchEvent(new Event("notemove"));

const noSub = () => () => {};

/** Live `prefers-reduced-motion` (false during server render and hydration). */
export function useReducedMotion() {
  return useSyncExternalStore(
    (f) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", f);
      return () => m.removeEventListener("change", f);
    },
    reducedMotion,
    () => false,
  );
}

/** A browser-only value that never changes after load; `fallback` is used on the server. */
export function useClientValue<T extends string | number | boolean>(get: () => T, fallback: T) {
  return useSyncExternalStore(noSub, get, () => fallback);
}
