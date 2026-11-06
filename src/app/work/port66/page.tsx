import type { ReactNode } from "react";
import { Shots } from "@/components/pages/Shots";
import { NextChapter } from "@/components/site/NextChapter";
import { LINKS } from "@/data/contact";
import { meta } from "@/lib/meta";
import { SHOW_PLACEHOLDERS } from "@/data/placeholders";

export const metadata = meta("port66", "Case study: Port66, a marketplace for authenticated luxury collectibles with on-chain pools.");

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "8rem 1fr", gap: "1rem", padding: "1.2rem 0", borderTop: "1px solid var(--line)" }}>
      <b style={{ color: "var(--muted)", font: "500 .85rem var(--d)" }}>{label}</b>
      <div>{children}</div>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <div className="col">
        <p className="lab"><span>Case study</span><span>Port66</span></p>
        <h2>Port66</h2>
        <p>A marketplace for authenticated luxury fashion, watches and collectibles. Collectors follow each other, and real pieces are tied to on-chain pools.</p>
        <Row label="Role"><p>CTO. I worked on the frontend, backend and smart contracts, and make the architecture decisions.</p></Row>
        <Row label="Problem"><p>Luxury resale runs on trust. Buyers need proof a piece is real and a record of where it has been.</p></Row>
        <Row label="The product">
          <p>
            One platform for authenticated luxury collectibles. At its heart is a collectors marketplace for buying and selling
            fashion, cards and watches. Around it, brands book the seven billboard screens of a 3D tower a day at a time, with the
            top bid taking a screen for 24 hours, and collectors buy into iconic real-world pieces as tokens, trade them on an
            exchange, and get paid out if a piece is bought out. All of it runs on Solana with USDC.
          </p>
        </Row>
        <Row label="Stack"><p>Next.js and Solana.{SHOW_PLACEHOLDERS && <span className="ph"> Add the rest here.</span>}</p></Row>
      </div>
      <section className="sec">
        <p className="eyebrow">On screen</p>
        <h2>What it looks like</h2>
        <p className="lede" style={{ marginBottom: "1.8rem" }}>Three corners of the product. Tap a screenshot to see it larger.</p>
        <Shots />
      </section>
      <div className="col">
        {SHOW_PLACEHOLDERS && (
          <>
            <Row label="Outcome"><p className="ph">Add real numbers.</p></Row>
            <Row label="Would change"><p className="ph">Add one honest lesson.</p></Row>
          </>
        )}
        <a className="btn" href={LINKS.port66} target="_blank" rel="noopener">Visit port66.xyz</a>
      </div>
      <NextChapter id="port66" />
    </>
  );
}
