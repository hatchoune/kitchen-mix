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

  // 1. Récupérer les recettes du planning (pas de portions_count)
  const { data: rows, error } = await supabase
    .from("meal_plans")
    .select("recette_id")
    .eq("user_id", user.id)
    .eq("week_start", weekStart)
    .in("day_index", dayIndices);

  if (error) {
    console.error("[shoppingList] Erreur DB:", error.message);
    throw new Error(error.message);
  }
  if (!rows || rows.length === 0) return [];

  // 2. Compter les occurrences de chaque recette
  const recetteCounts = new Map<string, number>();
  for (const row of rows) {
    if (row.recette_id) {
      recetteCounts.set(
        row.recette_id,
        (recetteCounts.get(row.recette_id) || 0) + 1,
      );
    }
  }

  // 3. Récupérer les ingrédients et le nombre de portions de base
  const recetteIds = Array.from(recetteCounts.keys());
  const { data: recettes, error: recError } = await supabase
    .from("recettes")
    .select("id, ingredients, nombre_portions")
    .in("id", recetteIds);

  if (recError) throw new Error(recError.message);
  if (!recettes) return [];

  // 4. Agrégation des ingrédients
  const aggregated = new Map<
    string,
    {
      nom: string;
      quantite: number;
      unite: string;
      categorie: string;
    }
  >();

  for (const recette of recettes) {
    const occurrences = recetteCounts.get(recette.id) || 1;
    const portionsBase = recette.nombre_portions || 4;
    const ratio = occurrences / portionsBase;

    const ingredients = recette.ingredients as Ingredient[];
    if (!ingredients) continue;

    for (const ing of ingredients) {
      if (!ing?.nom) continue;
      const qty = Number(ing.quantite);
      if (isNaN(qty)) continue;

      const adjustedQty = qty * ratio;
      const key = `${ing.nom}|${ing.unite || ""}`;
      const existing = aggregated.get(key);
      if (existing) {
        existing.quantite += adjustedQty;
      } else {
        aggregated.set(key, {
          nom: ing.nom,
          quantite: adjustedQty,
          unite: ing.unite || "",
          categorie: ing.categorie || "Autre",
        });
      }
    }
  }

  // 5. Arrondir et trier
  const items = Array.from(aggregated.values()).map((item) => ({
    ...item,
    quantite: Math.round(item.quantite * 10) / 10,
  }));
  items.sort(
    (a, b) =>
      a.categorie.localeCompare(b.categorie) || a.nom.localeCompare(b.nom),
  );

  return items;
}
