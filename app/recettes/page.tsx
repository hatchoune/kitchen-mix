import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "@/components/ui/SearchBar";
import RecetteGrid from "@/components/recettes/RecetteGrid";
import RecetteFiltres from "@/components/recettes/RecetteFiltres";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { rechercherRecettes } from "@/app/actions/recherche";
import { DEFAULT_PAGE_SIZE, SITE_URL, TEMPS_OPTIONS } from "@/lib/constants";
import type { RecetteFilters } from "@/types";
import ScrollToResults from "./ScrollToResults";

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
  const query = params.q || "";

  const tempsOption = params.temps
    ? TEMPS_OPTIONS.find((t) => t.value === params.temps)
    : undefined;

  const filters: RecetteFilters = {
    categorie: params.categorie,
    modele: params.modele as RecetteFilters["modele"],
    difficulte: params.difficulte as RecetteFilters["difficulte"],
    regime: params.regime,
    nutriscore: params.nutriscore as RecetteFilters["nutriscore"],
    tri: (params.tri as RecetteFilters["tri"]) || "recent",
    page: params.page ? parseInt(params.page) : 1,
    limit: DEFAULT_PAGE_SIZE,
    ...(tempsOption && {
      temps_min: tempsOption.min,
      temps_max: tempsOption.max,
    }),
    q: query || undefined,
  };

  // Détermine si on doit scroller (recherche textuelle ou au moins un filtre actif)
  const hasFilters = Object.entries(params).some(
    ([key, value]) => key !== "q" && value !== undefined && value !== "",
  );
  const shouldScroll = query !== "" || hasFilters;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display font-bold text-3xl">
          {query ? `Recherche : "${query}"` : "Toutes les recettes"}
        </h1>
        <SearchBar defaultValue={query} size="large" />
      </div>

      <Suspense fallback={<div className="h-16 skeleton rounded-xl" />}>
        <RecetteFiltres />
      </Suspense>

      <ScrollToResults shouldScroll={shouldScroll}>
        <div id="search-results" className="space-y-4 scroll-mt-20">
          <Suspense fallback={<SkeletonGrid count={12} />}>
            <SearchResults filters={filters} query={query} />
          </Suspense>
        </div>
      </ScrollToResults>
    </div>
  );
}

async function SearchResults({
  filters,
  query,
}: {
  filters: RecetteFilters;
  query: string;
}) {
  const { data: recettes, count } = await rechercherRecettes(
    filters.q || "",
    filters,
  );

  return (
    <>
      <p className="text-sm text-muted-foreground">
        {count} résultat{count > 1 ? "s" : ""}
        {query ? ` pour "${query}"` : ""}
      </p>
      <RecetteGrid recettes={recettes} />
    </>
  );
}
