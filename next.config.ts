import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    useLightningcss: true,
    typedEnv: true,
  },
};

export default nextConfig;
