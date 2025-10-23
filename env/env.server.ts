import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DIRECTUS_SDK_TOKEN: z.string(),
    DIRECTUS_WEBHOOK_SECRET: z.string(),
  },
  experimental__runtimeEnv: true,
  emptyStringAsUndefined: true,
});
