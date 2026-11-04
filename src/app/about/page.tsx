import type { CSSProperties } from "react";
import { Pin } from "@/components/ui/Pin";
import { Icon } from "@/components/ui/Icon";
import { CopyEmailButton } from "@/components/pages/CopyEmailButton";
import { NextChapter } from "@/components/site/NextChapter";
import { LINKS } from "@/data/contact";
import { meta } from "@/lib/meta";

export const metadata = meta("about");

const SOCIAL: [string, string, string][] = [
  ["GitHub", LINKS.github, "code"],
  ["LinkedIn", LINKS.linkedin, "link"],
  ["X", LINKS.x, "link"],
  ["Instagram", LINKS.instagram, "link"],
  ["TikTok", LINKS.tiktok, "link"],
];

export default function Page() {
  return (
    <>
      <section className="sec two">
        <div>
          <h2>About</h2>
          <p>
            I am a full-stack engineer based in Lagos. I also write smart contracts for the EVM and Solana, which lets me bridge Web2
            and Web3 products. I care about clean design and interfaces people can use without thinking.
          </p>
          <p>These days I am CTO at Port66. Before that I was a frontend engineer at Thrifto and a fullstack engineer at LZJ Esoleen Ltd.</p>
          <CopyEmailButton />
          {SOCIAL.map(([t, h, ic]) => (
            <a key={t} className="btn o" href={h} target="_blank" rel="noopener"><Icon name={ic} />{t}</a>
          ))}
        </div>
        <div className="note abt" style={{ "--c": "#ffe66d", "--r": "2deg", "--pin": "#e63946", "--pt": "-16deg" } as CSSProperties}>
          <Pin />
          <i className="tip" />
          <div className="nd">
            <b>NOW</b><p>CTO at Port66</p>
            <b>EDUCATION</b><p>B.Sc. Computer Science, First Class, University of Ilorin</p>
            <b>HONORS</b><p>National Olympiad runner-up</p><p>Technical Lead, OSSGuild</p><p>Core team, GDSC University of Ilorin</p>
          </div>
        </div>
      </section>
      <NextChapter id="about" />
    </>
  );
}
