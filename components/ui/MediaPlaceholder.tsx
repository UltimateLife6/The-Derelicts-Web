"use client";

import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export function MediaPlaceholder({
  label = "TRANSMISSION PENDING",
  caption,
  className,
  imagePath,
  videoPath,
}: {
  label?: string;
  caption?: string;
  className?: string;
  imagePath?: string;
  videoPath?: string;
}) {
  const image = imagePath ? resolvePublicAsset(imagePath) : null;
  const video = videoPath ? resolvePublicAsset(videoPath) : null;
  const [allowVideo, setAllowVideo] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setAllowVideo(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const showVideo = Boolean(allowVideo && video?.kind === "video");
  const showImage = Boolean(!imageFailed && image && image.kind !== "video");

  return (
    <div
      className={cn(
        "relative flex aspect-video items-center justify-center overflow-hidden border border-haze/30 bg-steel panel-rivets",
        className,
      )}
    >
      {showVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          poster={showImage ? image!.src : undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          aria-label={caption ?? label}
        >
          <source src={video!.src} />
        </video>
      ) : showImage && image!.kind === "raster" ? (
        <Image
          src={image!.src}
          alt={caption ?? ""}
          fill
          sizes="(max-width: 768px) 70vw, 224px"
          quality={70}
          className={fitClassName("wide")}
          onError={() => setImageFailed(true)}
        />
      ) : showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image!.src}
          alt={caption ?? ""}
          className={cn("absolute inset-0 h-full w-full", fitClassName("wide"))}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <>
          <div className="absolute inset-0 opacity-40 hazard-stripe mix-blend-multiply" />
          <div className="relative z-10 text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-volt">{label}</p>
            {caption ? (
              <p className="mt-2 font-display text-3xl tracking-widest text-paper">
                {caption}
              </p>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
