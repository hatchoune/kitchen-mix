import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { Calendar, ThumbsUp, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PlanningActions from "./PlanningActions";

/* ─── Types ───────────────────────────────────────────────── */

interface PlanningRecette {
  id: string;
  slug: string;
  titre: string;
  image_url: string | null;
}

/* ─── Metadata ────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data } = await supabase
    .from("user_plannings")
    .select("name, description")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (!data) return { title: "Planning introuvable — Kitchen Mix" };

  return {
    title: `${data.name} — Kitchen Mix`,
    description:
      data.description || `Planning de repas "${data.name}" sur Kitchen Mix`,
  };
}

/* ─── Constantes ──────────────────────────────────────────── */

const JOURS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

/* ─── Page ────────────────────────────────────────────────── */

export default async function PlanningPublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  // 1. Récupérer le planning
  const { data: planning } = await supabase
    .from("user_plannings")
    .select("*, profils:user_id(pseudo, avatar_url)")
    .eq("id", id)
    .single();

  if (!planning) notFound();

  // Vérifier la visibilité
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const isOwner = currentUser?.id === planning.user_id;
  if (!planning.is_public && !isOwner) notFound();

  // 2. Récupérer les recettes référencées
  const planData = planning.data as Record<string, (string | null)[]>;
  const recetteIds = new Set<string>();
  for (const slots of Object.values(planData)) {
    for (const rid of slots) {
      if (rid) recetteIds.add(rid);
    }
  }

  const recettesMap: Record<string, PlanningRecette> = {};
  if (recetteIds.size > 0) {
    const { data: recettes } = await supabase
      .from("recettes")
      .select("id, slug, titre, image_url")
      .in("id", Array.from(recetteIds));

    for (const r of recettes || []) {
      recettesMap[r.id] = r as PlanningRecette;
    }
  }

  // 3. Auteur
  const profil = planning.profils as unknown as {
    pseudo: string | null;
    avatar_url: string | null;
  } | null;
  const authorName = profil?.pseudo || "Utilisateur";

  // 4. Total recettes
  const totalRecipes = Object.values(planData).flat().filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="font-display font-bold text-3xl flex items-center gap-3">
          <Calendar className="w-8 h-8 text-accent" />
          {planning.name}
        </h1>

        {planning.description && (
          <p className="text-muted-foreground">{planning.description}</p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href={`/profil/${planning.user_id}`}
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            {profil?.avatar_url ? (
              <Image
                src={profil.avatar_url}
                alt={authorName}
                width={20}
                height={20}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
            {authorName}
          </Link>
          <span>{totalRecipes} repas</span>
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            {planning.likes_count}
          </span>
        </div>
      </div>

      {/* Actions */}
      <PlanningActions
        planningId={id}
        weekStart={planning.week_start}
        isOwner={isOwner}
      />

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {JOURS.map((jour, dayIdx) => {
          const slots = planData[dayIdx.toString()] || [];
          const filled = slots.filter(Boolean);

          return (
            <div
              key={dayIdx}
              className="glass-card p-3 min-h-[10rem] flex flex-col rounded-xl border border-border"
            >
              <h3 className="font-display font-semibold text-sm mb-2 text-accent flex items-center justify-between">
                {jour}
                <span className="text-[10px] text-muted-foreground font-normal">
                  {filled.length} repas
                </span>
              </h3>

              <div className="flex-1 space-y-1.5">
                {slots.map((recetteId: string | null, slotIdx: number) => {
                  if (!recetteId) return null;
                  const recipe = recettesMap[recetteId];
                  if (!recipe) return null;

                  return (
                    <div
                      key={slotIdx}
                      className="flex items-center gap-1.5 bg-card/50 rounded-lg px-2 py-1.5"
                    >
                      {recipe.image_url ? (
                        <div className="relative w-6 h-6 shrink-0">
                          <Image
                            src={recipe.image_url}
                            alt={recipe.titre}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center shrink-0 text-[10px]">
                          🍽️
                        </div>
                      )}
                      <Link
                        href={`/recettes/${recipe.slug}`}
                        className="text-xs font-medium hover:text-accent transition-colors line-clamp-1 flex-1 min-w-0"
                        title={recipe.titre}
                      >
                        {recipe.titre}
                      </Link>
                    </div>
                  );
                })}

                {filled.length === 0 && (
                  <p className="text-[10px] text-muted-foreground text-center py-4">
                    —
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
