/* =============================================================
   Kitchen Mix — Pending Recipe
   -------------------------------------------------------------
   Pont mémoire pour "Ajouter au planning" depuis une page recette.
   Stocke temporairement (sessionStorage, TTL 30 min) la recette
   que l'utilisateur souhaite placer dans son planning, le temps
   qu'il sélectionne le jour / créneau cible dans le planificateur.

   Pourquoi sessionStorage :
   - Se purge automatiquement à la fermeture de l'onglet
   - Pas d'effet fantôme entre sessions différentes
   - Sécurité : données sensibles de navigation non persistées

   Note : les helpers de rappel de sauvegarde (getSaveReminderCount,
   canShowSaveBellNotif, incrementSaveReminderCount) ont été retirés
   suite à la refonte auto-save du planificateur. L'enregistrement
   d'un planning est désormais proposé directement au premier ajout
   de recette, plus besoin de rappels.
   ============================================================= */

const PENDING_RECIPE_KEY = "kmx-pending-recipe";
const TTL_MS = 30 * 60 * 1000; // 30 minutes

export interface PendingRecipe {
  id: string;
  slug: string;
  titre: string;
  image_url: string | null;
  timestamp: number;
}

/** Enregistre une recette en attente de placement. */
export function setPendingRecipe(
  recipe: Omit<PendingRecipe, "timestamp">,
): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PendingRecipe = { ...recipe, timestamp: Date.now() };
    sessionStorage.setItem(PENDING_RECIPE_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage indispo, quota plein, ou mode privé : on ignore
  }
}

/** Lit la recette en attente, ou null si expirée / absente. */
export function getPendingRecipe(): PendingRecipe | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PENDING_RECIPE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingRecipe;
    if (!parsed.id || !parsed.timestamp) {
      clearPendingRecipe();
      return null;
    }
    if (Date.now() - parsed.timestamp > TTL_MS) {
      clearPendingRecipe();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/** Efface la recette en attente (après placement ou annulation). */
export function clearPendingRecipe(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(PENDING_RECIPE_KEY);
  } catch {
    // ignore
  }
}
