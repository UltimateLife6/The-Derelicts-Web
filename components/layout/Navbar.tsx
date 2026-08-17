"use client";

import { ButtonLink } from "@/components/ui/Button";
import { ctaNav, primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.72);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || pathname !== "/"
          ? "border-b-4 border-black bg-[#171310]"
          : "bg-transparent has-[[aria-expanded=true]]:border-b-4 has-[[aria-expanded=true]]:border-black has-[[aria-expanded=true]]:bg-ink",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href="/"
          className="brand-paint text-2xl md:text-3xl"
          aria-label="The Derelicts home"
        >
          THE DERELICTS
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "text-sm tracking-[0.16em] text-paper/90 transition hover:text-volt",
                pathname === item.href && "bg-volt px-2 py-1 text-ink",
              )}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href={ctaNav.href} variant="tape" className="ml-2 px-4 py-2 text-base">
            {ctaNav.label}
          </ButtonLink>
        </nav>

        <MobileNav key={pathname} />
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
    <div className="lg:hidden">
      <button
        type="button"
        className="border-2 border-white px-3 py-2 font-display text-sm tracking-[0.12em] text-paper"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "CLOSE / 00" : "MENU / 01"}
      </button>
      {open ? (
        <div className="absolute inset-x-0 top-full">
          <MobileMenu open={open} onClose={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
