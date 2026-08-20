import { cn } from "@/lib/utils";

export function PunkDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-paper/35" />
      <span className="h-1 w-1 rotate-45 bg-paper/50" />
      <span className="h-px flex-1 bg-paper/35" />
    </div>
  );
}
