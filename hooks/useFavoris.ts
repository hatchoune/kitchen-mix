"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toggleFavori } from "@/app/actions/favoris";

export function useFavoris(userId: string | null) {
  const [favorisIds, setFavorisIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [supabase] = useState(() => createClient());

  // Charger les favoris de l'utilisateur (inchangé)
  useEffect(() => {
    if (!userId) {
      setFavorisIds(new Set());
      return;
    }

    const load = async () => {
      const { data } = await supabase
        .from("favoris")
        .select("recette_id")
        .eq("user_id", userId);

      if (data) {
        setFavorisIds(new Set(data.map((f) => f.recette_id)));
      }
    };

    load();
  }, [userId, supabase]);

  const isFavori = useCallback(
    (recetteId: string) => favorisIds.has(recetteId),
    [favorisIds],
  );

  const toggleFavoriAction = useCallback(
    async (recetteId: string) => {
      if (!userId) return { error: "Non connecté" };
      setLoading(true);
      try {
        const result = await toggleFavori(recetteId);
        if (result.action === "added") {
          setFavorisIds((prev) => new Set(prev).add(recetteId));
        } else {
          setFavorisIds((prev) => {
            const next = new Set(prev);
            next.delete(recetteId);
            return next;
          });
        }
        return { error: null };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        return { error: message };
      } finally {
        setLoading(false);
      }
    },
    [userId],
  );

  return { favorisIds, isFavori, toggleFavori: toggleFavoriAction, loading };
}
