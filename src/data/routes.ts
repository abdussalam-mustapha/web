import type { PageId } from "./types";

/** Page id -> real route. */
export const PATHS: Record<PageId, string> = {
  home: "/",
  engineering: "/engineering",
  work: "/work",
  port66: "/work/port66",
  tools: "/tools",
  content: "/content",
  writings: "/content/writings",
  bookmarks: "/content/bookmarks",
  community: "/community",
  teaching: "/teaching",
  hobbies: "/fun",
  guestbook: "/guestbook",
  desk: "/desk",
  about: "/about",
  "rabbit-hole": "/rabbit-hole",
};

/** Short titles (used for the curtain, the palette and <title>). */
export const TITLES: Record<PageId, string> = {
  home: "Hello",
  engineering: "Engineering",
  work: "Work",
  port66: "Port66",
  tools: "Tools",
  content: "Content",
  writings: "Writings",
  bookmarks: "Bookmarks",
  community: "Community",
  teaching: "Teaching",
  hobbies: "Fun",
  guestbook: "Guestbook",
  desk: "Desk",
  about: "About",
  "rabbit-hole": "Rabbit hole",
};

/** Order used by the command palette. */
export const ORDER: PageId[] = [
  "home", "engineering", "work", "port66", "tools", "content", "writings", "bookmarks",
  "community", "teaching", "hobbies", "guestbook", "desk", "about", "rabbit-hole",
];

/** Sub-pages highlight their parent in the nav and continue its chapter. */
export const PAR: Partial<Record<PageId, PageId>> = {
  guestbook: "home",
  work: "engineering",
  port66: "engineering",
  tools: "engineering",
  writings: "content",
  bookmarks: "content",
  desk: "home",
};

export function idFromPath(path: string): PageId | null {
  const clean = path.replace(/\/+$/, "") || "/";
  const hit = (Object.keys(PATHS) as PageId[]).find((k) => PATHS[k] === clean);
  return hit ?? null;
}

export function isPageId(s: string): s is PageId {
  return s in PATHS;
}

export const NAV: { id: PageId; label: string; icon: string }[] = [
  { id: "engineering", label: "Engineering", icon: "code" },
  { id: "content", label: "Content", icon: "write" },
  { id: "community", label: "Community", icon: "heart" },
  { id: "teaching", label: "Teaching", icon: "teach" },
  { id: "hobbies", label: "Fun", icon: "dumbbell" },
  { id: "about", label: "About", icon: "spark" },
];
