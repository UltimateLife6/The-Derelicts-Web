"use client";

import { MaterialArt, ScavengeTargetArt } from "@/components/home/ScavengeArt";
import { Button, ButtonLink } from "@/components/ui/Button";
import { getComponent } from "@/data/components";
import { scavengeTargets } from "@/data/scavenge";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { type CSSProperties, useEffect, useRef, useState } from "react";

type Stage = "idle" | "dismantling" | "salvage" | "done";

const DISMANTLE_MS = 900;
const COLLECT_MS = 480;
const GRAB_STAGGER_MS = 140;

const FLOW = ["DISMANTLE", "SALVAGE", "INVENT"] as const;

const SHARDS = [
  { clip: "polygon(0 0, 58% 0, 46% 42%, 0 50%)", dx: "-38%", dy: "-14%", rot: "-22deg" },
  { clip: "polygon(58% 0, 100% 0, 100% 46%, 46% 42%)", dx: "40%", dy: "-20%", rot: "18deg" },
  { clip: "polygon(0 50%, 46% 42%, 54% 100%, 0 100%)", dx: "-34%", dy: "16%", rot: "-12deg" },
  { clip: "polygon(46% 42%, 100% 46%, 100% 100%, 54% 100%)", dx: "36%", dy: "20%", rot: "15deg" },
];

const SPARKS = [
  { x: "-140px", y: "-90px", c: "var(--volt)" },
  { x: "150px", y: "-70px", c: "var(--arc)" },
  { x: "-120px", y: "60px", c: "var(--hazard)" },
  { x: "130px", y: "90px", c: "var(--volt)" },
  { x: "10px", y: "-150px", c: "var(--arc)" },
  { x: "-30px", y: "140px", c: "var(--magenta)" },
];

const POP_FROM = [
  { x: "60%", y: "55%" },
  { x: "-60%", y: "55%" },
  { x: "60%", y: "-55%" },
  { x: "-60%", y: "-55%" },
];

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScavengeDemo() {
  const [targetIndex, setTargetIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("idle");
  const [flying, setFlying] = useState<Record<string, CSSProperties>>({});
  const [collected, setCollected] = useState<string[]>([]);
  const [bumped, setBumped] = useState<string | null>(null);
  const timers = useRef<number[]>([]);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const slotRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const target = scavengeTargets[targetIndex];
  const yields = target.yields.map((item) => ({
    ...item,
    name: getComponent(item.componentId)?.name ?? item.componentId,
  }));
  const hasAnother = scavengeTargets.length > 1;
  const flowStep = stage === "salvage" ? 1 : stage === "done" ? 2 : 0;

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, []);

  const allCollected = stage === "salvage" && collected.length === target.yields.length;

  useEffect(() => {
    if (!allCollected) return;
    const id = window.setTimeout(() => setStage("done"), prefersReducedMotion() ? 0 : 260);
    return () => window.clearTimeout(id);
  }, [allCollected]);

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  function dismantle() {
    if (stage !== "idle") return;
    setStage("dismantling");
    track("scavenge_dismantle", { target: target.id });
    later(() => setStage("salvage"), prefersReducedMotion() ? 0 : DISMANTLE_MS);
  }

  function collect(id: string) {
    if (stage !== "salvage" || flying[id] || collected.includes(id)) return;
    const card = cardRefs.current[id]?.getBoundingClientRect();
    const slot = slotRefs.current[id]?.getBoundingClientRect();
    const reduced = prefersReducedMotion();
    const style =
      card && slot && !reduced
        ? ({
            "--to-x": `${slot.left + slot.width / 2 - (card.left + card.width / 2)}px`,
            "--to-y": `${slot.top + slot.height / 2 - (card.top + card.height / 2)}px`,
          } as CSSProperties)
        : {};

    setFlying((current) => ({ ...current, [id]: style }));
    later(
      () => {
        setCollected((current) => (current.includes(id) ? current : [...current, id]));
        setBumped(id);
      },
      reduced ? 0 : COLLECT_MS,
    );
  }

  function grabEverything() {
    yields
      .filter((item) => !flying[item.componentId] && !collected.includes(item.componentId))
      .forEach((item, order) =>
        later(() => collect(item.componentId), prefersReducedMotion() ? 0 : order * GRAB_STAGGER_MS),
      );
  }

  function restart(nextIndex: number) {
    timers.current.splice(0).forEach((id) => window.clearTimeout(id));
    setTargetIndex(nextIndex);
    setFlying({});
    setCollected([]);
    setBumped(null);
    setStage("idle");
  }

  const status =
    stage === "dismantling"
      ? `Dismantling the ${target.name.toLowerCase()}.`
      : stage === "salvage"
        ? `${yields.length - collected.length} materials left to collect.`
        : stage === "done"
          ? "Nothing goes to waste."
          : "";

  return (
    <section className="scene-arcade relative overflow-hidden py-16 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-12 md:px-6">
        <div>
          <h2 className="page-title text-[clamp(2.6rem,7.5vw,5.2rem)] text-paper">
            RIP IT APART.
          </h2>
          <p className="mt-4 font-mark text-3xl text-arc md:text-4xl">
            If it looks useful, it&apos;s inventory.
          </p>

          <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3" aria-label="Scavenging loop">
            {FLOW.map((step, index) => (
              <li key={step} className="flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "display border-2 border-black px-2.5 py-1 text-xl shadow-[3px_3px_0_#000] transition-colors duration-300 sm:px-3 sm:text-2xl md:text-3xl",
                    index === flowStep ? "bg-volt text-ink" : "bg-[#241018] text-paper/55",
                    index % 2 === 0 ? "-rotate-1" : "rotate-1",
                  )}
                  aria-current={index === flowStep ? "step" : undefined}
                >
                  {step}
                </span>
                {index < FLOW.length - 1 ? (
                  <span className="eq-mark text-2xl sm:text-3xl" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <ButtonLink
            href="/inventions"
            variant="ghost"
            className="mt-8 border-paper/50 text-paper"
          >
            SEE WHAT YOU CAN BUILD →
          </ButtonLink>
        </div>

        <div className="relative border-4 border-black bg-[#241018] p-4 shadow-[8px_10px_0_#000] md:p-6">
          <div className="absolute inset-x-8 top-0 h-3 -translate-y-1/2 bg-hazard" aria-hidden="true" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-mark text-xl text-volt">{target.name.toLowerCase()}</p>
            <p className="font-display text-sm tracking-[0.18em] text-paper/60">
              {collected.length}/{yields.length} SALVAGED
            </p>
          </div>

          <div
            className={cn(
              "relative mt-3 h-[21rem] border-4 border-black bg-[#120a0e] sm:h-[24rem] md:h-[28rem]",
              (stage === "idle" || stage === "dismantling") && "overflow-hidden",
            )}
          >
            <div className="scav-floor absolute inset-x-0 bottom-0 h-16" aria-hidden="true" />

            {stage === "idle" ? (
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <ScavengeTargetArt
                  id={target.id}
                  image={target.image}
                  className="scav-idle h-[92%] w-auto max-w-[80%] aspect-[260/420]"
                />
              </div>
            ) : null}

            {stage === "dismantling" ? (
              <div className="absolute inset-0 flex items-end justify-center pb-4" aria-hidden="true">
                <div className="scav-impact absolute left-1/2 top-1/2 h-64 w-64">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <polygon
                      points="50,2 60,32 92,20 70,46 98,62 64,66 72,98 50,76 26,98 34,66 2,60 30,46 10,18 40,32"
                      fill="#ff6b1a"
                      stroke="#000"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="scav-krnk absolute left-1/2 top-[22%] font-mark text-5xl text-volt md:text-6xl">
                  KRNK!
                </span>
                <div className="scav-shake relative h-[92%] aspect-[260/420] max-w-[80%]">
                  {SHARDS.map((shard, index) => (
                    <div
                      key={index}
                      className="scav-shard absolute inset-0"
                      style={
                        {
                          clipPath: shard.clip,
                          "--dx": shard.dx,
                          "--dy": shard.dy,
                          "--rot": shard.rot,
                        } as CSSProperties
                      }
                    >
                      <ScavengeTargetArt id={target.id} image={target.image} className="h-full w-full" />
                    </div>
                  ))}
                </div>
                {SPARKS.map((spark, index) => (
                  <span
                    key={index}
                    className="scav-spark absolute left-1/2 top-1/2 h-3 w-3 border-2 border-black"
                    style={{ background: spark.c, "--sx": spark.x, "--sy": spark.y } as CSSProperties}
                  />
                ))}
              </div>
            ) : null}

            {stage === "salvage" || stage === "done" ? (
              <ul className="absolute inset-0 grid grid-cols-2 place-items-center gap-3 p-4 sm:gap-4 sm:p-6">
                {yields.map((item, index) => {
                  const isCollected = collected.includes(item.componentId);
                  const isFlying = Boolean(flying[item.componentId]);
                  return (
                    <li key={item.componentId} className="flex h-full w-full items-center justify-center">
                      <button
                        ref={(node) => {
                          cardRefs.current[item.componentId] = node;
                        }}
                        type="button"
                        onClick={() => collect(item.componentId)}
                        disabled={isFlying || isCollected}
                        aria-label={`Collect ${item.quantity} ${item.name}`}
                        className={cn(
                          "scav-card group relative flex w-full max-w-[11rem] flex-col items-center border-4 border-black bg-paper px-2 pb-2.5 pt-3 text-ink shadow-[5px_6px_0_#000] transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 sm:pt-4",
                          index % 2 === 0 ? "-rotate-2" : "rotate-2",
                          isFlying && "is-collecting z-30",
                          isCollected && "invisible",
                        )}
                        style={
                          {
                            "--pop-x": POP_FROM[index % POP_FROM.length].x,
                            "--pop-y": POP_FROM[index % POP_FROM.length].y,
                            "--pop-delay": `${index * 70}ms`,
                            ...flying[item.componentId],
                          } as CSSProperties
                        }
                      >
                        <span className="absolute -right-3 -top-3 border-2 border-black bg-hazard px-2 py-0.5 font-display text-lg leading-none text-ink shadow-[2px_2px_0_#000]">
                          ×{item.quantity}
                        </span>
                        <MaterialArt
                          id={item.componentId}
                          className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
                        />
                        <span className="mt-1.5 font-display text-base tracking-[0.08em] uppercase sm:text-lg">
                          {item.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {stage === "done" ? (
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <p className="scav-done display border-4 border-black bg-volt px-4 py-3 text-center text-[clamp(2rem,6vw,3.4rem)] text-ink shadow-[6px_7px_0_#000]">
                  NOTHING GOES TO WASTE.
                </p>
              </div>
            ) : null}
          </div>

          <ul className="mt-4 grid grid-cols-4 gap-2" aria-label="Inventory">
            {yields.map((item) => {
              const has = collected.includes(item.componentId);
              return (
                <li
                  key={item.componentId}
                  ref={(node) => {
                    slotRefs.current[item.componentId] = node;
                  }}
                  onAnimationEnd={() => setBumped((current) => (current === item.componentId ? null : current))}
                  className={cn(
                    "flex items-center justify-center gap-1.5 border-2 border-black px-1.5 py-1.5 shadow-[2px_2px_0_#000] transition-colors duration-300",
                    has ? "bg-[#3a1626]" : "border-dashed bg-[#120a0e]",
                    bumped === item.componentId && "scav-bump",
                  )}
                >
                  <MaterialArt
                    id={item.componentId}
                    className={cn("h-7 w-7 shrink-0 sm:h-8 sm:w-8", !has && "opacity-25 grayscale")}
                  />
                  <span
                    className={cn(
                      "font-display text-lg leading-none",
                      has ? "text-volt" : "text-paper/35",
                    )}
                  >
                    {has ? item.quantity : 0}
                  </span>
                  <span className="sr-only">{item.name}</span>
                </li>
              );
            })}
          </ul>

          <div className="mt-4">
            {stage === "done" ? (
              <Button
                variant="arcade"
                className="min-h-14 w-full !text-2xl tracking-[0.18em]"
                onClick={() => restart(hasAnother ? (targetIndex + 1) % scavengeTargets.length : targetIndex)}
              >
                {hasAnother ? "TRY ANOTHER" : "RESET"}
              </Button>
            ) : stage === "salvage" ? (
              <Button
                variant="arcade"
                className="min-h-14 w-full !bg-arc !text-2xl tracking-[0.18em]"
                onClick={grabEverything}
              >
                GRAB EVERYTHING
              </Button>
            ) : (
              <Button
                variant="arcade"
                className="min-h-14 w-full !text-2xl tracking-[0.18em]"
                onClick={dismantle}
                disabled={stage !== "idle"}
                aria-busy={stage === "dismantling"}
              >
                {stage === "dismantling" ? "RIPPING…" : "DISMANTLE"}
              </Button>
            )}
          </div>

          <p className="sr-only" aria-live="polite">
            {status}
          </p>
        </div>
      </div>
    </section>
  );
}
