import { Board } from "@/components/notes/Board";

export default function NotFound() {
  return (
    <section className="sec">
      <p className="eyebrow">Lost note</p>
      <h2>This page fell off the board.</h2>
      <Board small notes={[{ t: "Back to the board", tag: "Start again", m: "Pick another note and follow a different story.", h: "/", c: "--accent", r: -2, go: "Back to the board" }]} />
    </section>
  );
}
