import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Fragment, ReactNode } from "react";

type Props = Readonly<{
  children: ReactNode;
}>;

const VercelTrackers = ({ children }: Props) => {
  return (
    <Fragment>
      <SpeedInsights />
      <Analytics />
      {children}
    </Fragment>
  );
};

export default VercelTrackers;
