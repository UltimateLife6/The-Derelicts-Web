import { productionImageResponse } from "@/lib/production-media";
import { ImageResponse } from "next/og";

export const alt = "The Derelicts — Scavenge. Invent. Fight. Survive.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const production = await productionImageResponse("/images/brand/og");
  if (production) return production;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080c",
          color: "#e8e4d8",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#f5e642" }}>
          THE DERELICTS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 88, lineHeight: 0.9, fontWeight: 800 }}>
            SCAVENGE. INVENT.
          </div>
          <div style={{ fontSize: 88, lineHeight: 0.9, fontWeight: 800 }}>
            FIGHT. SURVIVE.
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#9aa3ad" }}>
          The world threw them away. They built a better one.
        </div>
      </div>
    ),
    size,
  );
}
