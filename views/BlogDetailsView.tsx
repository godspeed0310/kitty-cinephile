"use client";

import AuthorSubscriptionForm from "@/components/AuthorSubscriptionForm";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/UserAvatar";
import { directusImageLoader } from "@/lib/directusImageLoader";
import { sanitizeContent } from "@/lib/sanitize";
import { formatDate, getFullName } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";
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
  const fullName = useMemo(() => getFullName(user), [user]);
  const formattedDate = useMemo(
    () => formatDate(details.date_created),
    [details.date_created]
  );
  const time = useMemo(
    () => readingTime(details.content).text,
    [details.content]
  );
  const sanitizedContent = useMemo(
    () => sanitizeContent(details.content),
    [details.content]
  );

  return (
    <main>
      <div className="relative w-full aspect-video">
        <Image
          src={details.featured_image}
          loader={directusImageLoader}
          alt={details.title}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          quality={85}
        />
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row gap-3 mt-3">
        <div className="md:flex-1 flex flex-col">
          <h1 className="text-3xl font-bold font-noto-serif-display wrap-break-word">
            {details.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {details.categories.map((category) => (
              <Badge key={category} className="rounded-full" variant="outline">
                {category}
              </Badge>
            ))}
          </div>
          <StarRating rating={details.rating} className="mt-3" />
          <div className="flex flex-col md:flex-row gap-x-5 py-5">
            <div className="shrink-0 md:border-r md:border-muted-foreground flex flex-col justify-center">
              <p className="md:pr-5 text-muted-foreground text-sm">
                {formattedDate}
              </p>
              <p className="md:pr-5 text-muted-foreground text-sm">{time}</p>
            </div>
            <h2 className="text-sm mt-3 md:mt-0 text-muted-foreground">
              {details.summary}
            </h2>
          </div>
          <div className="flex md:hidden gap-3 mb-5 items-center">
            <UserAvatar imageId={user.avatar} name={getFullName(user)} />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold">{fullName}</h3>
              <p className="text-xs text-muted-foreground">
                {details.user_created.description ??
                  "No description available."}
              </p>
            </div>
          </div>
          <AuthorSubscriptionForm author={user} className="md:hidden" />
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        </div>
        <div className="hidden md:block md:w-[30%] xl:w-1/5 sticky top-5 border-l border-muted pl-5 py-5 space-y-3">
          <h2 className="font-bold text-xl">About the Author</h2>
          <div className="flex items-center gap-x-5">
            <UserAvatar
              imageId={user.avatar}
              name={getFullName(user)}
              size="lg"
            />
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold">{fullName}</h3>
              <p className="text-xs text-muted-foreground">
                {details.user_created.description ??
                  "No description available."}
              </p>
            </div>
          </div>
          <AuthorSubscriptionForm author={user} />
        </div>
      </div>
    </main>
  );
};

export default BlogDetailsView;
