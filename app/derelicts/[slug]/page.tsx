import { AbilityRail } from "@/components/characters/AbilityCard";
import { ButtonLink } from "@/components/ui/Button";
import { GameImage } from "@/components/ui/GameImage";
import { characters, getCharacter } from "@/data/characters";
import { fitClassName, resolvePublicAsset } from "@/lib/assets";
import { createMetadata } from "@/lib/seo";
import Image from "next/image";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) return createMetadata({ title: "Unknown Derelict", path: `/derelicts/${slug}` });
  return createMetadata({
    title: `${character.name} — ${character.specialty}`,
    description: character.description,
    path: `/derelicts/${slug}`,
  });
}

export default async function DerelictPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);
  if (!character) notFound();
  const atmosphere = resolvePublicAsset(character.backgroundImage);

  const fullBody = resolvePublicAsset(`/images/characters/${character.slug}-full`);
  const portraitSrc =
    fullBody?.kind === "raster"
      ? `/images/characters/${character.slug}-full`
      : character.portrait;

  return (
    <div className="relative overflow-hidden bg-ink pt-24 pb-20 md:pt-28 md:pb-28">
      {atmosphere?.kind === "raster" ? (
        <Image
          src={atmosphere.src}
          alt=""
          fill
          sizes="100vw"
          quality={55}
          className={`pointer-events-none opacity-[0.16] ${fitClassName("landmark")}`}
        />
      ) : null}
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div className="-rotate-1 border-4 border-black bg-paper p-2 shadow-[8px_10px_0_#000]">
          <GameImage
            src={portraitSrc}
            alt={`${character.name}, ${character.specialty}`}
            accent={character.color}
            fit={fullBody?.kind === "raster" ? "body" : "face"}
            className="aspect-[3/4] min-h-[24rem] md:min-h-[32rem]"
          />
        </div>
        <div>
          <p className="font-mark text-2xl" style={{ color: character.color }}>
            THE {character.specialty}
          </p>
          <h1 className="page-title mt-2 text-[clamp(3.5rem,10vw,6.5rem)] text-paper">
            {character.name}
          </h1>
          <p className="mt-3 font-mark text-2xl" style={{ color: character.color }}>
            {character.hook}
          </p>
          <p className="mt-4 max-w-xl text-lg text-haze">{character.description}</p>
          <p className="mt-4 font-mono text-xs tracking-[0.16em] text-volt">
            SIGNATURE INVENTION {" / "} {character.signatureInvention}
          </p>
          <div className="mt-8">
            <AbilityRail
              passive={character.passive}
              active={character.active}
              ultimate={character.ultimate}
              accent={character.color}
            />
          </div>
          <ButtonLink href="/derelicts" variant="ghost" className="mt-8">
            BACK TO THE CREW →
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
