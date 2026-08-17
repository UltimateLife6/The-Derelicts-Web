"use client";

import { ComponentChip } from "@/components/ui/ComponentChip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const parts = ["CIRCUIT BOARD", "WIRING", "SPEAKER", "SCRAP METAL"];

export function ScavengeDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-char py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="page-title text-[clamp(2.4rem,7vw,4.6rem)] text-paper">
            THE MAP IS YOUR INVENTORY.
          </h2>
          <p className="mt-5 text-lg leading-8 text-haze">
            Players can dismantle specific objects — vending machines, arcade
            cabinets, cars, generators, air conditioners, streetlights, dumpsters.
          </p>
          <p className="display mt-8 text-4xl text-volt">
            If it looks useful, rip it apart.
          </p>
        </div>

        <div className="border-4 border-black bg-ink p-5 shadow-[8px_10px_0_#000] md:p-6">
          <div className="relative mx-auto flex h-52 w-44 items-center justify-center">
            <div
              className={cn(
                "absolute h-48 w-20 bg-[#1a1020] shadow-[6px_8px_0_#000] transition duration-500",
                open ? "-translate-x-16 -rotate-6 opacity-80" : "",
              )}
            >
              <div className="mx-2 mt-3 h-24 bg-arc/25 outline outline-2 outline-arc/40" />
            </div>
            <div
              className={cn(
                "absolute h-48 w-20 bg-[#1a1020] shadow-[6px_8px_0_#000] transition duration-500",
                open ? "translate-x-16 rotate-6 opacity-80" : "",
              )}
            >
              <div className="absolute inset-x-3 bottom-5 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className="h-5 bg-flare/70" />
                ))}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-6 min-h-12 w-full bg-hazard font-display text-2xl tracking-[0.18em] text-ink"
            aria-expanded={open}
          >
            DISMANTLE
          </button>
          <div className="mt-4 min-h-24" aria-live="polite">
            {open ? (
              <ul className="grid grid-cols-2 gap-2 motion-safe:animate-assemble">
                {parts.map((part) => (
                  <li key={part}>
                    <ComponentChip label={`+ ${part}`} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-xs tracking-[0.16em] text-haze">
                Target: arcade cabinet
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
