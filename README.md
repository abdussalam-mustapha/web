# Mustapha's portfolio (Next.js)

The Next.js (App Router, TypeScript) version of `../index.html`. It is a static export: `npm run build` writes a plain site to `out/` that any static host can serve.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npm run lint
```

## Where things live
- `src/app/`: one folder per route (`/engineering`, `/work`, `/work/port66`, `/tools`, `/content`, `/content/writings`, `/content/bookmarks`, `/community`, `/teaching`, `/fun`, `/about`, `/guestbook`, `/desk`, `/rabbit-hole`). `globals.css` is the original stylesheet, ported verbatim.
- `src/data/`: all copy and content (stories, roles, timeline, chapters, tools, contact links). Edit text here.
- `src/components/site/`: app shell. `SiteProvider` (page curtain, toast, sheet state), `Sheet` (story, role, finale, lightbox), `Header`, `CommandPalette`, `Intro`, `Chrome` (scroll bar, cursor tag, footer clothesline), `NextChapter`.
- `src/components/notes/`: `Note` (pin, drag, tilt, READ stamp, opens sheets), `Board`, `Strings`, `ToolLogo`.
- `src/components/home/Whiteboard.tsx`: the hero (marker writing, eraser, drawing canvas).
- `src/components/work/Timeline.tsx`: the career timeline on a string.
- `src/components/pages/`: Port66 shots, writings filter, desk, guestbook, terminal.

## Notes
- localStorage keys match the old site (`read`, `fin`, `gb`), so returning visitors keep their READ stamps and guestbook notes.
- Old hash links (`/#about`) redirect to the real routes.
- The guestbook is browser-only. To make it a shared wall, replace `load()`/`save()` in `src/components/pages/Guestbook.tsx` with a backend (with moderation and rate limiting).
- See `../CONVERSION_NOTES.md` for content rules and the placeholders still to fill.
