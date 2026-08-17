import type { SalvageComponent } from "@/types";

export const salvageComponents: SalvageComponent[] = [
  { id: "battery", name: "Battery", category: "Power", image: "/images/components/battery" },
  { id: "pipe", name: "Pipe", category: "Structure", image: "/images/components/pipe" },
  { id: "capacitor", name: "Capacitor", category: "Power", image: "/images/components/capacitor" },
  { id: "drone", name: "Drone", category: "Mobility", image: "/images/components/drone" },
  { id: "microwave", name: "Microwave", category: "Appliance", image: "/images/components/microwave" },
  { id: "shopping-cart", name: "Shopping Cart", category: "Mobility", image: "/images/components/shopping-cart" },
  { id: "motor", name: "Motor", category: "Power", image: "/images/components/motor" },
  { id: "vacuum", name: "Vacuum", category: "Appliance", image: "/images/components/vacuum" },
  { id: "camera", name: "Camera", category: "Electronics", image: "/images/components/camera" },
  { id: "radio", name: "Radio", category: "Electronics", image: "/images/components/radio" },
  { id: "circuit-board", name: "Circuit Board", category: "Electronics", image: "/images/components/circuit-board" },
  { id: "wiring", name: "Wiring", category: "Electronics", image: "/images/components/wiring" },
  { id: "speaker", name: "Speaker", category: "Electronics", image: "/images/components/speaker" },
  { id: "scrap-metal", name: "Scrap Metal", category: "Structure", image: "/images/components/scrap-metal" },
];

export function getComponent(id: string) {
  return salvageComponents.find((component) => component.id === id);
}
