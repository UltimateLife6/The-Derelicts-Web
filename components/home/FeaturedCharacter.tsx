import { AbilityRail } from "@/components/characters/AbilityCard";
import { GameImage } from "@/components/ui/GameImage";
import { getFeaturedCharacter } from "@/data/characters";
import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export function FeaturedCharacter() {
  const character = getFeaturedCharacter();
  const atmosphere = resolvePublicAsset(character.backgroundImage);
  const fullBody = resolvePublicAsset(`/images/characters/${character.slug}-full`);
  const portraitSrc =
    fullBody?.kind === "raster"
      ? `/images/characters/${character.slug}-full`
      : character.portrait;

  return (
    <section className="relative overflow-hidden bg-[#1c1712] py-20 md:py-28">
      {atmosphere?.kind === "raster" ? (
        <Image
          src={atmosphere.src}
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className={`pointer-events-none opacity-25 ${fitClassName("landmark")}`}
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 18% 20%, ${character.color}55, transparent 42%)`,
          }}
        />
      )}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-[1.05fr_0.95fr] md:items-end md:px-6">
        <Link
          href={`/derelicts/${character.slug}`}
          className="block max-w-xl border-4 border-black bg-paper p-2 shadow-[10px_12px_0_#000]"
        >
          <GameImage
            src={portraitSrc}
            alt={`${character.name}, ${character.specialty}`}
            accent={character.color}
            fit={fullBody?.kind === "raster" ? "body" : "face"}
            className="aspect-[3/4] min-h-[28rem] md:min-h-[36rem]"
          />
        </Link>
        <div>
          <p className="font-mark text-2xl" style={{ color: character.color }}>
            featured
          </p>
          <h2 className="page-title mt-2 text-[clamp(3.5rem,10vw,7rem)] text-paper">
            {character.name.toUpperCase()}
          </h2>
          <p className="display mt-2 text-3xl text-paper/80">THE {character.specialty}</p>
          <p className="mt-4 font-mark text-2xl" style={{ color: character.color }}>
            {character.hook}
          </p>
          <div className="mt-8">
            <AbilityRail
              passive={character.passive}
              active={character.active}
              ultimate={character.ultimate}
              accent={character.color}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
