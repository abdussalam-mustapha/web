import type { ReactNode } from "react";
import type { NoteData } from "@/data/types";
import { Note } from "./Note";
import { Strings } from "./Strings";

interface Props {
  notes?: NoteData[];
  /** Smaller grid (fact notes, next chapter) */
  small?: boolean;
  /** Draw red strings between notes that have a `k` */
  strings?: boolean;
  id?: string;
  children?: ReactNode;
}

/** A grid of pinned notes. Extra raw items (polaroids, swatches) can be passed as children. */
export function Board({ notes = [], small, strings, id, children }: Props) {
  return (
    <div id={id} className={"board" + (small ? " sm" : "") + (strings ? " str" : "")}>
      {notes.map((n, i) => (
        <Note key={i} idx={i} {...n} />
      ))}
      {children}
      {strings && <Strings />}
    </div>
  );
}
