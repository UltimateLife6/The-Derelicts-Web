"use client";

import { PUNKTOWN_DISTRICT_STICKERS } from "@/data/punktown-districts";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type PunktownMapMode = "preview" | "interactive";

type PunktownMapProps = {
  mode?: PunktownMapMode;
  className?: string;
  /** When set in preview mode, the map frame links through to the atlas. */
  href?: string;
  priority?: boolean;
};

export function PunktownMap({
  mode = "preview",
  className,
  href,
  priority = false,
}: PunktownMapProps) {
  const [zoom, setZoom] = useState(1);
  const overview = resolvePublicAsset("/images/punktown/overview");
  const overviewSrc = overview?.kind === "raster" ? overview.src : null;
  const interactive = mode === "interactive";

  const stage = (
    <div
      className={cn(
        "relative overflow-hidden border-[3px] border-black bg-[#1a2218] shadow-[8px_10px_0_#000]",
        className,
      )}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-0",
            interactive && "origin-center transition-transform duration-200",
            !interactive && "origin-[58%_48%] scale-[1.16] sm:scale-[1.14] lg:scale-[1.12]",
          )}
          style={interactive ? { transform: `scale(${zoom})` } : undefined}
        >
          {overviewSrc ? (
            <Image
              src={overviewSrc}
              alt={
                interactive
                  ? "Punktown overview map"
                  : "Punktown overview map preview — explore the full atlas"
              }
              fill
              sizes={
                interactive
                  ? "(max-width: 1024px) 100vw, 65vw"
                  : "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
              }
              quality={interactive ? 90 : 82}
              priority={priority}
              className="object-contain object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#243028] font-mono text-xs tracking-[0.2em] text-volt">
              MAP SIGNAL PENDING
            </div>
          )}

          <DistrictStickers compact={!interactive} />
        </div>

        {/* Soft edge scrims help the site stickers read over baked-in map UI. */}
        {!interactive ? (
          <>
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[15] w-[14%] bg-gradient-to-r from-[#1a2218]/85 to-transparent sm:w-[11%]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[15] h-[10%] bg-gradient-to-b from-[#1a2218]/55 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : null}

        {interactive ? (
          <>
            <div className="absolute left-3 top-3 z-20 flex flex-col overflow-hidden border-2 border-black bg-paper shadow-[3px_3px_0_#000]">
              <button
                type="button"
                className="min-h-10 min-w-10 border-b-2 border-black font-display text-xl text-ink hover:bg-volt"
                aria-label="Zoom in"
                onClick={() =>
                  setZoom((value) => Math.min(1.55, Number((value + 0.15).toFixed(2))))
                }
              >
                +
              </button>
              <button
                type="button"
                className="min-h-10 min-w-10 font-display text-xl text-ink hover:bg-volt"
                aria-label="Zoom out"
                onClick={() =>
                  setZoom((value) => Math.max(1, Number((value - 0.15).toFixed(2))))
                }
              >
                −
              </button>
            </div>

            <div
              className="pointer-events-none absolute bottom-3 left-3 z-20 flex h-14 w-14 items-center justify-center border-2 border-black bg-paper/90 shadow-[3px_3px_0_#000]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 48 48" className="h-10 w-10">
                <circle cx="24" cy="24" r="18" fill="none" stroke="#171310" strokeWidth="2" />
                <path d="M24 8 L28 24 L24 22 L20 24 Z" fill="#e11d48" />
                <path d="M24 40 L20 24 L24 26 L28 24 Z" fill="#171310" />
                <text
                  x="24"
                  y="7"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="monospace"
                  fill="#171310"
                >
                  N
                </text>
              </svg>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  if (!interactive && href) {
    return (
      <Link
        href={href}
        className="group block focus-visible:outline-offset-4"
        aria-label="Explore Punktown"
      >
        {stage}
      </Link>
    );
  }

  return stage;
}

function DistrictStickers({ compact }: { compact: boolean }) {
  return (
    <>
      {PUNKTOWN_DISTRICT_STICKERS.map((sticker) => (
        <span
          key={sticker.id}
          className={cn(
            "pointer-events-none absolute z-10 max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] border-2 border-black px-2 py-1 font-display leading-none tracking-[0.08em] text-ink shadow-[3px_3px_0_#000]",
            compact
              ? "text-[0.62rem] sm:text-[0.72rem] md:max-w-none md:px-2.5 md:py-1.5 md:text-[0.88rem] lg:text-[0.95rem]"
              : "text-[0.7rem] sm:text-[0.8rem] md:max-w-none md:px-2.5 md:py-1.5 md:text-[0.95rem]",
            sticker.priority === "secondary" && "hidden sm:inline-block",
          )}
          style={{
            top: sticker.top,
            left: sticker.left,
            background: sticker.color,
          }}
        >
          {sticker.label}
        </span>
      ))}
    </>
  );
}
