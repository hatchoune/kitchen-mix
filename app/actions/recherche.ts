"use server";

import { createServerSupabase } from "@/lib/supabase/server";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import type { RecetteFilters, RecetteCard } from "@/types";

const CARD_FIELDS = `
  id, slug, titre, description, image_url,
  temps_preparation, temps_cuisson, difficulte,
  nombre_portions, modele_thermomix, categories,
  regime, note_moyenne, nombre_notes,
  nutriscore, calories_par_portion
`;

export async function rechercherRecettes(
  query: string,
  filters: RecetteFilters = {},
): Promise<{ data: RecetteCard[]; count: number }> {
  const supabase = await createServerSupabase();
  const page = filters.page || 1;
  const limit = filters.limit || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  let dbQuery = supabase
    .from("recettes")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("approuve", true)
    .eq("publie", true);

  if (query && query.trim().length > 0) {
    const safeQuery = query.replace(/[%_,]/g, "\\$&").trim();
    dbQuery = dbQuery.or(
      `titre.ilike.%${safeQuery}%,description.ilike.%${safeQuery}%`,
    );
  }

  if (filters.categorie) {
    dbQuery = dbQuery.contains("categories", [filters.categorie]);
  }
  if (filters.modele) {
    dbQuery = dbQuery.contains("modele_thermomix", [filters.modele]);
  }
  if (filters.difficulte) {
    dbQuery = dbQuery.eq("difficulte", filters.difficulte);
  }
  if (filters.regime) {
    dbQuery = dbQuery.contains("regime", [filters.regime]);
  }
  if (filters.nutriscore) {
    dbQuery = dbQuery.eq("nutriscore", filters.nutriscore);
  }

  if (filters.temps_min !== undefined) {
    dbQuery = dbQuery.gte("temps_total", filters.temps_min);
  }
  if (filters.temps_max !== undefined && filters.temps_max < 9999) {
    dbQuery = dbQuery.lte("temps_total", filters.temps_max);
  }

  switch (filters.tri) {
    case "populaire":
      dbQuery = dbQuery.order("vues", { ascending: false });
      break;
    case "mieux_note":
      dbQuery = dbQuery.order("note_moyenne", { ascending: false });
      break;
    case "rapide":
      dbQuery = dbQuery.order("temps_total", { ascending: true });
      break;
    default:
      dbQuery = dbQuery.order("created_at", { ascending: false });
  }

  dbQuery = dbQuery.range(offset, offset + limit - 1);

  const { data, count, error } = await dbQuery;

  if (error) throw new Error(error.message);

  return {
    data: (data || []) as RecetteCard[],
    count: count || 0,
  };
}
