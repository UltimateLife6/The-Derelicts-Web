"use client";

import { CharacterCard } from "@/components/characters/CharacterCard";
import type { Character } from "@/types";
import { KeyboardEvent, useRef } from "react";

const tilts = ["-3deg", "2.5deg", "-1.5deg", "3deg", "-2deg", "1deg", "-4deg", "2deg"];

export function CharacterCarousel({
  characters,
  onSelect,
}: {
  characters: Character[];
  onSelect?: (slug: string) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    const node = scroller.current;
    if (!node) return;
    const amount = node.clientWidth * 0.72;
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.22em] text-haze">
          SLIDE THE WALL
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="min-h-11 min-w-11 border-2 border-black bg-volt font-display text-xl text-ink shadow-[2px_2px_0_#000]"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous Derelicts"
          >
            ←
          </button>
          <button
            type="button"
            className="min-h-11 min-w-11 border-2 border-black bg-volt font-display text-xl text-ink shadow-[2px_2px_0_#000]"
            onClick={() => scrollByCard(1)}
            aria-label="Next Derelicts"
          >
            →
          </button>
        </div>
      </div>
      <div
        ref={scroller}
        tabIndex={0}
        onKeyDown={onKey}
        className="fade-x flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pt-4 hide-scroll md:gap-6"
        aria-label="Derelict roster"
      >
        {characters.map((character, index) => (
          <div
            key={character.slug}
            className={`shrink-0 snap-start ${index % 3 === 0 ? "w-[13.5rem] md:w-[16.5rem]" : "w-[12.25rem] md:w-[15rem]"} ${index % 2 === 0 ? "mt-0" : "mt-6"}`}
          >
            <CharacterCard
              character={character}
              rotate={tilts[index % tilts.length]}
              featured={index === 0}
              onSelect={() => onSelect?.(character.slug)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
