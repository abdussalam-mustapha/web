import { Hub } from "@/components/pages/Hub";
import { NextChapter } from "@/components/site/NextChapter";
import { meta } from "@/lib/meta";
import { Ph } from "@/components/ui/Ph";

export const metadata = meta("community");

export default function Page() {
  return (
    <>
      <Hub
        title="Community"
        intro="Some of my best work has no code in it. I like bringing people together, helping them grow, and building the spaces where that happens."
        notes={[
          { t: "TechGen Africa", tag: "Community Lead", m: "Built and led a community of hundreds through events, workshops and mentorship. I joined as an intern in 2022 and left as Best Intern, then came back to lead.", c: "--c2", r: -1.5 },
          { t: "OSSGuild", tag: "Technical Lead", m: "Served as Technical Lead.", c: "--c1", r: 1.5 },
          { t: "GDSC Ilorin", tag: "Core team", m: "Core team member of the Google Developer Student Club at the University of Ilorin.", c: "--c4", r: -1 },
          { t: "FutureCoders", tag: "Program", m: "The learning program I run for younger builders.", h: "/teaching", c: "--c3", r: 2, go: "See the program" },
        ]}
      >
        <Ph style={{ marginTop: "1rem" }}>Add real numbers here: members, events hosted, people mentored.</Ph>
      </Hub>
      <NextChapter id="community" />
    </>
  );
}
