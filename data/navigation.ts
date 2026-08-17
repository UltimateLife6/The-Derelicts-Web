import type { NavItem } from "@/types";

export const primaryNav: NavItem[] = [
  { id: "game", label: "GAME", href: "/#game" },
  { id: "derelicts", label: "DERELICTS", href: "/derelicts" },
  { id: "punktown", label: "PUNKTOWN", href: "/punktown" },
  { id: "inventions", label: "INVENTIONS", href: "/inventions" },
  { id: "news", label: "NEWS", href: "/news" },
];

export const footerNav: NavItem[] = [
  { id: "game", label: "GAME", href: "/#game" },
  { id: "derelicts", label: "DERELICTS", href: "/derelicts" },
  { id: "punktown", label: "PUNKTOWN", href: "/punktown" },
  { id: "inventions", label: "INVENTIONS", href: "/inventions" },
  { id: "news", label: "NEWS", href: "/news" },
  { id: "press", label: "PRESS", href: "/press" },
];

export const legalNav: NavItem[] = [
  { id: "privacy", label: "Privacy", href: "/privacy" },
  { id: "terms", label: "Terms", href: "/terms" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export const ctaNav: NavItem = {
  id: "join",
  label: "JOIN THE CREW",
  href: "/#join-the-crew",
};

export const futureRoutes = [
  "/play",
  "/lore",
  "/seasons",
  "/crews",
  "/playtests",
  "/derelicts/[slug]",
  "/news/[slug]",
] as const;
