import { Hub } from "@/components/pages/Hub";
import { Board } from "@/components/notes/Board";
import { NextChapter } from "@/components/site/NextChapter";
import { LINKS } from "@/data/contact";
import { meta } from "@/lib/meta";
import { Ph } from "@/components/ui/Ph";

export const metadata = meta("content");

export default function Page() {
  return (
    <>
      <Hub
        title="Content"
        intro="Writing, saved ideas and the things I share online. Engineering is only half the story, and this is where I tell the rest."
        notes={[
          { t: "Writings", tag: "Notes", m: "Short pieces on shipping, teaching and the mistakes in between.", h: "/content/writings", c: "--c4", r: -1.5, go: "Read" },
          { t: "Bookmarks", tag: "Saved", m: "Articles, tools and talks worth another read.", h: "/content/bookmarks", c: "--c3", r: 1.5, go: "Browse" },
        ]}
      >
        <p className="eyebrow" style={{ marginTop: "1.5rem" }}>Find me online</p>
        <Board
          small
          notes={[
            { t: "GitHub", tag: "Code", m: "Code and experiments.", h: LINKS.github, x: true, c: "--c3", r: -1.5, go: "Visit", mini: true },
            { t: "LinkedIn", tag: "Network", m: "Work and community updates.", h: LINKS.linkedin, x: true, c: "--c2", r: 1.5, go: "Visit", mini: true },
            { t: "X", tag: "Social", m: "@mustysama_", h: LINKS.x, x: true, c: "--c4", r: -1, go: "Follow", mini: true },
            { t: "Instagram", tag: "Social", m: "@0xmaverick_", h: LINKS.instagram, x: true, c: "--accent", r: 1.5, go: "Follow", mini: true },
            { t: "TikTok", tag: "Social", m: "@0xmaverick_", h: LINKS.tiktok, x: true, c: "--c1", r: -1.5, go: "Follow", mini: true },
          ]}
        />
        <Ph style={{ marginTop: "1rem" }}>Add your Strava link here.</Ph>
      </Hub>
      <NextChapter id="content" />
    </>
  );
}
