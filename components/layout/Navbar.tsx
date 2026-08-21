"use client";

import { DerelictsLogo } from "@/components/brand/DerelictsLogo";
import { PaintedButtonLink } from "@/components/brand/PaintedButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ctaNav, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_SEPARATORS = ["bg-volt", "bg-flare", "bg-arc", "bg-acid"] as const;

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] w-full bg-black">
      <div className="pointer-events-auto mx-auto grid min-h-[4.75rem] w-[min(calc(100%-2rem),93.75rem)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 min-[900px]:min-h-[100px] min-[900px]:gap-8 min-[900px]:px-8 min-[900px]:py-0 min-[1100px]:gap-10 sm:w-[min(calc(100%-2.5rem),93.75rem)] sm:px-5">
        <DerelictsLogo priority={onHome} className="min-w-0" />

        <nav
          className="hidden min-w-0 items-center justify-center gap-[clamp(1.25rem,2vw,2.125rem)] overflow-visible min-[900px]:flex"
          aria-label="Primary"
        >
          {primaryNav.map((item, index) => (
            <span
              key={item.id}
              className="flex items-center gap-[clamp(1.25rem,2vw,2.125rem)]"
            >
              {index > 0 ? (
                <span
                  className={cn(
                    "h-[0.85em] w-0.5 shrink-0 rotate-[-8deg]",
                    NAV_SEPARATORS[(index - 1) % NAV_SEPARATORS.length],
                  )}
                  aria-hidden="true"
                />
              ) : null}
              <Link
                href={item.href}
                className={cn(
                  "punk-nav-link whitespace-nowrap font-display text-[clamp(0.9375rem,1.05vw,1.125rem)] tracking-[0.12em] text-paper",
                  pathname === item.href && "text-volt",
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <div className="hidden justify-self-end min-[900px]:block">
          <PaintedButtonLink
            href={ctaNav.href}
            variant="yellow"
            className="min-h-12 px-6 py-2.5 text-sm tracking-[0.12em] min-[1100px]:text-base"
          >
            <span aria-hidden="true" className="text-[0.85em] text-ink">
              ▲
            </span>
            {ctaNav.label}
          </PaintedButtonLink>
        </div>

        <div className="col-start-3 justify-self-end min-[900px]:hidden">
          <MobileNav key={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        className="border-[1.5px] border-paper bg-black px-3 py-2 font-display text-sm tracking-[0.12em] text-paper"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "CLOSE / 00" : "MENU / 01"}
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-1.5rem,20rem)]">
          <MobileMenu open={open} onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
