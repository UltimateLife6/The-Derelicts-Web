import type { Location } from "@/types";

export const locations: Location[] = [
  {
    id: "deadmans-arcade",
    name: "Deadman's Arcade",
    slug: "deadmans-arcade",
    description:
      "Cabinets still glow in fits. High electronic component density, worse lighting, and a soundtrack that should have died years ago.",
    image: "/images/punktown/deadmans-arcade.svg",
    componentCategories: [
      "Circuit Boards",
      "Cameras",
      "Radios",
      "Capacitors",
      "Wiring",
    ],
    hazards: ["Live cabinets", "Blackout rooms", "Hacked attractions"],
    status: "MAPPED",
    x: 18,
    y: 38,
  },
  {
    id: "broken-wheel",
    name: "Broken Wheel",
    slug: "broken-wheel",
    description:
      "A ferris wheel frozen mid-turn. High ground, long sightlines, and a lot of metal waiting to be ripped free.",
    image: "/images/punktown/broken-wheel.svg",
    componentCategories: ["Motors", "Steel", "Cables", "Lights"],
    hazards: ["Collapsing cars", "Wind shear", "Snipers' favorite toy"],
    status: "MAPPED",
    x: 72,
    y: 18,
  },
  {
    id: "trash-mountain",
    name: "Trash Mountain",
    slug: "trash-mountain",
    description:
      "The pile grew until it became geography. Almost anything can be found here. Almost anything can bury you here.",
    image: "/images/punktown/trash-mountain.svg",
    componentCategories: ["Scrap Metal", "Batteries", "Random appliances"],
    hazards: ["Unstable fill", "Hidden pits", "Chemical seepage"],
    status: "MAPPED",
    x: 22,
    y: 78,
  },
  {
    id: "the-funhouse",
    name: "The Funhouse",
    slug: "the-funhouse",
    description:
      "Mirrors, false floors, and a layout that refuses to stay honest. Good for ambushes. Bad for trust.",
    image: "/images/punktown/the-funhouse.svg",
    componentCategories: ["Lights", "Speakers", "Glass", "Wiring"],
    hazards: ["Mirror maze", "Trap floors", "Audio decoys"],
    status: "MAPPED",
    x: 48,
    y: 42,
  },
  {
    id: "scrapyard",
    name: "Scrapyard",
    slug: "scrapyard",
    description:
      "Where Punktown parks the machines that already lost a fight. Vehicles, armor plates, and motors sleep under tarps.",
    image: "/images/punktown/scrapyard.svg",
    componentCategories: ["Motors", "Armor", "Tires", "Fuel cells"],
    hazards: ["Crushers", "Unstable stacks", "Oil fires"],
    status: "MAPPED",
    x: 82,
    y: 70,
  },
  {
    id: "flooded-midway",
    name: "Flooded Midway",
    slug: "flooded-midway",
    description:
      "The fairway went under. Booths, stuffed prizes, and drowned wiring wait just below the surface.",
    image: "/images/punktown/flooded-midway.svg",
    componentCategories: ["Wiring", "Plush stuffing", "Pumps", "Batteries"],
    hazards: ["Deep water", "Live current", "Limited exits"],
    status: "MAPPED",
    x: 52,
    y: 68,
  },
  {
    id: "derelict-market",
    name: "Derelict Market",
    slug: "derelict-market",
    description:
      "The closest thing Punktown has to a main street. Crews trade parts, rumors, and inventions that might still explode.",
    image: "/images/punktown/derelict-market.svg",
    componentCategories: ["Mixed salvage", "Tools", "Blueprints"],
    hazards: ["Crowds", "Bad deals", "Sudden raids"],
    status: "MAPPED",
    x: 78,
    y: 44,
  },
  {
    id: "maintenance-tunnels",
    name: "Maintenance Tunnels",
    slug: "maintenance-tunnels",
    description:
      "The park's veins. Dark, useful, and full of people who would rather not be seen coming.",
    image: "/images/punktown/maintenance-tunnels.svg",
    componentCategories: ["Tools", "Wiring", "Pipes", "Fuses"],
    hazards: ["Blackout", "Flood gates", "Close quarters"],
    status: "MAPPED",
    x: 38,
    y: 86,
  },
  {
    id: "old-rollercoaster",
    name: "Old Rollercoaster",
    slug: "old-rollercoaster",
    description:
      "A skeleton of rails over the park. Grind, climb, or get thrown. The structure still remembers speed.",
    image: "/images/punktown/old-rollercoaster.svg",
    componentCategories: ["Rails", "Motors", "Bolts", "Steel"],
    hazards: ["Height", "Broken track", "Long falls"],
    status: "MAPPED",
    x: 40,
    y: 16,
  },
  {
    id: "radio-tower",
    name: "Radio Tower",
    slug: "radio-tower",
    description:
      "Punktown's stubborn voice. Whoever holds the tower can talk farther than they should.",
    image: "/images/punktown/radio-tower.svg",
    componentCategories: ["Radios", "Antennas", "Batteries", "Circuit Boards"],
    hazards: ["Exposure", "Interference", "Long climb"],
    status: "MAPPED",
    x: 60,
    y: 10,
  },
  {
    id: "the-pit",
    name: "The Pit",
    slug: "the-pit",
    description:
      "A hole the park never explained. Crews throw scrap in. Sometimes things come back out differently.",
    image: "/images/punktown/the-pit.svg",
    componentCategories: ["Unknown scrap", "Experimental parts"],
    hazards: ["Unstable edge", "Bad air", "Unidentified movement"],
    status: "CLASSIFIED",
    x: 58,
    y: 54,
  },
];

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}
