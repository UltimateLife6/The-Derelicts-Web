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
        "group relative block overflow-hidden bg-paper text-ink sticker-shadow transition duration-200 [transform:rotate(var(--tilt))] hover:[transform:rotate(var(--tilt))_translateY(-6px)]",
        featured ? "p-2" : "p-1.5",
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
        fit="body"
        className={
          featured
            ? "aspect-[3/4] min-h-80 !bg-ink"
            : "aspect-[3/4] min-h-72 !bg-ink"
        }
      />
      <div className="absolute inset-x-1.5 bottom-1.5 z-20 bg-gradient-to-t from-black via-black/70 to-transparent p-3 pt-16 text-paper">
        <h3 className="display text-4xl md:text-5xl">{character.name}</h3>
        <p className="mt-1 text-sm tracking-[0.16em] text-paper/80">
          THE {character.specialty}
        </p>
        <p className="mt-2 font-mark text-lg leading-tight" style={{ color: character.color }}>
          {character.hook}
        </p>
      </div>
      <div className="absolute inset-1.5 z-30 flex flex-col justify-end bg-ink/90 p-4 opacity-0 transition duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        <p className="font-mono text-[10px] tracking-[0.2em] text-haze">KIT</p>
        <p className="display mt-2 text-2xl text-paper">{character.passive.name}</p>
        <p className="display mt-1 text-2xl text-paper">{character.active.name}</p>
        <p className="display mt-1 text-3xl" style={{ color: character.color }}>
          {character.ultimate.name}
        </p>
      </div>
    </Link>
  );
}
