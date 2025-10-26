import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type Author =
  inferRouterOutputs<AppRouter>["blogs"]["getOneById"]["user_created"];
