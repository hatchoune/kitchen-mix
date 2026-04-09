"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import RecetteGrid from "@/components/recettes/RecetteGrid";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import Link from "next/link";
import type { RecetteCard } from "@/types";

export default function FavorisPage() {
  const { user, loading: authLoading } = useAuth();
  const [recettes, setRecettes] = useState<RecetteCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }

    const load = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("favoris")
        .select(`
          recette_id,
          recettes (
            id, slug, titre, description, image_url,
            temps_preparation, temps_cuisson, difficulte,
            nombre_portions, modele_thermomix, categories,
            regime, note_moyenne, nombre_notes,
            nutriscore, calories_par_portion
          )
        `)
        .eq("user_id", user.id);

      const fav = (data || [])
        .map((f) => f.recettes as unknown as RecetteCard)
        .filter(Boolean);
      setRecettes(fav);
      setLoading(false);
    };

    load();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-48 rounded-xl" />
        <SkeletonGrid count={6} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display font-bold text-2xl">Mes Favoris</h1>
        <p className="text-muted-foreground">
          Connectez-vous pour sauvegarder vos recettes préférées.
        </p>
        <Link
          href="/connexion"
          className="inline-flex px-6 py-3 rounded-xl bg-accent text-black font-medium hover:bg-accent-hover transition-colors"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl flex items-center gap-2">
          <Heart className="w-8 h-8 text-accent" fill="currentColor" />
          Mes Favoris
        </h1>
        <p className="text-muted-foreground mt-1">
          {recettes.length} recette{recettes.length > 1 ? "s" : ""} sauvegardée{recettes.length > 1 ? "s" : ""}
        </p>
      </div>

      {recettes.length > 0 ? (
        <RecetteGrid recettes={recettes} />
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Aucun favori pour le moment.{" "}
            <Link href="/recettes" className="text-accent hover:underline">
              Explorer les recettes
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
