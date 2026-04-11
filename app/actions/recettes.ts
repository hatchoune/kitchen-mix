"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { generateSlug } from "@/lib/utils";
import { MAX_SUBMISSIONS_PER_DAY } from "@/lib/constants";
import { revalidatePath } from "next/cache";
import { recetteSchema } from "@/lib/validation";

export async function soumettreRecette(rawData: unknown) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Non autorisé");
  }

  // Validation Zod côté serveur — throw si données invalides
  const data = recetteSchema.parse(rawData);

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

  await supabase.from("submission_log").insert({ user_id: user.id });

  // Achievements
  const { checkAndUnlockAchievements } =
    await import("@/app/actions/achievements");
  await checkAndUnlockAchievements(user.id, "recipe_submitted", {
    has_image: !!data.image_url,
    has_video: !!data.video_youtube_id,
    has_faq: data.faq && data.faq.length > 0,
    has_nutriscore: !!data.nutriscore,
  });

  revalidatePath("/recettes");
  return { recette };
}
