"use server";

import { createServerSupabase } from "@/lib/supabase/server";

/* =============================================================
   Kitchen Mix — Actions : Achievements
   Vérifie et débloque les trophées après chaque action utilisateur.
   ============================================================= */

// ─── Types d'action qui déclenchent une vérification ─────────

export type AchievementTrigger =
  | "recipe_submitted"
  | "recipe_approved"
  | "comment_posted"
  | "comment_approved"
  | "favori_added"
  | "rating_given"
  | "avatar_set"
  | "login"
  | "plan_saved"
  | "like_received";

// ─── Fonction principale ─────────────────────────────────────

/**
 * Vérifie et débloque les achievements liés à une action.
 * Appelée depuis les autres server actions après l'action principale.
 * Ne throw jamais — les achievements ne doivent pas bloquer l'action principale.
 */
export async function checkAndUnlockAchievements(
  userId: string,
  trigger: AchievementTrigger,
  metadata?: Record<string, unknown>,
): Promise<string[]> {
  try {
    const supabase = await createServerSupabase();
    const unlocked: string[] = [];

    // Récupérer les achievements déjà débloqués
    const { data: existing } = await supabase
      .from("user_achievements")
      .select("achievement_code")
      .eq("user_id", userId);

    const has = (code: string) =>
      (existing || []).some((e) => e.achievement_code === code);

    const unlock = async (code: string) => {
      if (has(code)) return;
      const { error } = await supabase.from("user_achievements").insert({
        user_id: userId,
        achievement_code: code,
        notified: false,
      });
      if (!error) unlocked.push(code);
    };

    switch (trigger) {
      case "recipe_submitted": {
        const { count } = await supabase
          .from("recettes")
          .select("id", { count: "exact", head: true })
          .eq("auteur_id", userId);
        const n = count || 0;
        if (n >= 1) await unlock("recipe_submit_1");
        if (n >= 5) await unlock("recipe_submit_5");
        if (n >= 10) await unlock("recipe_submit_10");

        // Spéciaux basés sur metadata
        if (metadata?.has_image) await unlock("recipe_with_photo");
        if (metadata?.has_video) await unlock("recipe_with_video");
        if (metadata?.has_faq) await unlock("recipe_with_faq");
        if (metadata?.has_nutriscore) await unlock("nutriscore_1");

        // Nutri-Score multiples
        const { count: nutriCount } = await supabase
          .from("recettes")
          .select("id", { count: "exact", head: true })
          .eq("auteur_id", userId)
          .not("nutriscore", "is", null);
        if ((nutriCount || 0) >= 5) await unlock("nutriscore_5");
        if ((nutriCount || 0) >= 10) await unlock("nutriscore_10");
        break;
      }

      case "recipe_approved": {
        // metadata.authorId = l'auteur de la recette approuvée
        const authorId = (metadata?.authorId as string) || userId;
        const { count } = await supabase
          .from("recettes")
          .select("id", { count: "exact", head: true })
          .eq("auteur_id", authorId)
          .eq("approuve", true);
        const n = count || 0;

        // On débloque pour l'auteur, pas pour l'admin
        const { data: authorExisting } = await supabase
          .from("user_achievements")
          .select("achievement_code")
          .eq("user_id", authorId);

        const authorHas = (code: string) =>
          (authorExisting || []).some((e) => e.achievement_code === code);

        const unlockForAuthor = async (code: string) => {
          if (authorHas(code)) return;
          const { error } = await supabase.from("user_achievements").insert({
            user_id: authorId,
            achievement_code: code,
            notified: false,
          });
          if (!error) unlocked.push(code);
        };

        if (n >= 1) await unlockForAuthor("recipe_approved_1");
        if (n >= 5) await unlockForAuthor("recipe_approved_5");
        if (n >= 10) await unlockForAuthor("recipe_approved_10");
        break;
      }

      case "comment_posted": {
        const { count } = await supabase
          .from("recipe_comments")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);
        const n = count || 0;
        if (n >= 1) await unlock("comment_1");
        if (n >= 10) await unlock("comment_10");
        if (n >= 50) await unlock("comment_50");
        break;
      }

      case "comment_approved": {
        const commentUserId = (metadata?.commentUserId as string) || userId;
        const { count } = await supabase
          .from("recipe_comments")
          .select("id", { count: "exact", head: true })
          .eq("user_id", commentUserId)
          .eq("approved", true);
        const n = count || 0;

        const { data: cExisting } = await supabase
          .from("user_achievements")
          .select("achievement_code")
          .eq("user_id", commentUserId);
        const cHas = (code: string) =>
          (cExisting || []).some((e) => e.achievement_code === code);
        const unlockForCommenter = async (code: string) => {
          if (cHas(code)) return;
          await supabase.from("user_achievements").insert({
            user_id: commentUserId,
            achievement_code: code,
            notified: false,
          });
        };

        if (n >= 1) await unlockForCommenter("comment_approved_1");
        if (n >= 10) await unlockForCommenter("comment_approved_10");
        if (n >= 50) await unlockForCommenter("comment_approved_50");
        break;
      }

      case "favori_added": {
        const { count } = await supabase
          .from("favoris")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);
        const n = count || 0;
        if (n >= 1) await unlock("fav_1");
        if (n >= 10) await unlock("fav_10");
        if (n >= 50) await unlock("fav_50");
        break;
      }

      case "rating_given": {
        const { count } = await supabase
          .from("recipe_ratings")
          .select("id", { count: "exact", head: true })
          .eq("user_id", userId);
        const n = count || 0;
        if (n >= 1) await unlock("rating_1");
        if (n >= 10) await unlock("rating_10");
        if (n >= 50) await unlock("rating_50");
        break;
      }

      case "avatar_set": {
        await unlock("avatar_set");
        break;
      }

      case "login": {
        await unlock("first_login");

        // Streak tracking
        const today = new Date().toISOString().split("T")[0];
        const { data: profil } = await supabase
          .from("profils")
          .select("last_seen, login_streak")
          .eq("id", userId)
          .single();

        if (profil) {
          const lastSeen = profil.last_seen;
          let streak = profil.login_streak || 0;

          if (lastSeen === today) {
            // Déjà vu aujourd'hui, rien à faire
          } else {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split("T")[0];

            if (lastSeen === yesterdayStr) {
              streak += 1;
            } else {
              streak = 1;
            }

            await supabase
              .from("profils")
              .update({ last_seen: today, login_streak: streak })
              .eq("id", userId);
          }

          if (streak >= 7) await unlock("streak_7");
          if (streak >= 30) await unlock("streak_30");
        }
        break;
      }

      case "plan_saved": {
        // Compter les semaines distinctes avec 3+ repas
        const { data: plans } = await supabase
          .from("meal_plans")
          .select("week_start")
          .eq("user_id", userId);

        if (plans) {
          const weekCounts = new Map<string, number>();
          for (const p of plans) {
            weekCounts.set(p.week_start, (weekCounts.get(p.week_start) || 0) + 1);
          }
          const completedWeeks = Array.from(weekCounts.values()).filter((c) => c >= 3).length;
          if (completedWeeks >= 1) await unlock("plan_1");
          if (completedWeeks >= 4) await unlock("plan_4");
          if (completedWeeks >= 12) await unlock("plan_12");
        }
        break;
      }

      case "like_received": {
        // Compter les likes reçus sur les commentaires de l'utilisateur
        const { data: userComments } = await supabase
          .from("recipe_comments")
          .select("id")
          .eq("user_id", userId);

        if (userComments && userComments.length > 0) {
          const commentIds = userComments.map((c) => c.id);
          const { count } = await supabase
            .from("comment_votes")
            .select("id", { count: "exact", head: true })
            .in("comment_id", commentIds)
            .eq("vote_type", "like");
          const n = count || 0;
          if (n >= 1) await unlock("likes_received_1");
          if (n >= 10) await unlock("likes_received_10");
          if (n >= 50) await unlock("likes_received_50");
        }
        break;
      }
    }

    return unlocked;
  } catch (err) {
    console.error("Achievement check error:", err);
    return [];
  }
}

/* ─── Récupérer les achievements non notifiés ─────────────── */

export async function getUnnotifiedAchievements() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("user_achievements")
    .select("id, achievement_code, unlocked_at")
    .eq("user_id", user.id)
    .eq("notified", false)
    .order("unlocked_at", { ascending: true });

  return data || [];
}

/* ─── Marquer comme notifié ───────────────────────────────── */

export async function markAchievementsNotified(ids: string[]) {
  if (ids.length === 0) return;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("user_achievements")
    .update({ notified: true })
    .in("id", ids)
    .eq("user_id", user.id);
}

/* ─── Récupérer tous les achievements d'un utilisateur ────── */

export async function getUserAchievements(userId: string) {
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("user_achievements")
    .select("achievement_code, unlocked_at")
    .eq("user_id", userId)
    .order("unlocked_at", { ascending: false });

  return data || [];
}
