import type { NextConfig } from "next";

const LEADGEN_API_URL =
  process.env.LEADGEN_API_URL || "http://127.0.0.1:3200";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/leadgen/:path*",
        destination: `${LEADGEN_API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
