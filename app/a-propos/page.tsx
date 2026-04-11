// app/a-propos/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ChefHat, Heart, Sparkles, Users } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  title: `À propos de ${SITE_NAME}`,
  description: `Découvrez l'histoire et la mission de ${SITE_NAME} : partager des recettes originales et fiables pour robots cuiseurs multifonction, avec simulateur intégré et planificateur de repas.`,
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 space-y-12 animate-fade-in">
      {/* Hero */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <Logo className="w-20 h-auto" />
        </div>
        <h1 className="font-display font-bold text-4xl">
          À propos de <span className="text-accent">{SITE_NAME}</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          La cuisine maison, sans stress et avec passion.
        </p>
      </section>

      {/* Notre histoire */}
      <section className="glass-card p-8 space-y-4">
        <h2 className="font-display font-bold text-2xl flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-accent" />
          Notre histoire
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            <strong>{SITE_NAME}</strong> est né d&apos;une passion commune pour
            la cuisine au robot multifonction. Nous avons constaté que les
            recettes disponibles en ligne étaient souvent mal adaptées, peu
            fiables ou difficiles à suivre pour des débutants.
          </p>
          <p>
            Nous avons donc décidé de créer un espace où chaque recette est
            testée, détaillée et accompagnée d&apos;instructions claires pour
            votre robot. Notre objectif : vous faire gagner du temps et vous
            donner envie de cuisiner chaque jour.
          </p>
          <p>
            Aujourd&apos;hui, {SITE_NAME} est une communauté de passionnés qui
            partagent leurs meilleures créations, avec un simulateur intégré et
            un planificateur de repas pour simplifier votre quotidien.
          </p>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ValueCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Fiabilité"
          description="Chaque recette est vérifiée et approuvée avant publication. Vous pouvez cuisiner en toute confiance."
        />
        <ValueCard
          icon={<Users className="w-6 h-6" />}
          title="Communauté"
          description="Partagez vos propres recettes, notez celles des autres et échangez en commentaires."
        />
        <ValueCard
          icon={<Heart className="w-6 h-6" />}
          title="Passion"
          description="Nous aimons la bonne cuisine et nous vous transmettons cette passion à travers nos contenus."
        />
      </section>

      {/* Contact / techno */}
      <section className="glass-card p-8 space-y-4">
        <h2 className="font-display font-bold text-2xl">Technologie</h2>
        <p className="text-muted-foreground leading-relaxed">
          {SITE_NAME} est construit avec les technologies web modernes :
          Next.js, Supabase, Tailwind CSS. Le site est hébergé sur Vercel et
          optimisé pour une expérience rapide et fluide, que vous soyez sur
          mobile, tablette ou ordinateur.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Une question, une suggestion ? N&apos;hésitez pas à nous contacter via
          les réseaux sociaux ou à nous écrire à{" "}
          <a
            href="mailto:contact@mcmalnus.com"
            className="text-accent hover:underline"
          >
            contact@mcmalnus.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}

// Petit composant interne
function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card p-6 text-center space-y-3">
      <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
