"use client";

import { ButtonLink } from "@/components/ui/Button";
import {
  caseFileHref,
  evidenceFiles,
  type EvidenceFile,
  type RedactedPart,
} from "@/data/mystery";
import { track } from "@/lib/analytics";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

const DEFAULT_INDEX = Math.max(
  0,
  evidenceFiles.findIndex((file) => file.id === "surveillance-still"),
);
const CLOCK_START = 3 * 3600 + 17 * 60 + 42;

const STATUS: Record<EvidenceFile["status"], { text: string; tone: string }> = {
  PARTIAL: { text: "PARTIALLY RECOVERED", tone: "border-acid/50 text-acid" },
  PENDING: { text: "DECLASSIFICATION PENDING", tone: "border-arc/50 text-arc" },
  REDACTED: { text: "CONTENTS WITHHELD", tone: "border-flare/60 text-flare" },
};

const pad = (value: number) => String(value).padStart(2, "0");

function formatClock(offset: number) {
  const t = (CLOCK_START + offset) % 86400;
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`;
}

export function MysterySection() {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [tick, setTick] = useState(0);
  const monitorRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = evidenceFiles[activeIndex];
  const total = evidenceFiles.length;
  const live = inView && !reducedMotion;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = monitorRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [live]);

  function select(index: number, focus = false) {
    if (index !== activeIndex) track("mystery_evidence_select", { id: evidenceFiles[index].id });
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const keys: Record<string, number> = {
      ArrowRight: (activeIndex + 1) % total,
      ArrowDown: (activeIndex + 1) % total,
      ArrowLeft: (activeIndex - 1 + total) % total,
      ArrowUp: (activeIndex - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    select(keys[event.key], true);
  }

  return (
    <section
      aria-labelledby="discard-heading"
      className="case-file relative overflow-hidden py-14 text-paper md:py-20"
    >
      <div className="case-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <header className="grid gap-x-12 gap-y-5 border-b border-paper/15 pb-8 md:pb-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 border border-flare/60 px-3 py-1 font-mono text-[11px] tracking-[0.26em] text-flare sm:text-xs">
              <span className="h-1.5 w-1.5 bg-flare" aria-hidden="true" />
              FILE 001 <span className="text-paper/40">{"//"}</span> RESTRICTED ACCESS
            </p>
            <h2
              id="discard-heading"
              className="page-title mt-4 text-[clamp(2.7rem,6.8vw,5.6rem)] text-paper"
            >
              WHO STARTED THE GREAT DISCARD?
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="max-w-md text-lg leading-relaxed text-haze md:text-xl">
              Thousands of kids disappeared. Everyone assumed they were lost.{" "}
              <span className="font-semibold text-paper">They weren&apos;t.</span>
            </p>
            <p className="mt-4 inline-block -rotate-2 font-mark text-xl leading-tight text-flare md:text-2xl">
              BUT WHAT IF DISAPPEARING WAS NEVER THEIR IDEA?
            </p>
          </div>
        </header>

        <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
          <div className="self-start border border-paper/20 bg-black p-2 sm:p-2.5">
            <div
              ref={monitorRef}
              id="case-monitor"
              role="tabpanel"
              aria-labelledby={`case-tab-${active.id}`}
              className={cn("case-monitor relative aspect-video overflow-hidden bg-[#050706]", live && "is-live")}
            >
              {evidenceFiles.map((file, index) => (
                <MonitorLayer key={file.id} file={file} isActive={index === activeIndex} />
              ))}

              <div className="scanlines pointer-events-none absolute inset-0 z-20 opacity-70" aria-hidden="true" />
              <div className="case-static pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
              <div className="case-vignette pointer-events-none absolute inset-0 z-20" aria-hidden="true" />
              <div className="case-roll pointer-events-none absolute inset-x-0 z-20" aria-hidden="true" />
              <div key={active.id} className="case-cut pointer-events-none absolute inset-0 z-20" aria-hidden="true" />

              <MonitorHud channel={active.channel} clock={formatClock(tick)} />
            </div>
            <div className="flex items-center justify-between gap-4 px-1 pb-0.5 pt-2.5 font-mono text-[10px] tracking-[0.2em] text-paper/50 sm:text-[11px]">
              <span>
                {active.exhibit} <span className="text-flare">{"//"}</span> {active.label}
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                SOURCE <Redaction length={9} />
              </span>
            </div>
          </div>

          <div className="flex flex-col border border-paper/15 bg-[#100d0e]">
            <div className="flex items-center justify-between border-b border-paper/15 px-4 py-2.5 font-mono text-[11px] tracking-[0.24em] text-arc">
              <span>EVIDENCE</span>
              <span className="text-paper/45" aria-hidden="true">
                {pad(activeIndex + 1)} / {pad(total)}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Evidence files"
              className="grid grid-cols-3 gap-px bg-paper/10 lg:grid-cols-1"
            >
              {evidenceFiles.map((file, index) => {
                const selected = index === activeIndex;
                return (
                  <button
                    key={file.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`case-tab-${file.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="case-monitor case-notes"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={onTabKey}
                    className={cn(
                      "case-tab relative flex min-h-[4.25rem] flex-col items-start justify-center gap-1 px-3 py-2.5 text-left transition-colors duration-200 sm:px-4 lg:min-h-0 lg:flex-row lg:items-center lg:justify-between lg:py-3.5",
                      selected ? "bg-[#1f1719] text-paper" : "bg-[#100d0e] text-paper/60 hover:bg-[#171214] hover:text-paper",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 w-1 transition-colors duration-200",
                        selected ? "bg-flare" : "bg-transparent",
                      )}
                      aria-hidden="true"
                    />
                    <span className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-3">
                      <span className={cn("font-mono text-[10px] tracking-[0.22em]", selected ? "text-flare" : "text-arc/80")}>
                        {file.exhibit}
                      </span>
                      <span className="font-display text-[clamp(0.9rem,2.4vw,1.2rem)] leading-none tracking-[0.06em]">
                        {file.label}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "hidden border px-1.5 py-0.5 font-mono text-[10px] tracking-[0.18em] lg:inline-block",
                        STATUS[file.status].tone,
                      )}
                    >
                      {file.status}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              id="case-notes"
              role="tabpanel"
              aria-labelledby={`case-tab-${active.id}`}
              className="flex-1 border-t border-paper/15 px-4 py-4 sm:px-5 sm:py-5"
            >
              <div key={active.id} className="case-notes">
                <p className={cn("inline-block border px-2 py-0.5 font-mono text-[10px] tracking-[0.22em]", STATUS[active.status].tone)}>
                  {STATUS[active.status].text}
                </p>
                {active.fields ? (
                  <dl className="mt-4 space-y-1.5 font-mono text-sm text-acid lg:hidden">
                    {active.fields.map((field) => (
                      <div key={field.label} className="flex flex-wrap gap-x-2">
                        <dt className="text-paper/55">{field.label}:</dt>
                        <dd>
                          <RedactedLine parts={field.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                <p className="mt-4 text-base leading-relaxed text-paper/85 md:text-lg">
                  {active.fields ? <span className="font-mono text-sm tracking-[0.12em] text-flare">NOTE: </span> : null}
                  {active.note}
                </p>
              </div>
            </div>

            <div className="border-t border-paper/15 p-4 sm:p-5">
              {caseFileHref ? (
                <ButtonLink
                  href={caseFileHref}
                  className="min-h-14 w-full !rotate-0 border-2 border-black !text-xl shadow-[5px_6px_0_var(--flare)] hover:-translate-y-0.5"
                >
                  ACCESS THE FILE →
                </ButtonLink>
              ) : (
                <div>
                  <p
                    className="flex min-h-14 w-full items-center justify-center border-2 border-dashed border-volt/50 px-5 font-display text-xl tracking-[0.12em] text-volt/60"
                    aria-describedby="case-sealed"
                  >
                    ACCESS THE FILE →
                  </p>
                  <p id="case-sealed" className="mt-2.5 text-center font-mono text-[10px] tracking-[0.22em] text-paper/45 sm:text-[11px]">
                    FILE SEALED <span className="text-flare">{"//"}</span> DECLASSIFICATION PENDING
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MonitorHud({ channel, clock }: { channel: string; clock: string }) {
  const corner = "absolute h-4 w-4 border-acid/70 sm:h-6 sm:w-6";
  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 font-mono text-[9px] tracking-[0.18em] text-acid [text-shadow:0_1px_2px_#000] sm:text-[11px]"
      aria-hidden="true"
    >
      <span className={cn(corner, "left-2 top-2 border-l-2 border-t-2 sm:left-3 sm:top-3")} />
      <span className={cn(corner, "right-2 top-2 border-r-2 border-t-2 sm:right-3 sm:top-3")} />
      <span className={cn(corner, "bottom-2 left-2 border-b-2 border-l-2 sm:bottom-3 sm:left-3")} />
      <span className={cn(corner, "bottom-2 right-2 border-b-2 border-r-2 sm:bottom-3 sm:right-3")} />

      <span className="absolute left-5 top-3.5 flex items-center gap-1.5 text-flare sm:left-8 sm:top-5">
        <span className="h-1.5 w-1.5 rounded-full bg-flare motion-safe:animate-flicker sm:h-2 sm:w-2" />
        REC
      </span>
      <span className="absolute right-5 top-3.5 text-arc sm:right-8 sm:top-5">{channel}</span>
      <span className="absolute bottom-3.5 left-5 sm:bottom-5 sm:left-8">
        ██.██.████ <span className="tabular-nums">{clock}</span>
      </span>
      <span className="absolute bottom-3.5 right-5 flex items-end gap-0.5 sm:bottom-5 sm:right-8">
        <span className="mr-1">SIG</span>
        <span className="h-1.5 w-1 bg-acid" />
        <span className="h-2 w-1 bg-acid" />
        <span className="h-2.5 w-1 bg-acid" />
        <span className="h-3 w-1 bg-acid/25" />
      </span>
    </div>
  );
}

function MonitorLayer({ file, isActive }: { file: EvidenceFile; isActive: boolean }) {
  return (
    <div
      className={cn(
        "case-layer absolute inset-0",
        isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
      )}
      aria-hidden={!isActive}
    >
      {file.id === "surveillance-still" ? (
        <SurveillanceFeed slot={file.image} />
      ) : (
        <ScannedDocument file={file} />
      )}
    </div>
  );
}

function SurveillanceFeed({ slot }: { slot?: string }) {
  const art = slot ? resolvePublicAsset(slot) : null;

  if (art?.kind === "raster") {
    return (
      <Image
        src={art.src}
        alt="Night security-camera view of a fenced carnival yard, where armed figures lead lines of children toward a transport truck beneath a dark Ferris wheel."
        fill
        sizes="(max-width: 1024px) 100vw, 760px"
        quality={80}
        className="case-feed object-cover"
      />
    );
  }

  return (
    <div className="relative h-full w-full" role="img" aria-label="Surveillance still pending">
      <ParkSilhouette />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
        <span className="bg-black/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.3em] text-arc sm:text-xs">
          SURVEILLANCE STILL PENDING
        </span>
        <span className="font-mono text-[9px] tracking-[0.14em] text-paper/40 sm:text-[11px]">
          {slot}.webp
        </span>
      </div>
    </div>
  );
}

function ScannedDocument({ file }: { file: EvidenceFile }) {
  const symbol = file.id === "unknown-symbol" && file.image ? resolvePublicAsset(file.image) : null;

  return (
    <div className="case-desk flex h-full w-full items-center justify-center px-[9%] py-[11%] sm:p-[7%]">
      <div className="case-sheet relative flex h-full w-full max-w-[36rem] -rotate-1 flex-col bg-paper px-[5%] py-[3%] text-ink shadow-[6px_8px_0_rgba(0,0,0,0.6)] sm:py-[4%]">
        <div className="flex items-baseline justify-between border-b-2 border-ink/80 pb-1 font-mono text-[8px] tracking-[0.2em] sm:text-xs">
          <span className="font-bold">{file.label}</span>
          <span className="text-ink/60">{file.exhibit}</span>
        </div>

        {file.fields ? (
          <div className="mt-[3%] space-y-[1.5%] font-mono text-[9px] sm:mt-[4%] sm:space-y-[2.5%] sm:text-sm md:text-base">
            {file.fields.map((field) => (
              <p key={field.label}>
                <span className="text-ink/55">{field.label}:</span> <RedactedLine parts={field.value} dark />
              </p>
            ))}
            <p className="pt-[1%] font-mark text-[10px] text-rust sm:pt-[2%] sm:text-base md:text-lg">
              NOTE: {file.note}
            </p>
          </div>
        ) : (
          <div className="relative mt-[4%] flex flex-1 items-center justify-center">
            {symbol?.kind === "raster" ? (
              <Image
                src={symbol.src}
                alt="Unidentified symbol recovered from Punktown."
                fill
                sizes="(max-width: 1024px) 60vw, 420px"
                className="object-contain"
              />
            ) : (
              <>
                <span className="aspect-square h-[78%] bg-ink" role="img" aria-label="Symbol redacted" />
                <span className="absolute rotate-[-8deg] border-2 border-flare bg-paper/90 px-2 py-0.5 font-display text-sm tracking-[0.18em] text-flare sm:border-[3px] sm:px-3 sm:text-2xl">
                  WITHHELD
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function RedactedLine({ parts, dark = false }: { parts: RedactedPart[]; dark?: boolean }) {
  return (
    <>
      {parts.map((part, index) =>
        typeof part === "string" ? (
          <span key={index}>{part}</span>
        ) : (
          <Redaction key={index} length={part.redacted} dark={dark} />
        ),
      )}
    </>
  );
}

function Redaction({ length, dark = false }: { length: number; dark?: boolean }) {
  return (
    <span
      className={cn("case-redact inline-block h-[1em] align-[-0.15em]", dark ? "bg-ink" : "bg-paper/80")}
      style={{ width: `${length * 0.62}em` }}
    >
      <span className="sr-only">[redacted]</span>
    </span>
  );
}

const round = (value: number) => Math.round(value * 100) / 100;

function ParkSilhouette() {
  const spokes = Array.from({ length: 12 }, (_, i) => (i * Math.PI) / 6);
  const rim = (angle: number) => ({
    x: round(1160 + 250 * Math.cos(angle)),
    y: round(380 + 250 * Math.sin(angle)),
  });
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="case-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1c19" />
          <stop offset="0.7" stopColor="#070b0a" />
          <stop offset="1" stopColor="#040505" />
        </linearGradient>
        <radialGradient id="case-glow" cx="0.72" cy="0.38" r="0.45">
          <stop offset="0" stopColor="#3dfff3" stopOpacity="0.1" />
          <stop offset="1" stopColor="#3dfff3" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#case-sky)" />
      <rect width="1600" height="900" fill="url(#case-glow)" />

      <g fill="none" stroke="#2a4a42" strokeWidth="5" opacity="0.85">
        <circle cx="1160" cy="380" r="250" />
        <circle cx="1160" cy="380" r="232" strokeWidth="2" />
        <circle cx="1160" cy="380" r="40" />
        {spokes.map((angle) => (
          <line
            key={angle}
            x1="1160"
            y1="380"
            x2={rim(angle).x}
            y2={rim(angle).y}
            strokeWidth="2.5"
          />
        ))}
        <path d="M1160 380 L1010 770 M1160 380 L1310 770" strokeWidth="7" />
      </g>
      <g fill="#1d332e">
        {spokes.map((angle) => (
          <rect
            key={angle}
            x={round(rim(angle).x - 14)}
            y={round(rim(angle).y + 4)}
            width="28"
            height="22"
          />
        ))}
      </g>

      <g fill="none" stroke="#223c36" strokeWidth="5" opacity="0.8">
        <path d="M-20 600 C 120 470, 230 470, 330 560 S 520 690, 640 540 S 820 400, 930 500" />
        <path d="M60 760 L80 540 M180 760 L185 490 M280 760 L280 520 M380 760 L380 590 M480 760 L490 640 M580 760 L590 600 M680 760 L680 535 M780 760 L790 440 M880 760 L890 460" strokeWidth="3" />
      </g>

      <g fill="none" stroke="#1f3732" strokeWidth="3" opacity="0.9">
        <path d="M1440 770 L1462 200 L1484 200 L1506 770 M1448 560 L1500 560 M1454 380 L1494 380 M1448 560 L1494 380 M1500 560 L1454 380 M1462 200 L1484 200" />
        <path d="M1462 210 Q 1180 330 930 270" strokeWidth="2" />
      </g>

      <rect y="760" width="1600" height="140" fill="#060807" />
      <g stroke="#1a2c28" strokeWidth="3">
        <path d="M0 760 L1600 760" />
        {Array.from({ length: 17 }, (_, i) => (
          <line key={i} x1={i * 100 + 20} y1="760" x2={i * 100 + 20} y2="715" />
        ))}
        <path d="M0 728 L1600 728" strokeWidth="2" />
      </g>
    </svg>
  );
}
