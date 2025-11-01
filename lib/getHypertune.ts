import {
  HYPERTUNE_EMAIL,
  HYPERTUNE_ID,
  HYPERTUNE_NAME,
} from "@/constants/hypertune";
import { clientEnv } from "@/env/env.client";
import { serverEnv } from "@/env/env.server";
import { createSource } from "@/hypertune/hypertune";
import { createClient } from "@vercel/edge-config";
import { VercelEdgeConfigInitDataProvider } from "hypertune";
import { unstable_noStore as noStore } from "next/cache";
import "server-only";

const hypertuneSource = createSource({
  token: clientEnv.NEXT_PUBLIC_HYPERTUNE_TOKEN,
  initDataProvider:
    serverEnv.EXPERIMENTATION_CONFIG &&
    serverEnv.EXPERIMENTATION_CONFIG_ITEM_KEY
      ? new VercelEdgeConfigInitDataProvider({
          edgeConfigClient: createClient(serverEnv.EXPERIMENTATION_CONFIG),
          itemKey: serverEnv.EXPERIMENTATION_CONFIG_ITEM_KEY,
        })
      : undefined,
});

type getHypertuneProps = Readonly<{
  isRouteHandler?: boolean;
}>;

const getHypertune = async ({ isRouteHandler = false }: getHypertuneProps) => {
  noStore();
  await hypertuneSource.initIfNeeded();
  hypertuneSource.setRemoteLoggingMode(isRouteHandler ? "normal" : "off");
  return hypertuneSource.root({
    args: {
      context: {
        environment: process.env.NODE_ENV,
        user: {
          id: HYPERTUNE_ID,
          name: HYPERTUNE_NAME,
          email: HYPERTUNE_EMAIL,
        },
      },
    },
  });
};

export default getHypertune;
