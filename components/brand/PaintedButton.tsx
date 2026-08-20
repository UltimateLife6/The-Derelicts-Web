import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";

const paintedBase =
  "painted-btn inline-flex items-center justify-center gap-2 px-5 py-3 font-display uppercase tracking-[0.14em] transition duration-150 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

const paintedVariants = {
  yellow:
    "bg-volt text-ink shadow-[3px_3px_0_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#000]",
  ghost:
    "border-[1.5px] border-paper/80 bg-ink/35 text-paper shadow-[2px_2px_0_rgba(0,0,0,0.55)] hover:border-paper hover:bg-ink/55 hover:translate-y-px",
} as const;

type PaintedVariant = keyof typeof paintedVariants;

export function PaintedButton({
  variant = "yellow",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: PaintedVariant;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(paintedBase, paintedVariants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function PaintedButtonLink({
  href,
  variant = "yellow",
  className,
  children,
  ...props
}: {
  href: string;
  variant?: PaintedVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={cn(paintedBase, paintedVariants[variant], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
