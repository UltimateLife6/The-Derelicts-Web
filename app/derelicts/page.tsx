import { AbilityRail } from "@/components/characters/AbilityCard";
import { GameImage } from "@/components/ui/GameImage";
import { characters } from "@/data/characters";
import { createMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Meet the Derelicts",
  description:
    "Engineers, hackers, mechanics, chemists, inventors and survivors. Every Derelict is dangerous for a different reason.",
  path: "/derelicts",
});

export default function DerelictsPage() {
  return (
    <div className="bg-ink pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="font-mark text-3xl text-hazard">the working crew</p>
        <h1 className="page-title mt-2 text-[clamp(3rem,10vw,7rem)] text-paper">
          MEET THE DERELICTS
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          They aren&apos;t soldiers. Each one is dangerous because of what they
          can invent, hack, or hold together.
        </p>
        <div className="mt-14 space-y-20">
          {characters.map((character, index) => {
            const flip = index % 2 === 1;
            return (
              <article
                key={character.slug}
                className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start"
              >
                <Link
                  href={`/derelicts/${character.slug}`}
                  className={cn(
                    "relative block max-w-lg border-4 border-black bg-paper p-2 shadow-[8px_10px_0_#000]",
                    flip ? "lg:order-2 lg:justify-self-end" : "",
                    index % 2 === 0 ? "-rotate-1" : "rotate-1",
                  )}
                >
                  <span
                    className="absolute left-5 top-0 h-3 w-14 -translate-y-1/2"
                    style={{ background: character.color }}
                    aria-hidden="true"
                  />
                <GameImage
                  src={character.portrait}
                  alt={`${character.name}, ${character.specialty}`}
                  accent={character.color}
                  fit="body"
                  className="aspect-[3/4] min-h-[22rem] md:min-h-[28rem]"
                />
          <p className="display mt-1 text-3xl text-ink">{character.hook}</p>
                </Link>
                <div className={flip ? "lg:order-1" : ""}>
                  <h2 className="page-title text-5xl text-paper md:text-6xl">
                    <Link href={`/derelicts/${character.slug}`}>{character.name}</Link>
                  </h2>
                  <p className="mt-3 max-w-xl text-haze">{character.description}</p>
                  <p className="mt-3 font-mono text-xs tracking-[0.16em] text-paper">
                    SIGNATURE {" / "} {character.signatureInvention}
                  </p>
                  <div className="mt-6">
                    <AbilityRail
                      passive={character.passive}
                      active={character.active}
                      ultimate={character.ultimate}
                      accent={character.color}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
