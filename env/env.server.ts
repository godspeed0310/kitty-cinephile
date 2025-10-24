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
  },
  experimental__runtimeEnv: true,
  emptyStringAsUndefined: true,
});
