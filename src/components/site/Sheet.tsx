"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { STORIES } from "@/data/stories";
import { ROLES } from "@/data/roles";
import { SHOTS } from "@/data/site";
import { Pin } from "@/components/ui/Pin";
import { Icon } from "@/components/ui/Icon";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { SHOW_PLACEHOLDERS } from "@/data/placeholders";
import { Ph } from "@/components/ui/Ph";

export type SheetState =
  | null
  | { kind: "story"; set: "stories" | "roles"; i: number; flip: boolean }
  | { kind: "shot"; i: number }
  | { kind: "finale" };

interface Props {
  state: SheetState;
  /** True while the close animation plays. */
  closing?: boolean;
  onClose: () => void;
  onStep: (d: number) => void;
}

/** Taped polaroid: a real photo when there is one, otherwise the dashed placeholder. */
function Photo({ text, img, alt, pos }: { text: string; img?: string; alt?: string; pos?: string }) {
  return (
    <div className="polaroid">
      {img ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="pimg" src={img} alt={alt ?? ""} style={pos ? { objectPosition: pos } : undefined} />
      ) : (
        <div className="ph2">
          <Icon name="spark" />
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}

/** The big lined-paper sheet (stories, roles, finale) and the screenshot lightbox. */
export function Sheet({ state, closing, onClose, onStep }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = !!state;
  useFocusTrap(root, open);

  // Focus the close button whenever a new sheet opens.
  const kind = state?.kind;
  useEffect(() => {
    if (kind) closeBtn.current?.focus();
  }, [kind]);

  useEffect(() => {
    if (!state || closing) return;
    const lightbox = state.kind === "shot";
    const canStep = state.kind === "story";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (!lightbox && canStep && e.key === "ArrowRight") onStep(1);
      else if (!lightbox && canStep && e.key === "ArrowLeft") onStep(-1);
    }
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [state, closing, onClose, onStep]);

  let content = null;

  if (state?.kind === "shot") {
    const s = SHOTS[state.i];
    content = (
      <div className="lbx">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.src} alt={`Port66 screenshot: ${s.title}`} />
        <p>{s.title}. {s.caption}</p>
        <button className="btn" ref={closeBtn} type="button" onClick={onClose}>Close</button>
      </div>
    );
  } else if (state?.kind === "finale") {
    content = (
      <div className="sheet" style={{ "--c": "#ffe66d", "--pin": "#e63946" } as CSSProperties}>
        <Pin />
        <Photo text="Add a photo of you" img="/mustapha.jpg" alt="Portrait of Mustapha" />
        <div>
          <span className="nt">The end</span>
          <h2>You have met the whole board</h2>
          <p>Seven stories, one person: the builder, the sharer, the community person, the teacher and the one who goes on long walks.</p>
          <p>If any of it made you think of a project, a team or a class, I would love to hear about it.</p>
        </div>
        <div className="sbar">
          <a className="btn" href="/about" onClick={onClose}>Say hi</a>
          <a className="btn o" href="/guestbook" onClick={onClose}>Leave a note</a>
          <button className="btn o" ref={closeBtn} type="button" onClick={onClose}>Keep exploring</button>
        </div>
      </div>
    );
  } else if (state?.kind === "story") {
    const isRole = state.set === "roles";
    const total = isRole ? ROLES.length : STORIES.length;
    const s = isRole ? ROLES[state.i] : STORIES[state.i];
    const r = isRole ? ROLES[state.i] : null;
    const st = STORIES[state.i];
    // With placeholders hidden, a story without a photo becomes a single-column sheet.
    const noPhoto = !r && !st.img && !SHOW_PLACEHOLDERS;

    content = (
      <div
        key={`${state.set}${state.i}`}
        className={"sheet" + (state.flip ? " flip" : "") + (noPhoto ? " nophoto" : "")}
        style={{ "--c": s.c, "--pin": s.p } as CSSProperties}
      >
        <Pin />
        {r ? (
          <div className="gl">
            <b>ROLE</b><p>{r.tag}</p>
            <b>WHEN</b><p>{r.d}</p>
            {r.loc && <><b>WHERE</b><p>{r.loc}</p></>}
            <b>BUILT WITH</b>
            <div className="tc">{r.tech.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ) : noPhoto ? null : (
          <Photo text={st.photo} img={st.img} alt={st.imgAlt} pos={st.imgPos} />
        )}
        <div>
          <span className="nt">{r ? "What I did" : s.tag}</span>
          <h2>{s.t}</h2>
          {r ? (
            <ul>{r.list.map((x) => <li key={x}>{x}</li>)}</ul>
          ) : (
            st.body.map((x) => <p key={x}>{x}</p>)
          )}
          {s.ph && <Ph>{s.ph}</Ph>}
        </div>
        <div className="sbar">
          <button className="btn o" type="button" onClick={() => onStep(-1)}>Previous</button>
          <span className="cnt">{state.i + 1} of {total}</span>
          <button className="btn o" type="button" onClick={() => onStep(1)}>Next {r ? "role" : "story"}</button>
          {s.h && <a className="btn" href={s.h} onClick={onClose}>{s.go}</a>}
          <button className="btn o" ref={closeBtn} type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div
      id="story"
      ref={root}
      className={open ? (closing ? "on off" : "on") : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={state?.kind === "shot" ? "Screenshot" : "Story"}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {content}
    </div>
  );
}
