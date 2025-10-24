import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useLightningcss: true,
    typedEnv: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "directus.thehightable.app",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
