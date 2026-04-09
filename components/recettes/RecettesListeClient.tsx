"use client";

import { useRecettes } from "@/hooks/useRecettes";
import RecetteGrid from "./RecetteGrid";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import type { RecetteFilters } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RecettesListeClient({
  filters,
}: {
  filters: RecetteFilters;
}) {
  const { data, isLoading, error } = useRecettes(filters);

  if (isLoading) return <SkeletonGrid count={12} />;
  if (error)
    return <p className="text-error text-center py-10">Erreur de chargement</p>;
  if (!data?.data.length)
    return (
      <p className="text-muted-foreground text-center py-10">
        Aucune recette trouvée
      </p>
    );

  const totalPages = Math.ceil((data?.count || 0) / (filters.limit || 12));
  const currentPage = filters.page || 1;

  // Fonction pour construire l'URL de pagination
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (filters.categorie) params.set("categorie", filters.categorie);
    if (filters.modele) params.set("modele", filters.modele);
    if (filters.difficulte) params.set("difficulte", filters.difficulte);
    if (filters.regime) params.set("regime", filters.regime);
    if (filters.nutriscore) params.set("nutriscore", filters.nutriscore);
    if (filters.tri) params.set("tri", filters.tri);
    params.set("page", page.toString());
    return `/recettes?${params.toString()}`;
  };

  return (
    <>
      <RecetteGrid recettes={data.data} />
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {currentPage > 1 && (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Précédent
            </Link>
          )}
          <span className="px-4 py-2 text-sm text-muted-foreground">
            Page {currentPage} / {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover transition-colors"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </>
  );
}
