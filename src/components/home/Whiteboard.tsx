"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pin } from "@/components/ui/Pin";
import { reducedMotion, finePointer, useClientValue, useReducedMotion } from "@/lib/browser";

const MKC = ["#16181d", "#d7263d", "#1b9e5a", "#7b2cbf"];
const MKN = ["Black", "Red", "Green", "Purple"];
const MK_TILT = [-3, 2, -2, 3];
const PHRASES = [
  "products people use.",
  "communities that last.",
  "builders out of beginners.",
  "time for anime and Strava.",
  "the most of every lucky day.",
];

/** Side view of a whiteboard marker. */
function Marker({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 160 28" aria-hidden="true">
      <rect x="40" y="5" width="86" height="18" rx="4" style={{ fill: c }} />
      <rect x="40" y="5" width="86" height="18" rx="4" fill="url(#mv)" />
      <rect x="56" y="8.5" width="40" height="11" rx="2" fill="#fff" fillOpacity=".92" />
      <circle cx="62" cy="14" r="2.2" style={{ fill: c }} />
      <path d="M40 7L22 11V17L40 21Z" fill="#e6e7ea" />
      <path d="M40 7L22 11V17L40 21Z" fill="url(#mv)" />
      <path d="M22 11L9 13.2V14.8L22 17Z" style={{ fill: c }} />
      <rect x="120" y="3.5" width="37" height="21" rx="5" style={{ fill: c }} />
      <rect x="120" y="3.5" width="37" height="21" rx="5" fill="rgba(0,0,0,.28)" />
      <rect x="120" y="3.5" width="37" height="21" rx="5" fill="url(#mv)" />
      <rect x="134" y="1" width="21" height="4.2" rx="2" fill="#cfd2d8" />
    </svg>
  );
}

function Eraser() {
  return (
    <svg viewBox="0 0 120 56" aria-hidden="true">
      <rect x="3" y="4" width="114" height="34" rx="9" fill="#3d4452" />
      <rect x="3" y="4" width="114" height="34" rx="9" fill="url(#mv)" />
      <rect x="24" y="10" width="72" height="13" rx="6.5" fill="#2a2f3a" />
      <rect x="24" y="10" width="72" height="5" rx="2.5" fill="#fff" fillOpacity=".12" />
      <rect x="3" y="36" width="114" height="15" rx="4" fill="#8e939c" />
      <path d="M10 38v11M20 38v11M30 38v11M40 38v11M50 38v11M60 38v11M70 38v11M80 38v11M90 38v11M100 38v11M110 38v11" stroke="#6f747d" strokeWidth="1.2" strokeOpacity=".7" />
      <rect x="3" y="36" width="114" height="15" rx="4" fill="url(#mv)" fillOpacity=".5" />
      <circle cx="14" cy="27" r="2" fill="#ff7a3d" />
    </svg>
  );
}

/** A marker-shaped cursor for drawing on the board. */
function markerCursor(c: string) {
  const v = `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><g transform="translate(3 41) rotate(-45)"><path d="M0 0L11 -4.2V4.2Z" fill="#f1d4a5"/><path d="M0 0L3.6 -1.4V1.4Z" fill="${c}"/><rect x="11" y="-4.2" width="28" height="8.4" fill="${c}"/><rect x="11" y="-4.2" width="28" height="2.4" fill="#fff" fill-opacity=".35"/><rect x="39" y="-4.2" width="5" height="8.4" fill="#aab0b8"/><rect x="44" y="-4.2" width="5" height="8.4" rx="2" fill="#fff"/></g></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(v)}") 3 41, crosshair`;
}

/** Today's date on a little ticket stub (from the visitor's device, so it renders after mount). */
function DateStub() {
  const day = useClientValue(() => new Date().toDateString(), "");
  if (!day) return <small>LUCKY DAY</small>;
  const d = new Date(day);
  const L = (o: Intl.DateTimeFormatOptions) => d.toLocaleDateString(undefined, o);
  return (
    <>
      <small>LUCKY DAY</small>
      <b>{d.getDate()}</b>
      <span className="sd">{L({ month: "short" })} {d.getFullYear()}</span>
      <span className="sw2">{L({ weekday: "long" })}</span>
    </>
  );
}

const v = (o: Record<string, string>) => o as CSSProperties;

export function Whiteboard() {
  const rm = useReducedMotion();
  const [picked, setPicked] = useState(-1);
  const [mkCol, setMkCol] = useState(MKC[0]);
  const wbs = useRef<HTMLDivElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const mt = useRef<HTMLDivElement>(null);
  const et = useRef<HTMLDivElement>(null);
  const l1 = useRef<HTMLSpanElement>(null);
  const l2a = useRef<HTMLSpanElement>(null);
  const l2b = useRef<HTMLSpanElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const draw = useRef({ col: MKC[0], armed: false, dn: false, lx: 0, ly: 0, sweeping: false, stop: false });

  function pick(i: number) {
    const s = draw.current;
    s.col = MKC[i];
    s.armed = true;
    setPicked(i);
    if (cvs.current) cvs.current.style.cursor = markerCursor(s.col);
  }

  // Canvas sizing, drawing, and the writing animation.
  useEffect(() => {
    const RM = reducedMotion();
    const s = draw.current;
    s.stop = false;
    const ws = wbs.current!, c = cvs.current!, cx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    function sz() {
      const r = ws.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    sz();
    addEventListener("resize", sz);
    if (finePointer()) pick(0);

    const pt = (e: PointerEvent) => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    function down(e: PointerEvent) {
      if (!s.armed) return;
      s.dn = true;
      [s.lx, s.ly] = pt(e);
      try { c.setPointerCapture(e.pointerId); } catch {}
      cx.fillStyle = s.col;
      cx.beginPath();
      cx.arc(s.lx, s.ly, 2.6, 0, 6.3);
      cx.fill();
    }
    function move(e: PointerEvent) {
      if (!s.dn) return;
      const [x, y] = pt(e);
      cx.strokeStyle = s.col;
      cx.lineWidth = 5;
      cx.lineCap = "round";
      cx.lineJoin = "round";
      cx.beginPath();
      cx.moveTo(s.lx, s.ly);
      cx.lineTo(x, y);
      cx.stroke();
      s.lx = x;
      s.ly = y;
    }
    const up = () => { s.dn = false; };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);

    const cleanup = () => {
      s.stop = true;
      removeEventListener("resize", sz);
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
    if (RM) {
      if (l2b.current) l2b.current.textContent = PHRASES[0];
      return cleanup;
    }

    const rel = (el: Element) => {
      const a = el.getBoundingClientRect(), b = ws.getBoundingClientRect();
      return { l: a.left - b.left, t: a.top - b.top, w: a.width, h: a.height };
    };
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const mtool = mt.current!, etool = et.current!;

    function write(el: HTMLElement, ms: number, col: string) {
      return new Promise<void>((res) => {
        setMkCol(col);
        mtool.style.opacity = "1";
        // Measure once per stroke (the text does not move), then only write styles each frame.
        const r = rel(el), t0 = performance.now();
        (function f(t: number) {
          if (s.stop) return res();
          const p = Math.min(1, (t - t0) / ms);
          el.style.clipPath = `inset(-25% ${100 - p * 100}% -25% 0)`;
          mtool.style.translate = `${r.l + r.w * p}px ${r.t + r.h * 0.8 + Math.sin(p * 36) * r.h * 0.04}px`;
          if (p < 1) requestAnimationFrame(f);
          else { mtool.style.opacity = "0"; res(); }
        })(t0);
      });
    }
    function erase(el: HTMLElement, ms: number) {
      return new Promise<void>((res) => {
        etool.style.opacity = "1";
        etool.style.transform = "rotate(-3deg)";
        const r = rel(el), t0 = performance.now();
        (function f(t: number) {
          if (s.stop) return res();
          const p = Math.min(1, (t - t0) / ms);
          el.style.clipPath = `inset(-25% 0 -25% ${p * 100}%)`;
          etool.style.translate = `${r.l + r.w * p}px ${r.t + r.h * 0.5}px`;
          if (p < 1) requestAnimationFrame(f);
          else { etool.style.opacity = "0"; res(); }
        })(t0);
      });
    }

    (async function run() {
      let i = 0;
      await sleep(700);
      if (s.stop) return;
      await write(l1.current!, 1900, MKC[0]);
      if (s.stop) return;
      await write(l2a.current!, 650, MKC[0]);
      if (s.stop) return;
      sub.current?.classList.remove("hid");
      const b = l2b.current!;
      while (!s.stop) {
        b.textContent = PHRASES[i];
        b.style.clipPath = "inset(-25% 100% -25% 0)";
        await write(b, PHRASES[i].length * 85 + 300, MKC[1]);
        if (s.stop) return;
        await sleep(1900);
        if (s.stop) return;
        await erase(b, 750);
        i = (i + 1) % PHRASES.length;
      }
    })();

    return cleanup;
  }, []);

  function wipe() {
    const s = draw.current, c = cvs.current!, cx = c.getContext("2d")!, etool = et.current!;
    const r = c.getBoundingClientRect(), w = r.width, h = r.height;
    if (s.sweeping) return;
    if (reducedMotion()) { cx.clearRect(0, 0, w, h); return; }
    s.sweeping = true;
    const bh = 76, rows = Math.ceil(h / bh), t0 = performance.now(), dur = 1600;
    etool.style.opacity = "1";
    (function f(t: number) {
      const p = Math.min(1, (t - t0) / dur), rf = p * rows, ri = Math.min(rows - 1, Math.floor(rf)), fp = rf - ri;
      const x = (ri % 2 ? 1 - fp : fp) * w, y = ri * bh;
      cx.clearRect(0, 0, w, y);
      if (ri % 2 === 0) cx.clearRect(0, y, x, bh);
      else cx.clearRect(x, y, w - x, bh);
      etool.style.translate = `${x}px ${y + bh / 2}px`;
      etool.style.transform = `rotate(${ri % 2 ? -4 : 4}deg)`;
      if (p < 1 && !s.stop) requestAnimationFrame(f);
      else { cx.clearRect(0, 0, w, h); etool.style.opacity = "0"; s.sweeping = false; }
    })(t0);
  }

  return (
    <section className={"hero2" + (rm ? "" : " anim")} aria-label="Welcome">
      <div className="wbwrap">
        <div className="wb">
          <div className="wbs" id="wbs" ref={wbs}>
            <div className="wbl">
              <h1 className="wbh">
                <span className="wr" id="l1" ref={l1}>Hi, I’m Mustapha.</span>
                <svg className="und" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
                  <path className="dd" pathLength={1} style={v({ "--d": "3.4s", "--k": "#1b9e5a" })} d="M4 10C40 2 70 16 110 8S190 4 230 10 280 8 296 6" />
                </svg>
              </h1>
              <p className="wbp">
                <span className="wr" id="l2a" ref={l2a}>I make</span>
                <span className="phw">
                  <span className="wr red" id="l2b" ref={l2b} aria-live="off">{rm ? PHRASES[0] : ""}</span>
                </span>
              </p>
              <p className={"wbsub" + (rm ? "" : " hid")} id="wsub" ref={sub}>Engineer. Teacher. Community builder.</p>
            </div>
            <div className="wbr" aria-hidden="true">
              <figure className="it pol" style={v({ "--r": "-5deg", "--d": ".5s" })}>
                <span className="mg" style={v({ "--mc": "#d7263d", left: "-8px", top: "-8px" })} />
                <span className="mg" style={v({ "--mc": "#1b9e5a", right: "-8px", top: "-8px" })} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="pimg" src="/mustapha.jpg" alt="" width={400} height={400} />
                <figcaption>Mustapha</figcaption>
              </figure>
              <div className="it sn" style={v({ "--r": "5deg", "--d": ".8s" })}>
                <Pin />
                <p>Never miss a lucky day.</p>
              </div>
              <div className="it ic2" style={v({ "--r": "2.5deg", "--d": "1.1s" })}>
                <span className="mg" style={v({ "--mc": "#f4a261", left: "calc(50% - 15px)", top: "-10px" })} />
                <b>Currently</b>
                <p>CTO at Port66, building a marketplace for authenticated luxury collectibles.</p>
              </div>
              <div className="it stub" style={v({ "--r": "-7deg", "--d": "1.4s" })}>
                <span className="mg" style={v({ "--mc": "#7b2cbf", left: "calc(50% - 15px)", top: "-10px" })} />
                <DateStub />
              </div>
              <svg className="dood" style={{ left: "-3%", top: "46%", width: "20%" }} viewBox="0 0 80 60" aria-hidden="true">
                <path className="dd" pathLength={1} style={v({ "--d": "3.8s", "--k": "#d7263d" })} d="M4 8C20 4 44 14 56 44M56 44L42 40M56 44L58 28" />
              </svg>
              <svg className="dood" style={{ left: "47%", top: "-5%", width: "9%" }} viewBox="0 0 40 40" aria-hidden="true">
                <path className="dd" pathLength={1} style={v({ "--d": "4.2s", "--k": "#7b2cbf" })} d="M20 4L24 15L36 16L27 24L30 36L20 29L10 36L13 24L4 16L16 15Z" />
              </svg>
            </div>
            <canvas id="wcv" ref={cvs} className={picked >= 0 ? "armed" : undefined} aria-label="Drawing area. Pick a marker, then draw on the board." />
            <div className="mtool" id="mt" ref={mt} aria-hidden="true"><Marker c={mkCol} /></div>
            <div className="etool" id="et" ref={et} aria-hidden="true"><Eraser /></div>
          </div>
        </div>
      <div className="tray">
        <div className="tr-in" role="group" aria-label="Markers and eraser">
          {MKC.map((c, i) => (
            <button
              key={c}
              className="mk"
              type="button"
              aria-pressed={picked === i}
              aria-label={`${MKN[i]} marker`}
              style={v({ "--r": `${MK_TILT[i]}deg` })}
              onClick={() => pick(i)}
            >
              <Marker c={c} />
            </button>
          ))}
          <button className="er" id="ebtn" type="button" aria-label="Erase the board" onClick={wipe}>
            <Eraser />
          </button>
        </div>
      </div>
      <p className="hint">Pick up a marker and draw on the board. The eraser is on the right.</p>
      <p className="lede" style={{ margin: "1.2rem auto 0", maxWidth: "62ch", textAlign: "center" }}>
        Engineer by trade, teacher and community builder by habit, and a very active human outside of work. Every note on this
        board is a story, and each one opens up to show you what happened behind it.
      </p>
      </div>
    </section>
  );
}
