"use client";

import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroMedia() {
  const art = resolvePublicAsset(site.heroMedia.artwork);
  const mobileArt = site.heroMedia.artworkMobile
    ? resolvePublicAsset(site.heroMedia.artworkMobile)
    : null;
  const poster = resolvePublicAsset(site.heroMedia.poster);
  const video = site.heroMedia.video
    ? resolvePublicAsset(site.heroMedia.video)
    : null;
  const [playVideo, setPlayVideo] = useState(false);
  const [useMobileCrop, setUseMobileCrop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setPlayVideo(query.matches && video?.kind === "video");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [video]);

  useEffect(() => {
    if (!mobileArt || mobileArt.kind !== "raster") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setUseMobileCrop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [mobileArt]);

  const activeArt =
    useMobileCrop && mobileArt?.kind === "raster" ? mobileArt : art;
  const useKeyArt = activeArt?.kind === "raster";
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
          src={activeArt.src}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className={fitClassName("hero")}
        />
      ) : (
        <div className="hero-sky absolute inset-0" />
      )}
    </>
  );
}

export function useHasHeroKeyArt() {
  const art = resolvePublicAsset(site.heroMedia.artwork);
  const mobile = site.heroMedia.artworkMobile
    ? resolvePublicAsset(site.heroMedia.artworkMobile)
    : null;
  return art?.kind === "raster" || mobile?.kind === "raster";
}
