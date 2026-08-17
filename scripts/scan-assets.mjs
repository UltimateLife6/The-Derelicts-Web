import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { extname, join, relative, sep } from "node:path";

const root = join(process.cwd(), "public");
const rank = {
  webp: 0,
  avif: 1,
  jpg: 2,
  jpeg: 2,
  png: 3,
  gif: 4,
  svg: 5,
  webm: 6,
  mp4: 7,
  pdf: 8,
  zip: 9,
};

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function kindFor(ext) {
  if (["webp", "avif", "jpg", "jpeg", "png"].includes(ext)) return "raster";
  if (ext === "svg") return "svg";
  if (["mp4", "webm"].includes(ext)) return "video";
  return "other";
}

const grouped = new Map();

for (const file of walk(root)) {
  const rel = relative(root, file).split(sep).join("/");
  const ext = extname(file).slice(1).toLowerCase();
  if (!(ext in rank)) continue;
  const logical = `/${rel.slice(0, -(ext.length + 1))}`;
  const current = grouped.get(logical);
  if (!current || rank[ext] < rank[current.ext]) {
    grouped.set(logical, { src: `/${rel}`, ext, kind: kindFor(ext) });
  }
}

const lines = [
  `export type AssetKind = "raster" | "svg" | "video" | "other";`,
  ``,
  `export type ResolvedAsset = {`,
  `  src: string;`,
  `  kind: AssetKind;`,
  `};`,
  ``,
  `export const resolvedAssets: Record<string, ResolvedAsset> = {`,
];

for (const [logical, asset] of [...grouped.entries()].sort(([a], [b]) =>
  a.localeCompare(b),
)) {
  lines.push(
    `  ${JSON.stringify(logical)}: { src: ${JSON.stringify(asset.src)}, kind: ${JSON.stringify(asset.kind)} },`,
  );
}

lines.push(`};`, ``);

writeFileSync(join(process.cwd(), "data/resolved-assets.ts"), lines.join("\n"));
console.log(`resolved ${grouped.size} public assets`);
