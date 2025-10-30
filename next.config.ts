import type { NextConfig } from "next";
import BundleAnalyzer from "@next/bundle-analyzer";
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lyqxnzgfylspkrgjpvdu.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  cacheComponents: true,
  experimental: {
    useCache: true,
  },
};

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
