"use server";

import { createServerSupabase } from "@/lib/supabase/server";

export async function getShoppingListForDays(
  weekStart: string,
  dayIndices: number[],
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");

  // 1. Récupérer les recettes
  const { data: rows, error } = await supabase
    .from("meal_plans")
    .select("recette_id")
    .eq("user_id", user.id)
    .eq("week_start", weekStart)
    .in("day_index", dayIndices);

  if (error) {
    console.error("DB error:", error);
    return [];
  }
  if (!rows.length) return [];

  // 2. Compter occurrences
  const counts: Record<string, number> = {};
  for (const r of rows) {
    if (r.recette_id) counts[r.recette_id] = (counts[r.recette_id] || 0) + 1;
  }

  // 3. Récupérer les ingrédients
  const ids = Object.keys(counts);
  const { data: recettes } = await supabase
    .from("recettes")
    .select("id, ingredients, nombre_portions")
    .in("id", ids);

  if (!recettes) return [];

  // 4. Agrégation
  const aggregated: any[] = [];
  for (const rec of recettes) {
    const occurrences = counts[rec.id];
    const ratio = occurrences / (rec.nombre_portions || 4);
    const ingredients = rec.ingredients || [];
    for (const ing of ingredients) {
      const qty = (ing.quantite || 0) * ratio;
      aggregated.push({
        nom: ing.nom,
        quantite: Math.round(qty * 10) / 10,
        unite: ing.unite,
        categorie: ing.categorie || "Autre",
      });
    }
  }
  return aggregated;
}
