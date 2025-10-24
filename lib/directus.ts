import { clientEnv } from "@/env/env.client";
import { serverEnv } from "@/env/env.server";
import { createDirectus, rest, staticToken } from "@directus/sdk";

type DirectusUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  description: string | null;
};

type DirectusSchema = {
  directus_users: Array<DirectusUser>;
  blogs: {
    id: string;
    status: "draft" | "published" | "archived";
    date_created: string;
    date_updated: string;
    user_created: DirectusUser;
    user_updated: DirectusUser;
    title: string;
    categories: Array<string>;
    featured_image: string;
    summary: string;
    content: string;
    rating: number;
  }[];
};

export const directus = createDirectus<DirectusSchema>(
  clientEnv.NEXT_PUBLIC_DIRECTUS_URL
)
  .with(staticToken(serverEnv.DIRECTUS_SDK_TOKEN))
  .with(rest());

export type { DirectusSchema };

