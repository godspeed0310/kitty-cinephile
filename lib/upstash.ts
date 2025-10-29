import { serverEnv } from "@/env/env.server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL,
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN,
});

export const subscribeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1h"),
  enableProtection: process.env.NODE_ENV === "production",
});

export const followRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1h"),
  enableProtection: process.env.NODE_ENV === "production",
});
