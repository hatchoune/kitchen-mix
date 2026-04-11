"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function rateRecipe(recetteId: string, rating: number) {
  if (rating < 1 || rating > 5) {
    throw new Error("La note doit être comprise entre 1 et 5");
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  const { data, error } = await supabase
    .from("recipe_ratings")
    .upsert(
      { user_id: user.id, recette_id: recetteId, rating },
      { onConflict: "user_id,recette_id" },
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Achievements
  const { checkAndUnlockAchievements } =
    await import("@/app/actions/achievements");
  await checkAndUnlockAchievements(user.id, "rating_given");

  // Revalider la page de la recette pour mettre à jour l'affichage
  revalidatePath("/recettes", "layout");
  return { data };
}
