import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_DIRECTUS_URL: z.url(),
    NEXT_PUBLIC_HYPERTUNE_TOKEN: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
    NEXT_PUBLIC_HYPERTUNE_TOKEN: process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN,
  },
  emptyStringAsUndefined: true,
});
