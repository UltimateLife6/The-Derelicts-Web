import { AbilityRail } from "@/components/characters/AbilityCard";
import { GameImage } from "@/components/ui/GameImage";
import { getFeaturedCharacter } from "@/data/characters";
import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCharacter() {
  const character = getFeaturedCharacter();
  const atmosphere = resolvePublicAsset(character.backgroundImage);

  return (
    <section className="relative overflow-hidden bg-char py-20 md:py-28">
      {atmosphere?.kind === "raster" ? (
        <Image
          src={atmosphere.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className={`pointer-events-none opacity-20 ${fitClassName("landmark")}`}
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 82% 12%, ${character.color}40, transparent 34%)`,
          }}
        />
      )}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[0.85fr_1.15fr] md:items-start md:px-6">
        <div>
          <p className="font-mono text-xs tracking-[0.28em]" style={{ color: character.color }}>
            FEATURED {" / "} {character.specialty}
          </p>
          <h2 className="page-title mt-3 text-[clamp(3.5rem,10vw,7rem)] text-paper">
            {character.name.toUpperCase()}
          </h2>
          <p className="mt-4 max-w-md text-lg text-haze">{character.description}</p>
          <Link
            href={`/derelicts/${character.slug}`}
            className="mt-8 block max-w-sm border-4 border-black shadow-[8px_8px_0_#000]"
          >
            <GameImage
              src={character.portrait}
              alt={`${character.name}, ${character.specialty}`}
              accent={character.color}
              fit="face"
              title={character.name.toUpperCase()}
              className="aspect-[4/5]"
            />
          </Link>
        </div>
        <AbilityRail
          passive={character.passive}
          active={character.active}
          ultimate={character.ultimate}
          accent={character.color}
        />
      </div>
    </section>
  );
}
