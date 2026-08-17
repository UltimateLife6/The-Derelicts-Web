import { cn } from "@/lib/utils";

export function GlitchText({
  children,
  className,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "p";
}) {
  return (
    <Tag className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-arc opacity-70 mix-blend-screen motion-safe:animate-glitch"
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 text-flare opacity-50 mix-blend-screen motion-safe:animate-glitch [animation-delay:-.4s]"
      >
        {children}
      </span>
    </Tag>
  );
}
