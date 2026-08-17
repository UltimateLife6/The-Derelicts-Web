import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/data/site";
import { resolvePublicAsset } from "@/lib/assets";
import { createMetadata } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue, Permanent_Marker, Share_Tech_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Barlow({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const mark = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mark",
  display: "swap",
});

const brandIcon = resolvePublicAsset("/images/brand/icon");
const appleTouch = resolvePublicAsset("/images/brand/apple-touch");

export const metadata: Metadata = {
  ...createMetadata(),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  keywords: [
    "The Derelicts",
    "Punktown",
    "multiplayer action game",
    "scavenge",
    "invent",
    "Unreal Engine 5",
  ],
  icons: {
    icon: brandIcon?.kind === "raster" ? brandIcon.src : "/icon",
    apple: appleTouch?.kind === "raster" ? appleTouch.src : "/apple-icon",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} ${mark.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-foreground">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Navbar />
        <main id="content">{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
