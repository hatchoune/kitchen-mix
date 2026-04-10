"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import type { Ingredient, ListeCoursesItem } from "@/types";

export async function getShoppingListForDays(
  weekStart: string,
  dayIndices: number[],
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  if (dayIndices.length === 0) {
    return [];
  }

  // Récupérer toutes les lignes meal_plans pour les jours demandés
  const { data: rows, error } = await supabase
    .from("meal_plans")
    .select("recette_id")
    .eq("user_id", user.id)
    .eq("week_start", weekStart)
    .in("day_index", dayIndices);

  if (error) throw new Error(error.message);
  if (!rows || rows.length === 0) return [];

  // Dédupliquer les IDs (si même recette placée plusieurs fois)
  const recetteIds = [
    ...new Set(rows.map((r) => r.recette_id).filter(Boolean)),
  ];

  if (recetteIds.length === 0) return [];

  // Récupérer les ingrédients des recettes
  const { data: recettes, error: recError } = await supabase
    .from("recettes")
    .select("ingredients")
    .in("id", recetteIds);

  if (recError) throw new Error(recError.message);
  if (!recettes) return [];

  // Agrégation des ingrédients
  const aggregated = new Map<string, ListeCoursesItem>();

  for (const recette of recettes) {
    const ingredients = recette.ingredients as Ingredient[];
    if (!ingredients) continue;
    for (const ing of ingredients) {
      const key = `${ing.nom.toLowerCase()}-${ing.unite}`;
      const existing = aggregated.get(key);
      if (existing) {
        existing.quantite += ing.quantite;
      } else {
        aggregated.set(key, {
          nom: ing.nom,
          quantite: ing.quantite,
          unite: ing.unite,
          categorie: ing.categorie || "Autre",
        });
      }
    }
  }

  const items = Array.from(aggregated.values());
  items.sort(
    (a, b) =>
      a.categorie.localeCompare(b.categorie) || a.nom.localeCompare(b.nom),
  );

  return items;
}
