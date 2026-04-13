"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

/* =============================================================
   Kitchen Mix — Actions : Plannings publics
   ============================================================= */

// ─── Types ───────────────────────────────────────────────────

export interface SavePlanningInput {
  name: string;
  description?: string;
  is_public: boolean;
  week_start: string;
  data: Record<number, (string | null)[]>; // dayIndex → [recetteId | null, ...]
}

// ─── Sauvegarder un planning ─────────────────────────────────

export async function savePlanning(input: SavePlanningInput) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");
  if (!input.name?.trim()) throw new Error("Le nom est requis");

  const { data, error } = await supabase
    .from("user_plannings")
    .insert({
      user_id: user.id,
      name: input.name.trim(),
      description: input.description?.trim() || null,
      is_public: input.is_public,
      week_start: input.week_start,
      data: input.data,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  // Achievement check
  const { checkAndUnlockAchievements } = await import(
    "@/app/actions/achievements"
  );
  await checkAndUnlockAchievements(user.id, "plan_saved");

  revalidatePath("/planificateur");
  return { id: data.id };
}

// ─── Récupérer un planning par ID ────────────────────────────

export async function getPlanning(id: string) {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("user_plannings")
    .select("*, profils:user_id(pseudo, avatar_url)")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

// ─── Récupérer les recettes d'un planning ────────────────────

export async function getPlanningRecipes(planningData: Record<string, (string | null)[]>) {
  const supabase = await createServerSupabase();

  // Collecter tous les IDs de recettes uniques
  const recetteIds = new Set<string>();
  for (const slots of Object.values(planningData)) {
    for (const id of slots) {
      if (id) recetteIds.add(id);
    }
  }

  if (recetteIds.size === 0) return {};

  const { data } = await supabase
    .from("recettes")
    .select("id, slug, titre, image_url, ingredients")
    .in("id", Array.from(recetteIds));

  const map: Record<string, { id: string; slug: string; titre: string; image_url: string | null; ingredients: unknown[] }> = {};
  for (const r of data || []) {
    map[r.id] = r;
  }
  return map;
}

// ─── Liker un planning ──────────────────────────────────────

export async function togglePlanningLike(planningId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  const { data: existing } = await supabase
    .from("planning_likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("planning_id", planningId)
    .single();

  if (existing) {
    await supabase.from("planning_likes").delete().eq("id", existing.id);
    return { action: "removed" };
  } else {
    await supabase
      .from("planning_likes")
      .insert({ user_id: user.id, planning_id: planningId });
    return { action: "added" };
  }
}

// ─── Ajouter/retirer un planning des favoris ─────────────────

export async function togglePlanningFavorite(planningId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  const { data: existing } = await supabase
    .from("planning_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("planning_id", planningId)
    .single();

  if (existing) {
    await supabase
      .from("planning_favorites")
      .delete()
      .eq("id", existing.id);
    return { action: "removed" };
  } else {
    await supabase
      .from("planning_favorites")
      .insert({ user_id: user.id, planning_id: planningId });
    return { action: "added" };
  }
}

// ─── Dupliquer un planning dans meal_plans ───────────────────

export async function duplicatePlanningToWeek(
  planningId: string,
  targetWeekStart: string,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  // Récupérer le planning source
  const { data: planning } = await supabase
    .from("user_plannings")
    .select("data")
    .eq("id", planningId)
    .single();

  if (!planning) throw new Error("Planning introuvable");

  const planData = planning.data as Record<string, (string | null)[]>;

  // Supprimer les meal_plans existants pour cette semaine
  await supabase
    .from("meal_plans")
    .delete()
    .eq("user_id", user.id)
    .eq("week_start", targetWeekStart);

  // Insérer les nouveaux
  const rows = [];
  for (const [dayStr, slots] of Object.entries(planData)) {
    const dayIndex = parseInt(dayStr);
    for (let s = 0; s < slots.length; s++) {
      if (slots[s]) {
        rows.push({
          user_id: user.id,
          week_start: targetWeekStart,
          day_index: dayIndex,
          slot: s,
          recette_id: slots[s],
        });
      }
    }
  }

  if (rows.length > 0) {
    await supabase.from("meal_plans").insert(rows);
  }

  revalidatePath("/planificateur");
  return { success: true, count: rows.length };
}

// ─── Mes plannings sauvegardés ───────────────────────────────

export async function getMyPlannings() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data } = await supabase
    .from("user_plannings")
    .select("id, name, description, is_public, week_start, likes_count, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data || [];
}

// ─── Plannings publics d'un utilisateur (pour profil public) ─

export async function getPublicPlannings(userId: string) {
  const supabase = await createServerSupabase();

  const { data } = await supabase
    .from("user_plannings")
    .select("id, name, description, likes_count, created_at")
    .eq("user_id", userId)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(10);

  return data || [];
}

// ─── Supprimer un planning ───────────────────────────────────

export async function deletePlanning(id: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  const { error } = await supabase
    .from("user_plannings")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  revalidatePath("/planificateur");
  return { success: true };
}
