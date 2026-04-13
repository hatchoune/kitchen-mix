"use server";

import {
  createAdminSupabase,
  createServerSupabase,
} from "@/lib/supabase/server";
import { isAdmin } from "@/lib/supabase/queries";

/* =============================================================
   Kitchen Mix — Actions admin : Gestion utilisateurs
   ============================================================= */

// ─── Helper interne ──────────────────────────────────────────

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");
  const admin = await isAdmin(user.id);
  if (!admin) throw new Error("Accès refusé");
  return user;
}

// ─── Bannir un utilisateur ───────────────────────────────────

export async function banUser(userId: string, reason: string) {
  const adminUser = await requireAdmin();
  const adminClient = createAdminSupabase();

  // 1. Récupérer l'email de l'utilisateur via auth.admin
  const { data: targetUser, error: userError } =
    await adminClient.auth.admin.getUserById(userId);

  if (userError || !targetUser?.user?.email) {
    throw new Error("Utilisateur introuvable");
  }

  const email = targetUser.user.email.toLowerCase().trim();

  // 2. Vérifier que ce n'est pas un admin
  const { data: isTargetAdmin } = await adminClient
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (isTargetAdmin) {
    throw new Error("Impossible de bannir un administrateur");
  }

  // 3. Ajouter l'email à la liste des bannis
  const { error: banError } = await adminClient.from("banned_users").upsert(
    {
      email,
      user_id: userId,
      reason: reason || "Comportement inapproprié",
      banned_by: adminUser.id,
    },
    { onConflict: "email" },
  );

  if (banError) throw new Error(banError.message);

  // 4. Supprimer toutes les données de l'utilisateur
  // Commentaires
  await adminClient.from("recipe_comments").delete().eq("user_id", userId);
  // Votes
  await adminClient.from("comment_votes").delete().eq("user_id", userId);
  // Favoris
  await adminClient.from("favoris").delete().eq("user_id", userId);
  // Notes
  await adminClient.from("recipe_ratings").delete().eq("user_id", userId);
  // Meal plans
  await adminClient.from("meal_plans").delete().eq("user_id", userId);
  // User plannings + likes/favorites associés
  const { data: userPlannings } = await adminClient
    .from("user_plannings")
    .select("id")
    .eq("user_id", userId);
  if (userPlannings && userPlannings.length > 0) {
    const planIds = userPlannings.map((p) => p.id);
    await adminClient.from("planning_likes").delete().in("planning_id", planIds);
    await adminClient
      .from("planning_favorites")
      .delete()
      .in("planning_id", planIds);
    await adminClient.from("user_plannings").delete().eq("user_id", userId);
  }
  // Planning likes/favorites qu'il a donnés
  await adminClient.from("planning_likes").delete().eq("user_id", userId);
  await adminClient.from("planning_favorites").delete().eq("user_id", userId);
  // Achievements
  await adminClient.from("user_achievements").delete().eq("user_id", userId);
  // Submission log
  await adminClient.from("submission_log").delete().eq("user_id", userId);
  // Recettes (mettre auteur_id à null plutôt que supprimer)
  await adminClient
    .from("recettes")
    .update({ auteur_id: null })
    .eq("auteur_id", userId);
  // Profil
  await adminClient.from("profils").delete().eq("id", userId);
  // Newsletter
  await adminClient
    .from("newsletter_subscribers")
    .delete()
    .eq("email", email);

  // 5. Supprimer le compte auth (dernière étape)
  const { error: deleteError } =
    await adminClient.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error("Erreur suppression auth:", deleteError.message);
    // On ne throw pas — le ban est déjà en place
  }

  return { success: true, email };
}

// ─── Débannir un email ───────────────────────────────────────

export async function unbanUser(email: string) {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  const { error } = await adminClient
    .from("banned_users")
    .delete()
    .eq("email", email.toLowerCase().trim());

  if (error) throw new Error(error.message);
  return { success: true };
}

// ─── Liste des utilisateurs bannis ───────────────────────────

export async function getBannedUsers() {
  await requireAdmin();
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("banned_users")
    .select("*")
    .order("banned_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}

// ─── Liste des utilisateurs (pour le panel admin) ────────────

export async function getUsers(limit = 50) {
  await requireAdmin();
  const adminClient = createAdminSupabase();

  // Récupérer les profils avec les infos utiles
  const { data: profils } = await adminClient
    .from("profils")
    .select("id, pseudo, avatar_url, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (!profils) return [];

  // Récupérer les emails depuis auth
  const userIds = profils.map((p) => p.id);
  const usersWithEmail = [];

  for (const profil of profils) {
    try {
      const { data } = await adminClient.auth.admin.getUserById(profil.id);
      usersWithEmail.push({
        ...profil,
        email: data?.user?.email || "—",
      });
    } catch {
      usersWithEmail.push({ ...profil, email: "—" });
    }
  }

  return usersWithEmail;
}

// ─── Vérifier si un email est banni (pour l'auth) ────────────

export async function checkBannedEmail(email: string): Promise<boolean> {
  const adminClient = createAdminSupabase();
  const { data } = await adminClient
    .from("banned_users")
    .select("id")
    .eq("email", email.toLowerCase().trim())
    .maybeSingle();

  return !!data;
}
