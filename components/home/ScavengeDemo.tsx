"use client";

import { ComponentChip } from "@/components/ui/ComponentChip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const parts = ["CIRCUIT BOARD", "WIRING", "SPEAKER", "SCRAP METAL"];

export function ScavengeDemo() {
  const [open, setOpen] = useState(false);

  return (
    <section className="scene-arcade py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="page-title text-[clamp(2.4rem,7vw,4.6rem)] text-paper">
            RIP IT APART.
          </h2>
          <p className="mt-5 font-mark text-3xl text-arc">
            If it looks useful, it&apos;s inventory.
          </p>
        </div>

        <div className="border-4 border-black bg-[#241018] p-5 shadow-[8px_10px_0_#000] md:p-6">
          <div className="relative mx-auto flex h-52 w-44 items-center justify-center">
            <div
              className={cn(
                "absolute h-48 w-20 bg-[#ff2d9a] shadow-[6px_8px_0_#000] transition duration-500",
                open ? "-translate-x-16 -rotate-6 opacity-80" : "",
              )}
            >
              <div className="mx-2 mt-3 h-24 bg-arc/40 outline outline-2 outline-black" />
            </div>
            <div
              className={cn(
                "absolute h-48 w-20 bg-[#f5e642] shadow-[6px_8px_0_#000] transition duration-500",
                open ? "translate-x-16 rotate-6 opacity-80" : "",
              )}
            >
              <div className="absolute inset-x-3 bottom-5 grid grid-cols-2 gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span key={index} className="h-5 bg-[#171310]" />
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
              <p className="text-sm tracking-[0.12em] text-paper/70">Arcade cabinet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
