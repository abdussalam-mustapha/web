"use client";

import type { CSSProperties } from "react";
import { SHOTS } from "@/data/site";
import { useSite } from "@/components/site/SiteProvider";

const ROT = [-1.5, 1.2, -1];

/** Port66 screenshots in browser frames; click or press Enter for the lightbox. */
export function Shots() {
  const { openShot } = useSite();
  return (
    <div className="shots">
      {SHOTS.map((x, i) => (
        <figure
          key={x.src}
          className="shot"
          style={{ "--r": `${ROT[i]}deg` } as CSSProperties}
          tabIndex={0}
          role="button"
          aria-label={`Open the screenshot: ${x.title}`}
          onClick={(e) => openShot(i, e.currentTarget)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openShot(i, e.currentTarget); }
          }}
        >
          <i className="wt" />
          <div className="fbar"><span /><span /><span /><em>port66.xyz</em></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={x.src} alt={`Screenshot of the Port66 ${x.title.toLowerCase()}`} loading="lazy" />
          <figcaption><b>{x.title}</b>{x.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
