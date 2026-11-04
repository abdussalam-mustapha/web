"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, PATHS, PAR, idFromPath } from "@/data/routes";
import { Icon } from "@/components/ui/Icon";
import { useClientValue } from "@/lib/browser";
import { openPalette } from "./CommandPalette";

/** Pill nav bar (icons only under 1180px; a fixed bottom tab bar under 820px, via CSS). */
export function Header() {
  const id = idFromPath(usePathname() || "/") ?? "home";
  const active = PAR[id] ?? id;
  const kbd = useClientValue(() => (/Mac|iPhone|iPad/.test(navigator.platform || "") ? "Cmd K" : "Ctrl K"), "Ctrl K");

  function toggleTheme() {
    const r = document.documentElement;
    const d = r.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    r.dataset.theme = d === "dark" ? "light" : "dark";
  }

  return (
    <header className="bar">
      <Link className="logo" href="/">
        <svg className="ic" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z" />
        </svg>
        Mustapha
      </Link>
      <nav id="nav" aria-label="Primary">
        {NAV.map((n) => (
          <Link key={n.id} href={PATHS[n.id]} aria-label={n.label} title={n.label} aria-current={active === n.id ? "page" : undefined}>
            <Icon name={n.icon} />
            <span>{n.label}</span>
          </Link>
        ))}
      </nav>
      <div className="acts">
        <button className="sb" id="kb" type="button" aria-haspopup="dialog" aria-label="Search" onClick={openPalette}>
          <svg className="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <span>Search</span>
          <kbd id="kk">{kbd}</kbd>
        </button>
        <button className="tg" id="th" type="button" aria-label="Switch between dark and light theme" onClick={toggleTheme}>
          <svg className="ic moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 13a9 9 0 11-10-10 7 7 0 0010 10z" />
          </svg>
          <svg className="ic sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
      </div>
    </header>
  );
}
