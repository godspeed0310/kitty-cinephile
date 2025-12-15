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

type DirectusNewsletterSubscription = {
  id: string;
  email: string;
  tags: Array<string>;
};

type BlogMetadata = {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  rating: number;
  directors: Array<string> | null;
  creators: Array<string> | null;
  writers: Array<string> | null;
  producers: Array<string> | null;
  cast: Array<string>;
  genres: Array<string>;
  cinematographers: Array<string> | null;
  external_id: number;
};

type DirectusSchema = {
  directus_users: Array<DirectusUser>;
  newsletter_subscriptions: Array<DirectusNewsletterSubscription>;
  blog_metadata: BlogMetadata;
  blogs: {
    id: string;
    status: "draft" | "published" | "archived";
    date_created: string;
    date_updated: string;
    user_created: DirectusUser;
    user_updated: DirectusUser;
    media_type: "movie" | "tv";
    title: string;
    categories: Array<string>;
    featured_image: string;
    summary: string;
    content: string;
    rating: number;
    metadata: BlogMetadata;
  }[];
};

export const directus = createDirectus<DirectusSchema>(
  clientEnv.NEXT_PUBLIC_DIRECTUS_URL
)
  .with(staticToken(serverEnv.DIRECTUS_SDK_TOKEN))
  .with(rest());

export type { DirectusSchema };
