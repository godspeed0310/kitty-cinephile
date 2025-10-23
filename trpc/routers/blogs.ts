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
] as const;

export const blogsRouter = createTRPCRouter({
  getAll: baseProcedure.query(async ({ ctx }) => {
    return await ctx.directus
      .request(
        readItems("blogs", {
          filter: { status: { _eq: "published" } },
          fields,
          sort: ["-date_created"],
        })
      )
      .catch((error) => handleError(error));
  }),
  getOneById: baseProcedure
    .input(z.object({ blogId: z.uuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.directus
        .request(readItem("blogs", input.blogId, { fields }))
        .catch((error) => handleError(error));
    }),
});
