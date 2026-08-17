import { GameImage } from "@/components/ui/GameImage";
import type { Location } from "@/types";

export function LocationPanel({ location }: { location: Location }) {
  return (
    <aside
      className="relative bg-[#d8c7a4] p-5 text-ink shadow-[8px_10px_0_#000] md:p-6"
      aria-live="polite"
    >
      <span className="absolute right-4 top-0 h-8 w-12 -translate-y-1/2 bg-hazard/80" aria-hidden="true" />
      <p className="font-mono text-[11px] tracking-[0.22em] text-black/60">
        {location.status ?? "MAPPED"}
      </p>
      <h3 className="display mt-1 text-4xl">{location.name}</h3>
      <div className="mt-4 border-2 border-black">
        <GameImage
          src={location.image}
          alt={`${location.name} in Punktown`}
          fit="landmark"
          title={location.name.toUpperCase()}
          className="aspect-[16/9]"
        />
      </div>
      <p className="mt-4 text-sm leading-7">{location.description}</p>
      <p className="mt-5 font-mono text-[11px] tracking-[0.2em]">POSSIBLE MATERIALS</p>
      <div className="mt-3 flex flex-wrap gap-2">
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
          <p className="mt-5 font-mono text-[11px] tracking-[0.2em] text-[#8a1a2a]">
            HAZARDS
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {location.hazards.map((hazard) => (
              <li key={hazard}>{`/ ${hazard}`}</li>
            ))}
          </ul>
        </>
      ) : null}
    </aside>
  );
}
