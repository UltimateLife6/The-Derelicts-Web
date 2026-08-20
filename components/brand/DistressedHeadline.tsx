import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function DistressedHeadline({
  children,
  className,
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
}) {
  return (
    <Tag
      className={cn(
        "font-display uppercase leading-[0.86] tracking-[0.02em] text-paper",
        "[text-shadow:2px_2px_0_rgba(0,0,0,0.55),-1px_0_0_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
