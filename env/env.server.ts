import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DIRECTUS_SDK_TOKEN: z.string(),
    DIRECTUS_WEBHOOK_SECRET: z.string(),
    VERCEL_URL: z
      .string()
      .optional()
      .transform((url) => (url ? `https://${url}` : undefined))
      .pipe(z.url().optional()),
    UPSTASH_REDIS_REST_URL: z.url(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    EXPERIMENTATION_CONFIG_ITEM_KEY: z.string(),
    EXPERIMENTATION_CONFIG: z.url(),
    DIRECTUS_NEWSLETTER_WEBHOOK_URL: z.url(),
  },
  experimental__runtimeEnv: true,
  emptyStringAsUndefined: true,
});
