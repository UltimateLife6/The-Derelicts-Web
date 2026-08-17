import { site } from "@/data/site";
import type { Metadata } from "next";

export function createMetadata({
  title,
  description = site.description,
  path = "/",
}: {
  title?: string;
  description?: string;
  path?: string;
} = {}): Metadata {
  const resolvedTitle = title ?? `${site.name} | ${site.tagline}`;
  const url = new URL(path, site.url).toString();

  return {
    metadataBase: new URL(site.url),
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: resolvedTitle,
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
    },
    applicationName: site.name,
  };
}
