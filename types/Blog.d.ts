import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type Blog = inferRouterOutputs<AppRouter>["blogs"]["getOneById"];
