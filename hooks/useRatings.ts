"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { rateRecipe } from "@/app/actions/ratings";

export function useRatings(recetteId: string, userId: string | null) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    if (!userId) {
      setUserRating(null);
      return;
    }

    const load = async () => {
      const { data } = await supabase
        .from("recipe_ratings")
        .select("rating")
        .eq("user_id", userId)
        .eq("recette_id", recetteId)
        .single();

      setUserRating(data?.rating ?? null);
    };

    load();
  }, [userId, recetteId, supabase]);

  const rate = useCallback(
    async (rating: number) => {
      if (!userId) return { error: "Non connecté" };
      setLoading(true);
      try {
        await rateRecipe(recetteId, rating);
        setUserRating(rating);
        return { error: null };
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erreur inconnue";
        return { error: message };
      } finally {
        setLoading(false);
      }
    },
    [userId, recetteId],
  );

  return { userRating, rate, loading };
}
