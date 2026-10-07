import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { JSX } from "react";

/** Raster at `image` wins; the SVG stand-in renders only until that file is dropped in. */
export function ScavengeTargetArt({
  id,
  image,
  className,
}: {
  id: string;
  image: string;
  className?: string;
}) {
  const art = resolvePublicAsset(image);

  if (art?.kind === "raster") {
    return (
      <span className={cn("relative block", className)}>
        <Image
          src={art.src}
          alt=""
          fill
          sizes="(max-width: 768px) 70vw, 360px"
          quality={85}
          className="object-contain object-bottom"
        />
      </span>
    );
  }

  return id === "arcade-cabinet" ? <ArcadeCabinetSvg className={className} /> : null;
}

export function MaterialArt({ id, className }: { id: string; className?: string }) {
  const art = resolvePublicAsset(`/images/components/${id}`);

  if (art?.kind === "raster") {
    return (
      <span className={cn("relative block", className)}>
        <Image src={art.src} alt="" fill sizes="96px" quality={82} className="object-contain" />
      </span>
    );
  }

  const Icon = materialIcons[id];
  return Icon ? <Icon className={className} /> : null;
}

function ArcadeCabinetSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 420" className={cn("block", className)} aria-hidden="true">
      <ellipse cx="132" cy="408" rx="112" ry="10" fill="#000" opacity="0.55" />

      <polygon points="204,36 238,20 238,390 204,404" fill="#8e1248" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
      <polygon points="34,36 68,20 238,20 204,36" fill="#c41a62" stroke="#000" strokeWidth="6" strokeLinejoin="round" />
      <rect x="34" y="36" width="170" height="368" fill="#ff2d9a" stroke="#000" strokeWidth="6" />

      <path d="M34 150 q20 10 12 40 q-6 22 10 48 l-22 0z" fill="#7a3b1c" opacity="0.75" />
      <path d="M204 300 q-26 4 -30 30 q-4 24 12 40 l18 0z" fill="#7a3b1c" opacity="0.7" />
      <path d="M150 36 q8 6 2 12 q10 2 18 -12z" fill="#7a3b1c" opacity="0.6" />
      <path d="M214 120 q12 30 4 70 q14 -20 16 -60z" fill="#5c0c2e" opacity="0.8" />
      <path d="M220 250 l10 40 M216 310 l14 26" stroke="#f0e2c4" strokeWidth="2" opacity="0.35" />

      <rect x="46" y="48" width="146" height="44" fill="#171310" stroke="#000" strokeWidth="5" />
      <text x="119" y="78" textAnchor="middle" fontFamily="Impact, 'Arial Black', sans-serif" fontSize="21" fill="#f5e642" letterSpacing="1" transform="rotate(-3 119 72)">
        DEADMAN&apos;S
      </text>
      <path d="M58 84 q30 -6 60 0 t60 -2" stroke="#ff2d9a" strokeWidth="4" fill="none" strokeLinecap="round" />

      <rect x="46" y="102" width="146" height="112" fill="#171310" stroke="#000" strokeWidth="5" />
      <rect x="56" y="112" width="126" height="90" fill="#0b3b3d" />
      <rect x="56" y="112" width="126" height="90" fill="#3dfff3" opacity="0.18" />
      <path d="M56 124h126M56 136h126M56 148h126M56 160h126M56 172h126M56 184h126M56 196h126" stroke="#000" strokeWidth="2" opacity="0.35" />
      <text x="119" y="150" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="700" fontSize="14" fill="#3dfff3">
        GAME OVER
      </text>
      <text x="119" y="170" textAnchor="middle" fontFamily="'Courier New', monospace" fontSize="9" fill="#3dfff3" opacity="0.8">
        INSERT SCRAP
      </text>
      <path d="M128 128 l-14 14 l8 6 l-18 22 M122 148 l22 10 l10 24 M114 142 l-30 -8" stroke="#f0e2c4" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      <path d="M156 112 l26 0 l0 30 z" fill="#171310" />

      <polygon points="34,222 204,222 224,250 16,250" fill="#f5e642" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
      <rect x="16" y="250" width="208" height="20" fill="#bfa92a" stroke="#000" strokeWidth="5" />
      <ellipse cx="70" cy="240" rx="13" ry="4" fill="#000" />
      <line x1="70" y1="240" x2="64" y2="216" stroke="#000" strokeWidth="6" strokeLinecap="round" />
      <circle cx="64" cy="213" r="9" fill="#ff6b1a" stroke="#000" strokeWidth="4" />
      <circle cx="122" cy="238" r="7" fill="#3dfff3" stroke="#000" strokeWidth="4" />
      <circle cx="148" cy="234" r="7" fill="#ff2d9a" stroke="#000" strokeWidth="4" />
      <circle cx="174" cy="238" r="7" fill="#171310" stroke="#000" strokeWidth="4" />
      <path d="M190 226 l18 12" stroke="#7a3b1c" strokeWidth="5" opacity="0.8" />

      <rect x="48" y="294" width="36" height="66" fill="#0b0908" stroke="#000" strokeWidth="5" />
      <rect x="54" y="302" width="24" height="18" fill="#1f7a4a" stroke="#000" strokeWidth="2" />
      <path d="M58 308h8M66 308v8M70 304v10" stroke="#c6ff3d" strokeWidth="1.5" />
      <path d="M60 326 q-4 30 6 54 q4 14 -2 24" stroke="#ff6b1a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M68 328 q10 26 0 46 q-6 12 4 22" stroke="#3dfff3" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M74 324 q12 18 14 40 q2 18 -6 30" stroke="#f5e642" strokeWidth="4" fill="none" strokeLinecap="round" />

      <rect x="100" y="292" width="58" height="62" fill="#2c261e" stroke="#000" strokeWidth="5" />
      <rect x="110" y="304" width="12" height="20" fill="#ff6b1a" stroke="#000" strokeWidth="3" />
      <rect x="136" y="304" width="12" height="20" fill="#ff6b1a" stroke="#000" strokeWidth="3" />
      <text x="129" y="344" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="700" fontSize="9" fill="#f0e2c4">
        25¢
      </text>

      <g transform="rotate(10 186 318)">
        <rect x="168" y="300" width="34" height="34" fill="#f0e2c4" stroke="#000" strokeWidth="3" />
        <path d="M176 308l18 18M194 308l-18 18" stroke="#ff2d9a" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g transform="rotate(-8 168 370)">
        <path d="M150 376 l6 -16 l8 10 l6 -14 l6 14 l8 -10 l6 16 z" fill="#f5e642" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
      </g>
      <g transform="rotate(-14 120 280)">
        <rect x="92" y="272" width="56" height="14" fill="#171310" />
        <text x="120" y="283" textAnchor="middle" fontFamily="Impact, 'Arial Black', sans-serif" fontSize="10" fill="#3dfff3">
          PUNKTOWN
        </text>
      </g>

      <rect x="34" y="384" width="170" height="20" fill="#171310" stroke="#000" strokeWidth="5" />
      <circle cx="44" cy="46" r="2.5" fill="#000" />
      <circle cx="194" cy="46" r="2.5" fill="#000" />
      <circle cx="44" cy="376" r="2.5" fill="#000" />
      <circle cx="194" cy="376" r="2.5" fill="#000" />
      <path d="M40 110 l20 -6 M180 290 l18 4 M120 372 l24 -4" stroke="#f0e2c4" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

type IconProps = { className?: string };

const materialIcons: Record<string, (props: IconProps) => JSX.Element> = {
  "circuit-board": ({ className }) => (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g transform="rotate(-8 40 40)">
        <rect x="8" y="16" width="64" height="48" rx="3" fill="#1f7a4a" stroke="#000" strokeWidth="4" />
        <path d="M14 28h14v12h10M14 52h20l6-6h20M50 22v12h16M58 58v-8" stroke="#c6ff3d" strokeWidth="2.5" fill="none" />
        <rect x="32" y="28" width="18" height="18" fill="#171310" stroke="#000" strokeWidth="2" />
        <path d="M35 26v-3M41 26v-3M47 26v-3M35 49v3M41 49v3M47 49v3" stroke="#b9a894" strokeWidth="2" />
        <circle cx="62" cy="40" r="4" fill="#3dfff3" stroke="#000" strokeWidth="2" />
        <circle cx="18" cy="42" r="3" fill="#ff6b1a" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  ),
  wiring: ({ className }) => (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g fill="none" strokeLinecap="round">
        <path d="M10 56c10-34 30-34 34-10s24 20 26-14" stroke="#000" strokeWidth="11" />
        <path d="M10 56c10-34 30-34 34-10s24 20 26-14" stroke="#ff2d9a" strokeWidth="6" />
        <path d="M12 30c18 4 20 30 34 30s16-26 24-30" stroke="#000" strokeWidth="11" />
        <path d="M12 30c18 4 20 30 34 30s16-26 24-30" stroke="#f5e642" strokeWidth="6" />
        <path d="M18 68c8-12 22-6 30-18s14-26 22-28" stroke="#000" strokeWidth="10" />
        <path d="M18 68c8-12 22-6 30-18s14-26 22-28" stroke="#3dfff3" strokeWidth="5" />
      </g>
      <path d="M70 32l6-4M70 22l7 1M12 30l-6-3" stroke="#ff6b1a" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  speaker: ({ className }) => (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <g transform="rotate(6 40 40)">
        <rect x="14" y="8" width="52" height="64" fill="#2c261e" stroke="#000" strokeWidth="4" />
        <circle cx="40" cy="46" r="19" fill="#171310" stroke="#000" strokeWidth="4" />
        <circle cx="40" cy="46" r="11" fill="#5a4a3a" stroke="#000" strokeWidth="3" />
        <circle cx="40" cy="46" r="4" fill="#ff6b1a" stroke="#000" strokeWidth="2" />
        <circle cx="40" cy="19" r="6" fill="#171310" stroke="#000" strokeWidth="3" />
        <path d="M24 30l8 6M52 60l6 6" stroke="#f0e2c4" strokeWidth="2" opacity="0.5" />
      </g>
    </svg>
  ),
  "scrap-metal": ({ className }) => (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <polygon points="8,50 40,30 72,42 50,70 14,66" fill="#6b5a44" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="16,24 46,10 62,26 34,44 18,40" fill="#8c8f94" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 54 q10 -6 20 2 M46 58l12-8" stroke="#7a3b1c" strokeWidth="4" opacity="0.8" />
      <circle cx="28" cy="28" r="3" fill="#171310" />
      <circle cx="50" cy="22" r="3" fill="#171310" />
      <circle cx="58" cy="50" r="3" fill="#171310" />
      <path d="M30 34l14-8" stroke="#f0e2c4" strokeWidth="2" opacity="0.5" />
    </svg>
  ),
};
