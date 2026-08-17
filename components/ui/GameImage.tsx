"use client";

import { defaultSizes, fitClassName, inferFit, logicalAssetPath, resolvePublicAsset, type ImageFit } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function GameImage({
  src,
  alt,
  title,
  accent,
  fit,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  title?: string;
  accent?: string;
  fit?: ImageFit;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const resolved = resolvePublicAsset(src);
  const resolvedFit = fit ?? inferFit(src);
  const [failed, setFailed] = useState(false);
  const [useSvg, setUseSvg] = useState(resolved?.kind === "svg");

  const rasterSrc = resolved?.kind === "raster" ? resolved.src : null;
  const svgSrc = resolved?.kind === "svg" ? resolved.src : `${logicalAssetPath(src)}.svg`;
  const showFallback = failed || (!resolved && !useSvg);

  return (
    <div
      className={cn("relative overflow-hidden bg-[#2c261e]", className)}
      style={
        accent
          ? {
              background: `radial-gradient(circle at 28% 18%, ${accent}66, transparent 42%), #cfe8f7`,
            }
          : undefined
      }
    >
      {showFallback ? (
        <div className="flex h-full min-h-32 w-full items-center justify-center px-4 text-center">
          <p className="font-mono text-[10px] tracking-[0.22em] text-volt">
            {title ?? "TRANSMISSION PENDING"}
          </p>
        </div>
      ) : rasterSrc && !useSvg ? (
        <Image
          src={rasterSrc}
          alt={alt}
          fill
          sizes={sizes ?? defaultSizes(resolvedFit)}
          quality={75}
          priority={priority}
          className={cn("z-10", fitClassName(resolvedFit))}
          onError={() => setUseSvg(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={svgSrc}
          alt={alt}
          className={cn("relative z-10 h-full w-full", fitClassName(resolvedFit))}
          onError={() => setFailed(true)}
        />
      )}
      {title && !showFallback ? (
        <span className="pointer-events-none absolute bottom-3 left-3 z-20 font-mono text-[10px] tracking-[0.24em] text-volt">
          {title}
        </span>
      ) : null}
    </div>
  );
}
