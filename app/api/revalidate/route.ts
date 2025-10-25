import { serverEnv } from "@/env/env.server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import z from "zod";

const PayloadSchema = z.object({
  keys: z.array(z.uuid()),
  collection: z.literal("blogs"),
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
    const { keys } = validationResult.data;
    const homePath = "/";
    const rssFeedPath = "/feed.xml";
    const blogPaths = keys.map((key) => `/blog/${key}`);

    revalidatePath(homePath);
    blogPaths.forEach((path) => revalidatePath(path));
    revalidatePath(rssFeedPath);

    return NextResponse.json({
      revalidated: true,
      paths: [homePath, ...blogPaths, rssFeedPath],
      now: Date.now(),
    });
  }
};

export { handler as POST };

