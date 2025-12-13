import { getBaseUrl } from "@/lib/utils";
import { caller } from "@/trpc/server";
import { MetadataRoute } from "next";

export const revalidate = 3600;

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const baseUrl = getBaseUrl();
  const baseSitemap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
  ];

  try {
    const blogs = await caller.resources.getSitemapData();
    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.id}`,
      lastModified: new Date(blog.date_updated ?? blog.date_created),
      changeFrequency: "hourly",
      priority: 0.8,
    }));

    return [...baseSitemap, ...blogEntries];
  } catch (error) {
    return [...baseSitemap];
  }
};

export default sitemap;
