"use client";

import { movementAbilities, type MovementAbility } from "@/data/movement";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

const pad = (value: number) => String(value).padStart(2, "0");

export function MovementSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = movementAbilities[activeIndex];
  const total = movementAbilities.length;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = previewRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    for (const ability of movementAbilities) {
      const video = videoRefs.current[ability.id];
      if (!video) continue;
      if (ability.id === active.id && inView && !reducedMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  }, [active.id, inView, reducedMotion]);

  function select(index: number, focus = false) {
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = {
      ArrowRight: (activeIndex + 1) % total,
      ArrowDown: (activeIndex + 1) % total,
      ArrowLeft: (activeIndex - 1 + total) % total,
      ArrowUp: (activeIndex - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  }

  return (
    <section className="scene-sunset py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="page-title max-w-3xl text-[clamp(2.3rem,7vw,4.6rem)] text-paper">
            MOVE LIKE YOU BUILT THE PLACE.
          </h2>
          <p className="font-display text-lg tracking-[0.2em] text-ink" aria-hidden="true">
            MOVEMENT <span className="text-paper">{pad(activeIndex + 1)}</span> / {pad(total)}
          </p>
        </div>

        <div
          ref={previewRef}
          id="movement-preview"
          role="tabpanel"
          aria-labelledby={`movement-tab-${active.id}`}
          className="relative mt-6 aspect-[4/3] overflow-hidden border-4 border-black bg-[#171310] shadow-[8px_10px_0_#000] sm:aspect-video md:mt-8"
        >
          {movementAbilities.map((ability, index) => (
            <MovementMedia
              key={ability.id}
              ability={ability}
              index={index}
              total={total}
              isActive={index === activeIndex}
              reducedMotion={reducedMotion}
              videoRef={(node) => {
                videoRefs.current[ability.id] = node;
              }}
            />
          ))}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-5 md:px-8 md:pb-7">
            <div key={active.id} className="move-copy">
              <h3 className="display text-[clamp(2.4rem,7vw,5rem)] text-volt [text-shadow:3px_3px_0_#000]">
                {active.name}
              </h3>
              <p className="mt-1.5 max-w-xl text-base font-semibold leading-snug text-paper sm:text-lg md:text-xl">
                {active.description}
              </p>
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Movement abilities"
          className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 md:mt-6 lg:grid-cols-6"
        >
          {movementAbilities.map((ability, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={ability.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`movement-tab-${ability.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="movement-preview"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                onKeyDown={onTabKey}
                className={cn(
                  "move-tab relative flex min-h-16 flex-col items-start justify-center border-[3px] border-black px-2.5 py-2 text-left transition-[transform,box-shadow,background-color,color] duration-200 sm:min-h-[4.5rem] sm:px-3",
                  selected
                    ? "-translate-y-1 bg-volt text-ink shadow-[5px_6px_0_#000]"
                    : "bg-[#171310] text-paper shadow-[3px_3px_0_#000] hover:-translate-y-0.5 hover:text-volt",
                )}
              >
                <span className={cn("font-display text-xs tracking-[0.2em]", selected ? "text-ink/70" : "text-arc")}>
                  {pad(index + 1)}
                </span>
                <span className="font-display text-[clamp(0.95rem,2.6vw,1.35rem)] leading-none tracking-[0.06em] uppercase">
                  {ability.name}
                </span>
                <span
                  className={cn(
                    "move-tab-bar absolute inset-x-2.5 bottom-1.5 h-1 origin-left bg-arc sm:inset-x-3",
                    selected ? "scale-x-100" : "scale-x-0",
                  )}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MovementMedia({
  ability,
  index,
  total,
  isActive,
  reducedMotion,
  videoRef,
}: {
  ability: MovementAbility;
  index: number;
  total: number;
  isActive: boolean;
  reducedMotion: boolean;
  videoRef: (node: HTMLVideoElement | null) => void;
}) {
  const image = resolvePublicAsset(ability.image);
  const video = resolvePublicAsset(ability.video);
  const still = image?.kind === "raster" ? image.src : null;
  const showVideo = video?.kind === "video" && !reducedMotion;

  return (
    <div
      className={cn(
        "move-layer absolute inset-0",
        isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
      )}
      aria-hidden={!isActive}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={still ?? undefined}
          muted
          loop
          playsInline
          preload={isActive ? "auto" : "none"}
          aria-label={`${ability.name} gameplay clip`}
        >
          <source src={video.src} />
        </video>
      ) : still ? (
        <Image
          src={still}
          alt={`${ability.name} in Punktown`}
          fill
          sizes="(max-width: 1200px) 100vw, 1152px"
          quality={80}
          className="object-cover"
        />
      ) : (
        <div
          className="move-pending flex h-full w-full flex-col items-center justify-center px-4 pb-28 text-center sm:pb-32 md:pb-36"
          role="img"
          aria-label={`${ability.name} footage pending`}
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-arc sm:text-xs">
            FOOTAGE PENDING
          </span>
          <span className="move-pending-number display mt-1 text-[clamp(4.5rem,16vw,10rem)] text-transparent">
            {pad(index + 1)}
            <span className="text-[0.35em]"> / {pad(total)}</span>
          </span>
          <span className="mt-1 font-mono text-[10px] tracking-[0.16em] text-paper/55 sm:text-xs">
            {ability.image}.webp
          </span>
        </div>
      )}
    </div>
  );
}
