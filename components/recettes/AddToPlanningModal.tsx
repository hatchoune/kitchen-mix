"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Calendar,
  Plus,
  Globe,
  Lock,
  Loader2,
  ThumbsUp,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { setPendingRecipe } from "@/lib/pending-recipe";
import { cn } from "@/lib/utils";
import type { Recette } from "@/types";

interface UserPlanning {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  week_start: string;
  likes_count: number;
  created_at: string;
}

interface Props {
  recette: Pick<Recette, "id" | "slug" | "titre" | "image_url">;
  onClose: () => void;
}

/* =============================================================
   AddToPlanningModal
   -------------------------------------------------------------
   - Liste scrollable des plannings sauvegardés de l'utilisateur
     (séparation privés / publics comme /mes-plannings)
   - Bouton "Nouveau planning" toujours en tête de liste
   - Au clic : stocke la recette en sessionStorage (pont mémoire)
     et redirige vers /planificateur avec le bon contexte :
       • Planning existant → ?load={id}&pending=1
       • Nouveau planning  → ?new=1&pending=1
   - Le planificateur reconnaît ?pending=1, affiche une bannière
     "Recette à placer" et l'assigne au slot cliqué par l'utilisateur.
   ============================================================= */

export default function AddToPlanningModal({ recette, onClose }: Props) {
  const { user } = useAuth();
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [plannings, setPlannings] = useState<UserPlanning[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll lock du body tant que le modal est ouvert (iOS-safe).
  useBodyScrollLock(true);

  // Fermeture au clavier (Échap)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Charge les plannings de l'utilisateur
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("user_plannings")
        .select(
          "id, name, description, is_public, week_start, likes_count, created_at",
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setPlannings((data || []) as UserPlanning[]);
      setLoading(false);
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [user, supabase]);

  const handleSelectPlanning = (planningId: string) => {
    setPendingRecipe({
      id: recette.id,
      slug: recette.slug,
      titre: recette.titre,
      image_url: recette.image_url,
    });
    onClose();
    router.push(`/planificateur?load=${planningId}&pending=1`);
  };

  const handleCreateNew = () => {
    setPendingRecipe({
      id: recette.id,
      slug: recette.slug,
      titre: recette.titre,
      image_url: recette.image_url,
    });
    onClose();
    router.push(`/planificateur?new=1&pending=1`);
  };

  const prives = plannings.filter((p) => !p.is_public);
  const publics = plannings.filter((p) => p.is_public);
  const hasAny = plannings.length > 0;

  return (
    <div className="fixed inset-0 z-[100] h-[100dvh] overscroll-none flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Bottom sheet mobile / modal centré desktop */}
      <div
        className="relative z-10 w-full h-[85dvh] sm:h-auto sm:max-h-[85dvh] sm:max-w-md sm:mx-4 rounded-t-2xl sm:rounded-2xl flex flex-col animate-slide-up pb-safe"
        style={{ backgroundColor: "var(--color-bg)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Ajouter à un planning"
      >
        {/* Poignée mobile */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-border sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            <h3 className="font-display font-bold text-lg">
              Ajouter à un planning
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-lg hover:bg-card-hover transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Bandeau recette sélectionnée */}
        <div className="px-5 py-3 border-b border-border shrink-0 flex items-center gap-3 bg-accent/5">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-accent/10 flex items-center justify-center">
            {recette.image_url ? (
              <div className="relative w-full h-full">
                <Image
                  src={recette.image_url}
                  alt={recette.titre}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            ) : (
              <span className="text-lg">🍽️</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Recette à ajouter
            </p>
            <p className="text-sm font-medium truncate">{recette.titre}</p>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4">
          {/* Nouveau planning — toujours visible en tête */}
          <button
            onClick={handleCreateNew}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 border-dashed border-accent/40 hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-display font-bold text-sm">
                Nouveau planning
              </p>
              <p className="text-[11px] text-muted-foreground leading-tight">
                {hasAny
                  ? "Démarrer une semaine vierge avec cette recette"
                  : "Démarrez votre première semaine avec cette recette"}
              </p>
            </div>
          </button>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
            </div>
          )}

          {/* État vide */}
          {!loading && !hasAny && (
            <div className="text-center py-4 text-xs text-muted-foreground">
              Aucun planning sauvegardé pour le moment.
            </div>
          )}

          {/* Plannings privés */}
          {!loading && prives.length > 0 && (
            <section className="space-y-2">
              <h4 className="font-display font-semibold text-[11px] flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
                <Lock className="w-3 h-3" />
                Privés ({prives.length})
              </h4>
              <div className="space-y-1.5">
                {prives.map((p) => (
                  <PlanningChoice
                    key={p.id}
                    planning={p}
                    onSelect={() => handleSelectPlanning(p.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Plannings publics */}
          {!loading && publics.length > 0 && (
            <section className="space-y-2">
              <h4 className="font-display font-semibold text-[11px] flex items-center gap-1.5 text-muted-foreground uppercase tracking-wider">
                <Globe className="w-3 h-3" />
                Publics ({publics.length})
              </h4>
              <div className="space-y-1.5">
                {publics.map((p) => (
                  <PlanningChoice
                    key={p.id}
                    planning={p}
                    onSelect={() => handleSelectPlanning(p.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 border-t border-border shrink-0">
          <p className="text-[10px] text-muted-foreground text-center leading-snug">
            Vous choisirez le jour et le repas dans le planificateur.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Ligne de choix ─────────────────────────────────────── */

function PlanningChoice({
  planning,
  onSelect,
}: {
  planning: UserPlanning;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border",
        "hover:border-accent/40 hover:bg-accent/5 transition-all text-left group",
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
        <Calendar className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm truncate group-hover:text-accent transition-colors">
          {planning.name}
        </p>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
          <span>
            {new Date(planning.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </span>
          {planning.is_public && (
            <span className="flex items-center gap-0.5">
              <ThumbsUp className="w-2.5 h-2.5" />
              {planning.likes_count}
            </span>
          )}
          {planning.description && (
            <span className="truncate">· {planning.description}</span>
          )}
        </div>
      </div>
    </button>
  );
}
