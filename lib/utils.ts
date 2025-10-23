import { clientEnv } from "@/env/env.client";
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
  } else {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unknown error occurred",
      cause: error,
    });
  }
};

export const getDirectusAssetUrl = (assetId: string) => {
  return `${clientEnv.NEXT_PUBLIC_DIRECTUS_URL}/assets/${assetId}`;
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