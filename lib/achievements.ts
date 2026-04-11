/* =============================================================
   Kitchen Mix — Définitions des trophées
   Toutes les définitions sont centralisées ici.
   Pour ajouter un trophée : ajouter une entrée dans ACHIEVEMENTS.
   ============================================================= */

export interface AchievementDef {
  code: string;
  name: string;
  description: string;
  category: AchievementCategory;
  tier: 1 | 2 | 3; // bronze, argent, or
  icon: string;
  threshold?: number; // pour les achievements à palier
}

export type AchievementCategory =
  | "connexion"
  | "profil"
  | "recettes"
  | "favoris"
  | "commentaires"
  | "notes"
  | "planificateur"
  | "social"
  | "special";

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  connexion: "Connexion",
  profil: "Profil",
  recettes: "Recettes",
  favoris: "Favoris",
  commentaires: "Commentaires",
  notes: "Notes",
  planificateur: "Planificateur",
  social: "Social",
  special: "Spécial",
};

export const TIER_LABELS: Record<1 | 2 | 3, string> = {
  1: "Bronze",
  2: "Argent",
  3: "Or",
};

export const TIER_COLORS: Record<1 | 2 | 3, string> = {
  1: "text-amber-700",
  2: "text-gray-400",
  3: "text-yellow-400",
};

export const TIER_BG: Record<1 | 2 | 3, string> = {
  1: "bg-amber-700/10 border-amber-700/20",
  2: "bg-gray-400/10 border-gray-400/20",
  3: "bg-yellow-400/10 border-yellow-400/20",
};

// ─── Définitions complètes ──────────────────────────────────

export const ACHIEVEMENTS: AchievementDef[] = [
  // ── Connexion ──
  { code: "first_login", name: "Bienvenue !", description: "Première connexion à Kitchen Mix", category: "connexion", tier: 1, icon: "👋" },
  { code: "streak_7", name: "Habitué", description: "7 jours consécutifs de connexion", category: "connexion", tier: 2, icon: "🔥", threshold: 7 },
  { code: "streak_30", name: "Fidèle", description: "30 jours consécutifs de connexion", category: "connexion", tier: 3, icon: "💎", threshold: 30 },

  // ── Profil ──
  { code: "avatar_set", name: "Beau portrait", description: "Photo de profil ajoutée", category: "profil", tier: 1, icon: "📸" },

  // ── Recettes soumises ──
  { code: "recipe_submit_1", name: "Apprenti chef", description: "1ère recette soumise", category: "recettes", tier: 1, icon: "🍳", threshold: 1 },
  { code: "recipe_submit_5", name: "Cuisinier confirmé", description: "5 recettes soumises", category: "recettes", tier: 2, icon: "👨‍🍳", threshold: 5 },
  { code: "recipe_submit_10", name: "Chef étoilé", description: "10 recettes soumises", category: "recettes", tier: 3, icon: "⭐", threshold: 10 },

  // ── Recettes approuvées ──
  { code: "recipe_approved_1", name: "Validé !", description: "1ère recette approuvée", category: "recettes", tier: 1, icon: "✅", threshold: 1 },
  { code: "recipe_approved_5", name: "Valeur sûre", description: "5 recettes approuvées", category: "recettes", tier: 2, icon: "🏅", threshold: 5 },
  { code: "recipe_approved_10", name: "Référence", description: "10 recettes approuvées", category: "recettes", tier: 3, icon: "🏆", threshold: 10 },

  // ── Favoris ──
  { code: "fav_1", name: "Premier coup de cœur", description: "1er favori ajouté", category: "favoris", tier: 1, icon: "❤️", threshold: 1 },
  { code: "fav_10", name: "Collectionneur", description: "10 favoris ajoutés", category: "favoris", tier: 2, icon: "💕", threshold: 10 },
  { code: "fav_50", name: "Gourmand insatiable", description: "50 favoris ajoutés", category: "favoris", tier: 3, icon: "🤤", threshold: 50 },

  // ── Commentaires postés ──
  { code: "comment_1", name: "Première impression", description: "1er commentaire posté", category: "commentaires", tier: 1, icon: "💬", threshold: 1 },
  { code: "comment_10", name: "Bavard", description: "10 commentaires postés", category: "commentaires", tier: 2, icon: "🗣️", threshold: 10 },
  { code: "comment_50", name: "Chroniqueur", description: "50 commentaires postés", category: "commentaires", tier: 3, icon: "📝", threshold: 50 },

  // ── Commentaires approuvés ──
  { code: "comment_approved_1", name: "Parole validée", description: "1er commentaire approuvé", category: "commentaires", tier: 1, icon: "✔️", threshold: 1 },
  { code: "comment_approved_10", name: "Voix de confiance", description: "10 commentaires approuvés", category: "commentaires", tier: 2, icon: "🎤", threshold: 10 },
  { code: "comment_approved_50", name: "Critique reconnu", description: "50 commentaires approuvés", category: "commentaires", tier: 3, icon: "🎯", threshold: 50 },

  // ── Notes ──
  { code: "rating_1", name: "Première note", description: "1ère note attribuée", category: "notes", tier: 1, icon: "⭐", threshold: 1 },
  { code: "rating_10", name: "Juge assidu", description: "10 notes attribuées", category: "notes", tier: 2, icon: "🌟", threshold: 10 },
  { code: "rating_50", name: "Critique gastronomique", description: "50 notes attribuées", category: "notes", tier: 3, icon: "💫", threshold: 50 },

  // ── Planificateur ──
  { code: "plan_1", name: "Organisé", description: "1er planning complété (3+ repas)", category: "planificateur", tier: 1, icon: "📅", threshold: 1 },
  { code: "plan_4", name: "Méthodique", description: "4 semaines planifiées", category: "planificateur", tier: 2, icon: "📋", threshold: 4 },
  { code: "plan_12", name: "Maître planificateur", description: "12 semaines planifiées", category: "planificateur", tier: 3, icon: "🗓️", threshold: 12 },

  // ── Social (likes reçus sur commentaires) ──
  { code: "likes_received_1", name: "Apprécié", description: "1er like reçu sur un commentaire", category: "social", tier: 1, icon: "👍", threshold: 1 },
  { code: "likes_received_10", name: "Populaire", description: "10 likes reçus", category: "social", tier: 2, icon: "🔥", threshold: 10 },
  { code: "likes_received_50", name: "Influenceur", description: "50 likes reçus", category: "social", tier: 3, icon: "🌟", threshold: 50 },

  // ── Spécial ──
  { code: "recipe_with_photo", name: "Photogénique", description: "Recette soumise avec photo", category: "special", tier: 1, icon: "📷" },
  { code: "recipe_with_video", name: "Vidéaste", description: "Recette avec vidéo YouTube", category: "special", tier: 2, icon: "🎬" },
  { code: "recipe_with_faq", name: "Pédagogue", description: "Recette avec FAQ", category: "special", tier: 2, icon: "❓" },
  { code: "nutriscore_1", name: "Soucieux", description: "Nutri-Score renseigné", category: "special", tier: 1, icon: "🥗" },
  { code: "nutriscore_5", name: "Nutritionniste", description: "5 recettes avec Nutri-Score", category: "special", tier: 2, icon: "🥦", threshold: 5 },
  { code: "nutriscore_10", name: "Expert nutrition", description: "10 recettes avec Nutri-Score", category: "special", tier: 3, icon: "🧬", threshold: 10 },
];

// ─── Helpers ─────────────────────────────────────────────────

export function getAchievementByCode(code: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.code === code);
}

export function getAchievementsByCategory(category: AchievementCategory): AchievementDef[] {
  return ACHIEVEMENTS.filter((a) => a.category === category);
}
