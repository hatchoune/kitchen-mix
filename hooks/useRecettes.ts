// hooks/useRecettes.ts
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { RecetteFilters, RecetteCard } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const CARD_FIELDS = `
  id, slug, titre, description, image_url,
  temps_preparation, temps_cuisson, difficulte,
  nombre_portions, modele_thermomix, categories,
  regime, note_moyenne, nombre_notes,
  nutriscore, calories_par_portion
`;

async function fetchRecettes(filters: RecetteFilters) {
  const supabase = createClient();
  const page = filters.page || 1;
  const limit = filters.limit || DEFAULT_PAGE_SIZE;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("recettes")
    .select(CARD_FIELDS, { count: "exact" })
    .eq("approuve", true)
    .eq("publie", true);

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

export function useRecettes(filters: RecetteFilters) {
  return useQuery({
    queryKey: ["recettes", filters],
    queryFn: () => fetchRecettes(filters),
    staleTime: 5 * 60 * 1000,
  });
}
