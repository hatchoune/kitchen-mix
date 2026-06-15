import { ImageResponse } from "next/og";
import { createServerSupabase } from "@/lib/supabase/server";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const supabase = await createServerSupabase();
  const { data: recette } = await supabase
    .from("recettes")
    .select(
      "titre, description, image_url, temps_preparation, temps_cuisson, difficulte, nombre_portions, modele_thermomix, note_moyenne",
    )
    .eq("slug", slug)
    .eq("approuve", true)
    .eq("publie", true)
    .single();

  if (!recette) {
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
        🍳 Kitchen Mix
      </div>,
      { width: 1000, height: 1500 },
    );
  }

  const totalMin = recette.temps_preparation + recette.temps_cuisson;
  const diffEmoji =
    recette.difficulte === "facile"
      ? "🟢"
      : recette.difficulte === "moyen"
        ? "🟡"
        : "🔴";
  const appareilLabel = (() => {
    const modele = recette.modele_thermomix?.[0] as string;
    const labels: Record<string, string> = {
      COMPANION: "Moulinex Companion",
      COOK_EXPERT: "Magimix Cook Expert",
      COOKEO: "Cookeo",
      TM5: "Thermomix TM5",
      TM6: "Thermomix TM6",
      TM7: "Thermomix TM7",
    };
    return labels[modele] ?? modele?.replace(/_/g, " ") ?? "Robot cuiseur";
  })();

  return new ImageResponse(
    <div
      style={{
        width: "1000px",
        height: "1500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#141414",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* PHOTO */}
      <div
        style={{
          width: "1000px",
          height: "620px",
          position: "relative",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {recette.image_url ? (
          <img
            src={recette.image_url}
            style={{ width: "1000px", height: "620px", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "1000px",
              height: "620px",
              backgroundColor: "#1E1E1E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
            }}
          >
            🍳
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(to bottom, transparent, #141414)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            backgroundColor: "rgba(245,166,35,0.9)",
            color: "#141414",
            padding: "8px 20px",
            borderRadius: "100px",
            fontSize: 22,
            fontWeight: 700,
            display: "flex",
          }}
        >
          {appareilLabel}
        </div>
      </div>

      {/* CONTENU */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "40px 56px 0px 56px",
          gap: "28px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#F5F5F0",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            display: "flex",
          }}
        >
          {recette.titre}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(245,245,240,0.65)",
            lineHeight: 1.45,
            display: "flex",
          }}
        >
          {recette.description.slice(0, 100)}
          {recette.description.length > 100 ? "…" : ""}
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(245,166,35,0.15)",
              color: "#F5A623",
              padding: "12px 24px",
              borderRadius: "14px",
              fontSize: 26,
              fontWeight: 600,
              border: "1px solid rgba(245,166,35,0.3)",
            }}
          >
            ⏱ {totalMin} min
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#F5F5F0",
              padding: "12px 24px",
              borderRadius: "14px",
              fontSize: 26,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {diffEmoji} {recette.difficulte}
          </div>
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#F5F5F0",
              padding: "12px 24px",
              borderRadius: "14px",
              fontSize: 26,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            👥 {recette.nombre_portions} portions
          </div>
        </div>
        <div
          style={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#F5A623",
              display: "flex",
            }}
          >
            🍳 Kitchen Mix
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(245,245,240,0.4)",
              display: "flex",
            }}
          >
            kitchen-mix.com
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,166,35,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />
    </div>,
    { width: 1000, height: 1500 },
  );
}
