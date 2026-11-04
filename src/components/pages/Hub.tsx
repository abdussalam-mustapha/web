import type { ReactNode } from "react";
import type { NoteData } from "@/data/types";
import { Board } from "@/components/notes/Board";

/** A hub page: heading, intro and a board of notes leading to sub-pages. */
export function Hub({ title, intro, notes, children }: { title: string; intro: string; notes: NoteData[]; children?: ReactNode }) {
  return (
    <section className="sec">
      <p className="eyebrow">Stories</p>
      <h2>{title}</h2>
      <p className="lede" style={{ marginBottom: "1rem" }}>{intro}</p>
      <Board notes={notes} />
      {children}
    </section>
  );
}
