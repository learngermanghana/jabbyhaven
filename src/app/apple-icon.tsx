import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 32,
          background: "linear-gradient(135deg, #2f1f15 0%, #8f5a3c 100%)",
          color: "#f6e6d7",
          fontSize: 92,
          fontWeight: 800,
          letterSpacing: -2,
          fontFamily: "Arial, sans-serif"
        }}
      >
        JH
      </div>
    ),
    size
  );
}
