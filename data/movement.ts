export type MovementAbility = {
  id: string;
  name: string;
  description: string;
  /** Logical path; `.webp` preferred. */
  image: string;
  /** Logical path; `.webm` then `.mp4`. Wins over the image when present. */
  video: string;
};

export const movementAbilities: MovementAbility[] = [
  {
    id: "sprinting",
    name: "Sprinting",
    description: "Move quickly through the streets and wreckage of Punktown.",
    image: "/images/movement/sprinting",
    video: "/video/movement/sprinting",
  },
  {
    id: "sliding",
    name: "Sliding",
    description: "Slip beneath obstacles while maintaining momentum.",
    image: "/images/movement/sliding",
    video: "/video/movement/sliding",
  },
  {
    id: "mantling",
    name: "Mantling",
    description: "Pull yourself onto ledges and elevated surfaces.",
    image: "/images/movement/mantling",
    video: "/video/movement/mantling",
  },
  {
    id: "vaulting",
    name: "Vaulting",
    description: "Clear barriers without breaking your stride.",
    image: "/images/movement/vaulting",
    video: "/video/movement/vaulting",
  },
  {
    id: "climbing",
    name: "Climbing",
    description: "Scale structures and reach higher areas.",
    image: "/images/movement/climbing",
    video: "/video/movement/climbing",
  },
  {
    id: "ziplining",
    name: "Ziplining",
    description: "Travel across gaps using overhead ziplines.",
    image: "/images/movement/ziplining",
    video: "/video/movement/ziplining",
  },
];
