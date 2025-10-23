import { clientEnv } from "@/env/env.client";
import { serverEnv } from "@/env/env.server";
import { createDirectus, rest, staticToken } from "@directus/sdk";

type DirectusSchema = {
  blogs: {
    id: string;
    status: "draft" | "published" | "archived";
    date_created: string;
    date_updated: string;
    title: string;
    categories: Array<string>;
    featured_image: string;
    summary: string;
    content: string;
  }[];
};

export const directus = createDirectus<DirectusSchema>(
  clientEnv.NEXT_PUBLIC_DIRECTUS_URL
)
  .with(staticToken(serverEnv.DIRECTUS_SDK_TOKEN))
  .with(rest());

export type { DirectusSchema };
