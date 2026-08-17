import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function svg({ title, color, kicker }) {
  const safe = String(title).replaceAll("'", "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" role="img" aria-label="${safe}">
  <rect width="800" height="1000" fill="#10131a"/>
  <rect x="40" y="40" width="720" height="920" fill="#1a212b" stroke="${color}" stroke-width="8"/>
  <polygon points="80,180 320,90 560,210 720,120 720,420 80,500" fill="${color}" opacity="0.18"/>
  <circle cx="250" cy="430" r="120" fill="${color}" opacity="0.28"/>
  <rect x="420" y="360" width="220" height="280" fill="#07080c" stroke="${color}" stroke-dasharray="10 8"/>
  <text x="80" y="120" fill="${color}" font-family="monospace" font-size="28" letter-spacing="8">${kicker}</text>
  <text x="80" y="880" fill="#d4c4a8" font-family="Impact, sans-serif" font-size="72">${title}</text>
  <text x="80" y="930" fill="#9aa3ad" font-family="monospace" font-size="22">PLACEHOLDER ART // REPLACE</text>
</svg>
`;
}

const files = [
  ["public/images/characters/spark.svg", "SPARK", "#f5e642", "ENGINEER"],
  ["public/images/characters/moldy.svg", "MOLDY", "#b8f54a", "CHEMIST"],
  ["public/images/characters/ratchet.svg", "RATCHET", "#ff6b1a", "MECHANIC"],
  ["public/images/characters/volt.svg", "VOLT", "#3dfff3", "ELECTRICIAN"],
  ["public/images/characters/packet.svg", "PACKET", "#ff2d6a", "HACKER"],
  ["public/images/characters/scraps.svg", "SCRAPS", "#d4c4a8", "INVENTOR"],
  ["public/images/characters/willow.svg", "WILLOW", "#7dffb3", "BEASTMASTER"],
  ["public/images/characters/icebox.svg", "ICEBOX", "#7ec8ff", "TANK"],
  ["public/images/punktown/deadmans-arcade.svg", "DEADMAN'S ARCADE", "#3dfff3", "POI"],
  ["public/images/punktown/broken-wheel.svg", "BROKEN WHEEL", "#ff6b1a", "POI"],
  ["public/images/punktown/trash-mountain.svg", "TRASH MOUNTAIN", "#b8f54a", "POI"],
  ["public/images/punktown/the-funhouse.svg", "THE FUNHOUSE", "#ff2d6a", "POI"],
  ["public/images/punktown/scrapyard.svg", "SCRAPYARD", "#d4c4a8", "POI"],
  ["public/images/punktown/flooded-midway.svg", "FLOODED MIDWAY", "#7ec8ff", "POI"],
  ["public/images/punktown/derelict-market.svg", "DERELICT MARKET", "#f5e642", "POI"],
  ["public/images/punktown/maintenance-tunnels.svg", "TUNNELS", "#9aa3ad", "POI"],
  ["public/images/punktown/old-rollercoaster.svg", "ROLLERCOASTER", "#ff6b1a", "POI"],
  ["public/images/punktown/radio-tower.svg", "RADIO TOWER", "#3dfff3", "POI"],
  ["public/images/punktown/the-pit.svg", "THE PIT", "#ff2d6a", "CLASSIFIED"],
  ["public/images/inventions/tesla-bat.svg", "TESLA BAT", "#3dfff3", "PROTOTYPE"],
  ["public/images/inventions/microwave-drone.svg", "MICROWAVE DRONE", "#ff6b1a", "PROTOTYPE"],
  ["public/images/inventions/rocket-cart.svg", "ROCKET CART", "#f5e642", "PROTOTYPE"],
  ["public/images/inventions/vacuum-cannon.svg", "VACUUM CANNON", "#b8f54a", "PROTOTYPE"],
  ["public/images/inventions/scout-drone.svg", "SCOUT DRONE", "#ff2d6a", "PROTOTYPE"],
  ["public/images/inventions/junk-cannon.svg", "JUNK CANNON", "#d4c4a8", "CONCEPT"],
  ["public/images/inventions/soda-bomb.svg", "SODA BOMB", "#ff6b1a", "CONCEPT"],
  ["public/images/inventions/magnet-gun.svg", "MAGNET GUN", "#7ec8ff", "CONCEPT"],
  ["public/images/inventions/trash-tornado.svg", "TRASH TORNADO", "#b8f54a", "CONCEPT"],
  ["public/images/inventions/boom-box.svg", "BOOM BOX", "#f5e642", "CONCEPT"],
  ["public/images/inventions/paint-bomb.svg", "PAINT BOMB", "#ff2d6a", "CONCEPT"],
  ["public/images/news/first-transmission.svg", "FIRST SIGNAL", "#f5e642", "NEWS"],
  ["public/images/news/volt-board.svg", "VOLT", "#3dfff3", "NEWS"],
  ["public/images/news/map-fragments.svg", "MAP FRAGMENTS", "#ff6b1a", "NEWS"],
  ["public/images/backgrounds/hero.svg", "PUNKTOWN", "#f5e642", "HERO"],
  ["public/images/brand/logo.svg", "THE DERELICTS", "#f5e642", "BRAND"],
];

const characterBgs = [
  ["spark", "#f5e642"],
  ["moldy", "#b8f54a"],
  ["ratchet", "#ff6b1a"],
  ["volt", "#3dfff3"],
  ["packet", "#ff2d6a"],
  ["scraps", "#d4c4a8"],
  ["willow", "#7dffb3"],
  ["icebox", "#7ec8ff"],
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
