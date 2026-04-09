"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4">
          <div className="w-20 h-20 rounded-full bg-error/15 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-error" />
          </div>
          <div className="space-y-2">
            <h1 className="font-display font-bold text-2xl sm:text-3xl">
              Erreur critique
            </h1>
            <p className="text-muted-foreground max-w-md">
              L’application a rencontré une erreur majeure. Veuillez rafraîchir
              la page.
            </p>
          </div>
          <button
            onClick={reset}
            className="px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-hover transition-colors"
          >
            Rafraîchir
          </button>
        </div>
      </body>
    </html>
  );
}
