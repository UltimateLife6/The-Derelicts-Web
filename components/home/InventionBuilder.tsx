"use client";

import { Button, ButtonLink } from "@/components/ui/Button";
import { ComponentChip } from "@/components/ui/ComponentChip";
import { GameImage } from "@/components/ui/GameImage";
import { getComponent } from "@/data/components";
import { prototypeInventions } from "@/data/inventions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";

export function InventionBuilder() {
  const recipes = prototypeInventions;
  const [index, setIndex] = useState(0);
  const [built, setBuilt] = useState(false);
  const [building, setBuilding] = useState(false);
  const timer = useRef<number | null>(null);

  const recipe = recipes[index];
  const components = useMemo(
    () => recipe.componentIds.map((id) => getComponent(id)).filter(Boolean),
    [recipe],
  );

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function selectRecipe(next: number, moveFocus = false) {
    setIndex(next);
    setBuilt(false);
    setBuilding(false);
    track("invention_recipe_change", { slug: recipes[next].slug });
    if (moveFocus) {
      queueMicrotask(() => {
        document.getElementById(`recipe-${recipes[next].id}`)?.focus();
      });
    }
  }

  function build() {
    if (building) return;
    setBuilt(false);
    setBuilding(true);
    track("invention_build", { slug: recipe.slug });
    timer.current = window.setTimeout(() => {
      setBuilding(false);
      setBuilt(true);
    }, 520);
  }

  function onRecipeKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      selectRecipe((index + 1) % recipes.length, true);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      selectRecipe((index - 1 + recipes.length) % recipes.length, true);
    }
  }

  return (
    <section className="scene-sunset py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="font-mark text-2xl text-ink">rip it apart</p>
        <h2 className="page-title mt-2 max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] text-paper">
          BUILD SOMETHING DANGEROUS.
        </h2>
        <p className="mt-3 max-w-xl font-display text-2xl tracking-[0.08em] text-ink">
          OBJECT + OBJECT + OBJECT = RIDICULOUS INVENTION
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div
            role="radiogroup"
            aria-label="Prototype recipes"
            className="flex gap-3 overflow-x-auto pb-2 hide-scroll lg:flex-col lg:overflow-visible"
          >
            {recipes.map((item, itemIndex) => (
              <button
                key={item.id}
                id={`recipe-${item.id}`}
                type="button"
                role="radio"
                aria-checked={itemIndex === index}
                tabIndex={itemIndex === index ? 0 : -1}
                onKeyDown={onRecipeKey}
                onClick={() => selectRecipe(itemIndex)}
                className={cn(
                  "min-w-[11rem] shrink-0 border-2 border-black px-4 py-3 text-left shadow-[3px_3px_0_#000] lg:min-w-0",
                  itemIndex % 2 === 0 ? "-rotate-1" : "rotate-1",
                  itemIndex === index
                    ? "bg-volt text-ink"
                    : "bg-paper text-ink hover:bg-acid",
                )}
              >
                <span className="block font-display text-2xl tracking-[0.08em]">
                  {item.name}
                </span>
                <span className="mt-1 block text-sm tracking-[0.08em] opacity-70">
                  {item.category}
                </span>
              </button>
            ))}
          </div>

          <div
            className={cn(
              "relative border-4 border-black bg-[#6b4a2a] p-5 shadow-[8px_10px_0_#000] md:p-7",
              building && "is-building motion-safe:animate-shake",
            )}
          >
            <div className="absolute inset-x-6 top-0 h-3 -translate-y-1/2 bg-magenta" aria-hidden="true" />
            <p className="font-mark text-xl text-volt">slot the junk</p>
            <div className="mt-5 flex items-end justify-center gap-2 overflow-x-auto pb-1 hide-scroll md:gap-4">
              {components.map((component, componentIndex) => (
                <div key={component!.id} className="flex items-end gap-2 md:gap-3">
                  <div className="bench-slot w-24 text-center md:w-28">
                    <ComponentChip
                      label={component!.name}
                      image={component!.image}
                      className="w-full flex-col py-3"
                    />
                  </div>
                  {componentIndex < components.length - 1 ? (
                    <span className="eq-mark mb-6 text-3xl md:text-4xl" aria-hidden="true">
                      +
                    </span>
                  ) : (
                    <span className="eq-mark mb-6 text-3xl md:text-4xl" aria-hidden="true">
                      =
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="my-5 flex justify-center" aria-hidden="true">
              <span className="display text-4xl text-volt">↓</span>
            </div>

            <Button
              variant="arcade"
              className="min-h-12 w-full"
              onClick={build}
              aria-describedby="build-result"
            >
              BUILD
            </Button>

            <div
              id="build-result"
              aria-live="polite"
              className="mt-5 min-h-48 bg-[#171310] p-4 outline outline-4 outline-black md:p-6"
            >
              {built ? (
                <div className="motion-safe:animate-assemble">
                  <GameImage
                    src={recipe.image}
                    alt={`${recipe.name} silhouette`}
                    fit="silhouette"
                    sizes="(max-width: 768px) 70vw, 360px"
                    className="mx-auto aspect-square w-full max-w-sm border-4 border-black bg-[#2c261e]"
                  />
                  <p className="mt-4 text-center font-mark text-xl text-magenta">RESULT</p>
                  <h3 className="display mt-1 text-center text-5xl text-volt md:text-7xl">
                    {recipe.name}
                  </h3>
                </div>
              ) : (
                <p className="py-10 text-center font-mark text-2xl text-paper">
                  {building ? "Sparks. Tape. Go." : "Slam BUILD."}
                </p>
              )}
            </div>
          </div>
        </div>

        <ButtonLink href="/inventions" variant="ghost" className="mt-10 border-ink text-ink hover:border-volt hover:text-volt">
          EXPLORE INVENTIONS →
        </ButtonLink>
      </div>
    </section>
  );
}
