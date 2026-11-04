import { Board } from "@/components/notes/Board";
import { AnimeSketch, GymSketch, WalkSketch } from "@/components/notes/FunSketches";
import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";
import { Ph } from "@/components/ui/Ph";

export const metadata = meta("hobbies");

/** Plain sticky notes, no animation on purpose (the "still" class). */
export default function Page() {
  return (
    <>
      <section className="sec still">
        <p className="eyebrow">Off the clock</p>
        <h2>When I log off</h2>
        <p className="lede" style={{ marginBottom: "2rem" }}>Anime, the gym, and long walks.</p>
        <Board
          notes={[
            { t: "Anime", tag: "Watch", logo: <AnimeSketch />, m: <>I love anime. It is how I unwind, and I will happily talk about it for hours.<Ph as="span"><br />Add your favorite series here.</Ph></>, c: "--c3", r: -1.5 },
            { t: "Gym", tag: "Train", logo: <GymSketch />, m: "Gym days balance out the hours I spend building at a screen.", c: "--c2", r: 1.2 },
            { t: "Walking and Strava", tag: "Walk", logo: <WalkSketch />, m: <>I log my walks and workouts on Strava, so every kilometer counts.<Ph as="span"><br />Add your Strava link here.</Ph></>, c: "--c1", r: -1 },
          ]}
        />
      </section>
      <NextChapter id="hobbies" />
    </>
  );
}
