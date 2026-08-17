import { CharacterRoster } from "@/components/home/CharacterRoster";
import { CrewSignup } from "@/components/home/CrewSignup";
import { FeaturedCharacter } from "@/components/home/FeaturedCharacter";
import { GameplayLoop } from "@/components/home/GameplayLoop";
import { GameplayPhilosophy } from "@/components/home/GameplayPhilosophy";
import { Hero } from "@/components/home/Hero";
import { InventionBuilder } from "@/components/home/InventionBuilder";
import { MovementSection } from "@/components/home/MovementSection";
import { MysterySection } from "@/components/home/MysterySection";
import { PunktownPreview } from "@/components/home/PunktownPreview";
import { ScavengeDemo } from "@/components/home/ScavengeDemo";
import { StoryIntro } from "@/components/home/StoryIntro";
import { site } from "@/data/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: site.name,
    description: site.description,
    gamePlatform: "PC",
    applicationCategory: "Game",
    genre: ["Action", "Battle Royale", "Survival", "Crafting"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StoryIntro />
      <GameplayLoop />
      <InventionBuilder />
      <CharacterRoster />
      <FeaturedCharacter />
      <PunktownPreview />
      <ScavengeDemo />
      <GameplayPhilosophy />
      <MovementSection />
      <MysterySection />
      <CrewSignup />
    </>
  );
}
