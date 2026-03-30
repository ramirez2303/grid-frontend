import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.formula1.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
