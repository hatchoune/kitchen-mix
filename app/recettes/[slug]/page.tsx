import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat, Users, Printer, Share2, Zap } from "lucide-react";
import {
  getRecetteBySlug,
  getRecettesSimilaires,
} from "@/lib/supabase/queries";
import {
  getRecetteMetadata,
  getRecipeJsonLd,
  getBreadcrumbJsonLd,
  safeJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { formatDuree, tempsTotal } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import NutriScore from "@/components/ui/NutriScore";
import IngredientsAjustables from "@/components/recettes/IngredientsAjustables";
import VideoEmbed from "@/components/recettes/VideoEmbed";
import RecetteFAQ from "@/components/recettes/RecetteFAQ";
import RecetteComments from "@/components/recettes/RecetteComments";
import RecettesSimilaires from "@/components/recettes/RecettesSimilaires";
import RecetteDetailClient from "./RecetteDetailClient";
import { ChevronRight } from "lucide-react";
// ISR: revalider toutes les heures (3600s)
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recette = await getRecetteBySlug(slug);
  if (!recette) return { title: "Recette introuvable" };
  return getRecetteMetadata(recette);
}

export default async function RecetteDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recette = await getRecetteBySlug(slug);

  if (!recette) notFound();

  const similaires = await getRecettesSimilaires(recette, 3);
  const total = tempsTotal(recette.temps_preparation, recette.temps_cuisson);

  const REGIME_LABELS: Record<string, string> = {
    vegetarien: "Végétarien",
    vegan: "Vegan",
    "sans-gluten": "Sans gluten",
    "sans-lactose": "Sans lactose",
    keto: "Keto",
    halal: "Halal",
  };

  return (
    <article className="space-y-10">
      {/* JSON-LD Recipe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getRecipeJsonLd(recette)),
        }}
      />
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            getBreadcrumbJsonLd([
              { name: "Accueil", url: SITE_URL },
              { name: "Recettes", url: `${SITE_URL}/recettes` },
              {
                name: recette.titre,
                url: `${SITE_URL}/recettes/${recette.slug}`,
              },
            ]),
          ),
        }}
      />
      {/* Fil d'Ariane visible */}
      <nav className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground flex-wrap">
        <Link href="/" className="hover:text-accent transition-colors">
          Accueil
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/recettes" className="hover:text-accent transition-colors">
          Recettes
        </Link>
        {recette.categories[0] && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/recettes?categorie=${recette.categories[0]}`}
              className="hover:text-accent transition-colors capitalize"
            >
              {recette.categories[0]}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3 text-foreground/30" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {recette.titre}
        </span>
      </nav>
      {/* Hero image */}
      {recette.image_url && (
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden -mx-4 sm:mx-0">
          <Image
            src={recette.image_url}
            alt={`Recette ${recette.titre} – plat principal`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Title & badges */}
      <header className="space-y-4">
        <h1 className="font-display font-bold">{recette.titre}</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {recette.description}
        </p>

        {/* Meta badges */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="accent" size="md">
            <Clock className="w-3.5 h-3.5" /> {formatDuree(total)}
          </Badge>
          <Badge variant="default" size="md">
            Prépa {formatDuree(recette.temps_preparation)}
          </Badge>
          <Badge variant="default" size="md">
            Cuisson {formatDuree(recette.temps_cuisson)}
          </Badge>
          <Badge variant="default" size="md">
            <Users className="w-3.5 h-3.5" /> {recette.nombre_portions} portions
          </Badge>
          <Badge variant="default" size="md">
            {recette.difficulte === "facile"
              ? "🟢"
              : recette.difficulte === "moyen"
                ? "🟡"
                : "🔴"}{" "}
            {recette.difficulte.charAt(0).toUpperCase() +
              recette.difficulte.slice(1)}
          </Badge>

          {recette.modele_thermomix.map((m) => (
            <Badge key={m} variant="accent" size="md">
              {m}
            </Badge>
          ))}

          {recette.regime.map((r) => (
            <Badge key={r} variant="sage" size="md">
              {REGIME_LABELS[r] || r}
            </Badge>
          ))}
        </div>

        {/* Nutri-Score + Calories */}
        {(recette.nutriscore || recette.calories_par_portion) && (
          <div className="flex items-center gap-4">
            {recette.nutriscore && (
              <div className="flex items-center gap-2">
                <NutriScore score={recette.nutriscore} size="md" />
                {recette.nutriscore_note && (
                  <span className="text-xs text-muted-foreground italic">
                    {recette.nutriscore_note}
                  </span>
                )}
              </div>
            )}
            {recette.calories_par_portion && (
              <span className="text-sm text-muted-foreground">
                ~{recette.calories_par_portion} cal/portion{" "}
                <span className="text-xs italic">(indicatif)</span>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Client-side interactive section: rating, favori, simulator, print, share */}
      <RecetteDetailClient recette={recette} />

      {/* Two columns: ingredients + steps */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10">
        {/* Ingredients */}
        <aside>
          <IngredientsAjustables
            ingredients={recette.ingredients}
            portionsBase={recette.nombre_portions}
          />
        </aside>

        {/* Steps */}
        <section className="space-y-6">
          <h3 className="font-display font-bold text-lg">Préparation</h3>
          <ol className="space-y-6">
            {recette.etapes.map((etape) => (
              <li key={etape.numero} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 text-accent font-display font-bold text-sm flex items-center justify-center">
                  {etape.numero}
                </div>
                <div className="space-y-2 pt-1 flex-1">
                  <p className="text-sm leading-relaxed">{etape.instruction}</p>

                  {/* Thermomix params */}
                  {(etape.vitesse !== undefined ||
                    etape.temperature !== undefined ||
                    etape.duree !== undefined) && (
                    <div className="flex flex-wrap gap-2">
                      {etape.vitesse !== undefined && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                          <Zap className="w-3 h-3" /> Vit. {etape.vitesse}
                        </span>
                      )}
                      {etape.temperature !== undefined && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                          🌡 {etape.temperature}°C
                        </span>
                      )}
                      {etape.duree !== undefined && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                          ⏱ {Math.ceil(etape.duree / 60)} min
                        </span>
                      )}
                      {etape.accessoire && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-card text-muted-foreground text-xs">
                          🔧 {etape.accessoire}
                        </span>
                      )}
                    </div>
                  )}

                  {etape.conseil && (
                    <p className="text-xs text-accent/80 italic">
                      💡 {etape.conseil}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Video */}
      {recette.video_youtube_id && (
        <section className="space-y-4">
          <h3 className="font-display font-bold text-lg">Vidéo</h3>
          <VideoEmbed
            videoId={recette.video_youtube_id}
            title={recette.titre}
          />
        </section>
      )}

      {/* FAQ */}
      {recette.faq && <RecetteFAQ faq={recette.faq} />}

      {/* Commentaires */}
      <RecetteComments recetteId={recette.id} />

      {/* Similaires */}
      <RecettesSimilaires recettes={similaires} />
    </article>
  );
}
