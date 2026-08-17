import { characters } from "@/data/characters";
import { newsPosts } from "@/data/news";
import { site } from "@/data/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/derelicts",
    "/punktown",
    "/inventions",
    "/news",
    "/press",
    "/privacy",
    "/terms",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...characters.map((character) => ({
      url: `${site.url}/derelicts/${character.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...newsPosts.map((post) => ({
      url: `${site.url}/news/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
