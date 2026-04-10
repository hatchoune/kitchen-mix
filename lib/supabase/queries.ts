/* =============================================================
   Kitchen Mix — Queries Supabase centralisées
   Toutes les requêtes DB passent par ici.
   Pour ajouter une requête : créer la fonction, l'exporter.
   ============================================================= */

import { createServerSupabase } from "./server";
import type {
  Recette,
  RecetteCard,
  RecetteFilters,
  RecipeComment,
} from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

// ─── Champs pour les cards (SELECT partiel) ──────────────────

const CARD_FIELDS = `
  id, slug, titre, description, image_url,
  temps_preparation, temps_cuisson, difficulte,
  nombre_portions, modele_thermomix, categories,
  regime, note_moyenne, nombre_notes,
  nutriscore, calories_par_portion
`;

// ─── Recettes ────────────────────────────────────────────────

export async function getRecettes(
  filters: RecetteFilters = {},
): Promise<{ data: RecetteCard[]; count: number }> {
  const supabase = await createServerSupabase();
  const page = filters.page || 1;
  const limit = filters.limit || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("recettes")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("approuve", true)
    .eq("publie", true);

  // Filtres
  if (filters.categorie) {
    query = query.contains("categories", [filters.categorie]);
  }
  if (filters.modele) {
    query = query.contains("modele_thermomix", [filters.modele]);
  }
  if (filters.difficulte) {
    query = query.eq("difficulte", filters.difficulte);
  }
  if (filters.regime) {
    query = query.contains("regime", [filters.regime]);
  }
  if (filters.nutriscore) {
    query = query.eq("nutriscore", filters.nutriscore);
  }
  if (filters.temps_max) {
    // filtre sur temps total (prep + cuisson) via colonne calculée ou filtre combiné
    // On filtre sur temps_preparation + temps_cuisson <= temps_max
    // Supabase ne supporte pas l'addition dans .lte, donc on utilise un filtre SQL brut
    query = query.filter(
      "temps_preparation + temps_cuisson",
      "lte",
      filters.temps_max,
    );
  }

  // Tri
  switch (filters.tri) {
    case "populaire":
      query = query.order("vues", { ascending: false });
      break;
    case "mieux_note":
      query = query.order("note_moyenne", { ascending: false });
      break;
    case "rapide":
      query = query.order("temps_preparation", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;
  if (error) throw new Error(error.message);

  return { data: (data || []) as RecetteCard[], count: count || 0 };
}

export async function getRecetteBySlug(slug: string): Promise<Recette | null> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as Recette;
}

export async function getRecettesTendances(limit = 7): Promise<RecetteCard[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select(CARD_FIELDS)
    .eq("approuve", true)
    .eq("publie", true)
    .order("vues", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as RecetteCard[];
}

export async function getRecettesSimilaires(
  recette: Recette,
  limit = 3,
): Promise<RecetteCard[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select(CARD_FIELDS)
    .eq("approuve", true)
    .eq("publie", true)
    .neq("id", recette.id)
    .overlaps("categories", recette.categories)
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as RecetteCard[];
}

export async function getDernieresRecettes(limit = 6): Promise<RecetteCard[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select(CARD_FIELDS)
    .eq("approuve", true)
    .eq("publie", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data || []) as RecetteCard[];
}

export async function getAllSlugs(): Promise<
  { slug: string; updatedAt: string }[]
> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select("slug, updated_at")
    .eq("approuve", true)
    .eq("publie", true);

  if (error) return [];
  return (data || []).map((r) => ({
    slug: r.slug,
    updatedAt: r.updated_at,
  }));
}

// ✅ Correction de incrementVues : plus de .catch() sur le builder
export async function incrementVues(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  try {
    const { error } = await supabase.rpc("increment_vues", { recette_id: id });
    if (error) {
      console.error("Erreur RPC increment_vues:", error.message);
      // Optionnel : ne pas bloquer l'expérience utilisateur
    }
  } catch (err) {
    console.error("Exception dans incrementVues:", err);
  }
}

export async function getFavoris(userId: string): Promise<RecetteCard[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("favoris")
    .select(`recette_id, recettes(${CARD_FIELDS})`)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  return (data || [])
    .map((f) => {
      const r = f.recettes;
      return r as unknown as RecetteCard;
    })
    .filter(Boolean);
}

// ─── Comments ────────────────────────────────────────────────

export async function getApprovedComments(
  recetteId: string,
): Promise<RecipeComment[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recipe_comments")
    .select("*, profils:user_id(pseudo, avatar_url)")
    .eq("recette_id", recetteId)
    .eq("approved", true)
    .is("parent_id", null)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data || []) as unknown as RecipeComment[];
}

// ─── Admin ───────────────────────────────────────────────────

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .single();

  if (error) return false;
  return !!data;
}

export async function getRecettesEnAttente(): Promise<Recette[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("recettes")
    .select("*")
    .eq("approuve", false)
    .is("raison_rejet", null)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data || []) as Recette[];
}
