import { resolvePublicAsset } from "@/lib/assets";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const TYPES: Record<string, string> = {
  webp: "image/webp",
  avif: "image/avif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

export async function productionImageResponse(logicalPath: string) {
  const asset = resolvePublicAsset(logicalPath);
  if (!asset || asset.kind !== "raster") return null;
  const ext = asset.src.split(".").pop()?.toLowerCase() ?? "";
  const type = TYPES[ext];
  if (!type) return null;
  const body = await readFile(join(process.cwd(), "public", asset.src.replace(/^\//, "")));
  return new Response(body, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
