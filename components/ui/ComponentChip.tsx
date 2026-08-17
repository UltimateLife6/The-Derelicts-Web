import { cn } from "@/lib/utils";

export function ComponentChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-dashed border-arc/70 bg-ink/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-arc",
        className,
      )}
    >
      {label}
    </span>
  );
}
