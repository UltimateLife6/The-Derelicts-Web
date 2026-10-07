export type SalvageYield = {
  componentId: string;
  quantity: number;
};

export type ScavengeTarget = {
  id: string;
  name: string;
  image: string;
  yields: SalvageYield[];
};

export const scavengeTargets: ScavengeTarget[] = [
  {
    id: "arcade-cabinet",
    name: "Arcade Cabinet",
    image: "/images/scavenge/arcade-cabinet",
    yields: [
      { componentId: "circuit-board", quantity: 2 },
      { componentId: "wiring", quantity: 3 },
      { componentId: "speaker", quantity: 1 },
      { componentId: "scrap-metal", quantity: 4 },
    ],
  },
];
