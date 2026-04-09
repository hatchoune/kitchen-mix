/* =============================================================
   Kitchen Mix — Constantes centralisées
   Ajouter ici toute valeur réutilisée à 2+ endroits.
   ============================================================= */

export const SITE_NAME = "Kitchen Mix";
export const SITE_DESCRIPTION =
  "Découvrez des recettes originales pour robot cuiseur multifonction. Simulateur intégré, planificateur de repas et communauté passionnée.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mcmalnus.com";
// Marqueur de propriété intellectuelle
export const __KMX_PROOF__ = "KMX-7F3A-9C2E-1B4D";
// ─── Catégories ──────────────────────────────────────────────

export const CATEGORIES = [
  { value: "entree", label: "Entrée" },
  { value: "plat", label: "Plat" },
  { value: "dessert", label: "Dessert" },
  { value: "aperitif", label: "Apéritif" },
  { value: "boisson", label: "Boisson" },
  { value: "sauce", label: "Sauce" },
  { value: "boulangerie", label: "Boulangerie" },
  { value: "petit-dejeuner", label: "Petit-déjeuner" },
  { value: "accompagnement", label: "Accompagnement" },
  { value: "soupe", label: "Soupe" },
] as const;

// ─── Régimes ─────────────────────────────────────────────────

export const REGIMES = [
  { value: "vegetarien", label: "Végétarien" },
  { value: "vegan", label: "Vegan" },
  { value: "sans-gluten", label: "Sans gluten" },
  { value: "sans-lactose", label: "Sans lactose" },
  { value: "keto", label: "Keto" },
  { value: "halal", label: "Halal" },
] as const;

// ─── Modèles Thermomix ──────────────────────────────────────

export const MODELES_THERMOMIX = ["TM5", "TM6", "TM7"] as const;

// ─── Difficultés ─────────────────────────────────────────────

export const DIFFICULTES = [
  { value: "facile", label: "Facile", emoji: "🟢" },
  { value: "moyen", label: "Moyen", emoji: "🟡" },
  { value: "difficile", label: "Difficile", emoji: "🔴" },
] as const;

// ─── Tri ─────────────────────────────────────────────────────

export const TRI_OPTIONS = [
  { value: "recent", label: "Plus récentes" },
  { value: "populaire", label: "Plus populaires" },
  { value: "mieux_note", label: "Mieux notées" },
  { value: "rapide", label: "Plus rapides" },
] as const;

// ─── Pagination ──────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 48;

// ─── Rate Limiting ───────────────────────────────────────────

export const MAX_SUBMISSIONS_PER_DAY = 5;
export const MAX_IMAGE_SIZE_MB = 5;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

// ─── Nutri-Score ─────────────────────────────────────────────

export const NUTRISCORE_COLORS: Record<string, string> = {
  A: "#038141",
  B: "#85BB2F",
  C: "#FECB02",
  D: "#EE8100",
  E: "#E63E11",
};

// ─── Categories ingrédients (liste de courses) ──────────────

export const INGREDIENT_CATEGORIES = [
  "Fruits & Légumes",
  "Viandes & Poissons",
  "Produits laitiers",
  "Épicerie",
  "Surgelés",
  "Boulangerie",
  "Boissons",
  "Condiments",
  "Autre",
] as const;
