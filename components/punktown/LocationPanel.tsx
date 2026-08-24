import { GameImage } from "@/components/ui/GameImage";
import type { Location } from "@/types";
import { cn } from "@/lib/utils";

export function LocationPanel({
  location,
  compact = false,
}: {
  location: Location;
  compact?: boolean;
}) {
  return (
    <aside
      className={cn(
        "relative border-[2.5px] border-black bg-[#d8c7a4] text-ink shadow-[5px_5px_0_#000]",
        compact ? "p-4" : "p-5 md:p-6",
      )}
      aria-live="polite"
    >
      <span
        className="absolute right-4 top-0 h-7 w-10 -translate-y-1/2 bg-hazard/80"
        aria-hidden="true"
      />
      <p className="font-mono text-[11px] tracking-[0.22em] text-black/60">
        {location.status ?? "MAPPED"}
      </p>
      <h3 className="display mt-1 text-3xl md:text-4xl">{location.name}</h3>
      {!compact ? (
        <div className="mt-4 border-2 border-black">
          <GameImage
            src={location.image}
            alt={`${location.name} in Punktown`}
            fit="landmark"
            title={location.name.toUpperCase()}
            className="aspect-[16/9]"
          />
        </div>
      ) : null}
      <p className={cn("text-sm leading-7", compact ? "mt-2" : "mt-4")}>
        {location.description}
      </p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.2em]">POSSIBLE MATERIALS</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {location.componentCategories.map((item) => (
          <span
            key={item}
            className="border border-dashed border-black/50 bg-black/5 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
          >
            {item}
          </span>
        ))}
      </div>
      {location.hazards?.length ? (
        <>
          <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-[#8a1a2a]">
            HAZARDS
          </p>
          <ul className="mt-1.5 space-y-1 text-sm">
            {location.hazards.map((hazard) => (
              <li key={hazard}>{`/ ${hazard}`}</li>
            ))}
          </ul>
        </>
      ) : null}
    </aside>
  );
}
