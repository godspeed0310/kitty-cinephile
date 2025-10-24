"use client";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

type Props = Readonly<{
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}>;

const InfiniteScroll = ({
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: Props) => {
  const { isIntersecting, targetRef } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "200px",
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col items-center justify-center my-5">
      <div ref={targetRef} className="h-1" />
      {isFetchingNextPage && hasNextPage ? (
        <Loader2 className="animate-spin" />
      ) : (
        <p className="text-sm text-muted-foreground">
          You have reached the end of the list.
        </p>
      )}
    </div>
  );
};
export default InfiniteScroll;
