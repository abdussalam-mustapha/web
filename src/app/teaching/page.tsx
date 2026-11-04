import { Board } from "@/components/notes/Board";
import { NextChapter } from "@/components/site/NextChapter";
import { TEACH } from "@/data/site";
import type { NoteColor } from "@/data/types";
import { meta } from "@/lib/meta";
import { SHOW_PLACEHOLDERS } from "@/data/placeholders";

export const metadata = meta("teaching");

const CS: NoteColor[] = ["--c3", "--c2"];
const RS = [-2, 1.5];

export default function Page() {
  return (
    <>
      <section className="sec">
        <h2>Teaching</h2>
        <p className="lede" style={{ marginBottom: "1.5rem" }}>
          Three years of teaching has shaped how I write code: plain, explained, and built to be understood.
        </p>
        <Board notes={TEACH.map((x, i) => ({ t: x.t, tag: i ? "Community Lead" : "Program", m: x.m, c: CS[i], r: RS[i] }))} />
        {SHOW_PLACEHOLDERS && (
          <div className="grid" style={{ marginTop: "2rem" }}>
            <div className="ph">Add learners taught</div>
            <div className="ph">Add a student project photo</div>
          </div>
        )}
      </section>
      <NextChapter id="teaching" />
    </>
  );
}
