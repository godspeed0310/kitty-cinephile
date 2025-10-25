import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItem, readItems } from "@directus/sdk";
import z from "zod";

export const metadataRouter = createTRPCRouter({
  getStaticParams: baseProcedure.query(async ({ ctx }) => {
    return await ctx.directus
      .request(
        readItems("blogs", {
          fields: ["id"],
          filter: { status: { _eq: "published" } },
        })
      )
      .catch((error) => handleError(error));
  }),
  getSeoMetadata: baseProcedure
    .input(z.object({ blogId: z.uuid() }))
    .query(async ({ ctx, input }) => {
      return await ctx.directus
        .request(
          readItem("blogs", input.blogId, {
            fields: [
              "title",
              "summary",
              "featured_image",
              "date_created",
              "date_updated",
              "categories",
              {
                user_created: ["first_name", "last_name"],
              },
            ],
          })
        )
        .catch((error) => handleError(error));
    }),
  getRssPosts: baseProcedure.query(async ({ ctx }) => {
    return await ctx.directus
      .request(
        readItems("blogs", {
          fields: [
            "title",
            "summary",
            "id",
            "date_created",
            "content",
            "categories",
            {
              user_created: ["first_name", "last_name"],
            },
          ],
          filter: { status: { _eq: "published" } },
          sort: ["-date_created"],
        })
      )
      .catch((error) => handleError(error));
  }),
});
