import type { ReactNode, CSSProperties } from "react";
import { Board } from "@/components/notes/Board";
import { Note } from "@/components/notes/Note";
import { Timeline } from "@/components/work/Timeline";
import { NextChapter } from "@/components/site/NextChapter";
import { ROLES } from "@/data/roles";
import { COLOR_CYCLE, TILT_CYCLE } from "@/lib/notes";
import { meta } from "@/lib/meta";

export const metadata = meta("work");

const v = (o: Record<string, string>) => o as CSSProperties;

export default function Page() {
  const items: ReactNode[] = ROLES.map((r, i) => (
    <Note key={r.t} idx={i} t={r.t} tag={r.tag} d={r.d} m={r.m} role={i} h="/work" go="See what I did" c={COLOR_CYCLE[i % 5]} r={TILT_CYCLE[i % 6]} />
  ));
  // Mood-board extras between the role notes
  items.splice(2, 0,
    <figure key="pol" className="pol2" style={v({ "--r": "-3deg" })}>
      <span className="mg" style={v({ "--mc": "#d7263d", left: "calc(50% - 15px)", top: "-12px" })} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pimg" src="/mustapha-event.jpg" alt="Mustapha at a tech community event" width={600} height={600} />
      <figcaption>Behind the scenes</figcaption>
    </figure>,
  );
  items.splice(6, 0,
    <div key="swc" className="swc" style={v({ "--r": "2deg" })}>
      <span className="mg" style={v({ "--mc": "#1b9e5a", left: "calc(50% - 15px)", top: "-12px" })} />
      <b>Lucky palette</b>
      <div className="chp">
        {["#ffe66d", "#ffb3d1", "#a8f0cf", "#ffc58a", "#d2bfff"].map((c) => <i key={c} style={{ background: c }} />)}
      </div>
    </div>,
  );
  return (
    <>
      <section className="sec">
        <p className="eyebrow">Roles</p>
        <h2>Work</h2>
        <p className="lede" style={{ marginBottom: ".5rem" }}>
          Nine teams, one sticky note each, newest first. Click a note to see what I did in that role, or drag them around the board.
        </p>
        <Timeline />
        <div className="mood">
          <div className="mfelt">
            <div className="mlabel">Nine teams, one board</div>
            <Board>{items}</Board>
          </div>
        </div>
      </section>
      <NextChapter id="work" />
    </>
  );
}
