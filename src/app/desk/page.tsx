import { Desk } from "@/components/pages/Desk";
import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";

export const metadata = meta("desk");

export default function Page() {
  return (
    <>
      <section className="sec">
        <p className="eyebrow">Desk</p>
        <h2>Pick something up.</h2>
        <Desk />
      </section>
      <NextChapter id="desk" />
    </>
  );
}
