"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getComments(recetteId: string) {
  const supabase = await createServerSupabase();

  const { data, error } = await supabase
    .from("recipe_comments")
    .select("*, profils:user_id(pseudo, avatar_url)")
    .eq("recette_id", recetteId)
    .eq("approved", true)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return data || [];
}

export async function createComment(
  recetteId: string,
  content: string,
  parentId: string | null = null,
  imageUrl: string | null = null,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  if (!content?.trim()) throw new Error("Le commentaire est vide");
  if (content.length > 2000) throw new Error("Maximum 2000 caractères");

  const { data, error } = await supabase
    .from("recipe_comments")
    .insert({
      user_id: user.id,
      recette_id: recetteId,
      content: content.trim(),
      parent_id: parentId,
      approved: false,
      image_url: imageUrl,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  // ── Notifications (non bloquantes) ──────────────────────
  // Notifie l'auteur de la recette (si approuvée/publiée) et
  // l'auteur du commentaire parent en cas de réponse.
  if (data?.id) {
    try {
      const { notifyNewComment } = await import(
        "@/app/actions/notifications"
      );
      await notifyNewComment(data.id);
    } catch (err) {
      console.error("[comments] notifyNewComment error:", err);
    }
  }

  revalidatePath(`/recettes/${recetteId}`);
  return data;
}

export async function updateComment(
  commentId: string,
  content: string,
  recetteId: string,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  const { error } = await supabase
    .from("recipe_comments")
    .update({ content: content.trim(), updated_at: new Date().toISOString() })
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/recettes/${recetteId}`);
  return { success: true };
}

export async function deleteComment(commentId: string, recetteId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  const { error } = await supabase
    .from("recipe_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath(`/recettes/${recetteId}`);
  return { success: true };
}

export async function voteComment(
  commentId: string,
  voteType: "like" | "dislike",
  recetteId: string,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Non autorisé");

  // Vérifier si l'utilisateur a déjà voté
  const { data: existing } = await supabase
    .from("comment_votes")
    .select("vote_type")
    .eq("user_id", user.id)
    .eq("comment_id", commentId)
    .single();

  let isNewLike = false;

  if (existing) {
    if (existing.vote_type === voteType) {
      // Supprimer le vote (toggle off)
      await supabase
        .from("comment_votes")
        .delete()
        .eq("user_id", user.id)
        .eq("comment_id", commentId);
    } else {
      // Mettre à jour le vote (passer de dislike à like compte comme nouveau like)
      await supabase
        .from("comment_votes")
        .update({ vote_type: voteType })
        .eq("user_id", user.id)
        .eq("comment_id", commentId);
      if (voteType === "like") isNewLike = true;
    }
  } else {
    // Ajouter un nouveau vote
    await supabase
      .from("comment_votes")
      .insert({ user_id: user.id, comment_id: commentId, vote_type: voteType });
    if (voteType === "like") isNewLike = true;
  }

  // ── Achievements + Notification (seulement si nouveau like) ──
  if (isNewLike) {
    const { data: commentData } = await supabase
      .from("recipe_comments")
      .select("user_id")
      .eq("id", commentId)
      .single();

    if (commentData) {
      // Achievement (trophée likes reçus)
      try {
        const { checkAndUnlockAchievements } = await import(
          "@/app/actions/achievements"
        );
        await checkAndUnlockAchievements(commentData.user_id, "like_received");
      } catch (err) {
        console.error("[comments] achievement check error:", err);
      }

      // Notification à l'auteur du commentaire
      try {
        const { notifyCommentLike } = await import(
          "@/app/actions/notifications"
        );
        await notifyCommentLike(commentId);
      } catch (err) {
        console.error("[comments] notifyCommentLike error:", err);
      }
    }
  }

  // Revalider toutes les pages recettes (slug inconnu ici)
  revalidatePath("/recettes", "layout");
  return { success: true };
}
