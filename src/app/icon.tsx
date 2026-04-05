import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: "linear-gradient(135deg, #2f1f15 0%, #8f5a3c 100%)",
          color: "#f6e6d7",
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: -1,
          fontFamily: "Arial, sans-serif"
        }}
      >
        JH
      </div>
    ),
    size
  );
}
