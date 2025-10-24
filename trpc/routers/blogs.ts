import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItem, readItems } from "@directus/sdk";
import z from "zod";

const fields = [
  "title",
  "date_created",
  "date_updated",
  "categories",
  "content",
  "featured_image",
  "summary",
  "id",
  "status",
  "rating",
  {
    user_created: ["first_name", "last_name", "email", "avatar", "description"],
  },
] as const;

export const blogsRouter = createTRPCRouter({
  getAll: baseProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(20).default(10),
        cursor: z.number().nonnegative().optional().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const items = await ctx.directus
        .request(
          readItems("blogs", {
            limit: limit + 1,
            offset: cursor,
            filter: { status: { _eq: "published" } },
            fields: fields.filter((field) => field !== "content"),
            sort: ["-date_created"],
          })
        )
        .catch((error) => handleError(error));
      const hasMore = items.length > limit;
      const results = hasMore ? items.slice(0, limit) : items;
      const nextCursor = hasMore ? cursor + limit : undefined;

      return {
        items: results,
        nextCursor,
      };
    }),
  getOneById: baseProcedure
    .input(z.object({ blogId: z.uuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.directus
        .request(readItem("blogs", input.blogId, { fields }))
        .catch((error) => handleError(error));
    }),
});
