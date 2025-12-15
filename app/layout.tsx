import AppHypertuneProvider from "@/components/AppHypertuneProvider";
import { STATIC_DESCRIPTION, STATIC_TITLE } from "@/constants/metadata";
import { TRPCReactProvider } from "@/trpc/client";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fleur_De_Leah, Inter, Noto_Serif_Display } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin"],
  variable: "--font-noto-serif-display",
  display: "swap",
  preload: true,
});

const fleurDeLeah = Fleur_De_Leah({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fleur-de-leah",
  display: "swap",
  preload: false,
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
    <AppHypertuneProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://directus.thehightable.app" />
        </head>
        <body
          className={`${inter.variable} ${notoSerifDisplay.variable} ${fleurDeLeah.variable} antialiased`}
        >
          <ThemeProvider attribute="class">
            <TRPCReactProvider>
              <Toaster richColors duration={2000} />
              {children}
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </AppHypertuneProvider>
  );
};

export default RootLayout;
