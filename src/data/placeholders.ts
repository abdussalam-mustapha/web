/**
 * Placeholders ("Add your Strava link here", dashed photo boxes, sample posts...) are kept in the
 * code so we can fill them later, but are hidden on the live site.
 *
 * See them all:  NEXT_PUBLIC_SHOW_PLACEHOLDERS=1 npm run dev
 * The full list of what is still missing is in ../CONVERSION_NOTES.md ("Placeholders still to fill").
 */
export const SHOW_PLACEHOLDERS = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "1";

/** The posts in POSTS (site.ts) are sample titles, not real writing yet. */
export const POSTS_ARE_SAMPLES = true;
