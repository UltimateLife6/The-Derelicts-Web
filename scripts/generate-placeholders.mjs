import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function svg({ title, color, kicker }) {
  const safe = String(title).replaceAll("'", "");
  const id = safe.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${safe}">
  <defs>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#7ec8f5"/>
      <stop offset="48%" stop-color="#f7ddae"/>
      <stop offset="100%" stop-color="#c45a28"/>
    </linearGradient>
  </defs>
  <rect width="800" height="1000" fill="url(#sky-${id})"/>
  <path d="M40 760 L180 520 L320 780 Z" fill="${color}" opacity="0.55"/>
  <circle cx="560" cy="360" r="140" fill="${color}" opacity="0.35"/>
  <rect x="420" y="520" width="240" height="220" fill="#171310" opacity="0.55"/>
  <text x="64" y="120" fill="#171310" font-family="Impact, sans-serif" font-size="36">${kicker}</text>
  <text x="64" y="860" fill="#fff" font-family="Impact, sans-serif" font-size="72" stroke="#171310" stroke-width="8" paint-order="stroke">${title}</text>
  <text x="64" y="920" fill="#171310" font-family="monospace" font-size="20">PLACEHOLDER ART // REPLACE</text>
</svg>
`;
}

const files = [
  ["public/images/characters/spark.svg", "SPARK", "#f5e642", "ENGINEER"],
  ["public/images/characters/moldy.svg", "MOLDY", "#7cff3a", "CHEMIST"],
  ["public/images/characters/ratchet.svg", "RATCHET", "#ff6b1a", "MECHANIC"],
  ["public/images/characters/volt.svg", "VOLT", "#3dfff3", "ELECTRICIAN"],
  ["public/images/characters/packet.svg", "PACKET", "#9b4dff", "HACKER"],
  ["public/images/characters/scraps.svg", "SCRAPS", "#ffe14d", "INVENTOR"],
  ["public/images/characters/willow.svg", "WILLOW", "#b6ff3a", "BEASTMASTER"],
  ["public/images/characters/icebox.svg", "ICEBOX", "#3d9bff", "TANK"],
  ["public/images/punktown/deadmans-arcade.svg", "DEADMAN'S ARCADE", "#ff2d9a", "POI"],
  ["public/images/punktown/broken-wheel.svg", "BROKEN WHEEL", "#ff6b1a", "POI"],
  ["public/images/punktown/trash-mountain.svg", "TRASH MOUNTAIN", "#7cff3a", "POI"],
  ["public/images/punktown/the-funhouse.svg", "THE FUNHOUSE", "#9b4dff", "POI"],
  ["public/images/punktown/scrapyard.svg", "SCRAPYARD", "#ff6b1a", "POI"],
  ["public/images/punktown/flooded-midway.svg", "FLOODED MIDWAY", "#3d9bff", "POI"],
  ["public/images/punktown/derelict-market.svg", "DERELICT MARKET", "#f5e642", "POI"],
  ["public/images/punktown/maintenance-tunnels.svg", "TUNNELS", "#171310", "POI"],
  ["public/images/punktown/old-rollercoaster.svg", "ROLLERCOASTER", "#ff6b1a", "POI"],
  ["public/images/punktown/radio-tower.svg", "RADIO TOWER", "#3dfff3", "POI"],
  ["public/images/punktown/the-pit.svg", "THE PIT", "#ff2d9a", "CLASSIFIED"],
  ["public/images/inventions/tesla-bat.svg", "TESLA BAT", "#3dfff3", "PROTOTYPE"],
  ["public/images/inventions/microwave-drone.svg", "MICROWAVE DRONE", "#ff6b1a", "PROTOTYPE"],
  ["public/images/inventions/rocket-cart.svg", "ROCKET CART", "#f5e642", "PROTOTYPE"],
  ["public/images/inventions/vacuum-cannon.svg", "VACUUM CANNON", "#7cff3a", "PROTOTYPE"],
  ["public/images/inventions/scout-drone.svg", "SCOUT DRONE", "#9b4dff", "PROTOTYPE"],
  ["public/images/inventions/junk-cannon.svg", "JUNK CANNON", "#ffe14d", "CONCEPT"],
  ["public/images/inventions/soda-bomb.svg", "SODA BOMB", "#ff6b1a", "CONCEPT"],
  ["public/images/inventions/magnet-gun.svg", "MAGNET GUN", "#3d9bff", "CONCEPT"],
  ["public/images/inventions/trash-tornado.svg", "TRASH TORNADO", "#7cff3a", "CONCEPT"],
  ["public/images/inventions/boom-box.svg", "BOOM BOX", "#f5e642", "CONCEPT"],
  ["public/images/inventions/paint-bomb.svg", "PAINT BOMB", "#ff2d9a", "CONCEPT"],
  ["public/images/news/first-transmission.svg", "FIRST SIGNAL", "#f5e642", "NEWS"],
  ["public/images/news/volt-board.svg", "VOLT", "#3dfff3", "NEWS"],
  ["public/images/news/map-fragments.svg", "MAP FRAGMENTS", "#ff6b1a", "NEWS"],
  ["public/images/backgrounds/hero.svg", "PUNKTOWN", "#f5e642", "HERO"],
  ["public/images/brand/logo.svg", "THE DERELICTS", "#ffffff", "BRAND"],
];

const characterBgs = [
  ["spark", "#f5e642"],
  ["moldy", "#7cff3a"],
  ["ratchet", "#ff6b1a"],
  ["volt", "#3dfff3"],
  ["packet", "#9b4dff"],
  ["scraps", "#ffe14d"],
  ["willow", "#b6ff3a"],
  ["icebox", "#3d9bff"],
];

for (const [slug, color] of characterBgs) {
  files.push([
    `public/images/characters/${slug}-bg.svg`,
    slug.toUpperCase(),
    color,
    "BG",
  ]);
}

for (const [rel, title, color, kicker] of files) {
  const dest = join(root, rel);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, svg({ title, color, kicker }));
}

console.log(`wrote ${files.length} placeholder images`);
