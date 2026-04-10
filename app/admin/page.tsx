"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Shield,
  Check,
  X,
  MessageSquare,
  History,
  Loader2,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import type { Recette, RecipeComment } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import {
  approveRecette,
  rejectRecette,
  approveComment,
  deleteComment,
  deleteRecette,
} from "@/app/actions/admin";

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin: authIsAdmin } = useAuth();
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [recettesEnAttente, setRecettesEnAttente] = useState<Recette[]>([]);
  const [allRecettes, setAllRecettes] = useState<Recette[]>([]);
  const [pendingComments, setPendingComments] = useState<RecipeComment[]>([]);
  const [allComments, setAllComments] = useState<RecipeComment[]>([]);
  const [tab, setTab] = useState<
    "recettes" | "all_recettes" | "pending_comments" | "all_comments"
  >("recettes");
  const [loadingData, setLoadingData] = useState(true);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [pendingRecRes, allRecRes, pendingComRes, allComRes] =
        await Promise.all([
          supabase
            .from("recettes")
            .select("*")
            .eq("approuve", false)
            .is("raison_rejet", null)
            .order("created_at", { ascending: true }),
          supabase
            .from("recettes")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100),
          supabase
            .from("recipe_comments")
            .select("*")
            .eq("approved", false)
            .order("created_at", { ascending: true }),
          supabase
            .from("recipe_comments")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(100),
        ]);
      setRecettesEnAttente((pendingRecRes.data || []) as Recette[]);
      setAllRecettes((allRecRes.data || []) as Recette[]);
      setPendingComments((pendingComRes.data || []) as RecipeComment[]);
      setAllComments((allComRes.data || []) as RecipeComment[]);
    } catch (error) {
      console.error("Erreur chargement admin:", error);
    } finally {
      setLoadingData(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (!authLoading) {
      if (!user || !authIsAdmin) router.push("/");
      else loadData();
    }
  }, [user, authLoading, authIsAdmin, router, loadData]);

  const handleAction = async (action: string, id: string, raison?: string) => {
    try {
      switch (action) {
        case "approve_recette":
          await approveRecette(id);
          break;
        case "reject_recette":
          if (!raison) throw new Error("Raison requise");
          await rejectRecette(id, raison);
          break;
        case "approve_comment":
          await approveComment(id);
          break;
        case "delete_comment":
          await deleteComment(id);
          break;
        case "delete_recette":
          await deleteRecette(id);
          break;
        default:
          throw new Error("Action inconnue");
      }
      await loadData();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      alert("Erreur: " + message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-accent" />
        <h1 className="font-display font-bold text-3xl italic">
          Administration Kitchen Mix
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {(
          [
            {
              key: "recettes",
              label: `À modérer (${recettesEnAttente.length})`,
            },
            {
              key: "all_recettes",
              label: `Toutes les recettes (${allRecettes.length})`,
            },
            {
              key: "pending_comments",
              label: `Commentaires (${pendingComments.length})`,
            },
            { key: "all_comments", label: "Historique commentaires" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              tab === t.key ? "bg-accent text-black" : "hover:bg-card-hover",
            )}
          >
            {t.key === "all_comments" && (
              <History className="w-4 h-4 inline mr-2" />
            )}
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Recettes en attente ── */}
      {tab === "recettes" && (
        <div className="grid gap-4">
          {recettesEnAttente.length === 0 ? (
            <EmptyState msg="Aucune recette en attente" />
          ) : (
            recettesEnAttente.map((r) => (
              <div
                key={r.id}
                className="glass-card p-5 flex justify-between items-center border-l-4 border-accent"
              >
                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">{r.titre}</h3>
                  <p className="text-sm text-muted-foreground italic line-clamp-1">
                    {r.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDate(r.created_at)}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <button
                    onClick={() => handleAction("approve_recette", r.id)}
                    className="p-3 bg-sage/20 text-sage rounded-xl hover:scale-105 transition-transform"
                    title="Approuver"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      const rz = prompt("Pourquoi refuser ?");
                      if (rz) handleAction("reject_recette", r.id, rz);
                    }}
                    className="p-3 bg-error/20 text-error rounded-xl hover:scale-105 transition-transform"
                    title="Refuser"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <Link
                    href={`/admin/editer/${r.id}`}
                    className="p-3 bg-accent/20 text-accent rounded-xl hover:scale-105 transition-transform"
                    title="Modifier"
                  >
                    <Pencil className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Toutes les recettes (avec édition) ── */}
      {tab === "all_recettes" && (
        <div className="grid gap-3">
          {allRecettes.map((r) => (
            <div
              key={r.id}
              className="glass-card p-4 flex justify-between items-center opacity-80 hover:opacity-100"
            >
              <div className="text-sm min-w-0 flex-1 overflow-hidden">
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full mr-2",
                    r.approuve
                      ? "bg-sage/20 text-sage"
                      : r.raison_rejet
                        ? "bg-error/20 text-error"
                        : "bg-yellow-500/20 text-yellow-500",
                  )}
                >
                  {r.approuve
                    ? "En ligne"
                    : r.raison_rejet
                      ? "Refusée"
                      : "En attente"}
                </span>
                <span className="block truncate">{r.titre}</span>
              </div>
              <div className="flex gap-2 items-center shrink-0 ml-3">
                {!r.approuve && !r.raison_rejet && (
                  <button
                    onClick={() => handleAction("approve_recette", r.id)}
                    className="text-sage text-xs hover:underline p-2"
                  >
                    Approuver
                  </button>
                )}
                <Link
                  href={`/admin/editer/${r.id}`}
                  className="flex items-center gap-1 text-accent text-xs hover:underline p-2"
                >
                  <Pencil className="w-3 h-3" /> Modifier
                </Link>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        `Supprimer "${r.titre}" ? Cette action est irréversible.`,
                      )
                    ) {
                      handleAction("delete_recette", r.id);
                    }
                  }}
                  className="text-error text-xs hover:underline p-2"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Commentaires en attente ── */}
      {tab === "pending_comments" && (
        <div className="grid gap-4">
          {pendingComments.length === 0 ? (
            <EmptyState msg="Tout est modéré ! Beau travail." />
          ) : (
            pendingComments.map((c) => (
              <div
                key={c.id}
                className="glass-card p-5 flex justify-between items-center border-l-4 border-yellow-500"
              >
                <div className="max-w-xl">
                  <p className="text-sm font-medium text-accent">
                    Nouveau commentaire :
                  </p>
                  <p className="mt-1 italic">&quot;{c.content}&quot;</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(c.created_at)}
                    {c.parent_id && (
                      <span className="ml-2 text-accent">(réponse)</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAction("approve_comment", c.id)}
                    className="p-3 bg-sage/20 text-sage rounded-xl hover:scale-105 transition-transform"
                  >
                    <Check />
                  </button>
                  <button
                    onClick={() => handleAction("delete_comment", c.id)}
                    className="p-3 bg-error/20 text-error rounded-xl hover:scale-105 transition-transform"
                  >
                    <X />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Historique commentaires ── */}
      {tab === "all_comments" && (
        <div className="grid gap-3">
          {allComments.map((c) => (
            <div
              key={c.id}
              className="glass-card p-4 flex items-center gap-4 opacity-80 hover:opacity-100 overflow-hidden"
            >
              <div className="text-sm min-w-0 flex-1 overflow-hidden">
                <span
                  className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full mr-2",
                    c.approved
                      ? "bg-sage/20 text-sage"
                      : "bg-yellow-500/20 text-yellow-500",
                  )}
                >
                  {c.approved ? "En ligne" : "En attente"}
                </span>
                <span className="block truncate">{c.content}</span>
              </div>
              <div className="flex gap-2 items-center shrink-0">
                {!c.approved && (
                  <button
                    onClick={() => handleAction("approve_comment", c.id)}
                    className="text-sage text-xs hover:underline p-2"
                  >
                    Approuver
                  </button>
                )}
                <button
                  onClick={() => handleAction("delete_comment", c.id)}
                  className="text-error text-xs hover:underline p-2"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ msg }: { msg: string }) {
  return (
    <div className="text-center py-16 bg-card/30 rounded-3xl border-2 border-dashed border-border">
      <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
      <p className="text-muted-foreground">{msg}</p>
    </div>
  );
}
