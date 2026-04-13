"use client";

import { useAuth } from "@/hooks/useAuth";
import { APPLIANCES } from "@/lib/appliance-specs";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Affiche un ou plusieurs pills "Mon appareil" cliquables
 * qui redirigent vers /recettes?modele=XXX
 * Ne s'affiche que si l'utilisateur est connecté et a des appareils configurés.
 */
export default function MonAppareilFilter({
  currentModele,
  basePath = "/recettes",
}: {
  currentModele?: string;
  basePath?: string;
}) {
  const { user, profil } = useAuth();

  if (!user || !profil) return null;

  // modele_thermomix est maintenant un TEXT[] en BDD
  const appareils: string[] = Array.isArray(profil.modele_thermomix)
    ? profil.modele_thermomix
    : [profil.modele_thermomix];

  if (appareils.length === 0) return null;

  return (
    <>
      {appareils.map((appId) => {
        const spec = APPLIANCES.find((a) => a.id === appId);
        if (!spec) return null;
        const isActive = currentModele === appId;

        return (
          <Link
            key={appId}
            href={isActive ? basePath : `${basePath}?modele=${appId}`}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium border transition-all inline-flex items-center gap-1.5",
              isActive
                ? "bg-accent text-black border-accent shadow-sm shadow-accent/20"
                : "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
            )}
          >
            🍳 {spec.label}
          </Link>
        );
      })}
    </>
  );
}
