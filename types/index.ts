/* =============================================================
   Kitchen Mix — Types centralisés
   Chaque table Supabase a son type miroir ici.
   Pour ajouter une table : créer le type, puis l'exporter.
   ============================================================= */

// ─── Recettes ────────────────────────────────────────────────

export interface Ingredient {
  nom: string;
  quantite: number;
  unite: string;
  categorie?: string; // pour groupement liste de courses
}

export interface EtapeThermomix {
  numero: number;
  instruction: string;
  vitesse?: number; // 1-10 ou "turbo"
  temperature?: number; // °C
  duree?: number; // secondes
  accessoire?: string; // fouet, panier, spatule...
  conseil?: string;
}

export interface FAQItem {
  question: string;
  reponse: string;
}

export type Difficulte = "facile" | "moyen" | "difficile";
export type NutriScore = "A" | "B" | "C" | "D" | "E";
export type ModeleThermomix = "TM5" | "TM6" | "TM7";

export interface Recette {
  id: string;
  slug: string;
  auteur_id: string | null;
  titre: string;
  description: string;
  image_url: string | null;
  video_youtube_id: string | null;
  temps_preparation: number;
  temps_cuisson: number;
  difficulte: Difficulte;
  nombre_portions: number;
  modele_thermomix: ModeleThermomix[];
  categories: string[];
  regime: string[];
  tags: string[];
  calories_par_portion: number | null;
  nutriscore: NutriScore | null;
  nutriscore_note: string | null;
  ingredients: Ingredient[];
  etapes: EtapeThermomix[];
  faq: FAQItem[] | null;
  note_moyenne: number;
  nombre_notes: number;
  vues: number;
  approuve: boolean;
  raison_rejet: string | null;
  publie: boolean;
  created_at: string;
  updated_at: string;
}

// Sous-ensemble pour les cards / listes
export type RecetteCard = Pick<
  Recette,
  | "id"
  | "slug"
  | "titre"
  | "description"
  | "image_url"
  | "temps_preparation"
  | "temps_cuisson"
  | "difficulte"
  | "nombre_portions"
  | "modele_thermomix"
  | "categories"
  | "regime"
  | "note_moyenne"
  | "nombre_notes"
  | "nutriscore"
  | "calories_par_portion"
>;

// ─── Profils ─────────────────────────────────────────────────

export interface Profil {
  id: string;
  pseudo: string | null;
  avatar_url: string | null;
  modele_thermomix: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  theme_preference?: "light" | "dark" | "grey";
  notify_replies?: boolean;
  notify_moderation?: boolean;
}

// ─── Ratings ─────────────────────────────────────────────────

export interface RecipeRating {
  id: string;
  user_id: string;
  recette_id: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

// ─── Favoris ─────────────────────────────────────────────────

export interface Favori {
  id: string;
  user_id: string;
  recette_id: string;
  created_at: string;
}

// ─── Comments ────────────────────────────────────────────────

export interface RecipeComment {
  id: string;
  user_id: string;
  recette_id: string;
  content: string;
  rating: number | null;
  approved: boolean;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  profil?: Pick<Profil, "pseudo" | "avatar_url">;
  replies?: RecipeComment[];
}

// ─── Submission Log ──────────────────────────────────────────

export interface SubmissionLogEntry {
  id: string;
  user_id: string;
  submitted_at: string;
}

// ─── Admin ───────────────────────────────────────────────────

export interface Admin {
  user_id: string;
  created_at: string;
}

// ─── Filtres & Search ────────────────────────────────────────

export interface RecetteFilters {
  categorie?: string;
  modele?: string;
  difficulte?: Difficulte;
  regime?: string;
  nutriscore?: NutriScore;
  temps_max?: number;
  tri?: "recent" | "populaire" | "mieux_note" | "rapide";
  page?: number;
  limit?: number;
  q?: string; // search query
}

// ─── Liste de courses ────────────────────────────────────────

export interface ListeCoursesItem {
  nom: string;
  quantite: number;
  unite: string;
  categorie: string;
}

// ─── Theme ───────────────────────────────────────────────────

export type ThemeName = "dark" | "light" | "grey";

// ─── API Responses ───────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  error: string;
  details?: string;
}

// ─── Newsletter ──────────────────────────────────────────────

export interface NewsletterSubscriber {
  id: string;
  email: string;
  confirmed: boolean;
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

// ─── Achievements ────────────────────────────────────────────

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_code: string;
  unlocked_at: string;
  notified: boolean;
}

// ─── Plannings ───────────────────────────────────────────────

export interface UserPlanning {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  week_start: string;
  data: Record<number, (string | null)[]>;
  likes_count: number;
  created_at: string;
  updated_at: string;
}
