import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeading({
  kicker,
  title,
  subtitle,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      {kicker ? (
        <p className="mb-3 font-mono text-xs tracking-[0.28em] text-volt">
          {kicker}
        </p>
      ) : null}
      <h2 className="display text-5xl text-paper sm:text-6xl md:text-7xl">{title}</h2>
      {subtitle ? (
        <div className="mt-4 max-w-2xl text-lg text-haze">{subtitle}</div>
      ) : null}
    </div>
  );
}
