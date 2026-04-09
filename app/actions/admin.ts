"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/supabase/queries";
import type { Recette } from "@/types";

export async function approveRecette(id: string) {
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recettes")
    .update({ approuve: true, raison_rejet: null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/recettes");
  return { success: true };
}

export async function rejectRecette(id: string, raison: string) {
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
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recipe_comments")
    .update({ approved: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteComment(id: string) {
  const adminClient = createAdminSupabase();
  const { error } = await adminClient
    .from("recipe_comments")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}

export async function updateRecette(id: string, updates: any) {
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
  const adminClient = createAdminSupabase();
  // Supprimer les données liées d'abord
  await adminClient.from("recipe_ratings").delete().eq("recette_id", id);
  await adminClient.from("recipe_comments").delete().eq("recette_id", id);
  await adminClient.from("favoris").delete().eq("recette_id", id);
  await adminClient.from("meal_plans").delete().eq("recette_id", id);
  // Puis la recette elle-même
  const { error } = await adminClient.from("recettes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  return { success: true };
}
