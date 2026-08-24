export type Ability = {
  name: string;
  description: string;
};

export type CharacterStatus = "revealed" | "classified";

export type Character = {
  name: string;
  slug: string;
  specialty: string;
  tagline: string;
  hook: string;
  description: string;
  portrait: string;
  backgroundImage: string;
  passive: Ability;
  active: Ability;
  ultimate: Ability;
  status: CharacterStatus;
  signatureInvention: string;
  color: string;
  role: "BUILD" | "CONTROL" | "SUPPORT" | "RECON" | "DEFENSE";
};

export type InventionCategory =
  | "WEAPONS"
  | "GADGETS"
  | "TRAVERSAL"
  | "RECON"
  | "DEFENSE"
  | "EXPERIMENTAL";

export type InventionStatus = "prototype" | "concept";

export type Invention = {
  id: string;
  name: string;
  slug: string;
  category: InventionCategory;
  description: string;
  status: InventionStatus;
  componentIds: string[];
  image: string;
};

export type SalvageComponent = {
  id: string;
  name: string;
  category: string;
  image: string;
};

export type Location = {
  id: string;
  name: string;
  slug: string;
  description: string;
  blurb: string;
  image: string;
  componentCategories: string[];
  hazards?: string[];
  status?: string;
  x: number;
  y: number;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string | null;
};

export type NewsCategory =
  | "DEVELOPMENT"
  | "CHARACTERS"
  | "PUNKTOWN"
  | "INVENTIONS"
  | "LORE"
  | "PLAYTESTS";

export type NewsBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "terminal"; lines: string[] };

export type NewsPost = {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  heroImage: string;
  content: NewsBlock[];
  featured: boolean;
};

export type AnalyticsEvent =
  | "hero_enter_punktown"
  | "trailer_click"
  | "invention_build"
  | "invention_recipe_change"
  | "character_select"
  | "punktown_location_select"
  | "join_crew_submit"
  | "join_crew_success"
  | "press_asset_click";

export type CrewFormState =
  | "idle"
  | "loading"
  | "success"
  | "invalid_email"
  | "server_error";
