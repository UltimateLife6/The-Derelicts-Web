import { resolvedAssets, type ResolvedAsset } from "@/data/resolved-assets";

const EXTENSION = /\.(svg|webp|avif|jpe?g|png|gif|mp4|webm|pdf|zip)$/i;

export type ImageFit = "face" | "landmark" | "silhouette" | "hero" | "logo" | "wide";

export function logicalAssetPath(src: string) {
  return src.replace(EXTENSION, "");
}

export function resolvePublicAsset(src: string): ResolvedAsset | null {
  return resolvedAssets[logicalAssetPath(src)] ?? null;
}

export function fitClassName(fit: ImageFit) {
  switch (fit) {
    case "face":
      return "object-cover object-[center_16%] sm:object-[center_18%]";
    case "hero":
      return "object-cover object-[center_32%] sm:object-[center_38%] lg:object-[center_42%] 2xl:object-center";
    case "landmark":
      return "object-cover object-center";
    case "wide":
      return "object-cover object-center";
    case "silhouette":
      return "object-contain object-center p-[8%]";
    case "logo":
      return "object-contain object-center p-4";
  }
}

export function defaultSizes(fit: ImageFit) {
  switch (fit) {
    case "hero":
      return "100vw";
    case "face":
      return "(max-width: 768px) 70vw, (max-width: 1200px) 320px, 420px";
    case "landmark":
      return "(max-width: 1024px) 100vw, 640px";
    case "wide":
      return "(max-width: 768px) 100vw, 800px";
    case "silhouette":
      return "(max-width: 768px) 40vw, 180px";
    case "logo":
      return "160px";
  }
}

export function inferFit(src: string): ImageFit {
  const path = logicalAssetPath(src);
  if (path.includes("/backgrounds/hero")) return "hero";
  if (path.includes("/brand/logo") || path.includes("/brand/icon")) return "logo";
  if (path.includes("/inventions/")) return "silhouette";
  if (path.includes("/characters/") && path.endsWith("-bg")) return "landmark";
  if (path.includes("/characters/")) return "face";
  if (path.includes("/punktown/")) return "landmark";
  if (path.includes("/news/") || path.includes("/media/")) return "wide";
  return "landmark";
}

export function isDownloadableAsset(src: string) {
  const asset = resolvePublicAsset(src);
  return Boolean(asset && asset.kind !== "svg");
}
