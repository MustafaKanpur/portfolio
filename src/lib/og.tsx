import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

// Shared Open Graph card: a big title on a tomato block, in the site's palette.
export function ogImage(title: string, kicker: string) {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#fff8ec", padding: 40 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            background: "#c9341c",
            color: "#fff8ec",
            border: "6px solid #17140f",
            boxShadow: "16px 16px 0 0 #17140f",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
            <span style={{ background: "#ffc21a", color: "#17140f", padding: "6px 16px" }}>{kicker}</span>
          </div>
          <div style={{ fontSize: title.length > 40 ? 72 : 96, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 30, fontWeight: 700 }}>{profile.name}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
