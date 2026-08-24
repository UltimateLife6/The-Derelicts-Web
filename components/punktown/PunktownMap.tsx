"use client";

import { LocationMarker } from "@/components/punktown/LocationMarker";
import { locations } from "@/data/locations";
import { track } from "@/lib/analytics";
import { resolvePublicAsset } from "@/lib/assets";
import Image from "next/image";
import { useState } from "react";

/** Compact map used on the homepage preview — full world UI lives on /punktown. */
export function PunktownMap() {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const overview = resolvePublicAsset("/images/punktown/overview");
  const hasOverview = overview?.kind === "raster";

  return (
    <div className="relative min-h-[280px] overflow-hidden border-4 border-black bg-[#152016] shadow-[8px_10px_0_#000] md:min-h-[420px]">
      {hasOverview ? (
        <Image
          src={overview.src}
          alt="Punktown overview map"
          fill
          sizes="(max-width: 1024px) 100vw, 70vw"
          quality={80}
          className="object-cover object-center"
        />
      ) : (
        <div className="flex min-h-[280px] items-center justify-center font-mono text-xs tracking-[0.2em] text-volt md:min-h-[420px]">
          PUNKTOWN SIGNAL PENDING
        </div>
      )}
      {!hasOverview
        ? locations.map((location) => (
            <LocationMarker
              key={location.id}
              name={location.name}
              x={location.x}
              y={location.y}
              active={location.id === activeId}
              onSelect={() => {
                setActiveId(location.id);
                track("punktown_location_select", { slug: location.slug });
              }}
            />
          ))
        : null}
    </div>
  );
}
