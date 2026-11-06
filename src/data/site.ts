import type { Chapter } from "./types";
import logos from "./tool-logos.json";
import type { Logo } from "./types";

/** Reading order of the main chapters (the "Next chapter" note follows this). */
export const CHAPTERS: Chapter[] = [
  { id: "engineering", title: "Engineering", tag: "Build", blurb: "From the first lines of code to CTO.", c: "--accent" },
  { id: "content", title: "Content", tag: "Share", blurb: "What I write, save and put out online.", c: "--c4" },
  { id: "community", title: "Community", tag: "Grow", blurb: "The people I have helped bring together.", c: "--c2" },
  { id: "teaching", title: "Teaching", tag: "Impact", blurb: "Opening up STEM and engineering to younger learners.", c: "--c3" },
  { id: "hobbies", title: "Fun", tag: "Play", blurb: "Anime, the gym and Strava kilometers.", c: "--c1" },
  { id: "about", title: "Say hi", tag: "Contact", blurb: "Who I am, and how to reach me.", c: "#c5f27a" },
];

/** Red strings between landing notes (by note key). */
export const STRING_LINKS: [string, string][] = [
  ["eng", "con"], ["con", "com"], ["com", "tea"], ["tea", "eng"], ["tea", "fun"], ["fun", "hi"],
];

/** Port66 screenshots (files in /public/port66). */
export const SHOTS: { src: string; title: string; caption: string }[] = [
  { src: "/port66/port66-collectors-marketplace.jpg", title: "The collectors marketplace", caption: "Buy and sell fashion, cards and watches, and find the people who know your next piece." },
  { src: "/port66/port66-brand-partnerships.jpg", title: "Brand partnerships", caption: "A 3D tower with seven billboard screens that brands book a day at a time." },
  { src: "/port66/port66-rwa.jpg", title: "Port66 RWA", caption: "Real-world luxury, tokenized: live assets, an exchange and a launchpad." },
];

/** Simple Icons outlines (CC0), keyed by slug. */
export const LOGOS = logos as Record<string, Logo>;

/** Tools page: label + logo slug. */
export const TOOLS: [string, string][] = [
  ["TypeScript", "typescript"], ["React", "react"], ["Next.js", "next"], ["Node.js", "node"], ["Express", "express"],
  ["MongoDB", "mongodb"], ["Tailwind CSS", "tailwind"], ["Python", "python"], ["Solidity", "solidity"], ["Rust", "rust"],
];

export const TEACH = [
  { t: "STEMTisha FutureCoders", m: "The program I run. Younger learners explore STEM and engineering, starting with their first lines of code, with design thinking built in." },
  { t: "TechGen Africa", m: "Built and led a tech community of hundreds." },
];

/** Placeholder posts for /content/writings. Replace with real posts. */
export const POSTS: { title: string; cat: string }[] = [
  { title: "What teaching taught me about shipping", cat: "notes" },
  { title: "Putting real-world assets on Solana", cat: "engineering" },
  { title: "The small details users feel", cat: "craft" },
];
export const POST_CATS = ["all", "craft", "engineering", "notes", "misc"];
