import { Guestbook } from "@/components/pages/Guestbook";
import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";

export const metadata = meta("guestbook");

export default function Page() {
  return (
    <>
      <section className="sec">
        <p className="eyebrow">Leave a note</p>
        <h2>Pin a note to my wall</h2>
        <p className="lede">Say hi, share a lucky day, or leave a tip. In this preview, notes are saved only in your own browser.</p>
        <Guestbook />
      </section>
      <NextChapter id="guestbook" />
    </>
  );
}
