/** Glossy side-view push pin. Colour comes from the `--pin` CSS variable on the parent. */
function Cyl({ cx, yt, yb, rx, ry, tf }: { cx: number; yt: number; yb: number; rx: number; ry: number; tf: number }) {
  const d = `M${cx - rx} ${yt}V${yb}A${rx} ${ry} 0 0 0 ${cx + rx} ${yb}V${yt}Z`;
  return (
    <>
      <path d={d} style={{ fill: "var(--pin)" }} />
      <path d={d} fill="url(#cyl)" />
      <ellipse cx={cx} cy={yt} rx={rx} ry={ry} style={{ fill: "var(--pin)" }} />
      <ellipse cx={cx} cy={yt} rx={rx} ry={ry} fill={`rgba(255,255,255,${tf})`} />
    </>
  );
}

export function Pin() {
  return (
    <svg className="pin" viewBox="0 0 64 90" aria-hidden="true">
      <ellipse cx="33" cy="77" rx="7" ry="2.2" fill="rgba(0,0,0,.4)" />
      <path d="M32 79V56" stroke="#aeb5be" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M31 78V58" stroke="#fff" strokeOpacity=".75" strokeWidth=".9" strokeLinecap="round" />
      <Cyl cx={32} yt={52} yb={57} rx={15} ry={3.4} tf={0.08} />
      <Cyl cx={32} yt={32} yb={52} rx={8} ry={2.4} tf={0.12} />
      <Cyl cx={32} yt={15} yb={32} rx={14} ry={3.8} tf={0.28} />
      <ellipse cx="26.5" cy="14.2" rx="5" ry="1.5" fill="rgba(255,255,255,.65)" />
      <path d="M19 22V30" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
