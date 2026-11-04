import type { ReactNode } from "react";

/**
 * Pencil sketches for the Fun page notes, drawn in the same style as the Tools logos:
 * a double graphite outline with a slight wobble (#pcl-l), diagonal hatching for shading
 * (#hatch-l, #xhatch-l for darker areas) and a faint tint of colour underneath.
 * All three are original drawings (the Anime note is an original samurai, not an existing character).
 */
const LEAD = "#2b2b2b";

/** A shaded area: faint colour tint plus pencil hatching. */
function Shade({ d, tint = LEAD, dark, op = 0.8 }: { d: string; tint?: string; dark?: boolean; op?: number }) {
  return (
    <>
      <path d={d} fill={tint} fillOpacity=".2" />
      <path d={d} fill={`url(#${dark ? "xhatch-l" : "hatch-l"})`} opacity={op} />
    </>
  );
}

/** A pencil line, drawn twice with a small offset like a real sketch. */
function Ink({ d, w = 1.8 }: { d: string; w?: number }) {
  return (
    <>
      <path d={d} strokeWidth={w} />
      <path d={d} strokeWidth={w * 0.55} transform="translate(1.1 .7)" opacity=".5" />
    </>
  );
}

function Sketch({ label, shades, children }: { label: string; shades: ReactNode; children: ReactNode }) {
  return (
    <svg className="sk" viewBox="0 0 200 200" role="img" aria-label={label}>
      <g>{shades}</g>
      <g fill="none" stroke={LEAD} strokeLinecap="round" strokeLinejoin="round" filter="url(#pcl-l)">
        {children}
      </g>
    </svg>
  );
}

/* ---------- Anime: an original samurai in kabuto helmet and armour ---------- */

const HELMET = "M70 94 Q66 50 100 46 Q134 50 130 94 Q118 84 100 84 Q82 84 70 94 Z";
const FACE_S = "M79 92 Q79 74 100 72 Q121 74 121 92 L120 104 Q117 121 108 129 Q100 134 92 129 Q83 121 80 104 Z";
const NECKGUARD_L = "M71 94 L58 138 L80 132 L82 104 Z";
const NECKGUARD_R = "M129 94 L142 138 L120 132 L118 104 Z";
const SODE_L = "M24 200 L34 148 Q56 136 76 144 L72 200 Z";
const SODE_R = "M176 200 L166 148 Q144 136 124 144 L128 200 Z";
const DO = "M72 200 L76 144 Q100 156 124 144 L128 200 Z";
/* Katana worn on the back: hilt over the right shoulder, scabbard tip below the left. */
const TSUKA = "M142.6 143.9 L172.6 95.9 L179.4 100.1 L149.4 148.1 Z";
const TSUBA = "M137 143 Q146 140 153 153 Q144 156 137 143 Z";
const SAYA_TIP = "M22 192 L34 180 L38 184 L27 197 Z";
const petal = (x: number, y: number, r: number) => `M${x} ${y} q4 -6 8 0 q-4 6 -8 0 Z|${x}|${y}|${r}`;
const PETALS = [petal(150, 110, 30), petal(160, 140, -20), petal(28, 96, 60), petal(44, 130, 10), petal(140, 74, -40)];

export function AnimeSketch() {
  return (
    <Sketch
      label="A pencil sketch of an original samurai in a crested helmet, with a katana on his back"
      shades={
        <>
          {/* Moon behind */}
          <Shade d="M42 84 a58 58 0 1 0 116 0 a58 58 0 1 0 -116 0" tint="#e63946" op={0.12} />
          <Shade d={TSUKA} dark op={0.95} />
          <Shade d={SAYA_TIP} dark op={0.9} />
          <Shade d={SODE_L} tint="#7b2cbf" op={0.6} />
          <Shade d={SODE_R} tint="#7b2cbf" op={0.6} />
          <Shade d={DO} tint="#7b2cbf" dark op={0.45} />
          <Shade d={NECKGUARD_L} dark op={0.7} />
          <Shade d={NECKGUARD_R} dark op={0.7} />
          <Shade d={FACE_S} tint="#7a4a2a" op={0.25} />
          <Shade d="M80 104 Q84 120 94 130 Q86 118 85 104 Z" tint="#7a4a2a" dark />
          <Shade d={HELMET} dark op={0.95} />
          <Shade d="M74 48 Q100 66 126 48 Q100 58 74 48 Z" tint="#ffd23f" op={0.6} />
          {PETALS.map((p) => {
            const [d, x, y, r] = p.split("|");
            return <g key={d} transform={`rotate(${r} ${+x + 4} ${y})`}><Shade d={d} tint="#ff8fcf" op={0.4} /></g>;
          })}
        </>
      }
    >
      {/* Moon */}
      <g opacity=".45"><Ink w={1.2} d="M42 84 a58 58 0 1 0 116 0 a58 58 0 1 0 -116 0" /></g>
      {/* Katana on his back: wrapped hilt and guard over the right shoulder, scabbard tip lower left */}
      <Ink w={1.6} d={TSUKA} />
      <Ink w={1} d="M150 132 L157 136 M156 122 L163 126 M162 113 L169 117 M168 103 L175 107" />
      <Ink w={1.4} d="M174 97 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" />
      <Ink w={1.8} d={TSUBA} />
      <Ink w={1.6} d={SAYA_TIP} />
      {/* Shoulder plates and chest armour with lacing */}
      <Ink w={1.8} d={SODE_L} />
      <Ink w={1.8} d={SODE_R} />
      <Ink w={1.2} d="M32 160 Q52 152 75 156 M30 172 Q52 166 74 168 M28 184 Q50 180 73 182 M168 160 Q148 152 125 156 M170 172 Q148 166 126 168 M172 184 Q150 180 127 182" />
      <Ink w={1.8} d={DO} />
      <Ink w={1.2} d="M75 164 Q100 172 125 164 M74 178 Q100 186 126 178 M73 192 Q100 199 127 192" />
      <g strokeDasharray="2 4"><Ink w={1.6} d="M100 150 V200" /></g>
      {/* Neck guard (layered lames) */}
      <Ink w={1.6} d={NECKGUARD_L} />
      <Ink w={1.6} d={NECKGUARD_R} />
      <Ink w={1} d="M67 108 L82 110 M63 120 L81 120 M60 131 L80 128 M133 108 L118 110 M137 120 L119 120 M140 131 L120 128" />
      {/* Face: calm, determined */}
      <Ink w={2} d={FACE_S} />
      <Ink w={2.2} d="M84 95 L97 99 M116 95 L103 99" />
      <Ink w={1.6} d="M85 103 Q91 99 97 102.5 M115 103 Q109 99 103 102.5" />
      <circle cx="91.5" cy="102.6" r="2.3" fill={LEAD} />
      <circle cx="108.5" cy="102.6" r="2.3" fill={LEAD} />
      <Ink w={1.4} d="M100 105 L98 114 L102 114.5" />
      <Ink w={1.6} d="M93 121 Q100 123.5 107 121" />
      {/* Kabuto helmet: ribbed bowl, brim, side flaps and crescent crest */}
      <Ink w={2.2} d={HELMET} />
      <Ink w={1} d="M86 50 Q82 68 84 84 M100 46 V84 M114 50 Q118 68 116 84" />
      <Ink w={2} d="M70 92 Q100 100 130 92" />
      <Ink w={1.8} d="M72 84 L56 76 L60 98 L76 98 Z M128 84 L144 76 L140 98 L124 98 Z" />
      <Ink w={1.8} d="M74 48 Q100 66 126 48 Q100 58 74 48 Z" />
      <Ink w={1.6} d="M96 60 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
      {/* Cherry-blossom petals and wind */}
      {PETALS.map((p) => {
        const [d, x, y, r] = p.split("|");
        return <g key={d} transform={`rotate(${r} ${+x + 4} ${y})`}><Ink w={1.1} d={d} /></g>;
      })}
      <g opacity=".6"><Ink w={1.2} d="M150 96 Q170 92 186 98 M14 112 Q28 106 40 110" /></g>
    </Sketch>
  );
}

/* ---------- Gym: dumbbell and kettlebell ---------- */

export function GymSketch() {
  return (
    <Sketch
      label="A pencil sketch of a dumbbell and a kettlebell"
      shades={
        <>
          <g transform="rotate(-16 100 104)">
            <Shade d="M48 100 H152 V108 H48 Z" op={0.5} />
            <Shade d="M40 82 h16 v44 h-16 Z M144 82 h16 v44 h-16 Z" dark op={0.95} />
            <Shade d="M56 76 h14 v56 h-14 Z M130 76 h14 v56 h-14 Z" dark op={0.75} />
          </g>
          <g transform="translate(10 6)"><Shade d="M126 160 a26 24 0 1 0 52 0 a26 24 0 1 0 -52 0" dark op={0.7} /></g>
        </>
      }
    >
      <g transform="rotate(-16 100 104)">
        <Ink d="M48 100 H152 V108 H48 Z" />
        <Ink d="M56 78 Q56 76 58 76 H68 Q70 76 70 78 V130 Q70 132 68 132 H58 Q56 132 56 130 Z M130 78 Q130 76 132 76 H142 Q144 76 144 78 V130 Q144 132 142 132 H132 Q130 132 130 130 Z" />
        <Ink d="M40 84 Q40 82 42 82 H56 V126 H42 Q40 126 40 124 Z M144 82 H158 Q160 82 160 84 V124 Q160 126 158 126 H144 Z" />
        <Ink w={1.6} d="M34 96 H40 V112 H34 Z M160 96 H166 V112 H160 Z" />
        <Ink w={1.2} d="M84 100 V108 M92 100 V108 M100 100 V108 M108 100 V108 M116 100 V108" />
      </g>
      {/* Kettlebell (sits clear of the dumbbell) */}
      <g transform="translate(10 6)">
        <Ink d="M126 160 a26 24 0 1 0 52 0 a26 24 0 1 0 -52 0" />
        <Ink d="M136 142 Q132 118 152 116 Q172 118 168 142" />
        <Ink w={1.4} d="M143 141 Q141 126 152 125 Q163 126 161 141" />
        <Ink w={1.2} d="M140 156 Q144 150 150 149" />
      </g>
      {/* Floor and effort lines */}
      <Ink w={1.4} d="M16 188 Q100 183 186 188" />
      <Ink w={1.4} d="M50 46 Q56 38 66 42 M40 58 Q44 52 50 54" />
      <Ink w={1.4} d="M176 70 q5 7 0 10 q-5 -3 0 -10 Z M188 90 q4 5 0 8 q-4 -3 0 -8 Z" />
    </Sketch>
  );
}

/* ---------- Walking and Strava: a sneaker under a dotted route ---------- */

const SOLE = "M30 150 Q30 163 44 164 L160 164 Q176 164 176 152 Q176 145 168 144 L40 144 Q30 144 30 150 Z";
const UPPER = "M42 144 L46 112 Q50 98 66 98 Q78 100 84 108 L100 100 Q108 94 114 100 L150 124 Q166 130 168 144 Z";
const PIN = "M168 14 a10 10 0 0 1 10 10 c0 9 -10 18 -10 18 s-10 -9 -10 -18 a10 10 0 0 1 10 -10 Z";

export function WalkSketch() {
  return (
    <Sketch
      label="A pencil sketch of a sneaker under a dotted walking route"
      shades={
        <>
          <Shade d={UPPER} tint="#ff8a1f" op={0.45} />
          <Shade d={SOLE} dark op={0.6} />
          <Shade d="M42 144 L46 118 Q58 122 64 144 Z" dark op={0.7} />
          <Shade d="M148 144 Q146 132 158 128 Q166 134 168 144 Z" dark op={0.55} />
          <Shade d={PIN} tint="#e63946" dark op={0.7} />
        </>
      }
    >
      {/* Route */}
      <g strokeDasharray="1 7">
        <Ink w={2.6} d="M22 74 Q48 34 82 56 T138 48 T168 42" />
      </g>
      <Ink w={1.4} d="M16 74 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" />
      <Ink w={1.6} d={PIN} />
      <Ink w={1.3} d="M164 24 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" />
      {/* Sneaker */}
      <Ink w={2} d={UPPER} />
      <Ink w={2} d={SOLE} />
      <Ink w={1.2} d="M36 154 H172" />
      <Ink w={1.4} d="M46 118 Q58 122 64 144 M148 144 Q146 132 158 128" />
      <Ink w={1.4} d="M92 112 L104 104 M98 118 L112 110 M106 124 L120 116 M116 129 L130 121" />
      <Ink w={1.2} d="M66 98 Q74 106 84 108" />
      {/* Motion lines behind the heel */}
      <Ink w={1.4} d="M8 116 H28 M4 128 H26 M12 140 H28" />
    </Sketch>
  );
}
