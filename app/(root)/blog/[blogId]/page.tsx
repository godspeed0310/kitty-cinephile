import { getBaseUrl, getDirectusAssetUrl, getFullName } from "@/lib/utils";
import { caller, HydrateClient, prefetch, trpc } from "@/trpc/server";
import BlogDetailsView from "@/views/BlogDetailsView";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = Readonly<{
  params: Promise<{ blogId: string }>;
}>;

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { blogId } = await params;
  try {
    const blog = await caller.metadata.getSeoMetadata({ blogId });
    const authorName = getFullName(blog.user_created);
    const baseUrl = getBaseUrl();

    return {
      title: blog.title,
      description: blog.summary,
      authors: [{ name: authorName }],
      keywords: blog.categories,
      openGraph: {
        title: blog.title,
        description: blog.summary,
        type: "article",
        publishedTime: blog.date_created,
        modifiedTime: blog.date_updated,
        authors: [authorName],
        images: getDirectusAssetUrl({
          assetId: blog.featured_image,
          width: 1200,
          height: 630,
        }),
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.summary,
        images: getDirectusAssetUrl({
          assetId: blog.featured_image,
          width: 1200,
          height: 630,
        }),
      },
      alternates: {
        canonical: `${baseUrl}/blog/${blogId}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog could not be found.",
    };
  }
};

export const generateStaticParams = async () => {
  const params = await caller.metadata.getStaticParams();
  return params.map((param) => ({
    blogId: param.id,
  }));
};

const BlogDetails = async ({ params }: Props) => {
  const { blogId } = await params;
  void prefetch(trpc.blogs.getOneById.queryOptions({ blogId }));

  return (
    <HydrateClient>
      <BlogDetailsView blogId={blogId} />
    </HydrateClient>
  );
};

export default BlogDetails;
