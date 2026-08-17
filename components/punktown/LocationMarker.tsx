"use client";

import { cn } from "@/lib/utils";

export function LocationMarker({
  name,
  x,
  y,
  active,
  onSelect,
}: {
  name: string;
  x: number;
  y: number;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "absolute z-10 flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center gap-2 md:min-h-0 md:min-w-0",
        active ? "z-20" : "",
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={name}
      aria-pressed={active}
      onClick={onSelect}
    >
      <span
        className={cn(
          "block h-3.5 w-3.5 shrink-0 rounded-full border-2 border-ink shadow-[0_0_0_4px_rgba(0,0,0,0.35)]",
          active ? "bg-volt" : "bg-hazard",
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "hidden max-w-[9.5rem] truncate border border-black px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] shadow-[2px_2px_0_#000] md:inline",
          active ? "bg-volt text-ink" : "bg-paper text-ink",
        )}
      >
        {name}
      </span>
    </button>
  );
}
