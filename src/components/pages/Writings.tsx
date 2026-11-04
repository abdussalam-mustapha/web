"use client";

import { useState } from "react";
import { POSTS, POST_CATS } from "@/data/site";
import { Board } from "@/components/notes/Board";
import type { NoteColor } from "@/data/types";

const CS: NoteColor[] = ["--c4", "--c3", "--c2", "--accent", "--c1"];
const RS = [-2, 1.5, -1, 2];

/** Category chips filtering the (placeholder) posts. */
export function Writings() {
  const [cat, setCat] = useState("all");
  const list = POSTS.filter((p) => cat === "all" || p.cat === cat);
  return (
    <>
      <div className="chips" role="group" aria-label="Category">
        {POST_CATS.map((c) => (
          <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div id="wl">
        {list.length ? (
          <Board
            key={cat}
            notes={list.map((p, i) => ({ t: p.title, tag: p.cat, m: "Placeholder. Replace this with a real post.", c: CS[i % 5], r: RS[i % 4] }))}
          />
        ) : (
          <p className="lede">Nothing in {cat} yet.</p>
        )}
      </div>
    </>
  );
}
