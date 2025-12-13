import { serverEnv } from "@/env/env.server";
import { followRateLimit, subscribeRateLimit } from "@/lib/upstash";
import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const newsletterRouter = createTRPCRouter({
  addPlatformSubscription: baseProcedure
    .input(
      z.object({
        email: z.email(),
        tag: z.string().default("platform"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, tag } = input;
      const timeout = 30000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const emailRatelimit = subscribeRateLimit.limit(email);
        const ipRatelimit = subscribeRateLimit.limit(ctx.ip);

        const [emailLimit, ipLimit] = await Promise.all([
          emailRatelimit,
          ipRatelimit,
        ]);

        if (!emailLimit.success || !ipLimit.success) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Rate limit exceeded. Please try again later.",
          });
        }

        const response = await fetch(
          serverEnv.DIRECTUS_NEWSLETTER_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              tag: tag,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: response.statusText,
          });
        }
      } catch (error) {
        clearTimeout(timeoutId);
        return handleError(error);
      }
    }),

  addAuthorSubscription: baseProcedure
    .input(
      z.object({
        email: z.email(),
        authorId: z.uuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, authorId } = input;
      const timeout = 30000;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      try {
        const emailRatelimit = followRateLimit.limit(email);
        const ipRatelimit = followRateLimit.limit(ctx.ip);

        const [emailLimit, ipLimit] = await Promise.all([
          emailRatelimit,
          ipRatelimit,
        ]);

        if (!emailLimit.success || !ipLimit.success) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Rate limit exceeded. Please try again later.",
          });
        }

        const response = await fetch(
          serverEnv.DIRECTUS_NEWSLETTER_WEBHOOK_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              tag: authorId,
            }),
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: response.statusText,
          });
        }
      } catch (error) {
        clearTimeout(timeoutId);
        return handleError(error);
      }
    }),
});
