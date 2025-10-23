import { Badge } from "@/components/ui/badge";
import { sanitizeContent } from "@/lib/sanitize";
import { caller } from "@/trpc/server";

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

  const details = await caller.blogs.getOneById({ blogId });

  return (
    <div className="py-5 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{details.title}</h1>
      <div className="flex flex-row gap-x-2">
        {details.categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">{details.summary}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizeContent(details.content),
        }}
      />
    </div>
  );
};

export default BlogDetails;
