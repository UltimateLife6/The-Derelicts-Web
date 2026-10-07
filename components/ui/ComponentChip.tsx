import Image from "next/image";
import { GameImage } from "@/components/ui/GameImage";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function ComponentChip({
  label,
  image,
  className,
  /** Larger transparent art for the invent bench slots. */
  prominent = false,
}: {
  label: string;
  image?: string;
  className?: string;
  prominent?: boolean;
}) {
  const art = image ? resolvePublicAsset(image) : null;
  const isPipe = Boolean(image?.includes("/pipe"));

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-2 border-black bg-paper px-3 py-1.5 text-ink shadow-[2px_2px_0_#000]",
        className,
      )}
    >
      {art?.kind === "raster" && prominent ? (
        <span
          className={cn(
            "relative block w-full shrink-0 overflow-visible bg-transparent",
            "h-[5.25rem]",
          )}
          aria-hidden="true"
        >
          <Image
            src={art.src}
            alt=""
            fill
            sizes="120px"
            quality={82}
            className={cn(
              "object-contain object-center",
              isPipe && "scale-[1.12]",
              !isPipe && "scale-[1.06]",
            )}
          />
        </span>
      ) : art ? (
        <GameImage
          src={image!}
          alt=""
          fit="silhouette"
          sizes="72px"
          className="h-16 w-16 shrink-0 bg-transparent"
          imageClassName="!p-0"
        />
      ) : null}
      <span className="font-display text-sm tracking-[0.08em] uppercase">{label}</span>
    </span>
  );
}
