import { serverEnv } from "@/env/env.server";
import { caller } from "@/trpc/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import z from "zod";

const PayloadSchema = z.object({
  keys: z.array(z.uuid()),
  collection: z.literal("directus_users"),
});

const handler = async (req: Request) => {
  const SIGNING_SECRET = serverEnv.DIRECTUS_WEBHOOK_SECRET;
  const incomingSecret = req.headers.get("x-directus-secret");
  const rawBody = await req.json();
  const validationResult = PayloadSchema.safeParse(rawBody);

  if (incomingSecret !== SIGNING_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  } else if (!validationResult.success) {
    return new NextResponse("Bad Request", { status: 400 });
  } else {
    const { keys: authorIds } = validationResult.data;
    const homePath = "/";
    const rssFeedPath = "/feed.xml";
    const blogsFromAuthors = await Promise.all(
      authorIds.map(async (authorId) =>
        caller.webhooks.getAuthorRevalidationPaths({ authorId })
      )
    );

    const blogIds = blogsFromAuthors.flat().map((blog) => blog.id);

    revalidatePath(homePath);
    const revalidatedPaths = blogIds.map((blogId) => {
      const path = `/blog/${blogId}`;
      revalidatePath(path);
      return path;
    });
    revalidatePath(rssFeedPath);

    return NextResponse.json({
      revalidated: true,
      authors: authorIds,
      paths: [homePath, ...revalidatedPaths, rssFeedPath],
      blogCount: blogIds.length,
      now: Date.now(),
    });
  }
};

export { handler as POST };

