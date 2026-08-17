import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function TerminalPanel({
  title = "PUNKTOWN // TERM",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-arc/40 bg-black/80 shadow-[0_0_40px_rgba(61,255,243,0.12)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-arc/30 px-4 py-2 font-mono text-[11px] tracking-[0.22em] text-arc">
        <span>{title}</span>
        <span className="motion-safe:animate-flicker">REC</span>
      </div>
      <div className="relative p-4 font-mono text-sm leading-7 text-acid">
        <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}
