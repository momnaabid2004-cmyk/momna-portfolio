/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // Tree-shake heavy packages so only what we import is bundled.
  experimental: { optimizePackageImports: ["framer-motion"] },
};

export default nextConfig;
