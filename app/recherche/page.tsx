import type { Metadata } from "next";
import { Suspense } from "react";
import SearchBar from "@/components/ui/SearchBar";
import RecetteGrid from "@/components/recettes/RecetteGrid";
import RecetteFiltres from "@/components/recettes/RecetteFiltres";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { rechercherRecettes } from "@/app/actions/recherche";
import { SITE_URL, TEMPS_OPTIONS } from "@/lib/constants";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Rechercher une recette — Robot cuiseur multifonction",
  description:
    "Trouvez la recette parfaite pour votre robot cuiseur. Recherchez par nom, ingrédient, catégorie ou régime alimentaire.",
  alternates: { canonical: `${SITE_URL}/recherche` },
  robots: { index: false, follow: false }, // ← ajout
};

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function RecherchePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || "";

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="font-display font-bold text-3xl">Recherche</h1>
        <SearchBar defaultValue={query} size="large" autoFocus />
      </div>

      <Suspense fallback={<div className="h-16 skeleton rounded-xl" />}>
        <RecetteFiltres />
      </Suspense>

      {query ? (
        <Suspense fallback={<SkeletonGrid count={6} />}>
          <SearchResults query={query} params={params} />
        </Suspense>
      ) : (
        <div className="text-center py-20 space-y-4">
          <Search className="w-12 h-12 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground text-lg">
            Tapez un mot-clé pour chercher une recette.
          </p>
        </div>
      )}
    </div>
  );
}

async function SearchResults({
  query,
  params,
}: {
  query: string;
  params: Record<string, string | undefined>;
}) {
  const tempsOption = params.temps
    ? TEMPS_OPTIONS.find((t) => t.value === params.temps)
    : undefined;

  const { data: recettes, count } = await rechercherRecettes(query, {
    categorie: params.categorie,
    modele: params.modele,
    page: params.page ? parseInt(params.page) : 1,
    ...(tempsOption && {
      temps_min: tempsOption.min,
      temps_max: tempsOption.max,
    }),
  });

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {count} résultat{count > 1 ? "s" : ""} pour &quot;{query}&quot;
      </p>
      <RecetteGrid recettes={recettes} />
    </div>
  );
}
