import { cn } from "@/lib/utils";

export function GraffitiLabel({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mark text-2xl text-volt drop-shadow-[2px_2px_0_#000]",
        className,
      )}
    >
      {children}
    </span>
  );
}
