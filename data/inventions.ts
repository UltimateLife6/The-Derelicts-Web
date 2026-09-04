import { getComponent } from "@/data/components";
import type { Invention, InventionCategory } from "@/types";

export const inventionCategories: InventionCategory[] = [
  "WEAPONS",
  "GADGETS",
  "TRAVERSAL",
  "RECON",
  "DEFENSE",
  "EXPERIMENTAL",
];

export const inventions: Invention[] = [
  {
    id: "tesla-bat",
    name: "Tesla Bat",
    slug: "tesla-bat",
    category: "WEAPONS",
    description:
      "An electrified melee weapon assembled from scavenged electrical components.",
    status: "prototype",
    componentIds: ["battery", "pipe", "capacitor"],
    image: "/images/inventions/tesla-bat",
  },
  {
    id: "microwave-drone",
    name: "Microwave Drone",
    slug: "microwave-drone",
    category: "GADGETS",
    description:
      "A flying oven with ideas. Hover, heat, and ruin someone's afternoon from above.",
    status: "prototype",
    componentIds: ["drone", "microwave", "battery"],
    image: "/images/inventions/microwave-drone.svg",
  },
  {
    id: "rocket-cart",
    name: "Rocket Cart",
    slug: "rocket-cart",
    category: "TRAVERSAL",
    description:
      "A shopping cart that refused to stay in the parking lot. Fast, loud, and barely legal physics.",
    status: "prototype",
    componentIds: ["shopping-cart", "motor", "battery"],
    image: "/images/inventions/rocket-cart.svg",
  },
  {
    id: "vacuum-cannon",
    name: "Vacuum Cannon",
    slug: "vacuum-cannon",
    category: "WEAPONS",
    description:
      "Turns suction into a problem for anything in front of the nozzle — including the operator, sometimes.",
    status: "prototype",
    componentIds: ["vacuum", "motor", "pipe"],
    image: "/images/inventions/vacuum-cannon.svg",
  },
  {
    id: "scout-drone",
    name: "Scout Drone",
    slug: "scout-drone",
    category: "RECON",
    description:
      "A camera, a radio, and a circuit board taught to snoop. Sees further than a kid on a rooftop.",
    status: "prototype",
    componentIds: ["camera", "radio", "circuit-board"],
    image: "/images/inventions/scout-drone.svg",
  },
  {
    id: "junk-cannon",
    name: "Junk Cannon",
    slug: "junk-cannon",
    category: "WEAPONS",
    description:
      "Loads whatever scrap is nearby and throws it with unkind velocity.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/junk-cannon.svg",
  },
  {
    id: "soda-bomb",
    name: "Soda Bomb",
    slug: "soda-bomb",
    category: "GADGETS",
    description:
      "Pressurized sugar, rusted cans, and a fuse that should not work this well.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/soda-bomb.svg",
  },
  {
    id: "magnet-gun",
    name: "Magnet Gun",
    slug: "magnet-gun",
    category: "GADGETS",
    description:
      "Yanks metal, weapons, and poor decisions across the midway.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/magnet-gun.svg",
  },
  {
    id: "trash-tornado",
    name: "Trash Tornado",
    slug: "trash-tornado",
    category: "EXPERIMENTAL",
    description:
      "A spinning column of debris that is either a weapon or a cry for help.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/trash-tornado.svg",
  },
  {
    id: "boom-box",
    name: "Boom Box",
    slug: "boom-box",
    category: "EXPERIMENTAL",
    description:
      "Sound as a weapon, a signal, and a very bad neighbor.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/boom-box.svg",
  },
  {
    id: "paint-bomb",
    name: "Paint Bomb",
    slug: "paint-bomb",
    category: "GADGETS",
    description:
      "Marks crews, blinds sightlines, and leaves Punktown looking even more like itself.",
    status: "concept",
    componentIds: [],
    image: "/images/inventions/paint-bomb.svg",
  },
];

export const prototypeInventions = inventions.filter(
  (invention) => invention.status === "prototype",
);

export function getInvention(slug: string) {
  return inventions.find((invention) => invention.slug === slug);
}

export function getRecipeLabel(invention: Invention) {
  if (!invention.componentIds.length) return "Blueprint incomplete";
  return invention.componentIds
    .map((id) => getComponent(id)?.name ?? id)
    .join(" + ");
}
