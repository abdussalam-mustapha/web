"use client";

/**
 * "Open the note" motion: the big sheet grows out of the sticky note that was clicked
 * (lifting off its pin first, like the welcome note), and folds back onto it on close.
 * Pure Web Animations on transform/opacity, so it stays on the compositor.
 */

const OPEN_MS = 720;
const CLOSE_MS = 520;

interface Geometry {
  dx: number;
  dy: number;
  /** One scale for both axes, so the paper and writing are never stretched. */
  s: number;
  /** Clip (in the sheet's own px) that trims the scaled sheet to exactly the note's outline. */
  cropX: number;
  cropB: number;
  rot: number;
}

/** Room kept around the sheet so its pin (above) and shadow (all sides) are never clipped. */
const PIN_ROOM = 90;
const SHADOW_ROOM = 70;

/** Where the sheet must be (relative to its resting place) to sit exactly on the note. */
function geometry(sheet: HTMLElement, note: Element): Geometry | null {
  const n = note.getBoundingClientRect();
  if (!n.width || n.bottom < 0 || n.top > innerHeight) return null; // note is off screen
  const s = sheet.getBoundingClientRect();
  // Use the note's untransformed size; its bounding box is inflated by its tilt.
  const nw = (note as HTMLElement).offsetWidth || n.width;
  const nh = (note as HTMLElement).offsetHeight || n.height;
  const ncx = n.left + n.width / 2;
  const ncy = n.top + n.height / 2;
  const rot = parseFloat(getComputedStyle(note).getPropertyValue("--r")) || 0;
  // Scale evenly so the sheet covers the note in both directions, then clip it down to the
  // note's shape. As it opens the clip widens: the note "unfolds" instead of stretching.
  const sc = Math.max(nw / s.width, nh / s.height);
  return {
    dx: ncx - (s.left + s.width / 2),
    dy: ncy - nh / 2 - s.top,
    s: sc,
    cropX: Math.max(0, (s.width - nw / sc) / 2),
    cropB: Math.max(0, s.height - nh / sc),
    rot,
  };
}

const T = (g: Geometry, lift = 0, k = 1, rx = 0, rot = g.rot) =>
  `perspective(1200px) translate(${g.dx}px, ${g.dy - lift}px) rotate(${rot}deg) rotateX(${rx}deg) scale(${g.s * k})`;
const REST = "perspective(1200px) translate(0px, 0px) rotate(0deg) rotateX(0deg) scale(1)";
/** Note-shaped clip (start) and the fully open clip, both leaving room for pin and shadow. */
const FOLDED = (g: Geometry) => `inset(-${PIN_ROOM}px ${g.cropX}px ${g.cropB}px ${g.cropX}px round 3px)`;
const OPEN = `inset(-${PIN_ROOM}px -${SHADOW_ROOM}px -${SHADOW_ROOM}px -${SHADOW_ROOM}px round 3px)`;

/** The sheet's contents, apart from its pin (which stays visible like the note's pin). */
const contents = (sheet: HTMLElement) =>
  Array.from(sheet.children).filter((c) => !c.classList.contains("pin")) as HTMLElement[];

/** Grow the sheet out of `note`. Returns false if it could not (note hidden or off screen). */
export function flyOpen(sheet: HTMLElement, note: Element): boolean {
  sheet.style.animation = "none"; // replace the default CSS unfold
  const g = geometry(sheet, note);
  if (!g) {
    sheet.style.animation = "";
    return false;
  }
  note.classList.add("lifted");
  sheet.style.transformOrigin = "50% 0";
  sheet.animate(
    [
      { transform: T(g), clipPath: FOLDED(g), easing: "cubic-bezier(.3,0,.4,1)" },
      // lift off the board, tipping forward on the pin, still note-shaped
      { transform: T(g, 18, 1.06, 16, 0), clipPath: FOLDED(g), offset: 0.3, easing: "cubic-bezier(.2,1,.3,1)" },
      // then unfold to full size
      { transform: REST, clipPath: OPEN },
    ],
    { duration: OPEN_MS },
  );
  for (const c of contents(sheet)) {
    c.animate([{ opacity: 0 }, { opacity: 0, offset: 0.4 }, { opacity: 1 }], { duration: OPEN_MS, easing: "ease-out" });
  }
  return true;
}

/** Fold the sheet back onto `note`. Resolves when it has landed (or immediately if it cannot). */
export function flyClose(sheet: HTMLElement, note: Element | null): Promise<boolean> {
  const g = note ? geometry(sheet, note) : null;
  if (!g || !note) return Promise.resolve(false);
  note.classList.add("lifted");
  sheet.style.transformOrigin = "50% 0";
  for (const c of contents(sheet)) {
    c.animate([{ opacity: 1 }, { opacity: 0, offset: 0.35 }, { opacity: 0 }], { duration: CLOSE_MS, fill: "forwards" });
  }
  const a = sheet.animate(
    [
      { transform: REST, clipPath: OPEN, easing: "cubic-bezier(.5,0,.75,0)" },
      { transform: T(g, 18, 1.06, 16, 0), clipPath: FOLDED(g), offset: 0.7, easing: "cubic-bezier(.25,1,.5,1)" },
      { transform: T(g), clipPath: FOLDED(g) },
    ],
    { duration: CLOSE_MS, fill: "forwards" },
  );
  return a.finished.then(() => true, () => false);
}

/** Put every lifted note back on the board. */
export function landAll() {
  document.querySelectorAll(".lifted").forEach((n) => n.classList.remove("lifted"));
}
