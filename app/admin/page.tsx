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
  AlertTriangle,
  Search,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Recette, RecipeComment } from "@/types";
import { formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import {
  approveRecette,
  rejectRecette,
  approveComment,
  deleteComment,
  deleteRecette,
  getAdminPendingComments,
  getAdminAllComments,
  getAdminPendingRecettes,
  getAdminAllRecettes,
} from "@/app/actions/admin";
import {
  banUser,
  unbanUser,
  getBannedUsers,
  getUsers,
} from "@/app/actions/users";
import { UserX, Users, Ban, Undo2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

export default function AdminPage() {
  const { user, loading: authLoading, isAdmin: authIsAdmin } = useAuth();
  const router = useRouter();
  const { toastSuccess, toastError } = useToast();

  const [recettesEnAttente, setRecettesEnAttente] = useState<Recette[]>([]);
  const [allRecettes, setAllRecettes] = useState<Recette[]>([]);
  const [pendingComments, setPendingComments] = useState<RecipeComment[]>([]);
  const [allComments, setAllComments] = useState<RecipeComment[]>([]);
  const [tab, setTab] = useState<
    | "recettes"
    | "all_recettes"
    | "pending_comments"
    | "all_comments"
    | "users"
    | "banned"
  >("recettes");
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);
  const [users, setUsers] = useState<
    { id: string; pseudo: string | null; email: string; created_at: string }[]
  >([]);
  const [bannedUsers, setBannedUsers] = useState<
    { id: string; email: string; reason: string | null; banned_at: string }[]
  >([]);
  // Erreurs visibles dans l'UI pour le debug
  const [loadErrors, setLoadErrors] = useState<string[]>([]);

  const loadData = useCallback(async () => {
    setLoadingData(true);
    const errors: string[] = [];

    const safeFetch = async <T,>(
      fetcher: () => Promise<T>,
      label: string,
    ): Promise<T | null> => {
      try {
        return await fetcher();
      } catch (err: any) {
        const msg = `${label}: ${err?.message || "Erreur inconnue"}`;
        console.error("❌ Admin loadData error", msg, err);
        errors.push(msg);
        return null;
      }
    };

    const pendingRecData = (await safeFetch(
      () => getAdminPendingRecettes(),
      "Recettes en attente",
    )) as Recette[] | null;
    const allRecData = (await safeFetch(
      () => getAdminAllRecettes(),
      "Toutes les recettes",
    )) as Recette[] | null;
    const pendingComData = (await safeFetch(
      () => getAdminPendingComments(),
      "Commentaires en attente",
    )) as RecipeComment[] | null;
    const allComData = (await safeFetch(
      () => getAdminAllComments(),
      "Historique commentaires",
    )) as RecipeComment[] | null;
    const usersData = await safeFetch(
      () => getUsers(5000),
      "Liste des utilisateurs",
    );
    const bannedData = await safeFetch(
      () => getBannedUsers(),
      "Utilisateurs bannis",
    );

    setRecettesEnAttente(pendingRecData || []);
    setAllRecettes(allRecData || []);
    setPendingComments(pendingComData || []);
    setAllComments(allComData || []);
    setUsers((usersData as any[]) || []);
    setBannedUsers((bannedData as any[]) || []);
    setLoadErrors(errors);
    setLoadingData(false);

    if (errors.length > 0) {
      console.warn("⚠️ Certains chargements admin ont échoué :", errors);
    }
  }, []);

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
      toastError(message);
    }
  };
  const handleBan = async (userId: string, pseudo: string | null) => {
    const reason = prompt(
      `Bannir ${pseudo || "cet utilisateur"} ?\n\nRaison du bannissement :`,
    );
    if (reason === null) return;
    try {
      const result = await banUser(
        userId,
        reason || "Comportement inapproprié",
      );
      toastSuccess(`${result.email} a été banni et supprimé.`);
      await loadData();
    } catch (err: unknown) {
      toastError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  const handleUnban = async (email: string) => {
    if (!confirm(`Débannir ${email} ?`)) return;
    try {
      await unbanUser(email);
      toastSuccess(`${email} a été débanni.`);
      await loadData();
    } catch (err: unknown) {
      toastError(err instanceof Error ? err.message : "Erreur inconnue");
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

      {/* ── Erreurs de chargement (visibles pour l'admin) ── */}
      {loadErrors.length > 0 && (
        <div className="bg-error/10 border border-error/30 rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-error font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            Erreurs de chargement :
          </div>
          {loadErrors.map((err, i) => (
            <p key={i} className="text-xs text-error/80 ml-6">
              • {err}
            </p>
          ))}
        </div>
      )}

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
            { key: "users", label: `Utilisateurs (${users.length})` },
            { key: "banned", label: `Bannis (${bannedUsers.length})` },
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
        <div className="space-y-4">
          {/* Champ de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name="admin-recipe-search"
              placeholder="Rechercher une recette par titre ou slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Liste des recettes filtrées */}
          <div className="grid gap-3">
            {(() => {
              const recettesFiltrees = (allRecettes || []).filter(
                (r) =>
                  r.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  r.slug?.toLowerCase().includes(searchTerm.toLowerCase()),
              );
              if (recettesFiltrees.length === 0) {
                return (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune recette trouvée.
                  </p>
                );
              }
              return recettesFiltrees.map((r) => (
                <div
                  key={r.id}
                  className="glass-card p-3 flex items-center gap-3 opacity-80 hover:opacity-100"
                >
                  <Link
                    href={r.approuve ? `/recettes/${r.slug}` : "#"}
                    className="shrink-0"
                  >
                    {r.image_url ? (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden">
                        <Image
                          src={r.image_url}
                          alt={r.titre}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-sm">
                        🍽️
                      </div>
                    )}
                  </Link>

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
                    <Link
                      href={r.approuve ? `/recettes/${r.slug}` : "#"}
                      className={cn(
                        "block truncate font-medium",
                        r.approuve && "hover:text-accent",
                      )}
                    >
                      {r.titre}
                    </Link>
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
              ));
            })()}
          </div>
        </div>
      )}

      {/* ── Commentaires en attente ── */}
      {tab === "all_recettes" && (
        <div className="space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              name="admin-recipe-search"
              placeholder="Rechercher une recette par titre ou slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm"
            />
          </div>

          {/* Liste filtrée */}
          <div className="grid gap-3">
            {(() => {
              const recettesFiltrees = (allRecettes || []).filter(
                (r) =>
                  r.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  r.slug?.toLowerCase().includes(searchTerm.toLowerCase()),
              );
              if (recettesFiltrees.length === 0) {
                return (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune recette trouvée.
                  </p>
                );
              }
              return recettesFiltrees.map((r) => (
                <div
                  key={r.id}
                  className="glass-card p-3 flex items-center gap-3 opacity-80 hover:opacity-100"
                >
                  {/* Miniature */}
                  <Link
                    href={r.approuve ? `/recettes/${r.slug}` : "#"}
                    className="shrink-0"
                  >
                    {r.image_url ? (
                      <div className="relative w-14 h-10 rounded-lg overflow-hidden">
                        <Image
                          src={r.image_url}
                          alt={r.titre}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-sm">
                        🍽️
                      </div>
                    )}
                  </Link>

                  {/* Titre et statut */}
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
                    <Link
                      href={r.approuve ? `/recettes/${r.slug}` : "#"}
                      className={cn(
                        "block truncate font-medium",
                        r.approuve && "hover:text-accent",
                      )}
                    >
                      {r.titre}
                    </Link>
                  </div>

                  {/* Actions */}
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
              ));
            })()}
          </div>
        </div>
      )}

      {/* ── Historique commentaires ── */}
      {tab === "all_comments" && (
        <div className="grid gap-3">
          {allComments.map((c) => {
            const profil = (c as any).profils as {
              pseudo: string | null;
              avatar_url: string | null;
            } | null;
            const recette = (c as any).recettes as {
              slug: string;
              titre: string;
            } | null;
            return (
              <div
                key={c.id}
                className="glass-card p-3 flex items-center gap-3 opacity-80 hover:opacity-100 overflow-hidden"
              >
                <Link href={`/profil/${c.user_id}`} className="shrink-0">
                  {profil?.avatar_url ? (
                    <Image
                      src={profil.avatar_url}
                      alt={profil.pseudo || ""}
                      width={28}
                      height={28}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">
                      {(profil?.pseudo || "?").charAt(0).toUpperCase()}
                    </div>
                  )}
                </Link>

                <div className="text-sm min-w-0 flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full shrink-0",
                        c.approved
                          ? "bg-sage/20 text-sage"
                          : "bg-yellow-500/20 text-yellow-500",
                      )}
                    >
                      {c.approved ? "En ligne" : "En attente"}
                    </span>
                    <Link
                      href={`/profil/${c.user_id}`}
                      className="text-accent text-xs font-bold hover:underline shrink-0"
                    >
                      {profil?.pseudo || "Utilisateur"}
                    </Link>
                    {recette && (
                      <Link
                        href={`/recettes/${recette.slug}`}
                        className="text-[10px] text-muted-foreground hover:text-accent truncate"
                      >
                        sur {recette.titre}
                      </Link>
                    )}
                  </div>
                  <span className="block truncate mt-0.5">{c.content}</span>
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
            );
          })}
        </div>
      )}

      {/* ── Utilisateurs ── */}
      {tab === "users" && (
        <div className="grid gap-3">
          {users.length === 0 ? (
            <EmptyState msg="Aucun utilisateur" />
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/profil/${u.id}`}
                    className="text-sm font-bold truncate hover:text-accent hover:underline transition-colors"
                  >
                    {u.pseudo || "Sans pseudo"}
                  </Link>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Inscrit le{" "}
                    {new Date(u.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleBan(u.id, u.pseudo)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-error bg-error/10 border border-error/20 hover:bg-error/20 transition-colors shrink-0 ml-3"
                >
                  <UserX className="w-3.5 h-3.5" />
                  Bannir
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Utilisateurs bannis ── */}
      {tab === "banned" && (
        <div className="grid gap-3">
          {bannedUsers.length === 0 ? (
            <EmptyState msg="Aucun utilisateur banni" />
          ) : (
            bannedUsers.map((b) => (
              <div
                key={b.id}
                className="glass-card p-4 flex items-center justify-between border-l-4 border-error"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-error">{b.email}</p>
                  {b.reason && (
                    <p className="text-xs text-muted-foreground italic mt-0.5">
                      Raison : {b.reason}
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    Banni le{" "}
                    {new Date(b.banned_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleUnban(b.email)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-sage bg-sage/10 border border-sage/20 hover:bg-sage/20 transition-colors shrink-0 ml-3"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  Débannir
                </button>
              </div>
            ))
          )}
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
