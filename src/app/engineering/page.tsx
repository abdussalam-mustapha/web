import { Hub } from "@/components/pages/Hub";
import { NextChapter } from "@/components/site/NextChapter";
import { LINKS } from "@/data/contact";
import { meta } from "@/lib/meta";

export const metadata = meta("engineering");

export default function Page() {
  return (
    <>
      <Hub
        title="Engineering"
        intro="I build products end to end. Right now that is Port66, where I am CTO. Before it came frontend and fullstack roles across fintech, restaurant software and Web3."
        notes={[
          { t: "Port66", tag: "Flagship", m: "The luxury collectibles marketplace I lead, with on-chain pools.", h: "/work/port66", c: "--accent", r: -2, go: "Case study" },
          { t: "Roles", tag: "History", m: "Nine teams, from Thrifto to LZJ Esoleen to Andersen Consulting.", h: "/work", c: "--c1", r: 1.5, go: "See the roles" },
          { t: "Tools", tag: "Stack", m: "React, Next.js, Node, Solidity, Rust and the rest of the toolbox.", h: "/tools", c: "--c2", r: -1, go: "Open the toolbox" },
          { t: "GitHub", tag: "Code", m: "Where the code lives.", h: LINKS.github, x: true, c: "--c3", r: 2, go: "Visit GitHub" },
        ]}
      />
      <NextChapter id="engineering" />
    </>
  );
}
