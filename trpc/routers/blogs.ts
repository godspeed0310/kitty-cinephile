import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItem, readItems } from "@directus/sdk";
import z from "zod";

const homeFields = [
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
    user_created: [
      "id",
      "first_name",
      "last_name",
      "email",
      "avatar",
      "description",
    ],
  },
] as const;

const detailsFields = [
  "title",
  "date_created",
  "date_updated",
  "media_type",
  "categories",
  "content",
  "featured_image",
  "summary",
  "id",
  "status",
  "rating",
  {
    user_created: [
      "id",
      "first_name",
      "last_name",
      "email",
      "avatar",
      "description",
    ],
    metadata: [
      "external_id",
      "title",
      "overview",
      "release_date",
      "runtime",
      "rating",
      "directors",
      "cast",
      "producers",
      "writers",
      "creators",
      "cinematographers",
      "genres",
    ],
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
            fields: homeFields.filter((field) => field !== "content"),
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
        .request(readItem("blogs", input.blogId, { fields: detailsFields }))
        .catch((error) => handleError(error));
    }),
});
