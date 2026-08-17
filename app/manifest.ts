import { resolvePublicAsset } from "@/lib/assets";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  const icon = resolvePublicAsset("/images/brand/icon");
  const apple = resolvePublicAsset("/images/brand/apple-touch");

  return {
    name: "The Derelicts",
    short_name: "Derelicts",
    description:
      "The Derelicts is a multiplayer action game where gifted misfits scavenge abandoned civilization and turn junk into weapons, gadgets and machines.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    icons: [
      {
        src: icon?.kind === "raster" ? icon.src : "/icon",
        sizes: icon?.kind === "raster" ? "512x512" : "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: apple?.kind === "raster" ? apple.src : "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
