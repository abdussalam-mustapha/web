import { Whiteboard } from "@/components/home/Whiteboard";
import { Board } from "@/components/notes/Board";
import { CountUp } from "@/components/ui/CountUp";

export default function Home() {
  return (
    <>
      <Whiteboard />
      <section className="sec">
        <p className="eyebrow">Pick a note</p>
        <h2>Every note is a story.</h2>
        <p className="lede" style={{ marginBottom: ".5rem" }}>
          Engineering is only one part of what I do. Click any note to read its story. Follow the red strings to see how the
          stories connect, or drag the notes around the board.
        </p>
        <Board
          strings
          notes={[
            { k: "eng", story: 0, nudge: true, t: "Engineering", tag: "Build", m: "CTO at Port66. Frontend, backend and smart contracts, from the first sketch to production.", h: "/engineering", c: "--accent", r: -2, go: "Unfold the story" },
            { k: "con", story: 1, t: "Content", tag: "Share", m: "Writing, bookmarks and the things I put out online. Ideas worth passing on.", h: "/content", c: "--c4", r: 1.5, go: "Unfold the story" },
            { k: "com", story: 2, t: "Community", tag: "Grow", m: "I built and led a community of hundreds at TechGen Africa, and I have served in OSSGuild and GDSC.", h: "/community", c: "--c2", r: -1, go: "Unfold the story" },
            { k: "tea", story: 3, t: "Teaching", tag: "Impact", m: "STEMTisha FutureCoders: helping younger learners write their very first HTML.", h: "/teaching", c: "--c3", r: 2, go: "Unfold the story" },
            { k: "fun", story: 4, t: "Fun", tag: "Play", m: "Anime, the gym and Strava kilometers. The part of me that is not code.", h: "/fun", c: "--c1", r: -1.5, go: "Unfold the story" },
            { k: "hi", story: 5, t: "Say hi", tag: "Contact", m: "Building something, or want to learn to? Let us talk.", h: "/about", c: "#c5f27a", r: 1, go: "Unfold the story" },
          ]}
        />
        <Board
          small
          notes={[
            { story: 6, t: "Never miss a lucky day", tag: "Mantra", m: "My personal mantra.", h: "/", c: "--accent", r: -2, mini: true, go: "Read it" },
            { t: "Best Intern", m: "TechGen Africa, 2022. Where it all started.", c: "--c4", r: 2, mini: true },
            { t: "Hello, Lagos", m: "Shipping from Nigeria, to anywhere.", c: "--c3", r: 1.5, mini: true },
          ]}
        />
        <p className="eyebrow" style={{ marginTop: "1.2rem" }}>Little extras</p>
        <Board small notes={[{ t: "Leave a note", tag: "Guestbook", m: "Pin your own note to my wall.", h: "/guestbook", c: "--c4", r: -1, mini: true, go: "Pin one" }]} />
      </section>
      <section className="sec">
        <p className="eyebrow">On the record</p>
        <Board
          small
          notes={[
            { t: "CTO", m: "at Port66, leading the frontend, backend and smart contracts.", c: "--accent", r: -2, mini: true, big: true, txt: true },
            { t: "First Class", m: "B.Sc. Computer Science, University of Ilorin.", c: "--c4", r: 1.5, mini: true, big: true, txt: true },
            { t: "Runner-up", m: "National Olympiad.", c: "--c2", r: -1, mini: true, big: true, txt: true },
            { t: "Tech Lead", m: "Technical Lead at OSSGuild.", c: "--c3", r: 2, mini: true, big: true, txt: true },
            { t: "Core team", m: "Google Developer Student Club, University of Ilorin.", c: "--c1", r: -1.5, mini: true, big: true, txt: true },
            { t: <><CountUp n={9} /> teams</>, m: "worked with, from fintech to Web3.", c: "#c5f27a", r: 1, mini: true, big: true, txt: true },
          ]}
        />
      </section>
    </>
  );
}
