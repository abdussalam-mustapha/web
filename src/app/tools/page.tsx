import { Board } from "@/components/notes/Board";
import { ToolLogo } from "@/components/notes/ToolLogo";
import { NextChapter } from "@/components/site/NextChapter";
import { TOOLS } from "@/data/site";
import type { NoteColor } from "@/data/types";
import { TILT_CYCLE } from "@/lib/notes";
import { meta } from "@/lib/meta";

export const metadata = meta("tools");

const CS: NoteColor[] = ["--c1", "--c2", "--c4", "--accent", "--c3"];

export default function Page() {
  return (
    <>
      <section className="sec">
        <p className="eyebrow">Tools</p>
        <h2>What I build with</h2>
        <p className="lede" style={{ marginBottom: ".5rem" }}>One sticky note per tool, sketched in pencil. Drag them around.</p>
        <Board notes={TOOLS.map(([t, slug], i) => ({ t, logo: <ToolLogo slug={slug} />, c: CS[i % 5], r: TILT_CYCLE[i % 6], tool: true }))} />
      </section>
      <NextChapter id="tools" />
    </>
  );
}
