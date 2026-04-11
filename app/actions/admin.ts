"use server";

import {
  createAdminSupabase,
  createServerSupabase,
} from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/supabase/queries";

// Helper interne — vérifie admin ou throw
async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");
  const admin = await isAdmin(user.id);
  if (!admin) throw new Error("Accès refusé");
}

export async function approveRecette(id: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  // Récupérer l'auteur AVANT la mise à jour
  const { data: recette } = await adminClient
    .from("recettes")
    .select("auteur_id")
    .eq("id", id)
    .single();

  const { error } = await adminClient
    .from("recettes")
    .update({ approuve: true, raison_rejet: null })
    .eq("id", id);
  if (error) throw new Error(error.message);

  // Achievements pour l'auteur
  if (recette?.auteur_id) {
    const { checkAndUnlockAchievements } =
      await import("@/app/actions/achievements");
    await checkAndUnlockAchievements(recette.auteur_id, "recipe_approved", {
      authorId: recette.auteur_id,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/recettes");
  return { success: true };
}

export async function rejectRecette(id: string, raison: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recettes")
    .update({ approuve: false, raison_rejet: raison || "Non conforme" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}

export async function approveComment(id: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  // Récupérer l'auteur du commentaire
  const { data: comment } = await adminClient
    .from("recipe_comments")
    .select("user_id")
    .eq("id", id)
    .single();

  const { error } = await adminClient
    .from("recipe_comments")
    .update({ approved: true })
    .eq("id", id);
  if (error) throw new Error(error.message);

  // Achievements pour l'auteur du commentaire
  if (comment?.user_id) {
    const { checkAndUnlockAchievements } =
      await import("@/app/actions/achievements");
    await checkAndUnlockAchievements(comment.user_id, "comment_approved", {
      commentUserId: comment.user_id,
    });
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteComment(id: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recipe_comments")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}

export async function updateRecette(
  id: string,
  updates: Record<string, unknown>,
) {
  await requireAdmin();
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recettes")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/editer/${id}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteRecette(id: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();
  await adminClient.from("recipe_ratings").delete().eq("recette_id", id);
  await adminClient.from("recipe_comments").delete().eq("recette_id", id);
  await adminClient.from("favoris").delete().eq("recette_id", id);
  await adminClient.from("meal_plans").delete().eq("recette_id", id);
  const { error } = await adminClient.from("recettes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}
