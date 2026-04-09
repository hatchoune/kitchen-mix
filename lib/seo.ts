/* =============================================================
   Kitchen Mix — SEO Utilities (Enhanced 2026)
   Génération de metadata Next.js, JSON-LD schema.org,
   googleBot, canonical URLs, breadcrumbs, WebSite schema.
   ============================================================= */

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";
import type { Recette, FAQItem } from "@/types";
import { formatDuree } from "@/lib/utils";

// ─── Sanitisation JSON-LD (protection XSS) ──────────────────
export function safeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ─── Metadata par défaut (root layout) ──────────────────────

export function getDefaultMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} — Recettes pour robot cuiseur multifonction`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: `${SITE_NAME} — Recettes robot cuiseur multifonction`,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — Recettes robot cuiseur multifonction`,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    verification: {
      // Ajouter ici quand disponible :
      // google: "votre-code-google-search-console",
    },
    category: "food",
  };
}

// ─── Metadata pour une page statique quelconque ──────────────

export function getPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title: opts.title,
      description: opts.description,
      url,
    },
    ...(opts.noIndex && {
      robots: { index: false, follow: false },
    }),
  };
}

// ─── Metadata pour une page recette ──────────────────────────

export function getRecetteMetadata(recette: Recette): Metadata {
  const title = `${recette.titre} — Recette robot cuiseur multifonction ${recette.difficulte}`;
  const description = recette.description.slice(0, 155) + "…";
  const url = `${SITE_URL}/recettes/${recette.slug}`;
  const totalMin = recette.temps_preparation + recette.temps_cuisson;

  // Enrichir la description avec des données clés (SEO snippet)
  const richDescription = `${recette.description.slice(0, 120)}. ${formatDuree(totalMin)} · ${recette.difficulte} · ${recette.nombre_portions} portions.`;

  return {
    title,
    description: richDescription.slice(0, 160),
    keywords: [
      recette.titre,
      "recette robot cuiseur multifonction",
      ...recette.tags,
      ...recette.modele_thermomix.map((m) => `recette ${m}`),
      ...recette.categories,
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: recette.image_url
        ? [
            {
              url: recette.image_url,
              width: 1200,
              height: 630,
              alt: recette.titre,
            },
          ]
        : [
            {
              url: `${SITE_URL}/recettes/${recette.slug}/opengraph-image`,
              width: 1200,
              height: 630,
              alt: recette.titre,
            },
          ],
      publishedTime: recette.created_at,
      modifiedTime: recette.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

// ─── JSON-LD Recipe schema.org (enhanced) ────────────────────

export function getRecipeJsonLd(recette: Recette): object {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recette.titre,
    description: recette.description,
    image: recette.image_url
      ? [recette.image_url]
      : [`${SITE_URL}/recettes/${recette.slug}/opengraph-image`],
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    datePublished: recette.created_at,
    dateModified: recette.updated_at,
    prepTime: `PT${recette.temps_preparation}M`,
    cookTime: `PT${recette.temps_cuisson}M`,
    totalTime: `PT${recette.temps_preparation + recette.temps_cuisson}M`,
    recipeYield: `${recette.nombre_portions} portions`,
    recipeCategory: recette.categories[0] || "Plat",
    recipeCuisine: "Française",
    suitableForDiet:
      recette.regime.length > 0
        ? recette.regime
            .map((r) => {
              const map: Record<string, string> = {
                vegetarien: "https://schema.org/VegetarianDiet",
                vegan: "https://schema.org/VeganDiet",
                "sans-gluten": "https://schema.org/GlutenFreeDiet",
                "sans-lactose": "https://schema.org/LowLactoseDiet",
                halal: "https://schema.org/HalalDiet",
                keto: "https://schema.org/LowCarbohydrateDiet",
              };
              return map[r];
            })
            .filter(Boolean)
        : undefined,
    keywords: [
      ...recette.tags,
      "robot cuiseur multifonction",
      ...recette.modele_thermomix.map((m) => `recette ${m}`),
    ].join(", "),
    recipeIngredient: recette.ingredients.map(
      (i) => `${i.quantite} ${i.unite} ${i.nom}`,
    ),
    recipeInstructions: recette.etapes.map((e, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Étape ${e.numero}`,
      text: e.instruction,
      ...(e.duree && {
        timeRequired: `PT${Math.ceil(e.duree / 60)}M`,
      }),
    })),
    nutrition: recette.calories_par_portion
      ? {
          "@type": "NutritionInformation",
          calories: `${recette.calories_par_portion} calories`,
        }
      : undefined,
    aggregateRating:
      recette.nombre_notes > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: recette.note_moyenne,
            ratingCount: recette.nombre_notes,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    video: recette.video_youtube_id
      ? {
          "@type": "VideoObject",
          name: `${recette.titre} — Vidéo`,
          description: `Préparation de ${recette.titre} au Robot Cuiseur Multifonction`,
          thumbnailUrl: `https://img.youtube.com/vi/${recette.video_youtube_id}/maxresdefault.jpg`,
          contentUrl: `https://www.youtube.com/watch?v=${recette.video_youtube_id}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${recette.video_youtube_id}`,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/recettes/${recette.slug}`,
    },
  };
}

// ─── JSON-LD BreadcrumbList ──────────────────────────────────

export function getBreadcrumbJsonLd(
  items: { name: string; url: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── JSON-LD WebSite (pour le sitelinks searchbox Google) ────

export function getWebSiteJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/recherche?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── JSON-LD ItemList (pour les pages de liste) ──────────────

export function getRecipeListJsonLd(
  recettes: { titre: string; slug: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: recettes.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/recettes/${r.slug}`,
      name: r.titre,
    })),
  };
}

// ─── JSON-LD FAQPage ─────────────────────────────────────────

export function getFaqJsonLd(faq: FAQItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.reponse,
      },
    })),
  };
}
// ─── JSON-LD Organization ────────────────────────────────────

export function getOrganizationJsonLd(): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.svg`,
    },
    description: SITE_DESCRIPTION,
  };
}
// ─── Helper pour temps lisible dans les schemas ──────────────

export function formatDureeSchema(minutes: number): string {
  return formatDuree(minutes);
}
