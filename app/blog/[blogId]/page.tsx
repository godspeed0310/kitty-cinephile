import { Badge } from "@/components/ui/badge";
import { sanitizeContent } from "@/lib/sanitize";
import { getDirectusAssetUrl, getFullName } from "@/lib/utils";
import { caller } from "@/trpc/server";
import Image from "next/image";

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

  const details = await caller.blogs.getOneById({ blogId });
  const user = details.user_created;
  const fullName = getFullName(user);
  const featuredImage = getDirectusAssetUrl(details.featured_image);

  return (
    <div className="py-5 flex flex-col gap-5">
      <Image src={featuredImage} alt={details.title} width={600} height={400} />
      <h1 className="text-2xl font-bold">{details.title}</h1>
      <div className="flex flex-row gap-x-2">
        {details.categories.map((category) => (
          <Badge key={category}>{category}</Badge>
        ))}
      </div>
      <p className="font-bold text-sm">By {fullName}</p>
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
