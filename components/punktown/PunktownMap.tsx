"use client";

import { LocationMarker } from "@/components/punktown/LocationMarker";
import { LocationPanel } from "@/components/punktown/LocationPanel";
import { locations } from "@/data/locations";
import { track } from "@/lib/analytics";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function PunktownMap() {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const active = locations.find((location) => location.id === activeId) ?? locations[0];
  const overview = resolvePublicAsset("/images/punktown/overview");
  const hasOverview = overview?.kind === "raster";

  function select(id: string, slug: string) {
    setActiveId(id);
    track("punktown_location_select", { slug });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
      <div
        className={cn(
          "relative overflow-hidden border-4 border-black bg-[#152016] shadow-[8px_10px_0_#000]",
          hasOverview
            ? "aspect-[3/2] min-h-0"
            : "min-h-[340px] md:min-h-[520px]",
        )}
      >
        <MapBackdrop overview={overview} />
        {/* Overview art already includes districts, legend, and POIs — skip misplaced pins */}
        {hasOverview
          ? null
          : locations.map((location) => (
              <LocationMarker
                key={location.id}
                name={location.name}
                x={location.x}
                y={location.y}
                active={location.id === activeId}
                onSelect={() => select(location.id, location.slug)}
              />
            ))}
      </div>

      <div className={cn(hasOverview ? "block" : "lg:hidden")}>
        <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-volt">
          LOCATIONS
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scroll lg:flex-wrap">
          {locations.map((location) => (
            <button
              key={`card-${location.id}`}
              type="button"
              onClick={() => select(location.id, location.slug)}
              className={cn(
                "min-h-11 shrink-0 border-2 border-black px-3 py-2 font-mono text-[11px] tracking-[0.14em] shadow-[2px_2px_0_#000]",
                location.id === activeId
                  ? "bg-volt text-ink"
                  : "bg-paper text-ink",
              )}
            >
              {location.name}
            </button>
          ))}
        </div>
      </div>
      {active ? <LocationPanel location={active} /> : null}
    </div>
  );
}

function MapBackdrop({
  overview,
}: {
  overview: ReturnType<typeof resolvePublicAsset>;
}) {
  if (overview?.kind === "raster") {
    return (
      <Image
        src={overview.src}
        alt="Punktown overview map"
        fill
        sizes="(max-width: 1024px) 100vw, 70vw"
        quality={85}
        className="object-contain object-center"
        priority
      />
    );
  }
  return <PunktownArt />;
}

function PunktownArt() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full min-h-[340px] w-full md:min-h-[520px]"
      role="img"
      aria-label="Stylized map of Punktown, an abandoned amusement park"
    >
      <defs>
        <linearGradient id="park-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec8f5" />
          <stop offset="55%" stopColor="#f7ddae" />
          <stop offset="100%" stopColor="#c45a28" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#park-sky)" />
      <path d="M6 78 C 20 62 34 84 50 76 C 68 68 74 90 96 80 L 96 96 L 6 96 Z" fill="#8a4e2a" />
      <path d="M4 22 C 24 16 38 30 56 22 C 74 14 86 28 98 22" fill="none" stroke="#ff6b1a" strokeOpacity="0.8" strokeWidth="1.4" />
      <ellipse cx="52" cy="68" rx="14" ry="8" fill="#3dfff355" stroke="#3dfff3" />
      <polygon points="14,86 22,62 34,86" fill="#ff2d9a" />
      <circle cx="72" cy="18" r="9" fill="none" stroke="#ff6b1a" strokeWidth="1.6" />
      <circle cx="72" cy="18" r="1.4" fill="#f5e642" />
      <path d="M32 22 C 40 8 52 10 58 18 C 64 8 70 22 78 14" fill="none" stroke="#171310" strokeWidth="1.6" />
      <rect x="10" y="32" width="16" height="12" fill="#ff2d9a" stroke="#171310" />
      <rect x="42" y="36" width="14" height="12" fill="#f5e642" stroke="#171310" />
      <rect x="74" y="38" width="16" height="10" fill="#3dfff3" stroke="#171310" />
      <rect x="76" y="64" width="16" height="12" fill="#ff6b1a" stroke="#171310" />
      <rect x="58" y="4" width="2.2" height="14" fill="#3dfff3" />
      <circle cx="58" cy="54" r="5" fill="#171310" stroke="#ff2d9a" />
      <path d="M30 86 C 36 80 42 92 50 88" fill="none" stroke="#171310" strokeDasharray="1.5 1.2" />
    </svg>
  );
}
