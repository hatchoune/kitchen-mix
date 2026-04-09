import RecetteCard from "./RecetteCard";
import type { RecetteCard as RecetteCardType } from "@/types";

interface RecetteGridProps {
  recettes: RecetteCardType[];
  bento?: boolean; // first card spans 2 cols
}

export default function RecetteGrid({ recettes, bento = false }: RecetteGridProps) {
  if (recettes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">Aucune recette trouvée.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recettes.map((recette, index) => (
        <RecetteCard
          key={recette.id}
          recette={recette}
          featured={bento && index === 0}
        />
      ))}
    </div>
  );
}
