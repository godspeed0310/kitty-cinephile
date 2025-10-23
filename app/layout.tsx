import BrandHeader from "@/components/BrandHeader";
import { STATIC_DESCRIPTION, STATIC_TITLE } from "@/constants/metadata";
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

export const RootLayout = ({
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
          <main className="space-y-5 flex flex-col max-w-7xl mx-auto px-5">
            <BrandHeader />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
