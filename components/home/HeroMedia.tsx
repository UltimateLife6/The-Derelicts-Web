"use client";

import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroMedia() {
  const art = resolvePublicAsset(site.heroMedia.artwork);
  const poster = resolvePublicAsset(site.heroMedia.poster);
  const video = site.heroMedia.video
    ? resolvePublicAsset(site.heroMedia.video)
    : null;
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPlayVideo(query.matches && video?.kind === "video");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [video]);

  const useKeyArt = art?.kind === "raster";
  const posterSrc = poster?.kind === "raster" ? poster.src : undefined;

  return (
    <>
      {playVideo ? (
        <video
          className={cn(
            "absolute inset-0 h-full w-full",
            fitClassName("hero"),
          )}
          poster={posterSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-hidden="true"
        >
          <source src={video!.src} />
        </video>
      ) : useKeyArt ? (
        <Image
          src={art.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={80}
          className={fitClassName("hero")}
        />
      ) : (
        <div className="hero-sky absolute inset-0" />
      )}
    </>
  );
}

export function useHasHeroKeyArt() {
  return resolvePublicAsset(site.heroMedia.artwork)?.kind === "raster";
}
