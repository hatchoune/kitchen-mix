// hooks/useMealPlans.ts
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

export interface RecetteMin {
  id: string;
  slug: string;
  titre: string;
  ingredients: { nom: string; quantite: number; unite: string }[];
  image_url?: string | null;
}

export interface MealPlanRow {
  day_index: number;
  slot: number;
  recette_id: string;
  recettes: RecetteMin | null;
}

async function fetchMealPlans(
  userId: string,
  weekStart: string,
  signal?: AbortSignal,
): Promise<MealPlanRow[]> {
  const supabase = createClient();

  // Construction de la requête
  let query = supabase
    .from("meal_plans")
    .select(
      "day_index, slot, recette_id, recettes(id, slug, titre, ingredients, image_url)",
    )
    .eq("user_id", userId)
    .eq("week_start", weekStart);

  // Ajout du signal d'annulation seulement s'il est défini
  if (signal) {
    query = query.abortSignal(signal);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  if (!data) return [];

  // Transformation : Supabase retourne recettes comme un tableau (à cause de la jointure)
  // mais on veut un objet unique ou null
  return data.map((row: any) => ({
    day_index: row.day_index,
    slot: row.slot,
    recette_id: row.recette_id,
    recettes:
      Array.isArray(row.recettes) && row.recettes.length > 0
        ? (row.recettes[0] as RecetteMin)
        : null,
  })) as MealPlanRow[];
}

export function useMealPlans(userId: string | undefined, weekStart: string) {
  return useQuery({
    queryKey: ["meal_plans", userId, weekStart],
    queryFn: ({ signal }) => {
      if (!userId) return Promise.resolve([]);
      return fetchMealPlans(userId, weekStart, signal);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
