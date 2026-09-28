/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local static assets are served as-is to avoid platform sharp dependencies.
    unoptimized: true,
  },
};

export default nextConfig;
