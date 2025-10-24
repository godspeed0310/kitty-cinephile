import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { getDirectusAssetUrl } from "@/lib/utils";
import { Blog } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";

type Props = Readonly<{
  blog: Blog;
}>;

const BlogCard = ({ blog }: Props) => {
  return (
    <Link href={`/blog/${blog.id}`}>
      <article className="flex flex-col gap-y-1">
        <div className="w-full aspect-video relative">
          <ViewTransition name={`image-${blog.id}`}>
            <Image
              src={getDirectusAssetUrl(blog.featured_image)}
              alt={blog.title}
              width={500}
              height={281.25}
              className="aspect-video"
              loading="lazy"
              fetchPriority="low"
            />
          </ViewTransition>
        </div>
        <h2 className="text-xl font-bold line-clamp-2 mt-2 font-noto-serif-display wrap-break-word">
          {blog.title}
        </h2>
        <ViewTransition name={`summary-${blog.id}`}>
          <p className="text-sm text-muted-foreground">{blog.summary}</p>
        </ViewTransition>
        <ViewTransition name={`category-${blog.id}`}>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.categories.map((category) => (
              <Badge className="rounded-full" variant="outline" key={category}>
                {category}
              </Badge>
            ))}
          </div>
        </ViewTransition>
        <ViewTransition name={`rating-${blog.id}`}>
          <StarRating
            variant="compact"
            rating={blog.rating}
            className="hidden md:flex mt-1"
          />
        </ViewTransition>
      </article>
    </Link>
  );
};

export default BlogCard;
