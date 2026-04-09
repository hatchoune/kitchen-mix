"use client";

import { useState } from "react";
import { Heart, Printer, Share2, PlayCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useFavoris } from "@/hooks/useFavoris";
import { useRatings } from "@/hooks/useRatings";
import StarRating from "@/components/ui/StarRating";
import SimulateurThermomix from "@/components/recettes/SimulateurThermomix";
import type { Recette } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

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

        <div className="flex items-center gap-2 ml-auto">
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
        onClick={() => setSimulateurOpen(true)}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover transition-colors no-print"
      >
        <PlayCircle className="w-5 h-5" />
        Lancer la recette guidée
      </button>

      {/* Simulator Modal — bloqué si non connecté */}
      {simulateurOpen && !user && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Fond flouté */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSimulateurOpen(false)}
          />
          {/* Carte centrale */}
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl p-8 flex flex-col items-center gap-5 text-center animate-scale-in"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl">Recette guidée</h3>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accéder au mode cuisine guidée pas à pas.
              </p>
            </div>
            <Link
              href={`/connexion?next=/recettes/${recette.slug}`}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover transition-colors"
            >
              Se connecter
            </Link>
            <button
              onClick={() => setSimulateurOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Simulator Modal — accessible si connecté */}
      {simulateurOpen && user && (
        <SimulateurThermomix
          isOpen={simulateurOpen}
          onClose={() => setSimulateurOpen(false)}
          etapes={recette.etapes}
          titre={recette.titre}
        />
      )}
    </>
  );
}
