import type { Ability } from "@/types";
import { cn } from "@/lib/utils";

export function AbilityCard({
  kind,
  ability,
  accent,
}: {
  kind: "PASSIVE" | "ACTIVE" | "ULTIMATE";
  ability: Ability;
  accent: string;
}) {
  const styles = {
    PASSIVE: "border-l-4 bg-ink/60 pl-5",
    ACTIVE: "border-2 bg-steel/80 px-5",
    ULTIMATE: "border-4 border-black px-5 shadow-[5px_5px_0_#000]",
  } as const;

  return (
    <article
      className={cn("py-4", styles[kind])}
      style={kind === "ULTIMATE" ? { background: `${accent}22` } : kind === "ACTIVE" ? { borderColor: accent } : { borderLeftColor: accent }}
    >
      <p className="font-mono text-[11px] tracking-[0.28em] text-haze">{kind}</p>
      <h3 className="display mt-2 text-3xl text-paper md:text-4xl">{ability.name}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-haze md:text-base">
        {ability.description}
      </p>
    </article>
  );
}

export function AbilityRail({
  passive,
  active,
  ultimate,
  accent,
}: {
  passive: Ability;
  active: Ability;
  ultimate: Ability;
  accent: string;
}) {
  return (
    <div className="relative grid gap-3">
      <span
        className="ability-wire pointer-events-none absolute top-3 bottom-3 left-[11px] w-px opacity-50"
        aria-hidden="true"
      />
      <AbilityCard kind="PASSIVE" ability={passive} accent={accent} />
      <AbilityCard kind="ACTIVE" ability={active} accent={accent} />
      <AbilityCard kind="ULTIMATE" ability={ultimate} accent={accent} />
    </div>
  );
}
