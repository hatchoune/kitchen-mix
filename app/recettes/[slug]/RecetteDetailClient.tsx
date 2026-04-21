"use client";

import { useState, useCallback } from "react";
import { Heart, Printer, Share2, PlayCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFavoris } from "@/hooks/useFavoris";
import { useRatings } from "@/hooks/useRatings";
import StarRating from "@/components/ui/StarRating";
import SimulateurThermomix from "@/components/recettes/SimulateurThermomix";
import AddToPlanningButton from "@/components/recettes/AddToPlanningButton";
import type { Recette } from "@/types";
import { cn } from "@/lib/utils";

interface RecetteDetailClientProps {
  recette: Recette;
}

export default function RecetteDetailClient({
  recette,
}: RecetteDetailClientProps) {
  const { user } = useAuth();
  const { isFavori, toggleFavori } = useFavoris(user?.id ?? null);
  const { userRating, rate } = useRatings(recette.id, user?.id ?? null);
  const [simulateurOpen, setSimulateurOpen] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: recette.titre,
        text: recette.description,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handlePrint = () => window.print();
  const favori = isFavori(recette.id);

  // IMPORTANT : onClose DOIT être stable (useCallback sans deps)
  // Sinon l'effet `useEffect([isOpen, onClose])` dans SimulateurThermomix
  // se rejoue à chaque render du parent → cleanup fait history.back() →
  // Next.js App Router POST la page → re-render → boucle infinie de POSTs.
  const handleSimulateurClose = useCallback(() => {
    setSimulateurOpen(false);
  }, []);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        {/* Star Rating */}
        <StarRating
          rating={recette.note_moyenne}
          count={recette.nombre_notes}
          interactive={!!user}
          userRating={userRating}
          onRate={rate}
          size="lg"
        />

        <div className="flex items-center gap-2 ml-auto flex-wrap">
          {/* Ajouter au planning — gère lui-même le cas non connecté */}
          <AddToPlanningButton
            recette={{
              id: recette.id,
              slug: recette.slug,
              titre: recette.titre,
              image_url: recette.image_url,
            }}
          />

          {/* Favori */}
          {user && (
            <button
              onClick={() => toggleFavori(recette.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                favori
                  ? "bg-accent/15 text-accent"
                  : "bg-card border border-border hover:bg-card-hover",
              )}
            >
              <Heart
                className="w-4 h-4"
                fill={favori ? "currentColor" : "none"}
              />
              {favori ? "Favori" : "Ajouter"}
            </button>
          )}

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-card border border-border hover:bg-card-hover transition-colors no-print"
            aria-label="Imprimer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-card border border-border hover:bg-card-hover transition-colors no-print"
            aria-label="Partager"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Simulator CTA */}
      <button
        type="button"
        onClick={() => setSimulateurOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover transition-colors no-print"
      >
        <PlayCircle className="w-5 h-5" />
        Lancer la recette guidée
      </button>

      {/* Simulator Modal — ouverture directe, pas de gate auth */}
      {simulateurOpen && (
        <SimulateurThermomix
          isOpen={simulateurOpen}
          onClose={handleSimulateurClose}
          etapes={recette.etapes}
          titre={recette.titre}
        />
      )}
    </>
  );
}
