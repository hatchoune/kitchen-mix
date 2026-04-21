/* =============================================================
   Kitchen Mix — Notifications : constantes & helpers d'affichage
   -------------------------------------------------------------
   Pas de code serveur ici : uniquement des types UI et des
   fonctions pures utilisables côté client ou serveur.
   ============================================================= */

import type { NotificationEnriched, NotificationType } from "@/types";

/* ─── Labels courts par type ─────────────────────────────── */

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  comment_like: "a aimé votre commentaire",
  comment_reply: "a répondu à votre commentaire",
  recipe_comment: "a commenté votre recette",
  recipe_favorite: "a ajouté votre recette à ses favoris",
  recipe_rating: "a noté votre recette",
  planning_unsaved_reminder:
    "Pensez à sauvegarder votre planning en cours — il restera en mémoire mais la sauvegarde vous permettra de le retrouver partout.",
};

/* ─── Icône emoji associée au type ───────────────────────── */

export const NOTIFICATION_TYPE_ICONS: Record<NotificationType, string> = {
  comment_like: "👍",
  comment_reply: "💬",
  recipe_comment: "💬",
  recipe_favorite: "❤️",
  recipe_rating: "⭐",
  planning_unsaved_reminder: "💾",
};

/* ─── Tronquer un texte pour l'aperçu ───────────────────── */

export function truncatePreview(text: string, max = 80): string {
  const clean = text.trim().replace(/\s+/g, " ");
  if (clean.length <= max) return clean;
  return clean.slice(0, max).trimEnd() + "…";
}

/* ─── Résolution du contexte d'affichage ─────────────────── */

export interface NotificationDisplay {
  /** Pseudo de l'acteur, ou « Un utilisateur » en repli. */
  actorPseudo: string;
  /** Avatar de l'acteur (null si aucun). */
  actorAvatar: string | null;
  /** Verbe d'action humanisé ("a aimé votre commentaire", etc.). */
  actionLabel: string;
  /** Titre de la recette à afficher (live si possible, sinon metadata). */
  contextTitle: string | null;
  /** Aperçu du commentaire si pertinent. */
  commentPreview: string | null;
  /** Note attribuée (uniquement type recipe_rating). */
  rating: number | null;
  /** Lien cible ou null si l'entité a été supprimée. */
  href: string | null;
  /** True si le contenu lié (recette) a disparu. */
  isDeleted: boolean;
  /** True pour les notifications système (pas d'acteur utilisateur). */
  isSystem: boolean;
}

/**
 * Transforme une notification enrichie (avec jointures) en un objet
 * prêt pour l'UI. Gère proprement la suppression de la recette ou
 * du commentaire associé, ainsi que les notifications système
 * (actor_id NULL) comme les rappels de sauvegarde de planning.
 */
export function buildNotificationDisplay(
  n: NotificationEnriched,
): NotificationDisplay {
  const metadata = n.metadata ?? {};
  const isSystem = n.actor_id === null;

  const actorPseudo = isSystem
    ? "Kitchen Mix"
    : n.actor?.pseudo || "Un utilisateur";
  const actorAvatar = n.actor?.avatar_url ?? null;
  const actionLabel = NOTIFICATION_TYPE_LABELS[n.type];

  // Cas particulier : rappel système de sauvegarde de planning.
  // Pas de recette / commentaire associé — lien direct vers /planificateur.
  if (n.type === "planning_unsaved_reminder") {
    return {
      actorPseudo,
      actorAvatar,
      actionLabel,
      contextTitle: null,
      commentPreview: null,
      rating: null,
      href: "/planificateur",
      isDeleted: false,
      isSystem: true,
    };
  }

  // Recette : on privilégie la donnée vivante, sinon la métadonnée.
  const liveRecette = n.recette;
  const liveIsVisible =
    liveRecette != null && liveRecette.approuve && liveRecette.publie;
  const recetteSlug = liveRecette?.slug ?? metadata.recette_slug ?? null;
  const recetteTitre = liveRecette?.titre ?? metadata.recette_titre ?? null;

  // Si la recette n'existe plus OU n'est plus publique/approuvée,
  // on considère la cible supprimée pour l'utilisateur final.
  const isDeleted = !liveIsVisible;

  // Construction du lien :
  //   - recette présente + commentaire présent   → ancre sur le commentaire
  //   - recette présente + commentaire supprimé  → page recette seule
  //   - recette absente                          → pas de lien
  let href: string | null = null;
  if (!isDeleted && recetteSlug) {
    if (n.comment_id && n.comment) {
      href = `/recettes/${recetteSlug}#comment-${n.comment_id}`;
    } else {
      href = `/recettes/${recetteSlug}`;
    }
  }

  const commentPreview = n.comment?.content
    ? truncatePreview(n.comment.content, 120)
    : (metadata.comment_preview ?? null);

  const rating =
    n.type === "recipe_rating" && typeof metadata.rating === "number"
      ? metadata.rating
      : null;

  return {
    actorPseudo,
    actorAvatar,
    actionLabel,
    contextTitle: recetteTitre,
    commentPreview,
    rating,
    href,
    isDeleted,
    isSystem,
  };
}

/* ─── Format relatif de date ─────────────────────────────── */

export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(0, Math.floor((now - then) / 1000));

  if (diffSec < 60) return "à l'instant";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  const diffJ = Math.floor(diffH / 24);
  if (diffJ < 7) return `il y a ${diffJ} j`;
  const diffSem = Math.floor(diffJ / 7);
  if (diffSem < 5) return `il y a ${diffSem} sem.`;
  const diffMo = Math.floor(diffJ / 30);
  if (diffMo < 12) return `il y a ${diffMo} mois`;
  const diffAn = Math.floor(diffJ / 365);
  return `il y a ${diffAn} an${diffAn > 1 ? "s" : ""}`;
}
