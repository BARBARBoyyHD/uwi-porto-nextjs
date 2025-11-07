import type { NextConfig } from "next";
import BundleAnalyzer from "@next/bundle-analyzer";
import { HOSTNAME } from "@/config/supabaseKey";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: HOSTNAME,
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  webpack: (config) => {
    config.cache = {
      type: "filesystem",
      compression: "brotli",
    };
    return config;
  },
};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
