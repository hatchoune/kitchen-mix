"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionnel : envoyer l'erreur à un service de monitoring
    console.error("Erreur capturée :", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="w-20 h-20 rounded-full bg-error/15 flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-error" />
      </div>
      <div className="space-y-2">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">
          Oups, une erreur s’est produite
        </h1>
        <p className="text-muted-foreground max-w-md">
          Nous rencontrons un problème technique. Veuillez réessayer ou revenir
          plus tard.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-hover transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Réessayer
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-border hover:bg-card-hover transition-colors text-sm"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
