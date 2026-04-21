"use client";

import { Sparkles, X, ArrowDown } from "lucide-react";
import Image from "next/image";
import type { PendingRecipe } from "@/lib/pending-recipe";

interface Props {
  recipe: PendingRecipe;
  onCancel: () => void;
}

/* =============================================================
   PendingRecipeBanner
   -------------------------------------------------------------
   Bannière sticky affichée en haut du planificateur quand une
   recette est en attente de placement (arrivée via "Ajouter au
   planning" depuis une page recette).
   -------------------------------------------------------------
   - Sticky (reste visible en scroll) pour rappeler l'action à faire
   - Bouton X pour annuler le placement
   - Design coloré accent pour attirer l'œil
   ============================================================= */

export default function PendingRecipeBanner({ recipe, onCancel }: Props) {
  return (
    <div className="sticky top-16 z-30 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="glass-card px-4 py-3 rounded-xl border-2 border-accent/50 bg-accent/10 shadow-lg shadow-accent/20 flex items-center gap-3">
        {/* Vignette recette */}
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-accent/10 flex items-center justify-center border border-accent/20">
          {recipe.image_url ? (
            <div className="relative w-full h-full">
              <Image
                src={recipe.image_url}
                alt={recipe.titre}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          ) : (
            <span className="text-xl">🍽️</span>
          )}
        </div>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Recette à placer
          </p>
          <p className="text-sm font-display font-semibold truncate leading-tight">
            {recipe.titre}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
            <ArrowDown className="w-3 h-3 animate-bounce" />
            Cliquez sur un créneau « + Ajouter » ci-dessous
          </p>
        </div>

        {/* Annuler */}
        <button
          onClick={onCancel}
          className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:bg-card-hover hover:text-error transition-colors"
          aria-label="Annuler l'ajout"
          title="Annuler"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
