import { cn } from "@/lib/utils";

type StrokeTone = "pink" | "black";

const strokeSrc: Record<StrokeTone, string> = {
  pink: "/images/brand/paint-stroke-pink.svg",
  black: "/images/brand/paint-stroke-black.svg",
};

export function PaintStroke({
  tone = "pink",
  className,
  decorative = true,
}: {
  tone?: StrokeTone;
  className?: string;
  decorative?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={strokeSrc[tone]}
      alt=""
      aria-hidden={decorative ? true : undefined}
      className={cn(
        "pointer-events-none select-none",
        tone === "pink" && "h-3 w-[min(100%,14rem)] object-fill md:h-3.5 md:w-[16rem]",
        tone === "black" && "h-full w-full object-cover object-top",
        className,
      )}
      draggable={false}
    />
  );
}
