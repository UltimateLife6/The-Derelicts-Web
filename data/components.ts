import type { SalvageComponent } from "@/types";

export const salvageComponents: SalvageComponent[] = [
  { id: "battery", name: "Battery", category: "Power" },
  { id: "pipe", name: "Pipe", category: "Structure" },
  { id: "capacitor", name: "Capacitor", category: "Power" },
  { id: "drone", name: "Drone", category: "Mobility" },
  { id: "microwave", name: "Microwave", category: "Appliance" },
  { id: "shopping-cart", name: "Shopping Cart", category: "Mobility" },
  { id: "motor", name: "Motor", category: "Power" },
  { id: "vacuum", name: "Vacuum", category: "Appliance" },
  { id: "camera", name: "Camera", category: "Electronics" },
  { id: "radio", name: "Radio", category: "Electronics" },
  { id: "circuit-board", name: "Circuit Board", category: "Electronics" },
  { id: "wiring", name: "Wiring", category: "Electronics" },
  { id: "speaker", name: "Speaker", category: "Electronics" },
  { id: "scrap-metal", name: "Scrap Metal", category: "Structure" },
];

export function getComponent(id: string) {
  return salvageComponents.find((component) => component.id === id);
}
