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

// ── Fetch commentaires pour le panel admin (bypass RLS) ──

export async function getAdminPendingComments() {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  // Essai avec jointures PostgREST
  const { data, error } = await adminClient
    .from("recipe_comments")
    .select(
      "*, profils:user_id(pseudo, avatar_url), recettes:recette_id(slug, titre)",
    )
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (!error) return data || [];

  // Jointure échouée → fallback avec requêtes séparées
  console.error("[ADMIN] Join échouée pour pending comments:", error.message);

  const { data: raw, error: rawErr } = await adminClient
    .from("recipe_comments")
    .select("*")
    .eq("approved", false)
    .order("created_at", { ascending: true });

  if (rawErr) throw new Error(`Commentaires inaccessibles: ${rawErr.message}`);

  return await enrichComments(adminClient, raw || []);
}

export async function getAdminAllComments() {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  const { data, error } = await adminClient
    .from("recipe_comments")
    .select(
      "*, profils:user_id(pseudo, avatar_url), recettes:recette_id(slug, titre)",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (!error) return data || [];

  console.error("[ADMIN] Join échouée pour all comments:", error.message);

  const { data: raw, error: rawErr } = await adminClient
    .from("recipe_comments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (rawErr) throw new Error(`Historique inaccessible: ${rawErr.message}`);

  return await enrichComments(adminClient, raw || []);
}

/**
 * Enrichit les commentaires avec profils + recettes
 * quand la jointure PostgREST ne fonctionne pas
 */
async function enrichComments(
  adminClient: ReturnType<typeof createAdminSupabase>,
  comments: any[],
) {
  if (comments.length === 0) return [];

  const userIds = [...new Set(comments.map((c) => c.user_id))];
  const recetteIds = [...new Set(comments.map((c) => c.recette_id))];

  const [profilsRes, recettesRes] = await Promise.all([
    adminClient
      .from("profils")
      .select("id, pseudo, avatar_url")
      .in("id", userIds),
    adminClient
      .from("recettes")
      .select("id, slug, titre")
      .in("id", recetteIds),
  ]);

  const profilMap = new Map(
    (profilsRes.data || []).map((p: any) => [p.id, p]),
  );
  const recetteMap = new Map(
    (recettesRes.data || []).map((r: any) => [r.id, r]),
  );

  return comments.map((c) => ({
    ...c,
    profils: profilMap.get(c.user_id) || { pseudo: null, avatar_url: null },
    recettes: recetteMap.get(c.recette_id) || {
      slug: "",
      titre: "Recette supprimée",
    },
  }));
}

// ── Fetch recettes pour le panel admin (bypass RLS) ──

export async function getAdminPendingRecettes() {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  const { data, error } = await adminClient
    .from("recettes")
    .select("*")
    .eq("approuve", false)
    .is("raison_rejet", null)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data || [];
}

export async function getAdminAllRecettes() {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  const { data, error } = await adminClient
    .from("recettes")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return data || [];
}

// ── Actions de modération ──

export async function approveRecette(id: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();

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
