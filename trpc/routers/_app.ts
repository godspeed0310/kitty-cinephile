import { createTRPCRouter } from "@/trpc";
import { blogsRouter } from "@/trpc/routers/blogs";
import { metadataRouter } from "@/trpc/routers/metadata";

export const appRouter = createTRPCRouter({
  blogs: blogsRouter,
  metadata: metadataRouter,
});

export type AppRouter = typeof appRouter;
