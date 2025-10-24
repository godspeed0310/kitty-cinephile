import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItems } from "@directus/sdk";

export const resourcesRouter = createTRPCRouter({
  getSitemapData: baseProcedure.query(async ({ ctx }) => {
    return await ctx.directus
      .request(
        readItems("blogs", {
          fields: ["id", "date_created", "date_updated"],
          filter: { status: { _eq: "published" } },
          sort: ["-date_created"],
        })
      )
      .catch((error) => handleError(error));
  }),
});
