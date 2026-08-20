import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function DerelictsLogo({
  className,
  href = "/",
  priority = false,
}: {
  className?: string;
  href?: string;
  priority?: boolean;
}) {
  const logo = resolvePublicAsset("/images/brand/logo");

  const markClass =
    "h-auto w-[clamp(9rem,24vw,10.5rem)] object-contain object-left min-[900px]:w-[clamp(10rem,14vw,15rem)] min-[1100px]:w-[clamp(11.25rem,17vw,17.5rem)]";

  const content =
    logo?.kind === "raster" ? (
      <Image
        src={logo.src}
        alt="The Derelicts"
        width={560}
        height={230}
        priority={priority}
        sizes="(max-width: 899px) 168px, (max-width: 1099px) 200px, clamp(180px, 17vw, 280px)"
        className={markClass}
      />
    ) : logo?.kind === "svg" ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt="The Derelicts"
        width={280}
        height={115}
        className={markClass}
      />
    ) : (
      <span className="relative inline-block leading-none">
        <span
          className="absolute -top-2 left-3 text-[0.7rem] text-volt md:-top-2.5 md:text-sm"
          aria-hidden="true"
        >
          ▲▲▲
        </span>
        <span className="block font-display text-[0.7rem] tracking-[0.35em] text-paper/90 md:text-xs">
          THE
        </span>
        <span className="brand-paint block text-[1.65rem] tracking-[0.02em] md:text-[1.9rem] lg:text-[2.15rem]">
          DERELICTS
        </span>
      </span>
    );

  return (
    <Link
      href={href}
      className={cn(
        "relative z-10 inline-flex max-w-full shrink-0 items-center overflow-visible focus-visible:outline-offset-4",
        className,
      )}
      aria-label="The Derelicts home"
    >
      {content}
    </Link>
  );
}
