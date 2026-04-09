import { useQuery } from "@tanstack/react-query";
import { getRecettes } from "@/lib/supabase/queries";
import type { RecetteFilters } from "@/types";

export function useRecettes(filters: RecetteFilters) {
  return useQuery({
    queryKey: ["recettes", filters],
    queryFn: () => getRecettes(filters),
    staleTime: 5 * 60 * 1000,
  });
}
