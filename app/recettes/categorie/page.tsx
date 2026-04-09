import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RecetteGrid from "@/components/recettes/RecetteGrid";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import { getRecettes } from "@/lib/supabase/queries";
import { CATEGORIES, DEFAULT_PAGE_SIZE, SITE_URL } from "@/lib/constants";
import { getRecipeListJsonLd, safeJsonLd } from "@/lib/seo";
import type { RecetteFilters } from "@/types";

/* ─── Types ─────────────────────────────────────────────────── */

interface PageProps {
  params: Promise<{ categorie: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

/* ─── Helpers ───────────────────────────────────────────────── */

// Récupère l'objet catégorie depuis la valeur d'URL (ex: "desserts" → { value: "dessert", label: "Desserts" })
// On supporte les deux formes : "dessert" et "desserts" (avec ou sans s final)
function getCategorieFromSlug(slug: string) {
  return (
    CATEGORIES.find(
      (c) =>
        c.value === slug || c.value + "s" === slug || c.value === slug + "s",
    ) || null
  );
}

/* ─── generateStaticParams ──────────────────────────────────── */
// Pré-génère les pages au build pour toutes les catégories connues

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ categorie: c.value }));
}

/* ─── generateMetadata ──────────────────────────────────────── */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categorie: categorieSlug } = await params;
  const cat = getCategorieFromSlug(categorieSlug);
  if (!cat) return { title: "Catégorie introuvable" };

  const title = `Recettes ${cat.label} au robot cuiseur — Kitchen Mix`;
  const description = `Découvrez toutes nos recettes ${cat.label.toLowerCase()} pour robot cuiseur multifonction. Thermomix, Moulinex Companion, Magimix Cook Expert — faciles, rapides et gourmandes.`;
  const url = `${SITE_URL}/recettes/${cat.value}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "fr_FR",
      siteName: "Kitchen Mix",
    },
    robots: { index: true, follow: true },
  };
}

/* ─── Page ──────────────────────────────────────────────────── */

export const revalidate = 3600; // ISR 1h

export default async function RecetteCategorePage({
  params,
  searchParams,
}: PageProps) {
  const { categorie: categorieSlug } = await params;
  const cat = getCategorieFromSlug(categorieSlug);

  // Si la catégorie n'existe pas dans nos constantes → 404
  if (!cat) notFound();

  const sp = await searchParams;
  const currentPage = sp.page ? parseInt(sp.page) : 1;

  const filters: RecetteFilters = {
    categorie: cat.value,
    tri: (sp.tri as RecetteFilters["tri"]) || "recent",
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
  };

  const { data: recettes, count } = await getRecettes(filters);
  const totalPages = Math.ceil(count / DEFAULT_PAGE_SIZE);

  return (
    <div className="space-y-8">
      {/* JSON-LD ItemList pour cette catégorie */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getRecipeListJsonLd(recettes)),
        }}
      />

      {/* Fil d'Ariane */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-accent transition-colors">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/recettes" className="hover:text-accent transition-colors">
          Recettes
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{cat.label}</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl">
          Recettes {cat.label}
        </h1>
        <p className="text-muted-foreground mt-2">
          {count} recette{count > 1 ? "s" : ""} pour votre robot cuiseur
        </p>
      </div>

      {/* Grille */}
      {recettes.length > 0 ? (
        <RecetteGrid recettes={recettes} />
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p>Aucune recette dans cette catégorie pour le moment.</p>
          <Link
            href="/recettes"
            className="text-accent hover:underline mt-4 inline-block"
          >
            Voir toutes les recettes
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          {currentPage > 1 && (
            <Link
              href={`/recettes/${cat.value}?page=${currentPage - 1}`}
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
              href={`/recettes/${cat.value}?page=${currentPage + 1}`}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover transition-colors"
            >
              Suivant <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}

      {/* Liens internes vers les autres catégories — boost SEO maillage interne */}
      <div className="pt-8 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">Autres catégories</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.value !== cat.value).map((c) => (
            <Link
              key={c.value}
              href={`/recettes/${c.value}`}
              className="px-3 py-1.5 rounded-full text-sm border border-border hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-all"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
