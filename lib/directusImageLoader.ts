import { clientEnv } from "@/env/env.client";
import { ImageLoaderProps } from "next/image";

export const directusImageLoader = ({
  src,
  width,
  quality,
}: ImageLoaderProps) => {
  const url = `${clientEnv.NEXT_PUBLIC_DIRECTUS_URL}/assets/${src}`;
  const params = new URLSearchParams();

  params.set("width", width.toString());
  params.set("format", "webp");
  if (quality) {
    params.set("quality", quality.toString());
  }

  return `${url}?${params.toString()}`;
};
