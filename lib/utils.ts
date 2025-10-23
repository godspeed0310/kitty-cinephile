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
