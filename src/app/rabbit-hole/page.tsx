import { Terminal } from "@/components/pages/Terminal";
import { meta } from "@/lib/meta";

export const metadata = meta("rabbit-hole");

export default function Page() {
  return (
    <section className="sec">
      <h2>Rabbit hole</h2>
      <p className="lede" style={{ marginBottom: "1.5rem" }}>A small terminal. Type help.</p>
      <Terminal />
    </section>
  );
}
