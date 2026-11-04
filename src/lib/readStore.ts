"use client";

import { useSyncExternalStore } from "react";

/**
 * Reading progress, persisted in localStorage with the same keys as the original site
 * ("read" = { s0: 1, r3: 1, ... }, "fin" = "1"), so returning visitors keep their stamps.
 */
type ReadMap = Record<string, 1>;
interface ReadState { read: ReadMap; fin: boolean }

const EMPTY: ReadState = { read: {}, fin: false };
let state: ReadState | null = null;
const subs = new Set<() => void>();

function load(): ReadState {
  try {
    const read = JSON.parse(localStorage.getItem("read") || "{}") || {};
    return { read, fin: !!localStorage.getItem("fin") };
  } catch {
    return { read: {}, fin: false };
  }
}

function get(): ReadState {
  if (!state) state = load();
  return state;
}

function set(next: ReadState) {
  state = next;
  try {
    localStorage.setItem("read", JSON.stringify(next.read));
    if (next.fin) localStorage.setItem("fin", "1");
    else localStorage.removeItem("fin");
    if (!Object.keys(next.read).length) localStorage.removeItem("read");
  } catch {}
  subs.forEach((f) => f());
}

export const readStore = {
  get,
  subscribe(f: () => void) {
    subs.add(f);
    return () => subs.delete(f);
  },
  /** Mark a story ("s0") or role ("r2") as read. Returns true if it was new. */
  mark(key: string) {
    const s = get();
    if (s.read[key]) return false;
    set({ ...s, read: { ...s.read, [key]: 1 } });
    lastFresh = key;
    return true;
  },
  finish() {
    set({ ...get(), fin: true });
  },
  reset() {
    set({ read: {}, fin: false });
  },
  storiesRead(total: number) {
    const r = get().read;
    let c = 0;
    for (let i = 0; i < total; i++) if (r["s" + i]) c++;
    return c;
  },
};

/** The most recently stamped key (gets the "thump" animation). */
export let lastFresh = "";

export function useReadState(): ReadState {
  return useSyncExternalStore(readStore.subscribe, get, () => EMPTY);
}
