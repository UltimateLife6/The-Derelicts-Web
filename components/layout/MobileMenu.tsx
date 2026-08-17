"use client";

import { ButtonLink } from "@/components/ui/Button";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { ctaNav, primaryNav } from "@/data/navigation";
import Link from "next/link";

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      className="border-t border-arc/30 bg-ink px-4 py-4 lg:hidden"
    >
      <TerminalPanel title="DIR // PUNKTOWN_NAV">
        <ul className="space-y-1">
          {primaryNav.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between py-2 text-acid hover:text-volt"
              >
                <span>
                  {String(index + 1).padStart(2, "0")} {" / "} {item.label}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <ButtonLink href={ctaNav.href} variant="arcade" className="w-full">
            {ctaNav.label}
          </ButtonLink>
        </div>
      </TerminalPanel>
    </div>
  );
}
