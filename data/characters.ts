import type { Character } from "@/types";

export const characters: Character[] = [
  {
    name: "Spark",
    slug: "spark",
    specialty: "ENGINEER",
    tagline: "If it still has a schematic, it still has a future.",
    hook: "BUILDS MACHINES FASTER.",
    description:
      "Spark reads wreckage like a language. Machines come together faster in her hands because she already sees how the junk wants to be used.",
    portrait: "/images/characters/spark",
    backgroundImage: "/images/characters/spark-bg",
    passive: {
      name: "BLUEPRINT EYE",
      description: "Salvaged machines reveal extra usable parts.",
    },
    active: {
      name: "RAPID RIG",
      description: "Assembles the next invention in a fraction of the usual time.",
    },
    ultimate: {
      name: "OVERCLOCK YARD",
      description: "Nearby crew machines run hotter, faster, and louder.",
    },
    status: "revealed",
    signatureInvention: "Jury-rigged dynamo rig",
    color: "#f5e642",
    role: "BUILD",
  },
  {
    name: "Moldy",
    slug: "moldy",
    specialty: "CHEMIST",
    tagline: "Everything leaks. That's the point.",
    hook: "EVERYTHING LEAKS.",
    description:
      "Moldy turns spoiled fountains, rusted tanks, and carnival food chemicals into toxins, traps, and ugly little miracles of area denial.",
    portrait: "/images/characters/moldy",
    backgroundImage: "/images/characters/moldy-bg",
    passive: {
      name: "SPOIL SENSE",
      description: "Chemical sources in the environment mark themselves.",
    },
    active: {
      name: "FOG JAR",
      description: "Lobs a choking cloud that slows anyone who walks through it.",
    },
    ultimate: {
      name: "BAD BATCH",
      description: "A wide toxin bloom that punishes crews who bunch up.",
    },
    status: "revealed",
    signatureInvention: "Corrosive sprayer",
    color: "#7cff3a",
    role: "CONTROL",
  },
  {
    name: "Ratchet",
    slug: "ratchet",
    specialty: "MECHANIC",
    tagline: "If it has wheels, she can make it meaner.",
    hook: "IF IT HAS WHEELS.",
    description:
      "Ratchet lives in the gap between vehicles, robots, and armor. She would rather rebuild a wreck than walk past it.",
    portrait: "/images/characters/ratchet.svg",
    backgroundImage: "/images/characters/ratchet-bg.svg",
    passive: {
      name: "GREASE MONKEY",
      description: "Vehicle and armor components last longer before they fall apart.",
    },
    active: {
      name: "PATCH JOB",
      description: "Hammers a damaged invention or vehicle back into a fight.",
    },
    ultimate: {
      name: "ROLL OUT",
      description: "Drops a scavenged vehicle frame the crew can immediately ride.",
    },
    status: "revealed",
    signatureInvention: "Armored shopping cart",
    color: "#ff6b1a",
    role: "BUILD",
  },
  {
    name: "Volt",
    slug: "volt",
    specialty: "ELECTRICIAN",
    tagline: "Power is a conversation. She interrupts it.",
    hook: "SHE INTERRUPTS THE POWER.",
    description:
      "Volt treats electricity like a tool, a weapon, and a warning. If a circuit still hums, she can steal it, snap it, or turn it against whoever wired it first.",
    portrait: "/images/characters/volt.svg",
    backgroundImage: "/images/characters/volt-bg.svg",
    passive: {
      name: "LIVE WIRE",
      description: "Electrical components provide additional crafting resources.",
    },
    active: {
      name: "SHORT CIRCUIT",
      description: "Temporarily disables nearby electronics.",
    },
    ultimate: {
      name: "BLACKOUT",
      description:
        "Creates an EMP field that disables enemy electronics, drones, traps and certain weapons.",
    },
    status: "revealed",
    signatureInvention: "Tesla Bat",
    color: "#3dfff3",
    role: "CONTROL",
  },
  {
    name: "Packet",
    slug: "packet",
    specialty: "HACKER",
    tagline: "Doors are just opinions.",
    hook: "DOORS ARE OPINIONS.",
    description:
      "Packet talks to cameras, doors, and leftover networks like they never got the chance to become obsolete. Most of Punktown still listens.",
    portrait: "/images/characters/packet.svg",
    backgroundImage: "/images/characters/packet-bg.svg",
    passive: {
      name: "GHOST PING",
      description: "Nearby cameras and locked panels reveal themselves.",
    },
    active: {
      name: "HIJACK",
      description: "Takes control of a camera, door, or electronic trap.",
    },
    ultimate: {
      name: "SYSTEM BLEED",
      description: "Turns a cluster of electronics against the people using them.",
    },
    status: "revealed",
    signatureInvention: "Scout Drone",
    color: "#9b4dff",
    role: "RECON",
  },
  {
    name: "Scraps",
    slug: "scraps",
    specialty: "INVENTOR",
    tagline: "The stupid idea is usually the working one.",
    hook: "THE STUPID IDEA WORKS.",
    description:
      "Scraps combines parts nobody else would risk. Experimental recipes, unstable machines, and inventions that should not function — until they do.",
    portrait: "/images/characters/scraps.svg",
    backgroundImage: "/images/characters/scraps-bg.svg",
    passive: {
      name: "JUNK LUCK",
      description: "Small chance to discover an unexpected extra component.",
    },
    active: {
      name: "WILD WIRE",
      description: "Forces an invention to accept a component it usually rejects.",
    },
    ultimate: {
      name: "PROTOTYPE SURGE",
      description: "Builds a volatile experimental device from whatever is on hand.",
    },
    status: "revealed",
    signatureInvention: "Trash Tornado",
    color: "#ffe14d",
    role: "BUILD",
  },
  {
    name: "Willow",
    slug: "willow",
    specialty: "BEASTMASTER",
    tagline: "The park still has a pulse. She follows it.",
    hook: "THE PARK STILL HAS A PULSE.",
    description:
      "Willow works with the animals that stayed after the lights died. They scout, warn, and find paths through Punktown that maps still miss.",
    portrait: "/images/characters/willow.svg",
    backgroundImage: "/images/characters/willow-bg.svg",
    passive: {
      name: "PACK SIGHT",
      description: "Wildlife marks nearby scavengers and hidden routes.",
    },
    active: {
      name: "SEND OUT",
      description: "A scout animal reveals a slice of the surrounding terrain.",
    },
    ultimate: {
      name: "THE GROUNDS KEEP",
      description: "Local animals harass enemies and open an escape path.",
    },
    status: "revealed",
    signatureInvention: "Signal collar",
    color: "#b6ff3a",
    role: "RECON",
  },
  {
    name: "Icebox",
    slug: "icebox",
    specialty: "TANK",
    tagline: "Stand behind the fridge. That's the plan.",
    hook: "STAND BEHIND THE FRIDGE.",
    description:
      "Icebox builds protection out of vending hulks, freezer doors, and anything too heavy to ignore. Crews last longer when Icebox decides they should.",
    portrait: "/images/characters/icebox.svg",
    backgroundImage: "/images/characters/icebox-bg.svg",
    passive: {
      name: "HARD SHELL",
      description: "Defensive inventions absorb additional punishment.",
    },
    active: {
      name: "BUNKER PLATE",
      description: "Deploys a scavenged shield that blocks a lane.",
    },
    ultimate: {
      name: "COLD STORAGE",
      description: "Drops a fortified zone the crew can hold or escape through.",
    },
    status: "revealed",
    signatureInvention: "Fridge barricade",
    color: "#3d9bff",
    role: "DEFENSE",
  },
];

export const featuredCharacterSlug = "spark";

export function getCharacter(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getFeaturedCharacter() {
  return getCharacter(featuredCharacterSlug) ?? characters[0];
}
