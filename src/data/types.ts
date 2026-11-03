import type { ReactNode } from "react";

/** Internal page ids (the old hash names). Mapped to real paths in `routes.ts`. */
export type PageId =
  | "home"
  | "engineering"
  | "work"
  | "port66"
  | "tools"
  | "content"
  | "writings"
  | "bookmarks"
  | "community"
  | "teaching"
  | "hobbies"
  | "guestbook"
  | "desk"
  | "about"
  | "rabbit-hole";

/** A colour token like "--accent" (mapped to a pastel + pin) or a literal colour like "#c5f27a". */
export type NoteColor = "--accent" | "--c1" | "--c2" | "--c3" | "--c4" | (string & {});

export interface Story {
  tag: string;
  t: string;
  /** Sheet colour */
  c: string;
  /** Pin colour */
  p: string;
  /** Photo placeholder text */
  photo: string;
  body: string[];
  /** Placeholder line (dashed box) */
  ph?: string;
  /** Link to the related page */
  h?: string;
  go?: string;
}

export interface Role {
  t: string;
  tag: string;
  d: string;
  loc?: string;
  tech: string[];
  /** Short summary used on the role note */
  m: string;
  /** Bullets on the role sheet */
  list: string[];
  ph?: string;
  h?: string;
  go?: string;
  /** Assigned colours (filled in by roles.ts) */
  c: string;
  p: string;
}

export interface NoteData {
  t: ReactNode;
  m?: ReactNode;
  tag?: string;
  d?: string;
  c: NoteColor;
  r?: number;
  h?: string;
  /** External link (opens in a new tab) */
  x?: boolean;
  go?: string;
  mini?: boolean;
  big?: boolean;
  txt?: boolean;
  tool?: boolean;
  /** Key for the red strings */
  k?: string;
  /** Index into STORIES: clicking opens the story sheet */
  story?: number;
  /** Index into ROLES: clicking opens the role sheet */
  role?: number;
  logo?: ReactNode;
  /** Show the "Click a note" nudge bubble */
  nudge?: boolean;
}

export interface Chapter {
  id: PageId;
  title: string;
  tag: string;
  blurb: string;
  c: NoteColor;
}

export interface Logo {
  /** SVG path (24x24 viewBox) */
  p: string;
  /** Brand hex, without # */
  h: string;
  t?: string;
}
