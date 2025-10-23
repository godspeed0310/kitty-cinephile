import { createTRPCRouter } from "@/trpc";
import { blogsRouter } from "@/trpc/routers/blogs";
import { metadataRouter } from "@/trpc/routers/metadata";
import { webhooksRouter } from "@/trpc/routers/webhooks";

export const appRouter = createTRPCRouter({
  blogs: blogsRouter,
  metadata: metadataRouter,
  webhooks: webhooksRouter,
});

export type AppRouter = typeof appRouter;
