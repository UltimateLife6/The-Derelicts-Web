import { productionImageResponse } from "@/lib/production-media";
import { ImageResponse } from "next/og";

export const alt = "The Derelicts — Welcome to Punktown.";
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
          background:
            "linear-gradient(180deg, #6eb7ef 0%, #f7ddae 55%, #c45a28 100%)",
          color: "#171310",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 34, color: "#fff", textShadow: "3px 4px 0 #000" }}>
          THE DERELICTS
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 76, lineHeight: 0.9, fontWeight: 800 }}>
            WELCOME TO PUNKTOWN.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            The world threw them away. They built a better one.
          </div>
          <div style={{ fontSize: 22, letterSpacing: 2 }}>
            MISFITS. GENIUSES. THE FUTURE.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
