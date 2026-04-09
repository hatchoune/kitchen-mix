"use client";

import { useState } from "react";
import { Minus, Plus, Users } from "lucide-react";
import type { Ingredient } from "@/types";
import { cn } from "@/lib/utils";

interface IngredientsAjustablesProps {
  ingredients: Ingredient[];
  portionsBase: number;
}

export default function IngredientsAjustables({
  ingredients,
  portionsBase,
}: IngredientsAjustablesProps) {
  const [portions, setPortions] = useState(portionsBase);
  const ratio = portions / portionsBase;

  const adjustQuantite = (quantite: number): string => {
    const adjusted = quantite * ratio;
    if (adjusted === Math.floor(adjusted)) return adjusted.toString();
    return adjusted.toFixed(1).replace(/\.0$/, "");
  };

  return (
    <div className="space-y-4">
      {/* Portion control */}
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Ingrédients</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPortions(Math.max(1, portions - 1))}
            disabled={portions <= 1}
            className="p-1.5 rounded-lg bg-card border border-border hover:bg-card-hover disabled:opacity-40 transition-colors"
            aria-label="Réduire les portions"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex items-center gap-1.5 min-w-[5rem] justify-center font-display font-semibold">
            <Users className="w-4 h-4 text-accent" />
            {portions} {portions > 1 ? "portions" : "portion"}
          </span>
          <button
            onClick={() => setPortions(Math.min(20, portions + 1))}
            disabled={portions >= 20}
            className="p-1.5 rounded-lg bg-card border border-border hover:bg-card-hover disabled:opacity-40 transition-colors"
            aria-label="Augmenter les portions"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Ingredients list */}
      <ul className="space-y-2">
        {ingredients.map((ing, i) => (
          <li
            key={`${ing.nom}-${i}`}
            className={cn(
              "flex items-center justify-between py-2 px-3 rounded-lg",
              i % 2 === 0 ? "bg-card/50" : "bg-transparent"
            )}
          >
            <span className="text-sm">{ing.nom}</span>
            <span className="text-sm font-medium text-accent tabular-nums">
              {adjustQuantite(ing.quantite)} {ing.unite}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
