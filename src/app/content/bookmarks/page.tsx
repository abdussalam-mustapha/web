import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";
import { Ph } from "@/components/ui/Ph";

export const metadata = meta("bookmarks");

export default function Page() {
  return (
    <>
      <section className="sec">
        <h2>Bookmarks</h2>
        <p className="lede" style={{ marginBottom: "1.5rem" }}>Articles, tools and talks worth another read.</p>
        <p className="lede">Nothing saved yet. The first links are on their way.</p>
        <Ph>Add a link, a title and one line on why it matters.</Ph>
      </section>
      <NextChapter id="bookmarks" />
    </>
  );
}
