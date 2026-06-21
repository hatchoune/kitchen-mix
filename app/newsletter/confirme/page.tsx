// app/newsletter/confirme/page.tsx

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inscription confirmée — Kitchen Mix",
  description: "Votre inscription à la newsletter Kitchen Mix est confirmée.",
};

export default function NewsletterConfirmePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center space-y-8">

        {/* Logo */}
        <Link href="/" className="inline-block">
          <Logo />
        </Link>

        {/* Icône succès */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 mx-auto">
          <span className="text-4xl">🎉</span>
        </div>

        {/* Texte */}
        <div className="space-y-3">
          <h1 className="font-display font-bold text-3xl text-foreground uppercase tracking-tight">
            C'est confirmé !
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            Bienvenue dans la newsletter Kitchen Mix.<br />
            Tu recevras nos meilleures recettes directement dans ta boîte mail.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/recettes"
            className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold px-6 py-3 rounded-full hover:bg-accent/90 transition-colors"
          >
            Voir les recettes
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-6 py-3 rounded-full hover:bg-muted transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>

      </div>
    </div>
  );
}
