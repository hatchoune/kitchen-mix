"use server";

import {
  createAdminSupabase,
  createServerSupabase,
} from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { truncatePreview } from "@/lib/notifications";
import type {
  NotificationEnriched,
  NotificationMetadata,
  NotificationType,
} from "@/types";

/* =============================================================
   Kitchen Mix — Actions : Notifications
   -------------------------------------------------------------
   - Les notifications sont CRÉÉES via le service_role (admin)
     car l'acteur (auth.uid()) est différent du destinataire.
   - Les LECTURES / MARQUAGES passent par le client utilisateur
     et sont filtrées par RLS (user_id = auth.uid()).
   ============================================================= */

// ─── Helper interne (non exporté) ───────────────────────────

interface InsertParams {
  recipientId: string;
  actorId: string;
  type: NotificationType;
  recetteId?: string | null;
  commentId?: string | null;
  metadata?: NotificationMetadata;
}

async function insertNotification(params: InsertParams): Promise<void> {
  // Jamais de notification à soi-même.
  if (params.recipientId === params.actorId) return;

  const admin = createAdminSupabase();
  const { error } = await admin.from("notifications").insert({
    user_id: params.recipientId,
    actor_id: params.actorId,
    type: params.type,
    recette_id: params.recetteId ?? null,
    comment_id: params.commentId ?? null,
    metadata: params.metadata ?? null,
  });

  if (error) {
    console.error("[notifications] insert error:", error.message);
  }
}

// ─── Déclencheurs (appelés depuis les autres server actions) ─

/** Notifie l'auteur d'un commentaire qu'il a reçu un like. */
export async function notifyCommentLike(commentId: string): Promise<void> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const admin = createAdminSupabase();
    const { data: comment } = await admin
      .from("recipe_comments")
      .select(
        "user_id, recette_id, content, recettes:recette_id(titre, slug)",
      )
      .eq("id", commentId)
      .single();

    if (!comment || !comment.user_id) return;
    if (comment.user_id === user.id) return;

    const recette = comment.recettes as
      | { titre: string | null; slug: string | null }
      | null
      | { titre: string | null; slug: string | null }[];
    const recetteData = Array.isArray(recette) ? recette[0] : recette;

    await insertNotification({
      recipientId: comment.user_id,
      actorId: user.id,
      type: "comment_like",
      recetteId: comment.recette_id,
      commentId,
      metadata: {
        comment_preview: truncatePreview(comment.content ?? "", 80),
        recette_titre: recetteData?.titre ?? null,
        recette_slug: recetteData?.slug ?? null,
      },
    });
  } catch (err) {
    console.error("[notifications] notifyCommentLike error:", err);
  }
}

/**
 * Notifications liées à un nouveau commentaire :
 *   - L'auteur de la recette (si recette approuvée & publiée) → recipe_comment
 *   - L'auteur du commentaire parent (si réponse)             → comment_reply
 *
 * Les deux notifications sont envoyées indépendamment : si la même
 * personne est à la fois auteur de la recette et du commentaire
 * parent, elle reçoit 2 notifications (comme demandé).
 */
export async function notifyNewComment(commentId: string): Promise<void> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const admin = createAdminSupabase();
    const { data: newComment } = await admin
      .from("recipe_comments")
      .select(
        "user_id, recette_id, content, parent_id, recettes:recette_id(titre, slug, auteur_id, approuve, publie)",
      )
      .eq("id", commentId)
      .single();

    if (!newComment) return;

    const recette = newComment.recettes as
      | {
          titre: string | null;
          slug: string | null;
          auteur_id: string | null;
          approuve: boolean | null;
          publie: boolean | null;
        }
      | {
          titre: string | null;
          slug: string | null;
          auteur_id: string | null;
          approuve: boolean | null;
          publie: boolean | null;
        }[]
      | null;
    const recetteData = Array.isArray(recette) ? recette[0] : recette;

    const preview = truncatePreview(newComment.content ?? "", 80);
    const baseMetadata: NotificationMetadata = {
      comment_preview: preview,
      recette_titre: recetteData?.titre ?? null,
      recette_slug: recetteData?.slug ?? null,
    };

    // 1) Notif à l'auteur de la recette (si approuvée ET publique)
    if (
      recetteData?.auteur_id &&
      recetteData.auteur_id !== user.id &&
      recetteData.approuve &&
      recetteData.publie
    ) {
      await insertNotification({
        recipientId: recetteData.auteur_id,
        actorId: user.id,
        type: "recipe_comment",
        recetteId: newComment.recette_id,
        commentId,
        metadata: baseMetadata,
      });
    }

    // 2) Notif à l'auteur du commentaire parent (si réponse)
    if (newComment.parent_id) {
      const { data: parent } = await admin
        .from("recipe_comments")
        .select("user_id")
        .eq("id", newComment.parent_id)
        .single();

      if (parent?.user_id && parent.user_id !== user.id) {
        await insertNotification({
          recipientId: parent.user_id,
          actorId: user.id,
          type: "comment_reply",
          recetteId: newComment.recette_id,
          commentId,
          metadata: baseMetadata,
        });
      }
    }
  } catch (err) {
    console.error("[notifications] notifyNewComment error:", err);
  }
}

/** Notifie l'auteur d'une recette qu'elle a été mise en favori. */
export async function notifyRecipeFavorite(recetteId: string): Promise<void> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const admin = createAdminSupabase();
    const { data: recette } = await admin
      .from("recettes")
      .select("auteur_id, titre, slug, approuve, publie")
      .eq("id", recetteId)
      .single();

    if (!recette || !recette.auteur_id) return;
    if (!recette.approuve || !recette.publie) return;
    if (recette.auteur_id === user.id) return;

    await insertNotification({
      recipientId: recette.auteur_id,
      actorId: user.id,
      type: "recipe_favorite",
      recetteId,
      metadata: {
        recette_titre: recette.titre,
        recette_slug: recette.slug,
      },
    });
  } catch (err) {
    console.error("[notifications] notifyRecipeFavorite error:", err);
  }
}

/** Notifie l'auteur d'une recette qu'elle vient d'être notée. */
export async function notifyRecipeRating(
  recetteId: string,
  rating: number,
): Promise<void> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const admin = createAdminSupabase();
    const { data: recette } = await admin
      .from("recettes")
      .select("auteur_id, titre, slug, approuve, publie")
      .eq("id", recetteId)
      .single();

    if (!recette || !recette.auteur_id) return;
    if (!recette.approuve || !recette.publie) return;
    if (recette.auteur_id === user.id) return;

    await insertNotification({
      recipientId: recette.auteur_id,
      actorId: user.id,
      type: "recipe_rating",
      recetteId,
      metadata: {
        rating,
        recette_titre: recette.titre,
        recette_slug: recette.slug,
      },
    });
  } catch (err) {
    console.error("[notifications] notifyRecipeRating error:", err);
  }
}

// ─── Lecture (utilisateur connecté) ─────────────────────────

const ENRICHED_SELECT = `
  id, user_id, actor_id, type, recette_id, comment_id, metadata, read_at, created_at,
  actor:profils!notifications_actor_id_fkey(pseudo, avatar_url),
  recette:recettes!notifications_recette_id_fkey(slug, titre, approuve, publie),
  comment:recipe_comments!notifications_comment_id_fkey(content, parent_id)
`;

/** Compteur non-lues (utilisé par le badge de la cloche). */
export async function getUnreadNotificationsCount(): Promise<number> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count } = await supabase
      .from("notifications")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .is("read_at", null);

    return count ?? 0;
  } catch (err) {
    console.error("[notifications] getUnreadNotificationsCount error:", err);
    return 0;
  }
}

/** Les N dernières notifications (utilisées par le dropdown). */
export async function getRecentNotifications(
  limit = 10,
): Promise<NotificationEnriched[]> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("notifications")
      .select(ENRICHED_SELECT)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("[notifications] getRecent error:", error.message);
      return [];
    }

    return (data ?? []) as unknown as NotificationEnriched[];
  } catch (err) {
    console.error("[notifications] getRecentNotifications error:", err);
    return [];
  }
}

/** Page complète paginée (utilisée par la page /notifications). */
export async function getAllNotifications(
  page = 1,
  pageSize = 20,
): Promise<{
  data: NotificationEnriched[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const empty = { data: [], count: 0, page, pageSize, totalPages: 0 };
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return empty;

    const safePage = Math.max(1, Math.floor(page));
    const safeSize = Math.min(50, Math.max(1, Math.floor(pageSize)));
    const from = (safePage - 1) * safeSize;
    const to = from + safeSize - 1;

    const { data, count, error } = await supabase
      .from("notifications")
      .select(ENRICHED_SELECT, { count: "exact" })
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("[notifications] getAll error:", error.message);
      return empty;
    }

    const total = count ?? 0;
    return {
      data: (data ?? []) as unknown as NotificationEnriched[],
      count: total,
      page: safePage,
      pageSize: safeSize,
      totalPages: Math.max(1, Math.ceil(total / safeSize)),
    };
  } catch (err) {
    console.error("[notifications] getAllNotifications error:", err);
    return empty;
  }
}

// ─── Marquage lu ────────────────────────────────────────────

/** Marque une seule notification comme lue. */
export async function markNotificationRead(
  id: string,
): Promise<{ success: boolean }> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false };

    await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", user.id)
      .is("read_at", null);

    revalidatePath("/notifications");
    return { success: true };
  } catch (err) {
    console.error("[notifications] markNotificationRead error:", err);
    return { success: false };
  }
}

/** Marque plusieurs notifications comme lues (batch). */
export async function markNotificationsRead(
  ids: string[],
): Promise<{ success: boolean }> {
  if (!ids || ids.length === 0) return { success: true };
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false };

    await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .in("id", ids)
      .eq("user_id", user.id)
      .is("read_at", null);

    revalidatePath("/notifications");
    return { success: true };
  } catch (err) {
    console.error("[notifications] markNotificationsRead error:", err);
    return { success: false };
  }
}

/** Marque TOUTES les notifications non lues de l'utilisateur comme lues. */
export async function markAllNotificationsRead(): Promise<{
  success: boolean;
}> {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { success: false };

    await supabase
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .is("read_at", null);

    revalidatePath("/notifications");
    return { success: true };
  } catch (err) {
    console.error("[notifications] markAllNotificationsRead error:", err);
    return { success: false };
  }
}
