"use client";

import { Save, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  onSave: () => void;
  onDismiss: () => void;
  /** Nombre de recettes dans le planning (affiché pour contextualiser). */
  recipeCount?: number;
}

/* =============================================================
   SaveReminder
   -------------------------------------------------------------
   Bannière discrète mais visible rappelant à l'utilisateur de
   sauvegarder son planning quand il a déjà plusieurs recettes
   ajoutées. Pas intrusive — un bouton "Sauvegarder" + une croix
   pour fermer le rappel.
   ============================================================= */

export default function SaveReminder({
  onSave,
  onDismiss,
  recipeCount,
}: Props) {
  return (
    <div
      className={cn(
        "glass-card px-4 py-3 rounded-xl border flex items-center gap-3",
        "border-accent/30 bg-accent/5",
        "animate-in fade-in slide-in-from-bottom-2 duration-300",
      )}
      role="status"
      aria-live="polite"
    >
      <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
        <Info className="w-5 h-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-display font-semibold flex items-center gap-1.5">
          💾 Pensez à sauvegarder votre planning
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
          {recipeCount && recipeCount >= 2
            ? `Vos ${recipeCount} recettes restent en mémoire, mais la sauvegarde vous permet de retrouver ce planning partout.`
            : "Vos recettes restent en mémoire, mais la sauvegarde vous permet de retrouver ce planning partout."}
        </p>
      </div>
      <button
        onClick={onSave}
        className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent text-black text-xs font-bold hover:bg-accent-hover transition-colors"
      >
        <Save className="w-3.5 h-3.5" />
        Sauvegarder
      </button>
      <button
        onClick={onDismiss}
        className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:bg-card-hover transition-colors"
        aria-label="Fermer le rappel"
        title="Fermer le rappel"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
