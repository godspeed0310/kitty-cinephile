import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItems } from "@directus/sdk";

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
});
