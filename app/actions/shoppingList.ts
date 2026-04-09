"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import type { Ingredient, ListeCoursesItem } from "@/types";

const JOURS_KEYS = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
];

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

  // Récupérer le plan de la semaine
  const { data: plan } = await supabase
    .from("planificateur")
    .select("*")
    .eq("user_id", user.id)
    .eq("semaine", weekStart)
    .single();

  if (!plan) {
    return [];
  }

  // Collecter les IDs des recettes pour les jours demandés
  const recetteIds: string[] = [];
  for (const idx of dayIndices) {
    const dayKey = JOURS_KEYS[idx];
    const recId = plan[dayKey as keyof typeof plan] as string | null;
    if (recId) recetteIds.push(recId);
  }

  if (recetteIds.length === 0) {
    return [];
  }

  // Récupérer les recettes correspondantes
  const { data: recettes } = await supabase
    .from("recettes")
    .select("ingredients")
    .in("id", recetteIds);

  if (!recettes) {
    return [];
  }

  // Agrégation des ingrédients
  const aggregated = new Map<string, ListeCoursesItem>();

  for (const recette of recettes) {
    const ingredients = recette.ingredients as Ingredient[];
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
