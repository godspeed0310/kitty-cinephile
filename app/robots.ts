import { getBaseUrl } from "@/lib/utils";
import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const baseUrl = getBaseUrl();

  const aiScrappers = [
    "GPTBot",
    "ChatGPT-User",
    "CCBot",
    "anthropic-ai",
    "Claude-Web",
    "ClaudeBot",
    "Google-Extended",
    "GoogleOther",
    "Omgilibot",
    "FacebookBot",
    "Diffbot",
    "Bytespider",
    "ImagesiftBot",
    "cohere-ai",
    "PerplexityBot",
    "Applebot-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: aiScrappers,
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
};
export default robots;
