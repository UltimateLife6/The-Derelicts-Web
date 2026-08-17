import { productionImageResponse } from "@/lib/production-media";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const production = await productionImageResponse("/images/brand/icon");
  if (production) return production;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07080c",
          color: "#f5e642",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        D
      </div>
    ),
    size,
  );
}
