import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  return new ImageResponse(
    <div
      style={{
        width: "1000px",
        height: "1500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#141414",
        color: "#F5A623",
        fontSize: 48,
        fontWeight: 700,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Test — {slug}
    </div>,
    { width: 1000, height: 1500 },
  );
}
