"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleFavori(recetteId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  // Vérifier si déjà en favori
  const { data: existing } = await supabase
    .from("favoris")
    .select("id")
    .eq("user_id", user.id)
    .eq("recette_id", recetteId)
    .single();

  if (existing) {
    // Supprimer
    const { error } = await supabase
      .from("favoris")
      .delete()
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    return { action: "removed" };
  } else {
    // Ajouter
    const { error } = await supabase
      .from("favoris")
      .insert({ user_id: user.id, recette_id: recetteId });
    if (error) throw new Error(error.message);
    return { action: "added" };
  }
}
