"use client";

import { ButtonLink } from "@/components/ui/Button";
import { CharacterCarousel } from "@/components/characters/CharacterCarousel";
import { characters } from "@/data/characters";
import { track } from "@/lib/analytics";

export function CharacterRoster() {
  return (
    <section className="overflow-hidden bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="page-title max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] text-paper">
          EVERY DERELICT IS DANGEROUS FOR A DIFFERENT REASON.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          They aren&apos;t soldiers. They&apos;re engineers, hackers, mechanics,
          chemists, inventors and survivors.
        </p>
        <div className="mt-8">
          <CharacterCarousel
            characters={characters}
            onSelect={(slug) => track("character_select", { slug })}
          />
        </div>
        <ButtonLink href="/derelicts" variant="ghost" className="mt-4">
          MEET THE DERELICTS →
        </ButtonLink>
      </div>
    </section>
  );
}
