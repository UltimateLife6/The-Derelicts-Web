"use client";

import { DistressedHeadline } from "@/components/brand/DistressedHeadline";
import { PaintedButton, PaintedButtonLink } from "@/components/brand/PaintedButton";
import { PaintStroke } from "@/components/brand/PaintStroke";
import { PunkDivider } from "@/components/brand/PunkDivider";
import { HeroMedia, useHasHeroKeyArt } from "@/components/home/HeroMedia";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { track } from "@/lib/analytics";
import { resolvePublicAsset } from "@/lib/assets";
import { useEffect, useState } from "react";

export function Hero() {
  const [trailerNote, setTrailerNote] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const hasKeyArt = useHasHeroKeyArt();
  const trailer = resolvePublicAsset(site.heroMedia.trailer);

  useEffect(() => {
    if (!trailerOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setTrailerOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trailerOpen]);

  const franchiseParts = site.franchise.includes(". ")
    ? site.franchise.split(". ").map((part, index, all) =>
        index < all.length - 1 ? `${part}.` : part,
      )
    : [site.franchise];

  return (
    <section className="relative min-h-[100svh]">
      <div className="absolute inset-0 overflow-hidden">
        <HeroMedia />
        {hasKeyArt ? null : <ParkSkyline />}
        {hasKeyArt ? null : (
          <div className="spark-field pointer-events-none absolute inset-0 hidden motion-reduce:hidden sm:block" />
        )}
      </div>

      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-end md:block">
        {/* Mobile: keep Spark + environmental PUNKTOWN sign clear before copy */}
        <div
          className="min-h-[58svh] shrink-0 sm:min-h-[54svh] md:hidden"
          aria-hidden="true"
        />

        <div className="hero-copy-falloff pointer-events-auto w-full px-4 pb-5 pt-3 sm:px-5 md:absolute md:bottom-4 md:left-3 md:w-[min(17.5rem,26vw)] md:max-w-[17.5rem] md:px-0 md:pb-0 md:pt-0 lg:bottom-5 lg:left-3.5 lg:w-[min(18.5rem,23vw)] xl:bottom-6 xl:left-4">
          <p className="font-mark text-[clamp(0.9rem,1.4vw,1.1rem)] leading-none tracking-[0.04em] text-volt">
            WELCOME TO
          </p>

          <DistressedHeadline className="mt-0 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[0.82]">
            PUNKTOWN!
          </DistressedHeadline>

          <PaintStroke tone="pink" className="mt-0.5" />

          <p className="mt-2 max-w-[16.5rem] font-display text-[0.95rem] leading-snug tracking-[0.06em] text-paper md:mt-2.5 md:text-[1.05rem]">
            <span className="block">{(franchiseParts[0] ?? site.franchise).toUpperCase()}</span>
            <span className="mt-0.5 block text-volt">
              {(franchiseParts[1] ?? "They built a better one.").toUpperCase()}
            </span>
          </p>

          <PunkDivider className="mt-1.5 max-w-[14rem] md:mt-2" />

          <p className="mt-1 font-display text-[10px] tracking-[0.22em] text-paper/40 md:text-[11px]">
            {site.secondaryLine.toUpperCase()}
          </p>

          <div className="mt-2.5 flex flex-col items-start gap-1.5 sm:mt-3">
            <PaintedButtonLink
              href="/punktown"
              variant="yellow"
              className="min-h-12 w-fit px-7 py-3 text-base md:px-8 md:text-lg"
              onClick={() => track("hero_enter_punktown")}
            >
              ENTER PUNKTOWN
            </PaintedButtonLink>
            <PaintedButton
              variant="ghost"
              className="min-h-10 w-fit border-paper/55 bg-ink/25 px-4 py-2 text-sm tracking-[0.12em] text-paper/80 md:text-[0.95rem]"
              onClick={() => {
                track("trailer_click");
                if (trailer?.kind === "video") {
                  setTrailerOpen(true);
                } else {
                  setTrailerNote(true);
                }
              }}
            >
              <span aria-hidden="true" className="text-[0.8em] opacity-80">
                ▶
              </span>
              {trailer?.kind === "video" ? "WATCH TRAILER" : "TRAILER / COMING SOON"}
            </PaintedButton>
          </div>

          {trailerNote ? (
            <p className="mt-2.5 font-mono text-xs tracking-[0.18em] text-hazard" role="status">
              TRANSMISSION PENDING — no footage is live yet.
            </p>
          ) : null}
        </div>
      </div>

      {trailerOpen && trailer?.kind === "video" ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Trailer"
          onClick={() => setTrailerOpen(false)}
        >
          <div className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <video className="w-full" controls autoPlay playsInline>
              <source src={trailer.src} />
            </video>
            <Button variant="ghost" className="mt-4" onClick={() => setTrailerOpen(false)}>
              CLOSE
            </Button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function ParkSkyline() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] w-full lg:h-[62%]"
      viewBox="0 0 1440 460"
      aria-hidden="true"
    >
      <path fill="#8a4e2a" d="M0 460V310l80-20 50 28 110-70 40 18 140-96 50 30 90-22 50 64 120-36 80 10 130-80 50 44 90-16 80 36 110-62 90 26 90-14 80 38V460H0Z" />
      <path fill="#2a241c" opacity="0.55" d="M0 460V360l200-40 180 24 220-50 240 30 260-44 340 40V460H0Z" />
      <g fill="none" stroke="#ff6b1a" strokeWidth="8">
        <circle cx="1088" cy="168" r="78" />
        <circle cx="1088" cy="168" r="10" fill="#f5e642" stroke="none" />
        <path d="M1088 90 V168 M1010 168 H1166" />
      </g>
      <path d="M250 250 C 340 110 470 90 560 180 C 650 80 760 140 860 90" fill="none" stroke="#9aa3ad" strokeWidth="10" />
      <rect x="1210" y="48" width="10" height="170" fill="#3dfff3" />
      <rect x="118" y="250" width="150" height="80" fill="#ff2d9a" />
      <rect x="430" y="268" width="120" height="70" fill="#f5e642" />
      <rect x="720" y="240" width="140" height="90" fill="#3dfff3" />
      <text x="140" y="300" fill="#fff" fontFamily="Impact, sans-serif" fontSize="28">PUNKTOWN</text>
      <ellipse cx="220" cy="400" rx="28" ry="48" fill="#f5e642" />
      <ellipse cx="280" cy="408" rx="24" ry="40" fill="#9b4dff" />
      <ellipse cx="340" cy="396" rx="26" ry="46" fill="#3dfff3" />
    </svg>
  );
}
