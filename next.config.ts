import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  compress: true,
  experimental: {
    useLightningcss: true,
    typedEnv: true,
    viewTransition: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-avatar",
      "@radix-ui/react-label",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
    ],
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
    qualities: [75, 85],
  },
};

export default nextConfig;
