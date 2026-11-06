import type { NextConfig } from "next";

/**
 * Static export: `npm run build` writes a plain HTML/CSS/JS site to `out/`
 * that any static host (GitHub Pages, Netlify, Vercel, S3...) can serve.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // The dev-only "N" badge sat on top of the mobile tab bar. Errors still show when they happen.
  devIndicators: false,
};

export default nextConfig;
