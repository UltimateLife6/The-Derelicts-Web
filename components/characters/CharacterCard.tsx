import Link from "next/link";
import { GameImage } from "@/components/ui/GameImage";
import type { Character } from "@/types";
import { cn } from "@/lib/utils";

export function CharacterCard({
  character,
  rotate = "0deg",
  onSelect,
  featured = false,
}: {
  character: Character;
  rotate?: string;
  onSelect?: () => void;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/derelicts/${character.slug}`}
      onClick={onSelect}
      className={cn(
        "relative block bg-paper p-2 text-ink sticker-shadow transition duration-200 [transform:rotate(var(--tilt))] hover:[transform:rotate(var(--tilt))_translateY(-6px)]",
        featured ? "p-3" : "",
      )}
      style={{ ["--tilt" as string]: rotate }}
    >
      <span
        className="absolute left-6 top-0 z-10 h-3 w-16 -translate-y-1/2 bg-black/25"
        aria-hidden="true"
      />
      <span
        className="absolute right-5 top-0 z-10 h-3 w-10 -translate-y-1/2"
        style={{ background: character.color }}
        aria-hidden="true"
      />
      <GameImage
        src={character.portrait}
        alt={`${character.name}, ${character.specialty}`}
        accent={character.color}
        fit="face"
        className={featured ? "aspect-[4/5]" : "aspect-[3/4]"}
      />
      <p
        className="mt-2 inline-block px-2 py-0.5 font-mark text-sm"
        style={{ background: character.color, color: "#07080c" }}
      >
        {character.specialty}
      </p>
      <h3 className="display mt-1 text-3xl md:text-4xl">{character.name}</h3>
      <p className="mt-1 text-sm leading-5">{character.tagline}</p>
    </Link>
  );
}
