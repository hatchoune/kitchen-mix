"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Loader2,
  MessageSquare,
  Send,
  Reply,
  Pencil,
  Trash2,
  X,
  Check,
  Clock,
  ThumbsUp,
  ThumbsDown,
  ImagePlus,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  createComment,
  updateComment,
  deleteComment,
  voteComment,
} from "@/app/actions/comments";

import { useToast } from "@/components/ui/Toast";
/* ─── Types ───────────────────────────────────────────────── */

interface CommentData {
  id: string;
  user_id: string;
  recette_id: string;
  content: string;
  approved: boolean;
  parent_id: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  author_name: string;
  author_avatar: string | null;
}

interface VoteCounts {
  likes: number;
  dislikes: number;
}

/* ═══════════════════════════════════════════════════════════════ */

export default function RecetteComments({ recetteId }: { recetteId: string }) {
  const { user } = useAuth();
  const { toastSuccess, toastError, toastWarning } = useToast();
  const [supabase] = useState(() => createClient());

  const [comments, setComments] = useState<CommentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // Photo upload (new comment)
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  // Votes
  const [voteCounts, setVoteCounts] = useState<Record<string, VoteCounts>>({});
  const [userVotes, setUserVotes] = useState<
    Record<string, "like" | "dislike">
  >({});

  /* ─── Load comments ─────────────────────────────────────── */

  const loadComments = useCallback(async () => {
    try {
      const { data: rawComments, error } = await supabase
        .from("recipe_comments")
        .select("*")
        .eq("recette_id", recetteId)
        .order("created_at", { ascending: true });

      if (error || !rawComments) {
        setLoading(false);
        return;
      }

      const userIds = [...new Set(rawComments.map((c) => c.user_id))];
      const { data: profiles } = await supabase
        .from("profils")
        .select("id, pseudo, avatar_url")
        .in("id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [
          p.id,
          { pseudo: p.pseudo || "Utilisateur", avatar: p.avatar_url || null },
        ]),
      );

      setComments(
        rawComments.map((c) => ({
          ...c,
          image_url: c.image_url || null,
          author_name: profileMap.get(c.user_id)?.pseudo || "Utilisateur",
          author_avatar: profileMap.get(c.user_id)?.avatar || null,
        })),
      );

      // Load votes
      const commentIds = rawComments.map((c) => c.id);
      if (commentIds.length > 0) {
        const { data: votes } = await supabase
          .from("comment_votes")
          .select("comment_id, vote_type")
          .in("comment_id", commentIds);

        const counts: Record<string, VoteCounts> = {};
        for (const cid of commentIds) counts[cid] = { likes: 0, dislikes: 0 };
        for (const v of votes || []) {
          if (v.vote_type === "like") counts[v.comment_id].likes++;
          else counts[v.comment_id].dislikes++;
        }
        setVoteCounts(counts);

        if (user) {
          const { data: myVotes } = await supabase
            .from("comment_votes")
            .select("comment_id, vote_type")
            .eq("user_id", user.id)
            .in("comment_id", commentIds);

          const uv: Record<string, "like" | "dislike"> = {};
          for (const v of myVotes || [])
            uv[v.comment_id] = v.vote_type as "like" | "dislike";
          setUserVotes(uv);
        }
      }
    } catch (err) {
      console.error("Erreur chargement:", err);
    } finally {
      setLoading(false);
    }
  }, [recetteId, supabase, user]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  /* ─── Photo handling ────────────────────────────────────── */

  const pickPhoto = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toastWarning("Photo max 5 Mo");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toastWarning("Format accepté : JPEG, PNG ou WebP");
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile || !user) return null;
    const ext = photoFile.name.split(".").pop() || "jpg";
    const fileName = `${user.id}/${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("comment-images")
      .upload(fileName, photoFile, { contentType: photoFile.type });

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("comment-images").getPublicUrl(fileName);

    return publicUrl;
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (photoRef.current) photoRef.current.value = "";
  };

  /* ─── Vote ──────────────────────────────────────────────── */

  const handleVote = async (commentId: string, type: "like" | "dislike") => {
    if (!user) return;
    try {
      await voteComment(commentId, type, recetteId);
      await loadComments(); // Recharge tout pour mettre à jour les compteurs
    } catch (err: unknown) {
      console.error("Erreur vote:", err);
    }
  };

  /* ─── Submit ────────────────────────────────────────────── */

  const handleSubmit = async (parentId: string | null) => {
    const text = parentId ? replyContent : newContent;
    if (!text.trim() || !user) return;
    setIsSubmitting(true);
    try {
      let imageUrl: string | null = null;
      if (!parentId && photoFile) {
        imageUrl = await uploadPhoto();
        if (imageUrl === null && photoFile) {
          toastError("Erreur lors de l'upload de la photo.");
          setIsSubmitting(false);
          return;
        }
      }

      await createComment(recetteId, text, parentId, imageUrl);
      if (parentId) {
        setReplyContent("");
        setReplyToId(null);
      } else {
        setNewContent("");
        clearPhoto();
      }
      await loadComments();
    } catch (err: unknown) {
      toastError(
        "Erreur : " + (err instanceof Error ? err.message : "Erreur inconnue"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editContent.trim()) return;
    try {
      await updateComment(id, editContent, recetteId);
      setEditingId(null);
      setEditContent("");
      await loadComments();
    } catch (err: unknown) {
      toastError(
        "Erreur : " + (err instanceof Error ? err.message : "Erreur inconnue"),
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce commentaire ?")) return;
    try {
      await deleteComment(id, recetteId);
      await loadComments();
    } catch (err: unknown) {
      toastError(
        "Erreur : " + (err instanceof Error ? err.message : "Erreur inconnue"),
      );
    }
  };

  /* ─── Tree ──────────────────────────────────────────────── */

  const roots = comments.filter((c) => !c.parent_id);
  const getReplies = (pid: string) =>
    comments.filter((c) => c.parent_id === pid);
  const approvedCount = comments.filter((c) => c.approved).length;

  if (loading)
    return <Loader2 className="animate-spin mx-auto my-10 text-accent" />;

  return (
    <div className="mt-12 space-y-8">
      <h3 className="font-display font-bold text-2xl flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-accent" /> Commentaires (
        {approvedCount})
      </h3>

      {/* Formulaire nouveau commentaire */}
      {user ? (
        <div className="space-y-3">
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Partagez votre avis..."
            maxLength={2000}
            className="w-full bg-card border border-border rounded-xl p-4 text-sm focus:ring-2 ring-accent/20 outline-none min-h-[100px] resize-none"
          />

          {/* Photo upload */}
          <div className="flex items-center gap-3">
            {photoPreview ? (
              <div className="relative w-20 h-20">
                <Image
                  src={photoPreview}
                  alt="Aperçu"
                  fill
                  className="rounded-lg object-cover"
                />
                <button
                  onClick={clearPhoto}
                  className="absolute -top-2 -right-2 ..."
                >
                  ...
                </button>
              </div>
            ) : (
              <button
                onClick={() => photoRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground border border-dashed border-border hover:border-accent/30 hover:text-accent transition-colors"
              >
                <ImagePlus className="w-4 h-4" /> Ajouter une photo
              </button>
            )}
            <input
              ref={photoRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                e.target.files?.[0] && pickPhoto(e.target.files[0])
              }
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground italic">
              Soumis à modération.
            </p>
            <button
              onClick={() => handleSubmit(null)}
              disabled={isSubmitting || !newContent.trim()}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-accent text-black font-medium text-sm hover:bg-accent-hover disabled:opacity-40 transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}{" "}
              Publier
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card p-4 text-center text-sm text-muted-foreground">
          <Link href="/connexion" className="text-accent hover:underline">
            Connectez-vous
          </Link>{" "}
          pour commenter.
        </div>
      )}

      {roots.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          Aucun commentaire. Soyez le premier !
        </p>
      ) : (
        <div className="space-y-6">
          {roots.map((c) => (
            <CommentNode
              key={c.id}
              comment={c}
              replies={getReplies(c.id)}
              allComments={comments}
              uid={user?.id ?? null}
              voteCounts={voteCounts}
              userVotes={userVotes}
              onVote={handleVote}
              replyToId={replyToId}
              replyContent={replyContent}
              onSetReply={(id) => {
                setReplyToId(replyToId === id ? null : id);
                setReplyContent("");
                setEditingId(null);
              }}
              onReplyChange={setReplyContent}
              onSubmitReply={(id) => handleSubmit(id)}
              editingId={editingId}
              editContent={editContent}
              onStartEdit={(c) => {
                setEditingId(c.id);
                setEditContent(c.content);
                setReplyToId(null);
              }}
              onEditChange={setEditContent}
              onSaveEdit={handleUpdate}
              onCancelEdit={() => {
                setEditingId(null);
                setEditContent("");
              }}
              onDelete={handleDelete}
              submitting={isSubmitting}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ Comment Node ═══ */

function CommentNode({
  comment,
  replies,
  allComments,
  uid,
  voteCounts,
  userVotes,
  onVote,
  replyToId,
  replyContent,
  onSetReply,
  onReplyChange,
  onSubmitReply,
  editingId,
  editContent,
  onStartEdit,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
  onDelete,
  submitting,
  depth = 0,
}: {
  comment: CommentData;
  replies: CommentData[];
  allComments: CommentData[];
  uid: string | null;
  voteCounts: Record<string, VoteCounts>;
  userVotes: Record<string, "like" | "dislike">;
  onVote: (id: string, type: "like" | "dislike") => void;
  replyToId: string | null;
  replyContent: string;
  onSetReply: (id: string) => void;
  onReplyChange: (t: string) => void;
  onSubmitReply: (id: string) => void;
  editingId: string | null;
  editContent: string;
  onStartEdit: (c: CommentData) => void;
  onEditChange: (t: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  submitting: boolean;
  depth?: number;
}) {
  const isOwner = uid === comment.user_id;
  const isPending = !comment.approved;
  const isEditing = editingId === comment.id;
  const isReplying = replyToId === comment.id;
  const votes = voteCounts[comment.id] || { likes: 0, dislikes: 0 };
  const myVote = userVotes[comment.id];

  if (isPending && !isOwner) return null;

  // Lightbox state for photo
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div
      className={cn(
        depth > 0 && "ml-6 sm:ml-10 pl-4 border-l-2 border-accent/10",
      )}
    >
      <div
        className={cn(
          "group p-5 rounded-2xl border transition-all",
          isPending
            ? "border-dashed border-yellow-500/30 bg-yellow-500/5"
            : "glass-card border-border shadow-sm",
        )}
      >
        {/* Header : avatar + pseudo */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {comment.author_avatar ? (
              <Image
                src={comment.author_avatar}
                alt={comment.author_name}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-accent">
                  {comment.author_name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <Link
              href={`/profil/${comment.user_id}`}
              className="font-bold text-accent text-sm hover:underline"
            >
              {comment.author_name}
            </Link>
            {isPending && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500">
                <Clock className="w-3 h-3" /> En attente
              </span>
            )}
          </div>
          <span className="text-[10px] opacity-50">
            {new Date(comment.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Content or edit */}
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => onEditChange(e.target.value)}
              className="w-full bg-background border border-border p-3 rounded-lg text-sm resize-none min-h-[80px]"
            />
            <div className="flex gap-2">
              <button
                onClick={() => onSaveEdit(comment.id)}
                className="flex items-center gap-1 text-xs font-bold text-sage hover:underline"
              >
                <Check className="w-3 h-3" /> Sauvegarder
              </button>
              <button
                onClick={onCancelEdit}
                className="flex items-center gap-1 text-xs font-bold text-muted-foreground hover:underline"
              >
                <X className="w-3 h-3" /> Annuler
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {comment.content}
            </p>

            {/* Photo du commentaire */}
            {comment.image_url && (
              <>
                <button
                  onClick={() => setShowPhoto(true)}
                  className="mt-3 block relative w-[200px] h-[200px]"
                >
                  <Image
                    src={comment.image_url}
                    alt="Photo du plat"
                    fill
                    className="rounded-xl object-cover border border-border hover:opacity-90 ..."
                  />
                </button>
                {/* Lightbox */}
                {showPhoto && (
                  <div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 cursor-pointer"
                    onClick={() => setShowPhoto(false)}
                  >
                    <div className="relative max-w-[90vw] max-h-[85vh] w-full h-full">
                      <Image
                        src={comment.image_url}
                        alt="Photo du plat"
                        fill
                        className="rounded-2xl object-contain"
                      />
                    </div>
                    <button className="absolute top-6 right-6 text-white">
                      <X className="w-8 h-8" />
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Actions : votes + reply/edit/delete */}
        {!isEditing && (
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => uid && onVote(comment.id, "like")}
                disabled={!uid}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all",
                  myVote === "like"
                    ? "bg-sage/20 text-sage"
                    : "text-muted-foreground hover:text-sage hover:bg-sage/10",
                  !uid && "opacity-40 cursor-default",
                )}
              >
                <ThumbsUp
                  className="w-3.5 h-3.5"
                  fill={myVote === "like" ? "currentColor" : "none"}
                />
                {votes.likes > 0 && <span>{votes.likes}</span>}
              </button>
              <button
                onClick={() => uid && onVote(comment.id, "dislike")}
                disabled={!uid}
                className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all",
                  myVote === "dislike"
                    ? "bg-error/20 text-error"
                    : "text-muted-foreground hover:text-error hover:bg-error/10",
                  !uid && "opacity-40 cursor-default",
                )}
              >
                <ThumbsDown
                  className="w-3.5 h-3.5"
                  fill={myVote === "dislike" ? "currentColor" : "none"}
                />
                {votes.dislikes > 0 && <span>{votes.dislikes}</span>}
              </button>
            </div>
            {uid && (
              <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {depth < 2 && (
                  <button
                    onClick={() => onSetReply(comment.id)}
                    className="text-[10px] font-bold uppercase flex items-center gap-1 hover:text-accent"
                  >
                    <Reply className="w-3 h-3" /> Répondre
                  </button>
                )}
                {isOwner && (
                  <>
                    <button
                      onClick={() => onStartEdit(comment)}
                      className="text-[10px] font-bold uppercase flex items-center gap-1 hover:text-blue-500"
                    >
                      <Pencil className="w-3 h-3" /> Modifier
                    </button>
                    <button
                      onClick={() => onDelete(comment.id)}
                      className="text-[10px] font-bold uppercase flex items-center gap-1 hover:text-error"
                    >
                      <Trash2 className="w-3 h-3" /> Supprimer
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reply form */}
      {isReplying && (
        <div className="mt-3 ml-4 space-y-2">
          <textarea
            value={replyContent}
            onChange={(e) => onReplyChange(e.target.value)}
            placeholder={`Répondre à ${comment.author_name}...`}
            maxLength={2000}
            autoFocus
            className="w-full bg-card border border-border p-3 rounded-xl text-sm resize-none min-h-[80px]"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground italic">
              Soumis à modération.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onSetReply(comment.id)}
                className="text-xs text-muted-foreground hover:underline px-3 py-1.5"
              >
                Annuler
              </button>
              <button
                onClick={() => onSubmitReply(comment.id)}
                disabled={submitting || !replyContent.trim()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-accent text-black text-xs font-medium hover:bg-accent-hover disabled:opacity-40 transition-colors"
              >
                {submitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}{" "}
                Répondre
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recursive replies */}
      {replies.length > 0 && (
        <div className="mt-3 space-y-3">
          {replies.map((r) => (
            <CommentNode
              key={r.id}
              comment={r}
              replies={allComments.filter((c) => c.parent_id === r.id)}
              allComments={allComments}
              uid={uid}
              voteCounts={voteCounts}
              userVotes={userVotes}
              onVote={onVote}
              replyToId={replyToId}
              replyContent={replyContent}
              onSetReply={onSetReply}
              onReplyChange={onReplyChange}
              onSubmitReply={onSubmitReply}
              editingId={editingId}
              editContent={editContent}
              onStartEdit={onStartEdit}
              onEditChange={onEditChange}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onDelete={onDelete}
              submitting={submitting}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
