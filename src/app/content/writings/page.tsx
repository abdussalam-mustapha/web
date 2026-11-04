import { Writings } from "@/components/pages/Writings";
import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";
import { SHOW_PLACEHOLDERS, POSTS_ARE_SAMPLES } from "@/data/placeholders";

export const metadata = meta("writings");

export default function Page() {
  return (
    <>
      <section className="sec">
        <h2>Writings</h2>
        <p className="lede" style={{ marginBottom: "1.5rem" }}>
          Short writing on shipping, teaching and the failures in between.
          {POSTS_ARE_SAMPLES && (SHOW_PLACEHOLDERS ? " These titles are placeholders; replace them with real posts." : " The first posts are on their way.")}
        </p>
        {(!POSTS_ARE_SAMPLES || SHOW_PLACEHOLDERS) && <Writings />}
      </section>
      <NextChapter id="writings" />
    </>
  );
}
