"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import type { Ingredient } from "@/types";

export async function getShoppingListForDays(
  weekStart: string,
  dayIndices: number[],
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");
  if (dayIndices.length === 0) return [];

  console.log("[shoppingList] weekStart =", weekStart);
  console.log("[shoppingList] dayIndices =", dayIndices);

  // 1. Récupérer les recettes du planning
  const { data: rows, error } = await supabase
    .from("meal_plans")
    .select("recette_id")
    .eq("user_id", user.id)
    .eq("week_start", weekStart)
    .in("day_index", dayIndices);

  if (error) {
    console.error("[shoppingList] DB error:", error);
    return [];
  }
  console.log("[shoppingList] meal_plans rows =", rows);

  if (!rows || rows.length === 0) {
    console.log(
      "[shoppingList] Aucune recette dans le planning pour ces jours",
    );
    return [];
  }

  // 2. Compter les occurrences de chaque recette
  const counts: Record<string, number> = {};
  for (const r of rows) {
    if (r.recette_id) {
      counts[r.recette_id] = (counts[r.recette_id] || 0) + 1;
    }
  }
  console.log("[shoppingList] counts =", counts);

  // 3. Récupérer les ingrédients
  const ids = Object.keys(counts);
  const { data: recettes, error: recError } = await supabase
    .from("recettes")
    .select("id, ingredients, nombre_portions")
    .in("id", ids);

  if (recError) {
    console.error("[shoppingList] Erreur recettes:", recError);
    return [];
  }
  console.log("[shoppingList] recettes trouvées =", recettes?.length);

  // 4. Agrégation
  const aggregated: any[] = [];
  for (const rec of recettes || []) {
    const occurrences = counts[rec.id];
    const portionsBase = rec.nombre_portions || 4;
    const ratio = occurrences / portionsBase;
    const ingredients = rec.ingredients as Ingredient[];
    if (!ingredients) continue;

    for (const ing of ingredients) {
      if (!ing.nom) continue;
      const qty = (ing.quantite || 0) * ratio;
      aggregated.push({
        nom: ing.nom,
        quantite: Math.round(qty * 10) / 10,
        unite: ing.unite || "",
        categorie: ing.categorie || "Autre",
      });
    }
  }
  console.log("[shoppingList] items générés =", aggregated.length);
  return aggregated;
}
