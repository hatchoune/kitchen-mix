import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const currentPage = params.page ? Math.max(1, parseInt(params.page)) : 1;

  const filters: RecetteFilters = {
    categorie: params.categorie,
    modele: params.modele as RecetteFilters["modele"],
    difficulte: params.difficulte as RecetteFilters["difficulte"],
    regime: params.regime,
    nutriscore: params.nutriscore as RecetteFilters["nutriscore"],
    tri: (params.tri as RecetteFilters["tri"]) || "recent",
    page: currentPage,
    limit: DEFAULT_PAGE_SIZE,
    ...(tempsOption && {
      temps_min: tempsOption.min,
      temps_max: tempsOption.max,
    }),
    q: query || undefined,
  };

  // Détermine si on doit scroller (recherche textuelle, filtre actif, ou page > 1)
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
          <Suspense
            // Clé sur tous les params : force un re-mount du Suspense au
            // changement de filtre OU de page → on revoit le SkeletonGrid
            // pendant que la nouvelle page charge, plutôt qu'un écran figé.
            key={JSON.stringify(params)}
            fallback={<SkeletonGrid count={12} />}
          >
            <SearchResults
              filters={filters}
              query={query}
              currentPage={currentPage}
              rawParams={params}
            />
          </Suspense>
        </div>
      </ScrollToResults>
    </div>
  );
}

/* ─── Helper : construit une URL de pagination en préservant tous les filtres ─── */

function buildPageUrl(
  rawParams: Record<string, string | undefined>,
  page: number,
): string {
  const sp = new URLSearchParams();
  for (const [key, value] of Object.entries(rawParams)) {
    if (key === "page") continue; // on remplace
    if (value === undefined || value === "") continue;
    sp.set(key, value);
  }
  if (page > 1) sp.set("page", page.toString());
  // Hash #search-results → scroll auto vers la grille au changement de page
  const qs = sp.toString();
  return `/recettes${qs ? `?${qs}` : ""}#search-results`;
}

/* ─── Résultats + pagination ─── */

async function SearchResults({
  filters,
  query,
  currentPage,
  rawParams,
}: {
  filters: RecetteFilters;
  query: string;
  currentPage: number;
  rawParams: Record<string, string | undefined>;
}) {
  const { data: recettes, count } = await rechercherRecettes(
    filters.q || "",
    filters,
  );

  const limit = filters.limit || DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(count / limit));

  // Sécurité : si l'utilisateur tape ?page=999 sur 4 pages réelles,
  // on lui montre quand même un état propre (la requête renverra
  // un tableau vide, et on affiche "Aucune recette trouvée").
  const pageOutOfRange = count > 0 && currentPage > totalPages;

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          {count} résultat{count > 1 ? "s" : ""}
          {query ? ` pour "${query}"` : ""}
          {totalPages > 1 && !pageOutOfRange && (
            <>
              {" "}· page {currentPage} sur {totalPages}
            </>
          )}
        </p>
      </div>

      {pageOutOfRange ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-muted-foreground">
            Cette page n&apos;existe pas (il y a seulement {totalPages} page
            {totalPages > 1 ? "s" : ""} de résultats).
          </p>
          <Link
            href={buildPageUrl(rawParams, 1)}
            className="inline-block text-accent hover:underline"
          >
            Revenir à la page 1
          </Link>
        </div>
      ) : (
        <RecetteGrid recettes={recettes} />
      )}

      {/* Pagination — affichée seulement s'il y a plus d'une page */}
      {totalPages > 1 && !pageOutOfRange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildHref={(p) => buildPageUrl(rawParams, p)}
        />
      )}
    </>
  );
}

/* ─── Composant pagination (numéroté + Précédent/Suivant) ─── */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}

function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: PaginationProps) {
  // Calcule la fenêtre de pages à afficher (max 5 numéros + 1ère/dernière
  // avec ellipses si besoin). Pour 47 résultats / 12 par page = 4 pages,
  // on aura : « < 1 2 3 4 > » sans ellipse.
  const pageNumbers = computeVisiblePages(currentPage, totalPages);

  return (
    <nav
      className="flex items-center justify-center gap-1 sm:gap-2 pt-8 flex-wrap"
      aria-label="Pagination des résultats"
    >
      {/* Précédent */}
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          rel="prev"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover hover:border-accent/30 transition-colors"
          aria-label="Page précédente"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Précédent</span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground/50 cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Précédent</span>
        </span>
      )}

      {/* Numéros de pages */}
      {pageNumbers.map((p, idx) =>
        p === "…" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-2 text-sm text-muted-foreground"
            aria-hidden="true"
          >
            …
          </span>
        ) : p === currentPage ? (
          <span
            key={p}
            aria-current="page"
            className="min-w-[2.5rem] text-center px-3 py-2 rounded-lg bg-accent text-black border border-accent text-sm font-bold"
          >
            {p}
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className="min-w-[2.5rem] text-center px-3 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover hover:border-accent/30 transition-colors"
            aria-label={`Page ${p}`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Suivant */}
      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          rel="next"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg bg-card border border-border text-sm hover:bg-card-hover hover:border-accent/30 transition-colors"
          aria-label="Page suivante"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground/50 cursor-not-allowed"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </span>
      )}
    </nav>
  );
}

/* ─── Helper : génère la liste compacte de numéros à afficher ───
   - Toujours afficher la 1ère et la dernière
   - Toujours afficher [current-1, current, current+1]
   - Ellipses entre groupes non-contigus
   Exemples (sur 10 pages) :
     current=1  → 1 2 3 … 10
     current=5  → 1 … 4 5 6 … 10
     current=10 → 1 … 8 9 10
*/
function computeVisiblePages(
  current: number,
  total: number,
): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [];
  const window = new Set<number>([
    1,
    total,
    current - 1,
    current,
    current + 1,
  ]);
  // Ajoute les voisins immédiats des bornes pour un visuel plus dense
  if (current <= 3) {
    window.add(2);
    window.add(3);
  }
  if (current >= total - 2) {
    window.add(total - 1);
    window.add(total - 2);
  }

  const sorted = Array.from(window)
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);

  let prev = 0;
  for (const n of sorted) {
    if (n - prev > 1) pages.push("…");
    pages.push(n);
    prev = n;
  }
  return pages;
}
