import { LOGOS } from "@/data/site";

/** A brand logo redrawn as a pencil sketch: hatched fill, wobbly double outline. */
export function ToolLogo({ slug }: { slug: string }) {
  const l = LOGOS[slug];
  if (!l) return null;
  const id = "lg-" + slug;
  return (
    <svg className="lg" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={id}><path d={l.p} /></clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="24" height="24" fill={"#" + l.h} fillOpacity=".2" />
        <rect width="24" height="24" fill="url(#hatch)" opacity=".85" />
      </g>
      <g fill="none" stroke="#2b2b2b" strokeLinecap="round" strokeLinejoin="round" filter="url(#pcl)">
        <path d={l.p} strokeWidth=".5" />
        <path d={l.p} strokeWidth=".28" transform="translate(.18 .12)" opacity=".55" />
      </g>
    </svg>
  );
}
