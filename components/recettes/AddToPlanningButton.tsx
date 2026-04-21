"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AddToPlanningModal from "./AddToPlanningModal";
import type { Recette } from "@/types";

interface Props {
  recette: Pick<Recette, "id" | "slug" | "titre" | "image_url">;
}

/* =============================================================
   AddToPlanningButton
   -------------------------------------------------------------
   Bouton sur la page recette → ouvre AddToPlanningModal.
   Si non connecté, redirige vers la page de connexion avec
   retour sur la recette.
   ============================================================= */

export default function AddToPlanningButton({ recette }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) {
    return (
      <Link
        href={`/connexion?next=/recettes/${recette.slug}`}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-card border border-border hover:bg-card-hover transition-colors no-print"
        title="Connectez-vous pour ajouter cette recette à un planning"
        aria-label="Ajouter au planning (connexion requise)"
      >
        <CalendarPlus className="w-4 h-4" />
        <span className="hidden sm:inline">Ajouter au planning</span>
        <span className="sm:hidden">Planning</span>
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-accent/10 text-accent hover:bg-accent/20 border border-accent/25 transition-colors no-print"
        aria-label="Ajouter cette recette à un planning"
      >
        <CalendarPlus className="w-4 h-4" />
        <span className="hidden sm:inline">Ajouter au planning</span>
        <span className="sm:hidden">Planning</span>
      </button>

      {open && (
        <AddToPlanningModal
          recette={recette}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
