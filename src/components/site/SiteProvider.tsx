"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { idFromPath, isPageId, PATHS, TITLES } from "@/data/routes";
import { STORIES } from "@/data/stories";
import { readStore } from "@/lib/readStore";
import { reducedMotion, confetti } from "@/lib/browser";
import { Sheet, type SheetState } from "./Sheet";
import { landAll } from "@/lib/noteFlight";

interface SiteApi {
  toast: (msg: string) => void;
  /** Client-side navigation with the page-change curtain. */
  navigate: (href: string) => void;
  openStory: (i: number, set: "stories" | "roles", from?: Element | null) => void;
  openShot: (i: number, from?: Element | null) => void;
}

const SiteCtx = createContext<SiteApi | null>(null);

export function useSite() {
  const c = useContext(SiteCtx);
  if (!c) throw new Error("useSite must be used inside <SiteProvider>");
  return c;
}

/** Curtain drop: even ease-in-out. Lift: fast start, soft landing (so a hold never ends in a snap). */
const DROP = { duration: 340, easing: "cubic-bezier(.65,0,.35,1)" };
const LIFT = { duration: 560, easing: "cubic-bezier(.22,1,.36,1)" };

export function SiteProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  /* ---------- toast ---------- */
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toast = useCallback((m: string) => {
    setToastMsg(m);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 2200);
  }, []);

  /* ---------- curtain + navigation ---------- */
  const curtain = useRef<HTMLDivElement>(null);
  const [curtainText, setCurtainText] = useState("");
  const pendingUncover = useRef(false);
  const busy = useRef(false);
  const waitTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const dropDone = useRef<Promise<unknown>>(Promise.resolve());
  // Set further down once the sheet state exists. Leaving the page from an open sheet must not
  // play its fold-back animation: the curtain covers it and it is removed out of sight.
  const sheetOpen = useRef(false);
  const dropSheet = useRef<() => void>(() => {});
  const closeSheet = useRef<() => void>(() => {});

  const navigate = useCallback(
    (href: string) => {
      const target = href.replace(/\/+$/, "") || "/";
      const here = (pathname || "/").replace(/\/+$/, "") || "/";
      if (busy.current) return;
      if (target === here) {
        if (sheetOpen.current) closeSheet.current(); // link back to this page: just close the sheet
        return;
      }
      const id = idFromPath(target);
      const c = curtain.current;
      const leavingSheet = sheetOpen.current;
      if (!c || reducedMotion() || !c.animate) {
        if (leavingSheet) dropSheet.current();
        router.push(href);
        return;
      }
      busy.current = true;
      // Start loading the next page while the curtain drops, so it is ready when the curtain lifts.
      router.prefetch(href);
      setCurtainText(id ? TITLES[id] : "");
      c.classList.remove("wait");
      const drop = c.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0)" }], { ...DROP, fill: "forwards" });
      dropDone.current = drop.finished.catch(() => {});
      // Remove an open sheet only once the curtain fully covers the screen.
      if (leavingSheet) drop.finished.then(() => dropSheet.current(), () => dropSheet.current());
      // Start the page swap just before the drop ends (the last uncovered strip sits behind the
      // identical header), so the new page is usually ready the moment the curtain is down.
      setTimeout(() => {
        pendingUncover.current = true;
        router.push(href);
      }, DROP.duration - 80);
      // If the next page is slow (first visit in dev, slow network), show a loading pulse.
      drop.finished.then(() => { waitTimer.current = setTimeout(() => c.classList.add("wait"), 120); }, () => {});
    },
    [pathname, router],
  );

  // After every route change: scroll to top, focus <main>, and lift the curtain if it is down.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
    const c = curtain.current;
    if (pendingUncover.current && c) {
      pendingUncover.current = false;
      // Wait for the drop to finish, let the new page paint once behind it, then reveal it.
      // (Only the curtain moves: animating the page content too made the reveal drop frames.)
      dropDone.current.then(() => requestAnimationFrame(() => {
        clearTimeout(waitTimer.current);
        c.classList.remove("wait");
        c.animate([{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }], { ...LIFT, fill: "forwards" })
          .finished.then(() => c.getAnimations().forEach((a) => a.cancel()))
          .catch(() => {})
          .finally(() => { busy.current = false; });
      }));
    } else {
      busy.current = false;
    }
  }, [pathname]);

  // Old hash links from the single-file site (/#about) land on their real routes.
  useEffect(() => {
    const h = location.hash.slice(1);
    if (h && isPageId(h)) router.replace(PATHS[h]);
  }, [router]);

  // Intercept internal link clicks so every page change gets the curtain (and dragged notes do not navigate).
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.classList.contains("dragged")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (a.matches("[data-story],[data-role]")) return; // the note opens a sheet instead
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || a.target === "_blank") return;
      e.preventDefault();
      navigate(href);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  /* ---------- story / role / finale / lightbox sheet ---------- */
  const [sheet, setSheet] = useState<SheetState>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastFocus = useRef<Element | null>(null);
  /** The clicked note: the sheet opens out of it and folds back onto it. */
  const [origin, setOrigin] = useState<Element | null>(null);

  const openStory = useCallback((i: number, set: "stories" | "roles", from?: Element | null) => {
    lastFocus.current = from ?? document.activeElement;
    readStore.mark((set === "roles" ? "r" : "s") + i);
    clearTimeout(closeTimer.current);
    setOrigin(from ?? null);
    setClosing(false);
    setSheet({ kind: "story", set, i, flip: false });
  }, []);

  const openShot = useCallback((i: number, from?: Element | null) => {
    lastFocus.current = from ?? document.activeElement;
    clearTimeout(closeTimer.current);
    setOrigin(from ?? null);
    setClosing(false);
    setSheet({ kind: "shot", i });
  }, []);

  // Mirror of `sheet` for event handlers, so Next/Previous can mark the story read outside a
  // state updater (marking inside one re-rendered the notes mid-render).
  const sheetRef = useRef<SheetState>(null);
  useEffect(() => { sheetRef.current = sheet; }, [sheet]);

  const step = useCallback((d: number) => {
    const s = sheetRef.current;
    if (!s || s.kind !== "story") return;
    const n = s.set === "roles" ? 9 : STORIES.length;
    const i = (s.i + d + n) % n;
    readStore.mark((s.set === "roles" ? "r" : "s") + i);
    const next: SheetState = { ...s, i, flip: true };
    sheetRef.current = next;
    setSheet(next);
  }, []);

  const finishClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    setClosing(false);
    setSheet(null);
    setOrigin(null);
    landAll();
    const f = lastFocus.current as HTMLElement | null;
    if (f && f.focus) f.focus();
    const st = readStore.get();
    if (!st.fin && readStore.storiesRead(STORIES.length) >= STORIES.length) {
      readStore.finish();
      setTimeout(() => {
        confetti();
        setSheet({ kind: "finale" });
      }, 380);
    }
  }, []);

  // Play the fold-away animation, then unmount the sheet.
  const close = useCallback(() => {
    if (reducedMotion()) { finishClose(); return; }
    setClosing(true);
    // The sheet calls onClosed when its fold-back lands; this is only a safety net.
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(finishClose, 1000);
  }, [finishClose]);

  useEffect(() => {
    sheetOpen.current = !!sheet;
    dropSheet.current = finishClose;
    closeSheet.current = close;
  }, [sheet, finishClose, close]);

  // Lock page scroll while a sheet is open.
  useEffect(() => {
    if (!sheet) return;
    // Pad by the scrollbar width so the page (and the notes the sheet flies to) does not shift.
    const sb = innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sb > 0) document.body.style.paddingRight = sb + "px";
    return () => { document.body.style.overflow = ""; document.body.style.paddingRight = ""; };
  }, [sheet]);

  const api = useMemo<SiteApi>(() => ({ toast, navigate, openStory, openShot }), [toast, navigate, openStory, openShot]);

  return (
    <SiteCtx.Provider value={api}>
      {children}
      <Sheet state={sheet} closing={closing} origin={origin} onClose={close} onClosed={finishClose} onStep={step} />
      <div id="cv2" ref={curtain} aria-hidden="true">{curtainText}</div>
      <div id="st" role="status" aria-live="polite" style={{ display: toastMsg ? "block" : "none" }}>{toastMsg}</div>
    </SiteCtx.Provider>
  );
}
