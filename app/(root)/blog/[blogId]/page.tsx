import { caller, HydrateClient, prefetch, trpc } from "@/trpc/server";
import BlogDetailsView from "@/views/BlogDetailsView";

export const revalidate = 3600;

type Props = Readonly<{
  params: Promise<{ blogId: string }>;
}>;

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
