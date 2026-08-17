import { RecipeCard } from "@/components/inventions/RecipeCard";
import { inventions, prototypeInventions } from "@/data/inventions";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Inventions",
  description:
    "Junk is only junk if you lack imagination. Prototype recipes and concept machines from The Derelicts.",
  path: "/inventions",
});

export default function InventionsPage() {
  const concepts = inventions.filter((invention) => invention.status === "concept");

  return (
    <div className="bg-ink pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h1 className="page-title max-w-5xl text-[clamp(2.4rem,8vw,5.2rem)] text-paper">
          JUNK IS ONLY JUNK IF YOU LACK IMAGINATION.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-haze">
          Prototype recipes have working component lists. Concept inventions are
          named fantasies still waiting for a bench.
        </p>

        <section className="mt-14">
          <h2 className="display text-4xl text-volt">PROTOTYPE RECIPES</h2>
          <div className="mt-6 space-y-5">
            {prototypeInventions.map((invention) => (
              <RecipeCard key={invention.id} invention={invention} layout="bench" />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="display text-4xl text-hazard">CONCEPT SCRAPS</h2>
          <div className="mt-8 flex flex-wrap items-start gap-5">
            {concepts.map((invention, index) => (
              <div
                key={invention.id}
                className={`w-full sm:w-[calc(50%-0.65rem)] lg:w-[calc(33.33%-0.9rem)] ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
              >
                <RecipeCard invention={invention} layout="scrap" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
