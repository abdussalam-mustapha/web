import type { NoteColor } from "@/data/types";

/** Colour token -> [paper pastel, pin colour]. Literal colours get a purple pin. */
const PASTELS: Record<string, [string, string]> = {
  "--accent": ["#ffe66d", "#e63946"],
  "--c4": ["#ffb3d1", "#2a9d8f"],
  "--c2": ["#a8f0cf", "#e63946"],
  "--c3": ["#d2bfff", "#f4a261"],
  "--c1": ["#ffc58a", "#06a77d"],
};

export function noteColors(c: NoteColor): [string, string] {
  return PASTELS[c] ?? [c, "#7b2cbf"];
}

/** Pin tilt angles, cycled per note so pins do not all lean the same way. */
export const PIN_TILT = [-20, 14, -12, 22, -16, 18];

export const COLOR_CYCLE: NoteColor[] = ["--accent", "--c4", "--c2", "--c3", "--c1"];
export const TILT_CYCLE = [-2, 1.5, -1, 2, -1.5, 1];
