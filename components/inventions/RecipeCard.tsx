import { ComponentChip } from "@/components/ui/ComponentChip";
import { GameImage } from "@/components/ui/GameImage";
import { getComponent } from "@/data/components";
import { getRecipeLabel } from "@/data/inventions";
import type { Invention } from "@/types";

export function RecipeCard({
  invention,
  layout = "scrap",
}: {
  invention: Invention;
  layout?: "bench" | "scrap";
}) {
  if (layout === "bench") {
    return (
      <article className="border-4 border-black bg-[#241e16] p-4 shadow-[6px_6px_0_#000] md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <GameImage
              src={invention.image}
              alt={`${invention.name} silhouette`}
              fit="silhouette"
              sizes="160px"
              className="h-28 w-28 shrink-0 border-2 border-black"
            />
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] text-arc">
                {invention.category} {" / "} PROTOTYPE
              </p>
              <h3 className="display mt-1 text-4xl text-paper">{invention.name}</h3>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {invention.componentIds.map((id, index) => (
              <span key={id} className="flex items-center gap-2">
                <ComponentChip label={getComponent(id)?.name ?? id} image={getComponent(id)?.image} />
                {index < invention.componentIds.length - 1 ? (
                  <span className="eq-mark text-2xl" aria-hidden="true">
                    +
                  </span>
                ) : (
                  <span className="eq-mark text-2xl" aria-hidden="true">
                    =
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-haze">
          {invention.description}
        </p>
      </article>
    );
  }

  return (
    <article className="bg-paper p-4 text-ink sticker-shadow">
      <GameImage
        src={invention.image}
        alt={`${invention.name} silhouette`}
        fit="silhouette"
        sizes="220px"
        className="mb-3 aspect-square"
      />
      <p className="font-mono text-[10px] tracking-[0.18em] opacity-70">
        CONCEPT {" / "} {invention.category}
      </p>
      <h3 className="display mt-2 text-3xl">{invention.name}</h3>
      <p className="mt-3 text-sm leading-6">{invention.description}</p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.14em] opacity-60">
        {getRecipeLabel(invention)}
      </p>
    </article>
  );
}
