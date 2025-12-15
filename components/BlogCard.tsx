import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { directusImageLoader } from "@/lib/directusImageLoader";
import { Blog } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";

type Props = Readonly<{
  blog: Blog;
}>;

const BlogCard = ({ blog }: Props) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <article className="flex flex-col gap-y-1">
        <div className="w-full aspect-video relative">
          <Image
            src={blog.featured_image}
            loader={directusImageLoader}
            alt={blog.title}
            fill
            className="aspect-video"
            loading="lazy"
            fetchPriority="low"
          />
        </div>
        <h2 className="text-xl font-bold line-clamp-2 mt-2 font-noto-serif-display wrap-break-word">
          {blog.title}
        </h2>
        <p className="text-sm text-muted-foreground">{blog.summary}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.categories.map((category) => (
            <Badge className="rounded-full" variant="outline" key={category}>
              {category}
            </Badge>
          ))}
        </div>
        <StarRating variant="compact" rating={blog.rating} className="mt-1" />
      </article>
    </Link>
  );
};

export default BlogCard;
