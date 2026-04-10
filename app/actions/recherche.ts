"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const CARD_FIELDS = `
  id, slug, titre, description, image_url,
  temps_preparation, temps_cuisson, difficulte,
  nombre_portions, modele_thermomix, categories,
  regime, note_moyenne, nombre_notes,
  nutriscore, calories_par_portion
`;

export async function rechercherRecettes(
  query: string,
  filters?: {
    categorie?: string;
    modele?: string;
    page?: number;
    limit?: number;
  },
) {
  // Validation longueur + sanitisation
  if (!query?.trim() || query.length > 200) {
    return { data: [], count: 0, page: 1, limit: DEFAULT_PAGE_SIZE };
  }
  const safeQuery = query.replace(/[%_,]/g, "\\$&").trim();

  const supabase = await createServerSupabase();
  const page = filters?.page || 1;
  const limit = filters?.limit || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from("recettes")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("approuve", true)
    .eq("publie", true)
    .or(`titre.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%`);

  if (filters?.categorie) {
    dbQuery = dbQuery.contains("categories", [filters.categorie]);
  }
  if (filters?.modele) {
    dbQuery = dbQuery.contains("modele_thermomix", [filters.modele]);
  }

  dbQuery = dbQuery
    .order("note_moyenne", { ascending: false })
    .range(offset, offset + limit - 1);

  const { data, count, error } = await dbQuery;

  if (error) throw new Error(error.message);

  return {
    data: data || [],
    count: count || 0,
    page,
    limit,
  };
}
