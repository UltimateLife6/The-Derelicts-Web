export const site = {
  name: "The Derelicts",
  shortName: "DERELICTS",
  tagline: "Scavenge. Invent. Fight. Survive.",
  heroLines: ["SCAVENGE.", "INVENT.", "FIGHT.", "SURVIVE."],
  franchise: "The world threw them away. They built a better one.",
  description:
    "The Derelicts is a multiplayer action game where gifted misfits scavenge abandoned civilization and turn junk into weapons, gadgets and machines.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  metadata: {
    inDevelopment: "IN DEVELOPMENT",
    platform: "PC FIRST",
    engine: "UNREAL ENGINE 5",
  },
  press: {
    genre: "Third-Person Action / Battle Royale / Survival / Crafting",
    platform: "PC first. PlayStation and Xbox are planned possibilities.",
    engine: "Unreal Engine 5",
    status: "Pre-production / prototype",
    shortDescription:
      "The Derelicts is a stylized third-person multiplayer action game about gifted misfits who scavenge abandoned civilization and invent weapons, gadgets, and machines from junk.",
    longDescription: [
      "The Derelicts follows kids the world decided were problems. They weren't lost. They were building.",
      "Underneath the places society abandoned, they assembled Punktown and a way of surviving that treats every wrecked machine as raw material. Players scavenge, dismantle, combine, and invent. The map is the inventory. The best weapon is the one nobody expected you to build.",
      "This is not a soldier fantasy. Derelicts are engineers, hackers, mechanics, chemists, inventors, and survivors — dangerous because they can turn trash into possibility.",
    ],
  },
  heroMedia: {
    artwork: "/images/backgrounds/hero",
    video: "/video/hero-loop",
    poster: "/images/backgrounds/hero",
    trailer: "/video/trailer",
  },
} as const;
