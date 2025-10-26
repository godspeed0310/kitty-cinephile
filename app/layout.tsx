import VercelTrackers from "@/components/VercelTrackers";
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
      <head>
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="86098e2f-95f0-4c88-b9b1-8882dd3e8258"
          />
        )}
      </head>
      <body
        className={` ${inter.variable} ${notoSerifDisplay.variable} ${fleurDeLeah.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <TRPCReactProvider>
            <VercelTrackers>
              <Toaster richColors duration={2000} />
              {children}
            </VercelTrackers>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
