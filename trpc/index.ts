import { directus } from "@/lib/directus";
import { initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(
  async (opts?: FetchCreateContextFnOptions) => {
    const ip = opts?.req.headers.get("x-forwarded-for") ?? "unknown-ip";
    return { directus, ip };
  }
);

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
});
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
