/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { createTRPCContext } from "@/trpc";
import { makeQueryClient } from "@/trpc/query-client";
import { appRouter } from "@/trpc/routers/_app";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { cache } from "react";

export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const HydrateClient = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
};

export const prefetch = <T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T
) => {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
};

export const caller = appRouter.createCaller(createTRPCContext);
