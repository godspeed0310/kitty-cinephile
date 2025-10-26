"use client";

import BlogCard from "@/components/BlogCard";
import FeaturedBlog from "@/components/FeaturedBlog";
import InfiniteScroll from "@/components/InfiniteScroll";
import NewsletterForm from "@/components/NewsletterForm";
import { DEFAULT_FETCH_LIMIT } from "@/constants/trpc";
import { useTRPC } from "@/trpc/client";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

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

  const allBlogs = data.pages.flatMap((page) => page.items);
  const [featured, ...rest] = allBlogs;

  return (
    <main className="flex flex-col space-y-5">
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
