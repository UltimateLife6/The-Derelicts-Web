"use client";

import { ButtonLink } from "@/components/ui/Button";
import { CharacterCarousel } from "@/components/characters/CharacterCarousel";
import { characters } from "@/data/characters";
import { track } from "@/lib/analytics";

export function CharacterRoster() {
  return (
    <section className="overflow-hidden bg-[#f0e2c4] py-20 text-ink md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="font-mark text-2xl text-magenta">the crew</p>
        <h2 className="page-title mt-2 max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)]">
          MISFITS. GENIUSES. THE FUTURE.
        </h2>
        <p className="mt-3 max-w-xl text-lg">
          Not soldiers. Kids who can invent, hack, and hold the park together.
        </p>
        <div className="mt-8">
          <CharacterCarousel
            characters={characters}
            onSelect={(slug) => track("character_select", { slug })}
          />
        </div>
        <ButtonLink href="/derelicts" variant="ghost" className="mt-4 border-ink text-ink hover:border-magenta hover:text-magenta">
          MEET THE DERELICTS →
        </ButtonLink>
      </div>
    </section>
  );
}
