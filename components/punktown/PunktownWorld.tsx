"use client";

import { LocationPanel } from "@/components/punktown/LocationPanel";
import { locations } from "@/data/locations";
import { track } from "@/lib/analytics";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const DISTRICT_STICKERS = [
  { id: "stacks", label: "THE STACKS", color: "#9b4dff", top: "18%", left: "28%" },
  { id: "pit", label: "THE PIT", color: "#e11d48", top: "22%", left: "48%" },
  { id: "furnace", label: "THE FURNACE", color: "#ff6b1a", top: "26%", left: "68%" },
  { id: "scrap-market", label: "SCRAP MARKET", color: "#7cff3a", top: "48%", left: "24%" },
  { id: "gutter", label: "GUTTER WAY", color: "#f5e642", top: "46%", left: "62%" },
  { id: "garage", label: "DERELICTS' GARAGE", color: "#3d9bff", top: "62%", left: "44%" },
  { id: "docks", label: "OLD DOCKS", color: "#3dfff3", top: "72%", left: "70%" },
  { id: "gate", label: "MAIN GATE", color: "#f0e2c4", top: "84%", left: "48%" },
] as const;

const FACT_CARDS = [
  {
    id: "rule",
    title: "RULE OF PUNKTOWN",
    body: "The Derelicts keep order. Everyone else keeps out.",
    accent: "#ff2d9a",
    icon: "skull",
  },
  {
    id: "find",
    title: "WHAT YOU'LL FIND",
    body: "Scrap, gear, deals, trouble, and opportunity.",
    accent: "#3dfff3",
    icon: "scrap",
  },
  {
    id: "watch",
    title: "WATCH YOUR BACK",
    body: "Mutants, gangs, and the No-Nothings.",
    accent: "#b6ff3a",
    icon: "hazard",
  },
  {
    id: "name",
    title: "MAKE YOUR NAME",
    body: "Prove yourself. Earn respect. Join The Derelicts.",
    accent: "#ff6b1a",
    icon: "faction",
  },
] as const;

const LOCATION_ICONS: Record<string, string> = {
  "deadmans-arcade": "M6 4h12v14H6V4zm2 2v2h8V6H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z",
  "broken-wheel":
    "M12 3a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 110 14 7 7 0 010-14zm0 2.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z",
  "trash-mountain": "M4 18l3-10h2l1 4 2-6h2l3 12H4zm7-13l1.5 3H9.5L11 5z",
  "the-funhouse":
    "M12 3c2 0 4 1.5 4 4 0 2-1 3-2 4l2 2v2h-8v-2l2-2c-1-1-2-2-2-4 0-2.5 2-4 4-4zm-3 15h6v2H9v-2z",
  scrapyard: "M7 7l5 5-2 2-5-5V7h2zm10 0h2v2l-5 5-2-2 5-5zM6 17h12v2H6v-2z",
  "flooded-midway":
    "M3 16c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1v2c-2 0-2-1-4-1s-2 1-4 1-2-1-4-1-2 1-4 1v-2zm9-12l5 6H4l5-6h3z",
  "derelict-market":
    "M7 11c0-2 2-4 5-4s5 2 5 4v1H7v-1zm-2 3h14v2H5v-2zm2 4h4v2H7v-2zm6 0h4v2h-4v-2z",
  "maintenance-tunnels":
    "M5 20V10l7-6 7 6v10h-5v-6H10v6H5z",
  "old-rollercoaster":
    "M3 17c3-4 6-6 9-6s6 2 9 6M5 10c2-2 4-3 7-3s5 1 7 3M4 20h16",
  "radio-tower":
    "M12 2l1 8h-2L12 2zm-1 9h2v9h-2v-9zm-5 5l2-2 1.5 1.5L7.5 17 6 15.5zm12 0L16.5 17l-2-2L16 13.5 18 15.5z",
  "the-pit":
    "M12 3c4 0 7 3 7 7 0 5-7 11-7 11S5 15 5 10c0-4 3-7 7-7zm0 3a4 4 0 100 8 4 4 0 000-8z",
};

export function PunktownWorld() {
  const [activeId, setActiveId] = useState("trash-mountain");
  const [zoom, setZoom] = useState(1);
  const active = useMemo(
    () => locations.find((location) => location.id === activeId) ?? locations[0],
    [activeId],
  );
  const overview = resolvePublicAsset("/images/punktown/overview");

  function select(id: string, slug: string) {
    setActiveId(id);
    track("punktown_location_select", { slug });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.65fr_0.9fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-7 lg:gap-y-5">
      <div className="order-1 min-w-0 lg:order-none lg:col-start-1 lg:row-start-1">
        <MapStage
          overviewSrc={overview?.kind === "raster" ? overview.src : null}
          zoom={zoom}
          onZoomIn={() => setZoom((value) => Math.min(1.55, Number((value + 0.15).toFixed(2))))}
          onZoomOut={() => setZoom((value) => Math.max(1, Number((value - 0.15).toFixed(2))))}
        />
      </div>

      <div className="order-2 space-y-5 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <LocationGrid activeId={activeId} onSelect={select} />
        {active ? <LocationPanel location={active} compact /> : null}
        <AboutPunktown />
      </div>

      <div className="order-3 min-w-0 lg:order-none lg:col-start-1 lg:row-start-2">
        <FactStrip />
      </div>
    </div>
  );
}

function MapStage({
  overviewSrc,
  zoom,
  onZoomIn,
  onZoomOut,
}: {
  overviewSrc: string | null;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}) {
  return (
    <div className="relative overflow-hidden border-[3px] border-black bg-[#1a2218] shadow-[8px_10px_0_#000]">
      <div className="relative aspect-[3/2] w-full overflow-hidden">
        <div
          className="absolute inset-0 origin-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {overviewSrc ? (
            <Image
              src={overviewSrc}
              alt="Punktown overview map"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              quality={90}
              priority
              className="object-contain object-center"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#243028] font-mono text-xs tracking-[0.2em] text-volt">
              MAP SIGNAL PENDING
            </div>
          )}
        </div>

        {DISTRICT_STICKERS.map((sticker) => (
          <span
            key={sticker.id}
            className="pointer-events-none absolute z-10 max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rotate-[-2deg] border-2 border-black px-2 py-1 font-display text-[0.7rem] leading-none tracking-[0.08em] text-ink shadow-[3px_3px_0_#000] sm:text-[0.8rem] md:max-w-none md:px-2.5 md:py-1.5 md:text-[0.95rem]"
            style={{
              top: sticker.top,
              left: sticker.left,
              background: sticker.color,
            }}
          >
            {sticker.label}
          </span>
        ))}

        <div className="absolute left-3 top-3 z-20 flex flex-col overflow-hidden border-2 border-black bg-paper shadow-[3px_3px_0_#000]">
          <button
            type="button"
            className="min-h-10 min-w-10 border-b-2 border-black font-display text-xl text-ink hover:bg-volt"
            aria-label="Zoom in"
            onClick={onZoomIn}
          >
            +
          </button>
          <button
            type="button"
            className="min-h-10 min-w-10 font-display text-xl text-ink hover:bg-volt"
            aria-label="Zoom out"
            onClick={onZoomOut}
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
            <text x="24" y="7" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#171310">
              N
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function LocationGrid({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string, slug: string) => void;
}) {
  return (
    <section aria-label="Punktown locations">
      <div className="relative mb-3 inline-block">
        <span
          className="absolute inset-x-[-0.4rem] inset-y-[-0.15rem] -skew-x-3 bg-ink"
          aria-hidden="true"
        />
        <h2 className="relative px-3 py-1 font-display text-2xl tracking-[0.08em] text-paper md:text-3xl">
          LOCATIONS
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {locations.map((location) => {
          const selected = location.id === activeId;
          return (
            <button
              key={location.id}
              type="button"
              onClick={() => onSelect(location.id, location.slug)}
              aria-pressed={selected}
              className={cn(
                "relative flex min-h-[5.5rem] gap-2.5 border-[1.5px] border-black/70 bg-[#f7f1e4] p-2.5 text-left shadow-[2px_2px_0_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5",
                selected && "border-black bg-volt shadow-[3px_3px_0_#000]",
              )}
            >
              {selected ? (
                <span className="absolute right-1.5 top-1.5 bg-ink px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em] text-volt">
                  SELECTED
                </span>
              ) : null}
              <span
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-black bg-paper"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.6]">
                  <path d={LOCATION_ICONS[location.slug] ?? LOCATION_ICONS["the-pit"]} />
                </svg>
              </span>
              <span className="min-w-0">
                <span className="block font-display text-[1.05rem] leading-none tracking-[0.04em] text-ink">
                  {location.name}
                </span>
                <span className="mt-1.5 block text-[0.78rem] leading-snug text-ink/75">
                  {location.blurb}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FactStrip() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {FACT_CARDS.map((card) => (
        <article
          key={card.id}
          className="border-[2.5px] border-black bg-[#f4ecdc] p-3 shadow-[4px_4px_0_#000]"
        >
          <div className="flex items-start gap-2.5">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black"
              style={{ background: card.accent }}
              aria-hidden="true"
            >
              <FactIcon kind={card.icon} />
            </span>
            <div>
              <h3 className="font-display text-sm tracking-[0.08em] text-ink md:text-base">
                {card.title}
              </h3>
              <p className="mt-1 text-[0.78rem] leading-snug text-ink/80">{card.body}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function FactIcon({ kind }: { kind: (typeof FACT_CARDS)[number]["icon"] }) {
  if (kind === "skull") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-ink">
        <path d="M12 3c4.2 0 7 3 7 7 0 3.2-1.6 5-3 6.2V19h-2v-2h-4v2H8v-2.8C6.6 15 5 13.2 5 10c0-4 2.8-7 7-7zm-2.5 8a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
      </svg>
    );
  }
  if (kind === "scrap") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-ink stroke-[1.8]">
        <path d="M7 8l4 4-2 2-4-4V8h2zm10 0h2v2l-4 4-2-2 4-4zM5 18h14" />
      </svg>
    );
  }
  if (kind === "hazard") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-ink">
        <path d="M12 2l10 18H2L12 2zm0 5l-6 11h12L12 7zm-1 3h2v4h-2V10zm0 6h2v2h-2v-2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-ink">
      <path d="M12 3c2.5 0 4 2 4 4.5S14 12 12 12 8 10 8 7.5 9.5 3 12 3zm0 10c4 0 7 2 7 4.5V20H5v-2.5C5 15 8 13 12 13z" />
    </svg>
  );
}

function AboutPunktown() {
  return (
    <aside className="relative overflow-hidden border-[2.5px] border-black bg-[#efe6d4] p-4 shadow-[5px_5px_0_#000] md:p-5">
      <h2 className="font-display text-2xl tracking-[0.06em] text-ink">ABOUT PUNKTOWN</h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/85 md:text-[0.95rem]">
        Punktown was built from scrap and spite inside the ruins of an amusement park the
        No-Nothings left behind. Now it&apos;s home to scavengers, fighters, builders, and
        outcasts who&apos;d rather die free than live under their rules.
      </p>
      <span
        className="pointer-events-none absolute -bottom-4 -right-1 rotate-[-18deg] font-mark text-7xl leading-none text-magenta/50 md:text-8xl"
        aria-hidden="true"
      >
        A
      </span>
      <Link
        href="/#crew"
        className="relative mt-4 inline-flex border-2 border-black bg-volt px-3 py-2 font-display text-sm tracking-[0.1em] text-ink shadow-[2px_2px_0_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[1px_1px_0_#000]"
      >
        MEET THE CREW →
      </Link>
    </aside>
  );
}
