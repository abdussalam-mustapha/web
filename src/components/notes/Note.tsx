"use client";

import { useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type MouseEvent as RMouseEvent } from "react";
import type { NoteData } from "@/data/types";
import { Pin } from "@/components/ui/Pin";
import { Icon } from "@/components/ui/Icon";
import { noteColors, PIN_TILT } from "@/lib/notes";
import { reducedMotion, emitNoteMove } from "@/lib/browser";
import { useReadState, lastFresh } from "@/lib/readStore";
import { useSite } from "@/components/site/SiteProvider";

export interface NoteProps extends NoteData {
  /** Position on its board (picks the pin tilt). */
  idx?: number;
  className?: string;
}

/**
 * A pinned sticky note. Mouse/pen users can drag it around (touch scrolls);
 * notes with `story` or `role` open the big sheet instead of navigating.
 */
export function Note(o: NoteProps) {
  const { openStory } = useSite();
  const read = useReadState().read;
  const el = useRef<HTMLElement>(null);
  const g = useRef({ sx: 0, sy: 0, ox: 0, oy: 0, mv: false, down: false, raf: 0, rx: 0, ry: 0 });
  const [nudge, setNudge] = useState(!!o.nudge);

  const [paper, pin] = noteColors(o.c);
  const cls =
    "note" + (o.mini ? " mini" : "") + (o.big ? " big" : "") + (o.tool ? " tool" : "") + (o.txt ? " txt" : "") + (o.className ? " " + o.className : "");
  const style = {
    "--c": paper,
    "--r": `${o.r ?? 0}deg`,
    "--pin": pin,
    "--pt": `${PIN_TILT[(o.idx ?? 0) % PIN_TILT.length]}deg`,
  } as CSSProperties;

  const readKey = o.story !== undefined ? "s" + o.story : o.role !== undefined ? "r" + o.role : null;
  const isRead = readKey ? !!read[readKey] : false;

  /* ---------- drag (mouse and pen only) + hover tilt ---------- */
  function onPointerDown(e: RPointerEvent<HTMLElement>) {
    if (nudge) setNudge(false);
    if (e.pointerType === "touch" || e.button) return;
    const s = g.current;
    s.down = true;
    s.mv = false;
    s.sx = e.clientX;
    s.sy = e.clientY;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  }

  function onPointerMove(e: RPointerEvent<HTMLElement>) {
    const n = e.currentTarget;
    const s = g.current;
    if (s.down) {
      const dx = e.clientX - s.sx;
      const dy = e.clientY - s.sy;
      if (!s.mv && Math.hypot(dx, dy) < 6) return;
      s.mv = true;
      n.classList.add("drag");
      n.style.zIndex = "9";
      n.style.transition = "none";
      n.style.setProperty("--dx", `${s.ox + dx}px`);
      n.style.setProperty("--dy", `${s.oy + dy}px`);
      emitNoteMove();
      return;
    }
    if (e.pointerType === "touch" || reducedMotion()) return;
    // One tilt update per frame; the CSS eases --rx/--ry between them.
    const b = n.getBoundingClientRect();
    s.rx = -((e.clientY - b.top) / b.height - 0.5) * 10;
    s.ry = ((e.clientX - b.left) / b.width - 0.5) * 10;
    if (!s.raf) s.raf = requestAnimationFrame(() => {
      s.raf = 0;
      n.style.setProperty("--rx", `${s.rx}deg`);
      n.style.setProperty("--ry", `${s.ry}deg`);
    });
  }

  function onPointerEnd(e: RPointerEvent<HTMLElement>) {
    const n = e.currentTarget;
    const s = g.current;
    if (!s.down) return;
    s.down = false;
    if (s.mv) {
      s.ox += e.clientX - s.sx;
      s.oy += e.clientY - s.sy;
      n.style.transition = "";
      n.classList.remove("drag");
      n.classList.add("dragged");
      setTimeout(() => n.classList.remove("dragged"), 80);
    }
    try { n.releasePointerCapture(e.pointerId); } catch {}
  }

  function onPointerLeave(e: RPointerEvent<HTMLElement>) {
    cancelAnimationFrame(g.current.raf);
    g.current.raf = 0;
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  }

  function onClickCapture(e: RMouseEvent<HTMLElement>) {
    if (e.currentTarget.classList.contains("dragged")) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (o.role !== undefined) {
      e.preventDefault();
      openStory(o.role, "roles", e.currentTarget);
    } else if (o.story !== undefined) {
      e.preventDefault();
      openStory(o.story, "stories", e.currentTarget);
    }
  }

  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp: onPointerEnd,
    onPointerCancel: onPointerEnd,
    onPointerLeave,
    onPointerEnter: () => nudge && setNudge(false),
    onClickCapture,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  const data = {
    "data-k": o.k,
    "data-story": o.story,
    "data-role": o.role,
  };

  const body = (
    <>
      <Pin />
      <i className="tip" />
      {o.tag && <span className="nt">{o.tag}</span>}
      {o.logo && <div className="lgw">{o.logo}</div>}
      <h3>{o.t}</h3>
      {o.d && <span className="dt">{o.d}</span>}
      {o.m && <p>{o.m}</p>}
      {isRead && <span className={"stamp" + (lastFresh === readKey ? " new" : "")}>READ</span>}
      {nudge && (
        <span className="nudge">
          <Icon name="hand" />
          Click a note to read its story
        </span>
      )}
    </>
  );

  if (!o.h) {
    return (
      <div ref={el as React.Ref<HTMLDivElement>} className={cls} style={style} {...data} {...handlers}>
        {body}
      </div>
    );
  }

  return (
    <a
      ref={el as React.Ref<HTMLAnchorElement>}
      className={cls}
      draggable={false}
      href={o.h}
      {...(o.x ? { target: "_blank", rel: "noopener" } : {})}
      style={style}
      {...data}
      {...handlers}
    >
      {body}
      <span className="go">
        {o.go || "Open"} <Icon name="arrow" />
      </span>
    </a>
  );
}
