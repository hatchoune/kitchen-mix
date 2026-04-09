"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils";
import { MAX_SUBMISSIONS_PER_DAY } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export async function soumettreRecette(data: any) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  // Rate limiting
  const today = new Date().toISOString().split("T")[0];
  const { count } = await supabase
    .from("submission_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("submitted_at", `${today}T00:00:00Z`);

  if ((count || 0) >= MAX_SUBMISSIONS_PER_DAY) {
    throw new Error(`Maximum ${MAX_SUBMISSIONS_PER_DAY} soumissions par jour.`);
  }

  const slug = generateSlug(data.titre);

  const { data: recette, error } = await supabase
    .from("recettes")
    .insert({
      ...data,
      slug,
      auteur_id: user.id,
      approuve: false,
      publie: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Log submission
  await supabase.from("submission_log").insert({ user_id: user.id });

  // Revalider la page des recettes pour rafraîchir le cache
  revalidatePath("/recettes");
  return { recette };
}
