"use client";

import BlogCard from "@/components/BlogCard";
import FeaturedBlog from "@/components/FeaturedBlog";
import InfiniteScroll from "@/components/InfiniteScroll";
import NewsletterForm from "@/components/NewsletterForm";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { STATIC_DESCRIPTION, STATIC_TITLE } from "@/constants/metadata";
import { DEFAULT_FETCH_LIMIT } from "@/constants/trpc";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo } from "react";

const HomeView = () => {
  const trpc = useTRPC();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.blogs.getAll.infiniteQueryOptions(
        { limit: DEFAULT_FETCH_LIMIT },
        {
          getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
      )
    );

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: STATIC_TITLE,
      description: STATIC_DESCRIPTION,
      url: "https://kitty-cinephile.vercel.app",
    }),
    []
  );

  const allBlogs = data.pages.flatMap((page) => page.items);
  const [featured, ...rest] = allBlogs;

  if (allBlogs.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <Image src="/empty.svg" alt="No Blogs" width={120} height={120} />
          <EmptyTitle>No Blogs Found</EmptyTitle>
          <EmptyDescription>
            But fret not, our paws are hard at work bringing you something
            incredible, Meow! Stay tuned for updates and check back soon for the
            latest blog posts.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="flex flex-col space-y-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeaturedBlog blog={featured} />
      <NewsletterForm />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <InfiniteScroll
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
      />
    </main>
  );
};

export default HomeView;
