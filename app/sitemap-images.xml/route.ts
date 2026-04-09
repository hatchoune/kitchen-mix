import { createAdminSupabase } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/constants";

export const revalidate = 3600; // ISR 1h

export async function GET() {
  const supabase = createAdminSupabase();
  const { data: recettes } = await supabase
    .from("recettes")
    .select("slug, image_url, updated_at")
    .eq("approuve", true)
    .eq("publie", true)
    .not("image_url", "is", null);

  const now = new Date().toISOString();

  // Sécurité : si aucune recette, retourner un sitemap vide
  if (!recettes || recettes.length === 0) {
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
</urlset>`,
      {
        headers: {
          "Content-Type": "application/xml",
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${recettes
  .map((recette) => {
    const lastmod = recette.updated_at
      ? new Date(recette.updated_at).toISOString()
      : now;
    return `  <url>
    <loc>${SITE_URL}/recettes/${recette.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <image:image>
      <image:loc>${recette.image_url}</image:loc>
      <image:title>${escapeXml(recette.slug)}</image:title>
    </image:image>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
