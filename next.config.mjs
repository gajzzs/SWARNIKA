/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  ...(staticExport ? { output: "export", trailingSlash: true } : {}),
  images: staticExport ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
