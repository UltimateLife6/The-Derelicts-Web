"use client";

import { LocationMarker } from "@/components/punktown/LocationMarker";
import { LocationPanel } from "@/components/punktown/LocationPanel";
import { locations } from "@/data/locations";
import { track } from "@/lib/analytics";
import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function PunktownMap() {
  const [activeId, setActiveId] = useState(locations[0]?.id ?? "");
  const active = locations.find((location) => location.id === activeId) ?? locations[0];

  function select(id: string, slug: string) {
    setActiveId(id);
    track("punktown_location_select", { slug });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
      <div className="relative min-h-[340px] overflow-hidden border-4 border-black bg-[#152016] shadow-[8px_10px_0_#000] md:min-h-[520px]">
        <MapBackdrop />
        {locations.map((location) => (
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

      <div className="lg:hidden">
        <p className="mb-3 font-mono text-[11px] tracking-[0.22em] text-volt">
          LOCATIONS
        </p>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scroll">
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

function MapBackdrop() {
  const overview = resolvePublicAsset("/images/punktown/overview");
  if (overview?.kind === "raster") {
    return (
      <Image
        src={overview.src}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 70vw"
        quality={75}
        className={fitClassName("landmark")}
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
        <pattern id="dirt" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#152016" />
          <circle cx="1" cy="2" r="0.4" fill="#1d2a1c" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#dirt)" />
      <path d="M6 78 C 20 62 34 84 50 76 C 68 68 74 90 96 80 L 96 96 L 6 96 Z" fill="#1a2e22" />
      <path d="M4 22 C 24 16 38 30 56 22 C 74 14 86 28 98 22" fill="none" stroke="#ff6b1a" strokeOpacity="0.45" strokeWidth="1.2" />
      <path d="M8 70 C 26 58 40 74 58 66 C 74 58 84 72 96 64" fill="none" stroke="#3dfff3" strokeOpacity="0.35" strokeWidth="1.6" />
      <ellipse cx="52" cy="68" rx="14" ry="8" fill="#16343c" stroke="#3dfff355" />
      <polygon points="14,86 22,62 34,86" fill="#3a4630" />
      <circle cx="72" cy="18" r="9" fill="none" stroke="#d4c4a8" strokeWidth="1.2" />
      <circle cx="72" cy="18" r="1.4" fill="#f5e642" />
      <path d="M32 22 C 40 8 52 10 58 18 C 64 8 70 22 78 14" fill="none" stroke="#9aa3ad" strokeWidth="1.4" />
      <rect x="10" y="32" width="16" height="12" fill="#241018" stroke="#ff2d6a55" />
      <rect x="42" y="36" width="14" height="12" fill="#2a1c28" stroke="#b8f54a44" />
      <rect x="74" y="38" width="16" height="10" fill="#2a2418" stroke="#f5e64244" />
      <rect x="76" y="64" width="16" height="12" fill="#2a2a20" stroke="#ff6b1a44" />
      <rect x="58" y="4" width="2.2" height="14" fill="#3dfff3" fillOpacity="0.7" />
      <circle cx="58" cy="54" r="5" fill="#0a0708" stroke="#ff2d6a66" />
      <path d="M30 86 C 36 80 42 92 50 88" fill="none" stroke="#9aa3ad" strokeDasharray="1.5 1.2" />
    </svg>
  );
}
