"use client";

import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { sanitizeContent } from "@/lib/sanitize";
import { formatDate, getDirectusAssetUrl, getFullName } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import readingTime from "reading-time";

type Props = Readonly<{
  blogId: string;
}>;

const BlogDetailsView = ({ blogId }: Props) => {
  const trpc = useTRPC();
  const { data: details } = useSuspenseQuery(
    trpc.blogs.getOneById.queryOptions({ blogId })
  );

  const user = details.user_created;
  const fullName = getFullName(user);
  const formattedDate = formatDate(details.date_created);
  const { text: time } = readingTime(details.content);
  const sanitizedContent = sanitizeContent(details.content);

  return (
    <main>
      <div className="relative w-full aspect-video">
        <Image
          src={getDirectusAssetUrl(details.featured_image)}
          alt={details.title}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row gap-3 mt-3">
        <div className="md:flex-1 flex flex-col">
          <h1 className="text-3xl font-bold font-noto-serif-display wrap-break-word">
            {details.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {details.categories.map((category) => (
              <Badge className="rounded-full" variant="outline" key={category}>
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-x-5 py-5">
            <div className="border-r border-none shrink-0 md:border-solid border-muted-foreground flex flex-col justify-center">
              <p className="pr-5 text-muted-foreground text-sm">
                {formattedDate}
              </p>
              <p className="pr-5 text-muted-foreground text-sm">{time}</p>
            </div>
            <h2 className="text-sm mt-3 text-muted-foreground">
              {details.summary}
            </h2>
          </div>
          <div className="flex md:hidden flex-row gap-3 mb-5 items-center">
            <UserAvatar imageId={user.avatar} name={getFullName(user)} />
            <div className="flex-1 flex flex-col items-start justify-center">
              <h3 className="font-bold">{fullName}</h3>
              <p className="text-xs text-muted-foreground">
                {details.user_created.description ||
                  "No description available."}
              </p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
        <div className="h-min border-l border-muted pl-5 py-5 space-y-3 hidden md:block md:w-[30%] xl:w-1/5">
          <h2 className="font-bold text-xl">About the Author</h2>
          <div className="flex flex-row items-center gap-x-5">
            <UserAvatar
              imageId={user.avatar}
              name={getFullName(user)}
              size="lg"
            />
            <div className="flex-1 flex flex-col items-start justify-center">
              <h3 className="font-bold">{fullName}</h3>
              <p className="text-xs text-muted-foreground">
                {details.user_created.description ||
                  "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsView;
