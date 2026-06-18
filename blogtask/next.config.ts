import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog-api-t6u0.onrender.com",
      },
    ],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
