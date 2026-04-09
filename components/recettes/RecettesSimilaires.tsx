import RecetteCard from "./RecetteCard";
import type { RecetteCard as RecetteCardType } from "@/types";

interface RecettesSimilairesProps {
  recettes: RecetteCardType[];
}

export default function RecettesSimilaires({ recettes }: RecettesSimilairesProps) {
  if (recettes.length === 0) return null;

  return (
    <section className="space-y-6">
      <h3 className="font-display font-bold text-xl">Recettes similaires</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recettes.map((r) => (
          <RecetteCard key={r.id} recette={r} />
        ))}
      </div>
    </section>
  );
}
