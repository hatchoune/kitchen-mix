import Link from "next/link";
import { ArrowRight, Flame, Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import SearchBar from "@/components/ui/SearchBar";
import RecetteGrid from "@/components/recettes/RecetteGrid";
import { SkeletonGrid } from "@/components/ui/SkeletonCard";
import NewsletterForm from "@/components/ui/NewsletterForm";
import {
  getRecettesTendances,
  getDernieresRecettes,
} from "@/lib/supabase/queries";
import { getWebSiteJsonLd, getOrganizationJsonLd, safeJsonLd } from "@/lib/seo";
import { CATEGORIES } from "@/lib/constants";
import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import MonAppareilFilter from "@/components/ui/MonAppareilFilter";
import RotatingTypewriter from "@/components/ui/RotatingTypewriter";

export const metadata: Metadata = {
  title: "Kitchen Mix | Recettes pour Thermomix, Companion & Cook Expert",
  description:
    "Découvrez des centaines de recettes faciles et rapides pour votre robot cuiseur multifonction. Plats, desserts, soupes et planificateur de repas intégré.",
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* JSON-LD WebSite schema (sitelinks searchbox) */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(getWebSiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(getOrganizationJsonLd()),
        }}
      />
      {/* Hero */}
      <section className="text-center pt-12 pb-8 space-y-6">
        <RotatingTypewriter />
        <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
          Découvrez, cuisinez et partagez 🍛 Simulateur intégré, planificateur
          de repas 📆 et communauté passionnée.
        </p>

        <div className="max-w-lg mx-auto">
          <SearchBar size="large" placeholder="Que voulez-vous cuisiner ?" />
        </div>
      </section>

      {/* Category pills */}
      <section>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <MonAppareilFilter basePath="/recettes" />
          <Link
            href="/recettes?temps=express"
            className="px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all"
          >
            ⚡ Express
          </Link>
          <Link
            href="/recettes?temps=rapide"
            className="px-4 py-2 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all"
          >
            🕒 Rapide
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/recettes?categorie=${cat.value}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border hover:bg-accent/10 hover:text-accent hover:border-accent/20 transition-all"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Tendances — Bento grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-accent" />
            Tendances
          </h2>
          <Link
            href="/recettes?tri=populaire"
            className="flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Suspense fallback={<SkeletonGrid count={7} />}>
          <TendancesGrid />
        </Suspense>
      </section>

      {/* Dernières recettes */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-accent" />
            Dernières recettes
          </h2>
          <Link
            href="/recettes"
            className="flex items-center gap-1 text-sm text-accent hover:underline"
          >
            Tout voir <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Suspense fallback={<SkeletonGrid count={6} />}>
          <DernieresGrid />
        </Suspense>
      </section>

      {/* Newsletter */}
      <section className="max-w-xl mx-auto text-center space-y-4">
        <h2 className="font-display font-bold">
          Recevez nos meilleures recettes
        </h2>
        <p className="text-muted-foreground">
          Inscrivez-vous à notre newsletter pour recevoir chaque semaine de
          nouvelles recettes pour votre Robot Cuiseur Multifonction directement
          dans votre boîte mail.
        </p>
        <NewsletterForm />
      </section>
    </div>
  );
}

// ─── Async Server Components ─────────────────────────────────

async function TendancesGrid() {
  const recettes = await getRecettesTendances(7);
  return <RecetteGrid recettes={recettes} bento />;
}

async function DernieresGrid() {
  const recettes = await getDernieresRecettes(6);
  return <RecetteGrid recettes={recettes} />;
}
