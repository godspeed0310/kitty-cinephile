import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type BlogMetadata =
  inferRouterOutputs<AppRouter>["blogs"]["getOneById"]["metadata"];
