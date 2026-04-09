import type { Metadata } from "next";
import { Suspense } from "react";
import RecetteFiltres from "@/components/recettes/RecetteFiltres";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import RecettesListeClient from "@/components/recettes/RecettesListeClient";
import { DEFAULT_PAGE_SIZE, SITE_URL } from "@/lib/constants";
import type { RecetteFilters } from "@/types";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Toutes les recettes robot cuiseur — Faciles, rapides et gourmandes",
  description:
    "Toutes nos recettes pour robot cuiseur multifonction — Thermomix TM5 TM6 TM7, Moulinex Companion, Magimix Cook Expert. Plats, desserts, entrées, soupes — filtrées par difficulté, régime et appareil.",
  alternates: { canonical: `${SITE_URL}/recettes` },
  openGraph: {
    title: "Recettes robot cuiseur multifonction — Kitchen Mix",
    description:
      "Des centaines de recettes originales pour tous vos robots cuiseurs.",
    url: `${SITE_URL}/recettes`,
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function RecettesPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Construction des filtres (identique à ce qui était dans RecettesResults)
  const filters: RecetteFilters = {
    categorie: params.categorie,
    modele: params.modele as RecetteFilters["modele"],
    difficulte: params.difficulte as RecetteFilters["difficulte"],
    regime: params.regime,
    nutriscore: params.nutriscore as RecetteFilters["nutriscore"],
    tri: (params.tri as RecetteFilters["tri"]) || "recent",
    page: params.page ? parseInt(params.page) : 1,
    limit: DEFAULT_PAGE_SIZE,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl">Recettes</h1>
        <p className="text-muted-foreground mt-2">
          Trouvez la recette parfaite pour votre robot cuiseur.
        </p>
      </div>

      <Suspense fallback={<div className="h-20 skeleton rounded-xl" />}>
        <RecetteFiltres />
      </Suspense>

      <Suspense fallback={<SkeletonGrid count={12} />}>
        <RecettesListeClient filters={filters} />
      </Suspense>
    </div>
  );
}
