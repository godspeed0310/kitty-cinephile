import { STATIC_DESCRIPTION, STATIC_TITLE } from "@/constants/metadata";
import { getBaseUrl, getDirectusAssetUrl, getFullName } from "@/lib/utils";
import { caller } from "@/trpc/server";
import RSS from "rss";

export const revalidate = 3600;

const handler = async () => {
  const feed = new RSS({
    title: STATIC_TITLE,
    description: STATIC_DESCRIPTION,
    feed_url: `${getBaseUrl()}/feed.xml`,
    webMaster: `dharamsoni1010@gmail.com (Dharam Soni)`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Kitty Cinephile`,
    language: "en-US",
    pubDate: new Date().toUTCString(),
    site_url: getBaseUrl(),
    ttl: 60,
  });

  const blogs = await caller.metadata.getRssPosts();

  blogs.forEach((blog) => {
    feed.item({
      title: blog.title,
      description: blog.summary,
      url: `${getBaseUrl()}/blog/${blog.id}`,
      date: new Date(blog.date_created).toUTCString(),
      custom_elements: [{ "content:encoded": `<![CDATA[${blog.content}]]>` }],
      categories: blog.categories,
      author: getFullName(blog.user_created),
      enclosure: {
        url: getDirectusAssetUrl({
          assetId: blog.featured_image,
          width: 1200,
          height: 630,
        }),
        type: "image/webp",
      },
    });
  });

  const rssFeed = feed.xml({ indent: true });

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
};

export { handler as GET };

