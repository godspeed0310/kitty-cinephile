import VercelTrackers from "@/components/VercelTrackers";
import { STATIC_DESCRIPTION, STATIC_TITLE } from "@/constants/metadata";
import { TRPCReactProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fleur_De_Leah, Inter, Noto_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  variable: "--font-noto-serif-display",
});

const fleurDeLeah = Fleur_De_Leah({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fleur-de-leah",
});

export const metadata: Metadata = {
  title: {
    default: STATIC_TITLE,
    template: `%s | ${STATIC_TITLE}`,
  },
  description: STATIC_DESCRIPTION,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.variable} ${notoSerifDisplay.variable} ${fleurDeLeah.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <TRPCReactProvider>
            <VercelTrackers>{children}</VercelTrackers>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
