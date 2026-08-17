export const movementClips = [
  { id: "sprinting", caption: "SPRINTING" },
  { id: "sliding", caption: "SLIDING" },
  { id: "mantling", caption: "MANTLING" },
  { id: "vaulting", caption: "VAULTING" },
  { id: "climbing", caption: "CLIMBING" },
  { id: "ziplines", caption: "ZIPLINES" },
  { id: "grind-rails", caption: "GRIND RAILS" },
  { id: "jump-pads", caption: "JUMP PADS" },
  { id: "shopping-carts", caption: "SHOPPING CARTS" },
  { id: "improvised-bikes", caption: "IMPROVISED BIKES" },
  { id: "launchers", caption: "LAUNCHERS" },
] as const;

export const pressDownloadSlots = [
  {
    id: "logo",
    label: "Logo",
    path: "/images/brand/logo",
  },
  {
    id: "screenshots",
    label: "Screenshots",
    path: "/press/screenshots",
  },
  {
    id: "character-art",
    label: "Character artwork",
    path: "/images/characters/spark",
  },
  {
    id: "key-art",
    label: "Key art",
    path: "/images/backgrounds/hero",
  },
  {
    id: "gameplay",
    label: "Gameplay footage",
    path: "/video/trailer",
  },
  {
    id: "fact-sheet",
    label: "Fact sheet PDF",
    path: "/press/fact-sheet",
  },
] as const;
