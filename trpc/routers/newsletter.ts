import { followRateLimit, subscribeRateLimit } from "@/lib/upstash";
import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { createItem, readItems, updateItem } from "@directus/sdk";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const newsletterRouter = createTRPCRouter({
  addPlatformSubscription: baseProcedure
    .input(
      z.object({
        email: z.email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email } = input;
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

        const [existingSubscription] = await ctx.directus.request(
          readItems("newsletter_subscriptions", {
            fields: ["tags", "id"],
            filter: { email: { _eq: email } },
          })
        );
        if (
          existingSubscription &&
          existingSubscription.tags.includes("platform")
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already subscribed to the newsletter.",
          });
        } else if (existingSubscription) {
          const updatedTags = existingSubscription.tags.concat("platform");
          await ctx.directus.request(
            updateItem("newsletter_subscriptions", existingSubscription.id, {
              tags: updatedTags,
            })
          );
        } else {
          await ctx.directus.request(
            createItem("newsletter_subscriptions", {
              email,
              tags: ["platform"],
            })
          );
        }
      } catch (error) {
        console.log(error);
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

        const [existingSubscription] = await ctx.directus.request(
          readItems("newsletter_subscriptions", {
            fields: ["tags", "id"],
            filter: { email: { _eq: email } },
          })
        );
        if (
          existingSubscription &&
          existingSubscription.tags.includes(authorId)
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already following this author.",
          });
        } else if (existingSubscription) {
          const updatedTags = existingSubscription.tags.concat(authorId);
          await ctx.directus.request(
            updateItem("newsletter_subscriptions", existingSubscription.id, {
              tags: updatedTags,
            })
          );
        } else {
          await ctx.directus.request(
            createItem("newsletter_subscriptions", {
              email,
              tags: [authorId],
            })
          );
        }
      } catch (error) {
        return handleError(error);
      }
    }),
});
