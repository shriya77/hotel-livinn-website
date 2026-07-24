import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  Noto_Serif_Tamil,
  Noto_Sans_Tamil,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { hotelJsonLd } from "@/lib/seo";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Tamil
const notoSerifTamil = Noto_Serif_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600"],
  variable: "--font-serif-ta",
  display: "swap",
});
const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-ta",
  display: "swap",
});

// Hindi (Devanagari)
const notoSerifDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  variable: "--font-serif-hi",
  display: "swap",
});
const notoSansDeva = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["300", "400", "500"],
  variable: "--font-sans-hi",
  display: "swap",
});

const fontVars = [
  fraunces.variable,
  inter.variable,
  notoSerifTamil.variable,
  notoSansTamil.variable,
  notoSerifDeva.variable,
  notoSansDeva.variable,
].join(" ");

export const metadata: Metadata = {
  title: "LIV·INN · Exclusive Lodging, Erode",
  description:
    "Hotel Liv-Inn, exclusive lodging in the heart of Erode. Refined rooms, timeless comfort, moments from the city's pulse.",
  keywords: ["Hotel Liv-Inn", "Erode lodging", "hotel Erode", "V.O.C Park hotel"],
  openGraph: {
    title: "LIV·INN · Exclusive Lodging, Erode",
    description: "Refined rooms, timeless comfort, moments from Erode's pulse.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0b09",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        {/* Structured data for search engines (invisible to visitors). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd()) }}
        />
        <div className="grain" aria-hidden />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
