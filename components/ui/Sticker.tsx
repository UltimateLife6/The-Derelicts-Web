import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Sticker({
  children,
  rotate = "-2deg",
  className,
}: {
  children: ReactNode;
  rotate?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-paper px-3 py-1 font-mark text-ink sticker-shadow",
        className,
      )}
      style={{ transform: `rotate(${rotate})` }}
    >
      {children}
    </span>
  );
}
