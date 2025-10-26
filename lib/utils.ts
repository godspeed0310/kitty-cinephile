import { clientEnv } from "@/env/env.client";
import { serverEnv } from "@/env/env.server";
import { isDirectusError } from "@directus/sdk";
import { TRPCError } from "@trpc/server";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const handleError = (error: unknown) => {
  if (isDirectusError(error)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
      cause: error,
    });
  } else if (error instanceof TRPCError) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: error.message,
      cause: error,
    });
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred",
      cause: error,
    });
  }
};

type DirectusAssetUrlParams = {
  assetId: string;
  height: number;
  width: number;
};

export const getDirectusAssetUrl = ({
  assetId,
  height,
  width,
}: DirectusAssetUrlParams) => {
  const baseUrl = `${clientEnv.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}`;
  const params = new URLSearchParams();
  if (height) params.append("height", height.toString());
  if (width) params.append("width", width.toString());
  params.append("format", "webp");

  return `${baseUrl}?${params.toString()}`;
};

export const getFullName = (user: {
  first_name: string;
  last_name: string;
}) => {
  return `${user.first_name} ${user.last_name}`;
};

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

export const getInitials = (name: string) => {
  const names = name.split(" ");
  const initials = names.map((n) => n.charAt(0).toUpperCase()).join("");
  return initials;
};

export const getBaseUrl = () => {
  return serverEnv.VERCEL_URL ?? "http://localhost:3000";
};