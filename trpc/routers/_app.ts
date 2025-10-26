import { createTRPCRouter } from "@/trpc";
import { blogsRouter } from "@/trpc/routers/blogs";
import { metadataRouter } from "@/trpc/routers/metadata";
import { newsletterRouter } from "@/trpc/routers/newsletter";
import { resourcesRouter } from "@/trpc/routers/resources";
import { webhooksRouter } from "@/trpc/routers/webhooks";

export const appRouter = createTRPCRouter({
  blogs: blogsRouter,
  metadata: metadataRouter,
  webhooks: webhooksRouter,
  resources: resourcesRouter,
  newsletter: newsletterRouter,
});

export type AppRouter = typeof appRouter;
