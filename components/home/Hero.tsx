"use client";

import { HeroMedia, useHasHeroKeyArt } from "@/components/home/HeroMedia";
import { Button, ButtonLink } from "@/components/ui/Button";
import { GlitchText } from "@/components/ui/GlitchText";
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
      {hasKeyArt ? null : <ParkSilhouette />}
      <div className="spark-field pointer-events-none absolute inset-0 hidden motion-reduce:hidden sm:block" />
      <div className="hero-crt pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink via-ink/80 to-transparent md:h-40" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-end gap-8 px-4 pb-14 pt-28 md:px-6 md:pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <p className="font-mark text-2xl text-hazard md:text-3xl">
            junk is possibility
          </p>
          <h1 className="page-title mt-3 text-[clamp(3.4rem,12vw,8rem)] text-paper">
            {site.heroLines.map((line, index) => (
              <span key={line} className="block">
                {index === site.heroLines.length - 1 ? (
                  <GlitchText>{line}</GlitchText>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-paper md:text-2xl">
            {site.franchise}
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
          <p className="display neon-sign text-5xl tracking-[0.2em] motion-safe:animate-flicker">
            PUNKTOWN
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.26em] text-haze">
            ABANDONED PARK / LIVE SETTLEMENT
          </p>
        </div>

        <ul className="flex flex-wrap gap-2 lg:col-span-2">
          {[site.metadata.inDevelopment, site.metadata.platform, site.metadata.engine].map(
            (item) => (
              <li
                key={item}
                className="border border-dashed border-volt/50 bg-ink/50 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-volt"
              >
                {item}
              </li>
            ),
          )}
        </ul>
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

function ParkSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] w-full text-black/50 lg:h-[58%]"
      viewBox="0 0 1440 420"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 420V268l70-18 40 32 90-80 30 20 120-110 48 36 70-24 40 70 90-40 60 8 110-90 40 50 80-20 70 40 90-70 86 30 80-18 90 42 136-36V420H0Z"
      />
      <g fill="none" stroke="#ff6b1a" strokeOpacity="0.55" strokeWidth="3">
        <circle cx="1080" cy="150" r="70" />
        <circle cx="1080" cy="150" r="8" />
        <path d="M1080 80 V150 M1010 150 H1150 M1032 98 L1128 202 M1128 98 L1032 202" />
      </g>
      <rect x="1188" y="40" width="8" height="150" fill="#3dfff3" fillOpacity="0.5" />
      <path d="M220 250 Q 360 120 520 210 T 820 160" fill="none" stroke="#f5e642" strokeOpacity="0.35" strokeWidth="4" />
    </svg>
  );
}
