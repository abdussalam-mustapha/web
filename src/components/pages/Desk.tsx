"use client";

import type { CSSProperties } from "react";
import type { PageId } from "@/data/types";
import { PATHS } from "@/data/routes";
import { Icon } from "@/components/ui/Icon";
import { reducedMotion, finePointer } from "@/lib/browser";

const OBJ: [string, string, PageId, string, string][] = [
  ["Laptop", "Port66, running.", "port66", "-2deg", "spark"],
  ["Notebook", "Writings.", "writings", "1.5deg", "write"],
  ["Toolbox", "Tools.", "tools", "-1deg", "tools"],
  ["Book stack", "Bookmarks.", "bookmarks", "2deg", "mark"],
  ["Chalkboard", "Teaching.", "teaching", "-1.5deg", "teach"],
  ["Photo", "About me.", "about", "1deg", "user"],
  ["Dumbbell", "Hobbies.", "hobbies", "-2deg", "dumbbell"],
];

/** Tilting object cards that link to pages. */
export function Desk() {
  function tilt(e: React.PointerEvent<HTMLAnchorElement>) {
    if (reducedMotion() || !finePointer()) return;
    const a = e.currentTarget, b = a.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    a.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateY(-6px)`;
  }
  return (
    <div className="desk">
      {OBJ.map(([t, m, id, r, ic], i) => (
        <a
          key={id}
          className={`obj o${i}`}
          href={PATHS[id]}
          style={{ "--r": r } as CSSProperties}
          onPointerMove={tilt}
          onPointerLeave={(e) => { e.currentTarget.style.transform = ""; }}
        >
          <Icon name={ic} />
          <div><b>{t}</b><span>{m}</span></div>
        </a>
      ))}
    </div>
  );
}
