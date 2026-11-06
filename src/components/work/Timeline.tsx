"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { ROLES, TIMELINE } from "@/data/roles";
import { Icon } from "@/components/ui/Icon";
import { reducedMotion } from "@/lib/browser";
import { useSite } from "@/components/site/SiteProvider";

const CS = ["#ffe66d", "#ffb3d1", "#a8f0cf", "#d2bfff", "#ffc58a"];
const CC = ["#ff6b81", "#2ee6a6", "#ffd23f", "#ff6b4a", "#a78bfa"];

/** Career timeline on a red string, with a custom draggable scrollbar. */
export function Timeline() {
  const { openStory } = useSite();
  const t = useRef<HTMLDivElement>(null);
  const w = useRef<HTMLDivElement>(null);
  const k = useRef<HTMLDivElement>(null);
  const th = useRef<HTMLElement>(null);
  const moved = useRef(false);

  const beh = (): ScrollBehavior => (reducedMotion() ? "auto" : "smooth");

  useEffect(() => {
    const T = t.current!, W = w.current!, K = k.current!, TH = th.current!;
    function upd() {
      const max = T.scrollWidth - T.clientWidth, kw = K.clientWidth - 4;
      const tw = Math.max(64, (kw * T.clientWidth) / Math.max(1, T.scrollWidth));
      const x = max > 0 ? (T.scrollLeft / max) * (kw - tw) : 0;
      TH.style.width = tw + "px";
      TH.style.transform = `translateX(${x}px)`;
      W.classList.toggle("l0", T.scrollLeft < 6);
      W.classList.toggle("r0", max <= 0 || T.scrollLeft > max - 6);
    }
    T.addEventListener("scroll", upd, { passive: true });
    addEventListener("resize", upd);
    const to = setTimeout(upd, 60);
    document.fonts?.ready.then(upd);

    // Thumb drag
    let td = false, tx = 0, ts = 0;
    const tDown = (e: PointerEvent) => {
      td = true; tx = e.clientX; ts = T.scrollLeft;
      try { TH.setPointerCapture(e.pointerId); } catch {}
      e.stopPropagation();
    };
    const tMove = (e: PointerEvent) => {
      if (!td) return;
      const kw = K.clientWidth - 4, tw = TH.offsetWidth, max = T.scrollWidth - T.clientWidth;
      T.scrollLeft = ts + ((e.clientX - tx) * max) / Math.max(1, kw - tw);
    };
    const tUp = () => { td = false; };
    TH.addEventListener("pointerdown", tDown);
    TH.addEventListener("pointermove", tMove);
    TH.addEventListener("pointerup", tUp);
    TH.addEventListener("pointercancel", tUp);

    // Click on the track jumps there
    const kDown = (e: PointerEvent) => {
      if (e.target === TH) return;
      const r = K.getBoundingClientRect();
      T.scrollTo({ left: ((e.clientX - r.left) / r.width) * (T.scrollWidth - T.clientWidth), behavior: beh() });
    };
    K.addEventListener("pointerdown", kDown);

    // Drag the string itself (mouse and pen)
    let dg = false, sx = 0, sl = 0;
    const sDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button) return;
      dg = true; moved.current = false; sx = e.clientX; sl = T.scrollLeft;
    };
    const sMove = (e: PointerEvent) => {
      if (!dg) return;
      const dx = e.clientX - sx;
      if (!moved.current && Math.abs(dx) < 6) return;
      moved.current = true;
      T.classList.add("dg");
      T.scrollLeft = sl - dx;
    };
    const sUp = () => {
      if (!dg) return;
      dg = false;
      T.classList.remove("dg");
      if (moved.current) setTimeout(() => { moved.current = false; }, 0);
    };
    T.addEventListener("pointerdown", sDown);
    addEventListener("pointermove", sMove);
    addEventListener("pointerup", sUp);

    return () => {
      clearTimeout(to);
      T.removeEventListener("scroll", upd);
      removeEventListener("resize", upd);
      removeEventListener("pointermove", sMove);
      removeEventListener("pointerup", sUp);
      T.removeEventListener("pointerdown", sDown);
      K.removeEventListener("pointerdown", kDown);
      TH.removeEventListener("pointerdown", tDown);
      TH.removeEventListener("pointermove", tMove);
      TH.removeEventListener("pointerup", tUp);
      TH.removeEventListener("pointercancel", tUp);
    };
  }, []);

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") { e.preventDefault(); t.current?.scrollBy({ left: 200, behavior: beh() }); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); t.current?.scrollBy({ left: -200, behavior: beh() }); }
  }

  return (
    <div className="tl">
      <p className="eyebrow">My path so far</p>
      <p className="lede" style={{ margin: "0 0 .2rem" }}>Drag the string, use the arrows, or slide the red handle. Tap a note to see what I did.</p>
      <div className="tlw l0" id="tlw" ref={w}>
        <button className="tla l" type="button" aria-label="Scroll the timeline left" onClick={() => t.current?.scrollBy({ left: -320, behavior: beh() })}>
          <span style={{ display: "inline-flex", transform: "scaleX(-1)" }}><Icon name="arrow" /></span>
        </button>
        <button className="tla r" type="button" aria-label="Scroll the timeline right" onClick={() => t.current?.scrollBy({ left: 320, behavior: beh() })}>
          <Icon name="arrow" />
        </button>
        <div
          className="tls"
          id="tls"
          ref={t}
          tabIndex={0}
          role="region"
          aria-label="Career timeline. Scroll sideways."
          onKeyDown={onKey}
          onClickCapture={(e) => { if (moved.current) { e.preventDefault(); e.stopPropagation(); } }}
        >
          <div className="tli">
            <i className="tline" />
            {TIMELINE.map(({ role, year }, i) => {
              const r = ROLES[role];
              return (
                <button
                  key={role}
                  className="tn"
                  type="button"
                  data-role={role}
                  style={{ "--c": CS[i % 5], "--cc": CC[i % 5], "--dl": `${-i * 0.7}s` } as CSSProperties}
                  onClick={(e) => openStory(role, "roles", e.currentTarget)}
                >
                  <i className="cp" />
                  <span className="ty">{year}</span>
                  <b>{r.t}</b>
                  <small>{r.tag}</small>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="tlk" id="tlk" ref={k}><i className="tlt" id="tlt" ref={th} /></div>
      <div className="tly" aria-hidden="true"><span>2022</span><span>2023</span><span>2024</span><span>2025</span><span>Now</span></div>
      <button className="btn o" type="button" onClick={() => t.current?.scrollTo({ left: t.current.scrollWidth, behavior: beh() })}>Jump to today</button>
    </div>
  );
}
