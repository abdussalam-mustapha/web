import type { PageId, NoteData } from "@/data/types";
import { PAR, PATHS } from "@/data/routes";
import { CHAPTERS } from "@/data/site";
import { Board } from "@/components/notes/Board";

/** The sticky note at the bottom of every page that points to the next chapter. */
export function NextChapter({ id }: { id: PageId }) {
  if (id === "home" || id === "rabbit-hole") return null;
  const c = PAR[id] ?? id;
  const i = CHAPTERS.findIndex((x) => x.id === c);
  let n: NoteData;
  let lab: string;
  if (i < 0) {
    n = { t: "Back to the board", tag: "Start again", m: "Pick another note and follow a different story.", h: "/", c: "--accent", r: -2, go: "Back to the board" };
    lab = "Keep exploring";
  } else if (i === CHAPTERS.length - 1) {
    n = { t: "Leave a note", tag: "The end", m: "You have reached the last chapter. Pin a note to my wall.", h: "/guestbook", c: "--c4", r: -2, go: "Pin a note" };
    lab = "The end of the board";
  } else {
    const x = CHAPTERS[i + 1];
    n = { t: x.title, tag: `Chapter ${i + 2} of ${CHAPTERS.length}`, m: x.blurb, h: PATHS[x.id], c: x.c, r: -2, go: "Keep reading" };
    lab = "Next chapter";
  }
  const prev = i > 0 ? CHAPTERS[i - 1] : null;
  return (
    <section className="sec nx">
      <p className="eyebrow">{lab}</p>
      <Board notes={[n]} small />
      {prev && (
        <p className="pvw"><a className="pv" href={PATHS[prev.id]}>Previous chapter: {prev.title}</a></p>
      )}
    </section>
  );
}
