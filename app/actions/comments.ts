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

  if (existing) {
    if (existing.vote_type === voteType) {
      // Supprimer le vote
      await supabase
        .from("comment_votes")
        .delete()
        .eq("user_id", user.id)
        .eq("comment_id", commentId);
    } else {
      // Mettre à jour le vote
      await supabase
        .from("comment_votes")
        .update({ vote_type: voteType })
        .eq("user_id", user.id)
        .eq("comment_id", commentId);
    }
  } else {
    // Ajouter un nouveau vote
    await supabase
      .from("comment_votes")
      .insert({ user_id: user.id, comment_id: commentId, vote_type: voteType });
  }

  // Achievements — vérifier si l'auteur du commentaire a reçu des likes
  if (voteType === "like") {
    const { data: commentData } = await supabase
      .from("recipe_comments")
      .select("user_id")
      .eq("id", commentId)
      .single();
    if (commentData) {
      const { checkAndUnlockAchievements } =
        await import("@/app/actions/achievements");
      await checkAndUnlockAchievements(commentData.user_id, "like_received");
    }
  }

  // Revalider toutes les pages recettes (slug inconnu ici)
  revalidatePath("/recettes", "layout");
  return { success: true };
}
