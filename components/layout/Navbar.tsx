"use client";

import { DerelictsLogo } from "@/components/brand/DerelictsLogo";
import { PaintedButtonLink } from "@/components/brand/PaintedButton";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ctaNav, primaryNav } from "@/data/navigation";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_SEPARATORS = ["bg-volt", "bg-flare", "bg-arc", "bg-acid"] as const;

export function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const headerPaint = resolvePublicAsset("/images/brand/header-paint");

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[5.5rem] min-[900px]:h-[6.25rem]">
        {headerPaint?.kind === "raster" ? (
          <Image
            src={headerPaint.src}
            alt=""
            fill
            priority={onHome}
            sizes="100vw"
            quality={90}
            className="object-cover object-top"
            draggable={false}
          />
        ) : (
          <div className="header-paint-fallback absolute inset-x-0 top-0 h-full" aria-hidden="true" />
        )}
      </div>

      <div className="pointer-events-auto relative mx-auto grid min-h-24 w-[min(100%-1.25rem,90rem)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-2 py-3 min-[900px]:gap-4 min-[900px]:px-3 min-[1100px]:gap-6 min-[1100px]:px-4 sm:w-[min(100%-1.75rem,90rem)]">
        <DerelictsLogo priority={onHome} className="min-w-0" />

        <nav
          className="hidden min-w-0 items-center justify-center gap-1.5 overflow-visible min-[900px]:flex min-[1024px]:gap-2.5 min-[1100px]:gap-3 xl:gap-4"
          aria-label="Primary"
        >
          {primaryNav.map((item, index) => (
            <span key={item.id} className="flex items-center gap-1.5 min-[1024px]:gap-2.5 min-[1100px]:gap-3 xl:gap-4">
              {index > 0 ? (
                <span
                  className={cn(
                    "h-3.5 w-0.5 shrink-0 rotate-[-8deg] opacity-90 min-[1024px]:h-4",
                    NAV_SEPARATORS[(index - 1) % NAV_SEPARATORS.length],
                  )}
                  aria-hidden="true"
                />
              ) : null}
              <Link
                href={item.href}
                className={cn(
                  "punk-nav-link whitespace-nowrap font-display text-[0.72rem] tracking-[0.14em] text-paper/95 min-[1024px]:text-[0.82rem] min-[1100px]:text-[0.9rem] xl:text-[0.95rem]",
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
            className="max-w-[11rem] px-2.5 py-2 text-[0.65rem] tracking-[0.1em] min-[1024px]:max-w-none min-[1024px]:px-3.5 min-[1024px]:text-xs min-[1100px]:px-4 min-[1100px]:py-2.5 min-[1100px]:text-sm xl:text-base"
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
        className="border-[1.5px] border-paper bg-ink/55 px-3 py-2 font-display text-sm tracking-[0.12em] text-paper"
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
