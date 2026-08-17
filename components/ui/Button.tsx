import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

type Variant = "tape" | "arcade" | "stencil" | "ghost";

const variants: Record<Variant, string> = {
  tape: "bg-volt text-ink rotate-[-1deg] shadow-[4px_4px_0_#000] hover:rotate-0",
  arcade:
    "bg-hazard text-ink border-4 border-black shadow-[inset_0_-6px_0_rgba(0,0,0,0.35)] hover:translate-y-0.5",
  stencil:
    "border-2 border-volt bg-transparent text-volt hover:bg-volt hover:text-ink",
  ghost: "border border-haze/40 bg-transparent text-paper hover:border-volt hover:text-volt",
};

export function Button({
  variant = "tape",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center px-5 py-3 font-display text-lg tracking-[0.12em] uppercase transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "tape",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-5 py-3 font-display text-lg tracking-[0.12em] uppercase transition duration-200",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
