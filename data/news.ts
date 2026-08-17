import type { NewsPost } from "@/types";

export const newsPosts: NewsPost[] = [
  {
    title: "First transmission from Punktown",
    slug: "first-transmission",
    excerpt:
      "The official site is live. No release date. No fake footage. Just the world, the crew, and the junk they plan to weaponize.",
    date: "2026-08-17",
    category: "DEVELOPMENT",
    heroImage: "/images/news/first-transmission.svg",
    featured: true,
    content: [
      {
        type: "heading",
        text: "THE SIGNAL IS OPEN",
      },
      {
        type: "paragraph",
        text: "The Derelicts now has a public door. This site is the first place the world can look at Punktown without pretending the game is finished.",
      },
      {
        type: "paragraph",
        text: "We are in pre-production. The fantasy is already clear: scavenge abandoned civilization, rip it apart, and invent something nobody asked for.",
      },
      {
        type: "terminal",
        lines: [
          "STATUS // PRE-PRODUCTION",
          "ENGINE // UNREAL ENGINE 5",
          "PLATFORM // PC FIRST",
          "TRAILER // TRANSMISSION PENDING",
        ],
      },
      {
        type: "paragraph",
        text: "Join the crew if you want development updates, character reveals, Punktown transmissions, and future playtest invitations. When the radio is fully wired, that list will matter.",
      },
    ],
  },
  {
    title: "Volt is live on the board",
    slug: "volt-on-the-board",
    excerpt:
      "The electrician comes first because the power grid still thinks it belongs to someone else.",
    date: "2026-08-12",
    category: "CHARACTERS",
    heroImage: "/images/news/volt-board.svg",
    featured: false,
    content: [
      {
        type: "heading",
        text: "LIVE WIRE / SHORT CIRCUIT / BLACKOUT",
      },
      {
        type: "paragraph",
        text: "Volt is the first Derelict with a complete working kit on the site: a passive that makes electrical salvage more valuable, an active that kills nearby electronics, and an ultimate that blacks out a whole argument.",
      },
      {
        type: "paragraph",
        text: "These abilities are working concepts, not locked competitive design. They exist so the fantasy is readable: Derelicts are dangerous because they understand the junk.",
      },
    ],
  },
  {
    title: "Punktown map fragments recovered",
    slug: "punktown-map-fragments",
    excerpt:
      "Eleven named places. One classified hole. The amusement park is no longer just a rumor on a wall.",
    date: "2026-08-04",
    category: "PUNKTOWN",
    heroImage: "/images/news/map-fragments.svg",
    featured: false,
    content: [
      {
        type: "heading",
        text: "AN ABANDONED PARK WITH A NEW JOB",
      },
      {
        type: "paragraph",
        text: "Punktown began as an amusement park and became a settlement. The first public map marks Deadman's Arcade, the Broken Wheel, Trash Mountain, the Funhouse, and the rest of the grounds the Derelicts actually use.",
      },
      {
        type: "paragraph",
        text: "Each location is a loot table with a personality. Arcade cabinets do not drop rifles. They drop circuit boards, cameras, radios, capacitors, and wiring — if you are willing to rip them apart.",
      },
    ],
  },
];

export function getNewsPost(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}

export function getFeaturedNews() {
  return newsPosts.find((post) => post.featured) ?? newsPosts[0];
}

export const newsCategories = [
  "DEVELOPMENT",
  "CHARACTERS",
  "PUNKTOWN",
  "INVENTIONS",
  "LORE",
  "PLAYTESTS",
] as const;
