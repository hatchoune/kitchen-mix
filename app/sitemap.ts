import type { MetadataRoute } from "next";
import { SITE_URL, CATEGORIES } from "@/lib/constants";
import { createAdminSupabase } from "@/lib/supabase/server";

const RECIPES_PER_SITEMAP = 500;

export async function generateSitemaps() {
  const supabase = createAdminSupabase();
  const { count } = await supabase
    .from("recettes")
    .select("*", { count: "exact", head: true })
    .eq("approuve", true)
    .eq("publie", true);

  const totalRecipes = count || 0;
  const totalSitemaps = Math.ceil(totalRecipes / RECIPES_PER_SITEMAP);
  return Array.from({ length: totalSitemaps }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const supabase = createAdminSupabase();
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const { data: recettes } = await supabase
    .from("recettes")
    .select("slug, updated_at")
    .eq("approuve", true)
    .eq("publie", true)
    .order("updated_at", { ascending: false })
    .range(id * RECIPES_PER_SITEMAP, (id + 1) * RECIPES_PER_SITEMAP - 1);

  const recetteUrls: MetadataRoute.Sitemap = (recettes || []).map(
    ({ slug, updated_at }) => {
      const lastMod = updated_at ? new Date(updated_at) : now;
      const changeFrequency =
        lastMod > thirtyDaysAgo ? ("weekly" as const) : ("yearly" as const);
      return {
        url: `${SITE_URL}/recettes/${slug}`,
        lastModified: lastMod,
        changeFrequency,
        priority: 0.8,
      };
    },
  );

  const staticUrls: MetadataRoute.Sitemap =
    id === 0
      ? [
          {
            url: SITE_URL,
            lastModified: now,
            changeFrequency: "daily" as const,
            priority: 1,
          },
          {
            url: `${SITE_URL}/recettes`,
            lastModified: now,
            changeFrequency: "daily" as const,
            priority: 0.9,
          },
          // Ajouts
          {
            url: `${SITE_URL}/a-propos`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
          {
            url: `${SITE_URL}/mentions-legales`,
            lastModified: now,
            changeFrequency: "yearly" as const,
            priority: 0.5,
          },
          ...CATEGORIES.map((cat) => ({
            url: `${SITE_URL}/recettes/${cat.value}`,
            lastModified: now,
            changeFrequency: "daily" as const,
            priority: 0.85,
          })),
        ]
      : [];

  return [...staticUrls, ...recetteUrls];
}
