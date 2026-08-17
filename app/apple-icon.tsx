import { productionImageResponse } from "@/lib/production-media";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const production =
    (await productionImageResponse("/images/brand/apple-touch")) ??
    (await productionImageResponse("/images/brand/icon"));
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
          fontSize: 96,
          fontWeight: 800,
        }}
      >
        D
      </div>
    ),
    size,
  );
}
