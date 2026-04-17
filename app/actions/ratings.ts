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

  // Détecter si c'est une nouvelle note ou une mise à jour
  // (pour n'envoyer une notification que la première fois)
  const { data: existingRating } = await supabase
    .from("recipe_ratings")
    .select("id")
    .eq("user_id", user.id)
    .eq("recette_id", recetteId)
    .maybeSingle();

  const isNewRating = !existingRating;

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
  try {
    const { checkAndUnlockAchievements } = await import(
      "@/app/actions/achievements"
    );
    await checkAndUnlockAchievements(user.id, "rating_given");
  } catch (err) {
    console.error("[ratings] achievement check error:", err);
  }

  // Notification à l'auteur de la recette (uniquement pour une nouvelle note,
  // pas pour une simple modification d'une note existante).
  if (isNewRating) {
    try {
      const { notifyRecipeRating } = await import(
        "@/app/actions/notifications"
      );
      await notifyRecipeRating(recetteId, rating);
    } catch (err) {
      console.error("[ratings] notifyRecipeRating error:", err);
    }
  }

  // Revalider la page de la recette pour mettre à jour l'affichage
  revalidatePath("/recettes", "layout");
  return { data };
}
