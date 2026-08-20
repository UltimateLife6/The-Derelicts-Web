"use client";

import { HeroMedia, useHasHeroKeyArt } from "@/components/home/HeroMedia";
import { Button, ButtonLink } from "@/components/ui/Button";
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

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <HeroMedia />
      {hasKeyArt ? null : <ParkSkyline />}
      {hasKeyArt ? null : (
        <div className="spark-field pointer-events-none absolute inset-0 hidden motion-reduce:hidden sm:block" />
      )}

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-end gap-6 px-4 pb-12 pt-24 md:px-6 md:pb-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="type-scrim max-w-xl px-4 py-5 md:px-6 md:py-6">
          <p className="brand-paint text-[clamp(2.4rem,8vw,4.4rem)]">THE DERELICTS</p>
          <h1 className="page-title mt-3 text-[clamp(3rem,10vw,6.4rem)] text-paper">
            {site.heroLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-lg font-mark text-2xl leading-tight text-volt md:text-3xl">
            {site.franchise}
          </p>
          <p className="mt-3 font-display text-xl tracking-[0.12em] text-paper md:text-2xl">
            {site.secondaryLine.toUpperCase()}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href="/punktown"
              variant="arcade"
              className="min-h-12 min-w-48"
              onClick={() => track("hero_enter_punktown")}
            >
              ENTER PUNKTOWN
            </ButtonLink>
            <Button
              variant="stencil"
              className="min-h-12 min-w-48"
              onClick={() => {
                track("trailer_click");
                if (trailer?.kind === "video") {
                  setTrailerOpen(true);
                } else {
                  setTrailerNote(true);
                }
              }}
            >
              {trailer?.kind === "video" ? "WATCH TRAILER" : "TRAILER / COMING SOON"}
            </Button>
          </div>
          {trailerNote ? (
            <p className="mt-3 font-mono text-xs tracking-[0.18em] text-hazard" role="status">
              TRANSMISSION PENDING — no footage is live yet.
            </p>
          ) : null}
        </div>

        <div className="hidden justify-self-end lg:block">
          <p className="brand-paint neon-sign text-5xl motion-safe:animate-flicker">PUNKTOWN</p>
          <p className="mt-2 max-w-xs text-sm text-paper">
            Kids took the park. Then they wired it.
          </p>
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
