import { ImageResponse } from "next/og";
import { getRecetteBySlug } from "@/lib/supabase/queries";

export const runtime = "edge";
export const alt = "Kitchen Mix — Recette Thermomix";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recette = await getRecetteBySlug(slug);

  if (!recette) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#141414",
            color: "#F5A623",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Kitchen Mix
        </div>
      ),
      { ...size }
    );
  }

  const totalMin = recette.temps_preparation + recette.temps_cuisson;
  const diffEmoji =
    recette.difficulte === "facile"
      ? "🟢"
      : recette.difficulte === "moyen"
        ? "🟡"
        : "🔴";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141414",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background accent gradient */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,166,35,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#F5A623",
              letterSpacing: "-0.5px",
              display: "flex",
            }}
          >
            🍳 Kitchen Mix
          </div>
          <div
            style={{
              fontSize: 16,
              color: "rgba(245,245,240,0.5)",
              display: "flex",
            }}
          >
            mcmalnus.com
          </div>
        </div>

        {/* Middle: title + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1, justifyContent: "center" }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#F5F5F0",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              display: "flex",
              maxWidth: "900px",
            }}
          >
            {recette.titre}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(245,245,240,0.6)",
              lineHeight: 1.4,
              maxWidth: "800px",
              display: "flex",
            }}
          >
            {recette.description.slice(0, 120)}
            {recette.description.length > 120 ? "…" : ""}
          </div>
        </div>

        {/* Bottom: badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            ⏱ {totalMin} min
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#F5F5F0",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 18,
            }}
          >
            {diffEmoji} {recette.difficulte}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#F5F5F0",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 18,
            }}
          >
            👥 {recette.nombre_portions} portions
          </div>
          {recette.modele_thermomix.map((m) => (
            <div
              key={m}
              style={{
                display: "flex",
                backgroundColor: "rgba(245,166,35,0.15)",
                color: "#F5A623",
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {m}
            </div>
          ))}
          {recette.note_moyenne > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "#F5F5F0",
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: 18,
              }}
            >
              ⭐ {recette.note_moyenne.toFixed(1)}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
