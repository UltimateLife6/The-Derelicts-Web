import { GameImage } from "@/components/ui/GameImage";
import { resolvePublicAsset } from "@/lib/assets";
import { cn } from "@/lib/utils";

export function ComponentChip({
  label,
  image,
  className,
}: {
  label: string;
  image?: string;
  className?: string;
}) {
  const art = image ? resolvePublicAsset(image) : null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-2 border-black bg-paper px-3 py-1.5 text-ink shadow-[2px_2px_0_#000]",
        className,
      )}
    >
      {art ? (
        <GameImage
          src={image!}
          alt=""
          fit="silhouette"
          sizes="72px"
          className="h-16 w-16 shrink-0 bg-[#111]"
        />
      ) : null}
      <span className="font-display text-sm tracking-[0.08em] uppercase">{label}</span>
    </span>
  );
}
