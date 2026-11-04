import type { CSSProperties, ReactNode } from "react";
import { SHOW_PLACEHOLDERS } from "@/data/placeholders";

/** A dashed "fill this in" box. Renders nothing unless placeholders are switched on. */
export function Ph({ as: Tag = "p", style, children }: { as?: "p" | "span" | "div"; style?: CSSProperties; children: ReactNode }) {
  if (!SHOW_PLACEHOLDERS) return null;
  return <Tag className="ph" style={style}>{children}</Tag>;
}
