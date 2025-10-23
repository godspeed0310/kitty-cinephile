import { handleError } from "@/lib/utils";
import { baseProcedure, createTRPCRouter } from "@/trpc";
import { readItems } from "@directus/sdk";
import z from "zod";

export const webhooksRouter = createTRPCRouter({
  getAuthorRevalidationPaths: baseProcedure
    .input(z.object({ authorId: z.uuid() }))
    .query(async ({ input, ctx }) => {
      return await ctx.directus
        .request(
          readItems("blogs", {
            fields: ["id"],
            filter: {
              user_created: { id: { _eq: input.authorId } },
              status: { _eq: "published" },
            },
          })
        )
        .catch((error) => handleError(error));
    }),
});
