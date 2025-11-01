"use client";

import {
  HYPERTUNE_EMAIL,
  HYPERTUNE_ID,
  HYPERTUNE_NAME,
} from "@/constants/hypertune";
import { clientEnv } from "@/env/env.client";
import { HypertuneProvider } from "@/hypertune/hypertune.react";
import { ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

const AppHypertuneProvider = ({ children }: Props) => {
  return (
    <HypertuneProvider
      createSourceOptions={{
        token: clientEnv.NEXT_PUBLIC_HYPERTUNE_TOKEN,
      }}
      rootArgs={{
        context: {
          environment: process.env.NODE_ENV,
          user: {
            id: HYPERTUNE_ID,
            name: HYPERTUNE_NAME,
            email: HYPERTUNE_EMAIL,
          },
        },
      }}
    >
      {children}
    </HypertuneProvider>
  );
};

export default AppHypertuneProvider;
