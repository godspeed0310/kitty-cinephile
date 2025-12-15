import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { directusImageLoader } from "@/lib/directusImageLoader";
import { formatDate, getFullName } from "@/lib/utils";
import { Blog } from "@/types/Blog";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type Props = Readonly<{
  blog: Blog;
}>;

const FeaturedBlog = ({ blog }: Props) => {
  const fullName = useMemo(
    () => getFullName(blog.user_created),
    [blog.user_created]
  );
  const publishedDate = useMemo(
    () => formatDate(blog.date_created),
    [blog.date_created]
  );

  return (
    <Link href={`/blog/${blog.id}`}>
      <article className="w-full relative">
        <div className="w-full aspect-video relative">
          <Image
            src={blog.featured_image}
            loader={directusImageLoader}
            alt={blog.title}
            fill
            sizes="(min-width: 1360px) 1241px, calc(94.33vw - 22px)"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="hidden md:block md:absolute md:inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent z-10" />
        <div
          className="md:absolute bottom-5 left-5 items-center justify-center right-5 mt-2 md:mt-0 space-y-1 z-20"
          suppressHydrationWarning
        >
          <StarRating rating={blog.rating} className="hidden md:flex" />
          <h2 className="lg:text-3xl text-xl font-bold lg:max-w-4xl lg:mb-3 font-noto-serif-display w-[90%] lg:w-full line-clamp-2 wrap-break-word md:mb-2">
            {blog.title}
          </h2>
          <div className="w-full flex flex-row gap-5 items-start justify-end">
            <p className="text-sm text-muted-foreground md:text-foreground flex-1 md:line-clamp-2 wrap-break-word">
              {blog.summary}
            </p>
            <div className="flex flex-row gap-10 ml-auto">
              <div className="hidden md:flex flex-col items-start text-sm justify-start border-l border-foreground pl-2">
                <h3>Written by</h3>
                <p className="font-bold">{fullName}</p>
              </div>
              <div className="hidden md:flex flex-col items-start text-sm justify-start border-l border-foreground pl-2">
                <h3>Published on</h3>
                <p className="font-bold">{publishedDate}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 md:hidden">
            {blog.categories.map((category) => (
              <Badge className="rounded-full" variant="outline" key={category}>
                {category}
              </Badge>
            ))}
          </div>
          <StarRating
            rating={blog.rating}
            variant="compact"
            className="mt-2 md:hidden"
          />
        </div>
      </article>
    </Link>
  );
};

export default FeaturedBlog;
