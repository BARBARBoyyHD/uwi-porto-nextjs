import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: ['lyqxnzgfylspkrgjpvdu.supabase.co'], // Deprecated way to do it
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lyqxnzgfylspkrgjpvdu.supabase.co",
        port: "", // Leave empty if default port (443 for https)
        pathname: "/storage/v1/object/public/**", // Optional: restrict to a specific path if desired
      },
      // You can add other external domains here if needed
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }
    // Important: return the modified config
    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
