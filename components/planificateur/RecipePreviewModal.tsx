"use client";

import { useState, useEffect } from "react";
import {
  X,
  Clock,
  Users,
  Zap,
  Star,
  Plus,
  Loader2,
  Heart,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NutriScore from "@/components/ui/NutriScore";
import type { NutriScore as NutriScoreType } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/Toast";

/* ─── Types ───────────────────────────────────────────────── */

interface RecettePreview {
  id: string;
  slug: string;
  titre: string;
  description: string;
  image_url: string | null;
  temps_preparation: number;
  temps_cuisson: number;
  difficulte: string;
  nombre_portions: number;
  modele_thermomix: string[];
  categories: string[];
  regime: string[];
  note_moyenne: number;
  nombre_notes: number;
  nutriscore: NutriScoreType | null;
  calories_par_portion: number | null;
  ingredients: { nom: string; quantite: number; unite: string }[];
  etapes: {
    numero: number;
    instruction: string;
    vitesse?: number;
    temperature?: number;
    duree?: number;
    accessoire?: string;
    conseil?: string;
  }[];
}

interface RecipePreviewModalProps {
  recetteId: string;
  onAdd: () => void;
  onClose: () => void;
}

/* ─── Helpers ─────────────────────────────────────────────── */

const REGIME_LABELS: Record<string, string> = {
  vegetarien: "Végétarien",
  vegan: "Vegan",
  "sans-gluten": "Sans gluten",
  "sans-lactose": "Sans lactose",
  keto: "Keto",
  halal: "Halal",
};

function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m.toString().padStart(2, "0")}` : `${h}h`;
}

/* ─── Composant ───────────────────────────────────────────── */

export default function RecipePreviewModal({
  recetteId,
  onAdd,
  onClose,
}: RecipePreviewModalProps) {
  const [supabase] = useState(() => createClient());
  const [recette, setRecette] = useState<RecettePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toastSuccess, toastError } = useToast();

  // ─── Favoris state (point 4) ───
  const [isFavoris, setIsFavoris] = useState(false);
  const [favLoading, setFavLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("recettes")
        .select(
          "id, slug, titre, description, image_url, temps_preparation, temps_cuisson, difficulte, nombre_portions, modele_thermomix, categories, regime, note_moyenne, nombre_notes, nutriscore, calories_par_portion, ingredients, etapes",
        )
        .eq("id", recetteId)
        .single();

      setRecette(data as RecettePreview | null);
      setLoading(false);
    };
    load();
  }, [recetteId, supabase]);

  // Check si déjà en favoris
  useEffect(() => {
    if (!user || !recetteId) return;
    const checkFav = async () => {
      const { data } = await supabase
        .from("favoris")
        .select("id")
        .eq("user_id", user.id)
        .eq("recette_id", recetteId)
        .maybeSingle();
      setIsFavoris(!!data);
    };
    checkFav();
  }, [user, recetteId, supabase]);

  const toggleFavoris = async () => {
    if (!user || !recette) return;
    setFavLoading(true);
    try {
      if (isFavoris) {
        await supabase
          .from("favoris")
          .delete()
          .eq("user_id", user.id)
          .eq("recette_id", recette.id);
        setIsFavoris(false);
        toastSuccess("Retiré des favoris");
      } else {
        await supabase.from("favoris").insert({
          user_id: user.id,
          recette_id: recette.id,
        });
        setIsFavoris(true);
        toastSuccess("Ajouté aux favoris !");
      }
    } catch {
      toastError("Erreur lors de la mise à jour des favoris");
    } finally {
      setFavLoading(false);
    }
  };

  const total = recette
    ? recette.temps_preparation + recette.temps_cuisson
    : 0;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-lg max-h-[90dvh] rounded-2xl flex flex-col animate-scale-in overflow-hidden"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        {/* Header fixe */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
          <h3 className="font-display font-bold text-sm truncate pr-4">
            Aperçu de la recette
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-card-hover text-muted-foreground shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-accent" />
            </div>
          )}

          {!loading && !recette && (
            <div className="text-center py-20 text-muted-foreground text-sm">
              Recette introuvable.
            </div>
          )}

          {recette && (
            <div className="space-y-5">
              {/* Image */}
              {recette.image_url ? (
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={recette.image_url}
                    alt={recette.titre}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="w-full aspect-[16/9] bg-accent/5 flex items-center justify-center text-5xl">
                  🍽️
                </div>
              )}

              <div className="px-5 space-y-5 pb-4">
                {/* Titre + description */}
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-xl leading-tight">
                    {recette.titre}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recette.description}
                  </p>
                </div>

                {/* Badges meta */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium">
                    <Clock className="w-3 h-3" /> {formatDuree(total)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-card border border-border text-xs">
                    <Users className="w-3 h-3" /> {recette.nombre_portions}{" "}
                    portions
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold",
                      recette.difficulte === "facile"
                        ? "bg-sage/10 text-sage"
                        : recette.difficulte === "moyen"
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "bg-error/10 text-error",
                    )}
                  >
                    {recette.difficulte === "facile"
                      ? "🟢"
                      : recette.difficulte === "moyen"
                        ? "🟡"
                        : "🔴"}{" "}
                    {recette.difficulte.charAt(0).toUpperCase() +
                      recette.difficulte.slice(1)}
                  </span>
                  {recette.modele_thermomix.map((m) => (
                    <span
                      key={m}
                      className="px-2.5 py-1 rounded-lg bg-accent/10 text-accent text-xs font-medium"
                    >
                      {m}
                    </span>
                  ))}
                  {recette.note_moyenne > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-card border border-border text-xs">
                      <Star className="w-3 h-3 text-accent fill-accent" />
                      {recette.note_moyenne.toFixed(1)} ({recette.nombre_notes})
                    </span>
                  )}
                </div>

                {/* Nutri-Score */}
                {(recette.nutriscore || recette.calories_par_portion) && (
                  <div className="flex items-center gap-3">
                    {recette.nutriscore && (
                      <NutriScore score={recette.nutriscore} size="sm" />
                    )}
                    {recette.calories_par_portion && (
                      <span className="text-xs text-muted-foreground">
                        ~{recette.calories_par_portion} cal/portion
                      </span>
                    )}
                  </div>
                )}

                {/* Régimes */}
                {recette.regime.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {recette.regime.map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded-md bg-sage/10 text-sage text-[10px] font-bold"
                      >
                        {REGIME_LABELS[r] || r}
                      </span>
                    ))}
                  </div>
                )}

                {/* Ingrédients */}
                <div className="space-y-2">
                  <h4 className="font-display font-semibold text-sm">
                    Ingrédients ({recette.ingredients.length})
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {recette.ingredients.map((ing, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1.5 px-3 rounded-lg text-xs bg-card/50"
                      >
                        <span>{ing.nom}</span>
                        <span className="font-medium text-accent">
                          {ing.quantite} {ing.unite}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Étapes (résumé) */}
                <div className="space-y-2">
                  <h4 className="font-display font-semibold text-sm">
                    Préparation ({recette.etapes.length} étapes)
                  </h4>
                  <div className="space-y-2">
                    {recette.etapes.map((etape) => (
                      <div key={etape.numero} className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/15 text-accent font-display font-bold text-[10px] flex items-center justify-center mt-0.5">
                          {etape.numero}
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-xs leading-relaxed">
                            {etape.instruction}
                          </p>
                          {(etape.vitesse !== undefined ||
                            etape.temperature !== undefined ||
                            etape.duree !== undefined) && (
                            <div className="flex flex-wrap gap-1">
                              {etape.vitesse !== undefined && (
                                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium">
                                  <Zap className="w-2.5 h-2.5" /> Vit.{" "}
                                  {etape.vitesse}
                                </span>
                              )}
                              {etape.temperature !== undefined && (
                                <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium">
                                  🌡 {etape.temperature}°C
                                </span>
                              )}
                              {etape.duree !== undefined && (
                                <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium">
                                  ⏱ {Math.ceil(etape.duree / 60)} min
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer fixe : boutons Favoris + Ajouter (point 4) */}
        {recette && (
          <div className="px-5 py-3 border-t border-border shrink-0 flex gap-2">
            {/* Bouton Favoris */}
            {user && (
              <button
                onClick={toggleFavoris}
                disabled={favLoading}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-display font-bold text-sm transition-colors border",
                  isFavoris
                    ? "bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20"
                    : "border-border text-muted-foreground hover:text-red-500 hover:border-red-500/30",
                )}
              >
                <Heart
                  className={cn(
                    "w-4 h-4",
                    isFavoris && "fill-red-500",
                    favLoading && "animate-pulse",
                  )}
                />
              </button>
            )}
            {/* Bouton Ajouter */}
            <button
              onClick={onAdd}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter au planning
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
