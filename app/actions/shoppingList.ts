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

  // Compter les occurrences de chaque recette : une même recette placée
  // plusieurs fois dans la semaine doit multiplier ses ingrédients.
  const idCounts = new Map<string, number>();
  for (const row of rows) {
    if (!row.recette_id) continue;
    idCounts.set(row.recette_id, (idCounts.get(row.recette_id) ?? 0) + 1);
  }

  const recetteIds = Array.from(idCounts.keys());
  if (recetteIds.length === 0) return [];

  // Récupérer les ingrédients (une seule fois par recette, on multipliera après)
  const { data: recettes, error: recError } = await supabase
    .from("recettes")
    .select("id, ingredients")
    .in("id", recetteIds);

  if (recError) throw new Error(recError.message);
  if (!recettes) return [];

  // Index par ID pour accès direct
  const ingredientsById = new Map<string, Ingredient[]>();
  for (const r of recettes) {
    ingredientsById.set(r.id, (r.ingredients as Ingredient[]) ?? []);
  }

  // Agrégation : clé normalisée (nom + unité trim + lowercase),
  // quantité castée en Number() (au cas où stockée en string dans le JSON),
  // multipliée par le nombre d'occurrences de la recette.
  const aggregated = new Map<string, ListeCoursesItem>();

  for (const [recetteId, count] of idCounts) {
    const ingredients = ingredientsById.get(recetteId);
    if (!ingredients) continue;

    for (const ing of ingredients) {
      if (!ing?.nom) continue;

      const qty = Number(ing.quantite);
      if (!Number.isFinite(qty)) continue;

      const nomKey = ing.nom.trim().toLowerCase();
      const uniteKey = (ing.unite ?? "").trim().toLowerCase();
      const key = `${nomKey}|${uniteKey}`;

      const addQty = qty * count;
      const existing = aggregated.get(key);
      if (existing) {
        existing.quantite += addQty;
      } else {
        aggregated.set(key, {
          nom: ing.nom,
          quantite: addQty,
          unite: ing.unite ?? "",
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
