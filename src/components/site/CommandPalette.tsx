"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ORDER, PATHS, TITLES } from "@/data/routes";
import { LINKS } from "@/data/contact";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useSite } from "./SiteProvider";
import { useCopyEmail } from "./useCopyEmail";

const OPEN_EVENT = "openpalette";
export const openPalette = () => window.dispatchEvent(new Event(OPEN_EVENT));

/** Ctrl/Cmd+K: jump to any page or run a quick command. */
export function CommandPalette() {
  const { navigate } = useSite();
  const copy = useCopyEmail();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const last = useRef<Element | null>(null);
  useFocusTrap(root, open);

  const items = useMemo(
    () => [
      ...ORDER.map((id) => ({ n: "Go to " + TITLES[id], a: () => navigate(PATHS[id]) })),
      { n: "Copy email", a: copy },
      { n: "Open port66.xyz", a: () => window.open(LINKS.port66, "_blank", "noopener") },
    ],
    [navigate, copy],
  );
  const vis = items.filter((i) => i.n.toLowerCase().includes(q.toLowerCase()));
  const cur = Math.min(sel, Math.max(vis.length - 1, 0));

  const show = useCallback(() => {
    last.current = document.activeElement;
    setQ("");
    setSel(0);
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    (last.current as HTMLElement | null)?.focus?.();
  }, []);
  const run = (i: (typeof items)[number]) => {
    hide();
    i.a();
  };

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) hide();
        else show();
      } else if (open && e.key === "Escape") hide();
    }
    addEventListener("keydown", onKey);
    addEventListener(OPEN_EVENT, show);
    return () => {
      removeEventListener("keydown", onKey);
      removeEventListener(OPEN_EVENT, show);
    };
  }, [open, show, hide]);

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel(Math.min(cur + 1, vis.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel(Math.max(cur - 1, 0));
    } else if (e.key === "Enter" && vis[cur]) {
      e.preventDefault();
      run(vis[cur]);
    }
  }

  return (
    <div
      id="pal"
      ref={root}
      className={open ? "o" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => { if (e.target === e.currentTarget) hide(); }}
    >
      <div className="b">
        <input
          id="pq"
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          onKeyDown={onInputKey}
          placeholder="Go to a page or run a command"
          aria-label="Search commands"
          autoComplete="off"
        />
        <ul id="pl" role="listbox">
          {vis.map((i, n) => (
            <li key={i.n}>
              <button type="button" role="option" aria-selected={n === cur} onClick={() => run(i)}>
                {i.n}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
