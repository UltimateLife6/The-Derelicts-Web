import type { SocialLink } from "@/types";

export const socials: SocialLink[] = [
  { id: "discord", label: "DISCORD", href: null },
  { id: "youtube", label: "YOUTUBE", href: null },
  { id: "tiktok", label: "TIKTOK", href: null },
  { id: "instagram", label: "INSTAGRAM", href: null },
  { id: "x", label: "X", href: null },
];

export const availableSocials = socials.filter(
  (social): social is SocialLink & { href: string } => Boolean(social.href),
);
