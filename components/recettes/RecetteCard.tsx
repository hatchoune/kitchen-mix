import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import NutriScore from "@/components/ui/NutriScore";
import { formatDuree, tempsTotal, cn } from "@/lib/utils";
import type { RecetteCard as RecetteCardType } from "@/types";
import RecipeImage from "@/components/ui/RecipeImage"; // À ajouter en haut
import { APPLIANCES } from "@/lib/appliance-specs";

interface RecetteCardProps {
  recette: RecetteCardType;
  featured?: boolean;
}

const REGIME_LABELS: Record<string, string> = {
  vegetarien: "Végétarien",
  vegan: "Vegan",
  "sans-gluten": "Sans gluten",
  "sans-lactose": "Sans lactose",
  keto: "Keto",
  halal: "Halal",
};

export default function RecetteCard({
  recette,
  featured = false,
}: RecetteCardProps) {
  const total = tempsTotal(recette.temps_preparation, recette.temps_cuisson);

  return (
    <Link
      href={`/recettes/${recette.slug}`}
      className={cn(
        "glass-card overflow-hidden group block",
        featured && "sm:col-span-2 sm:row-span-2",
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10]" : "aspect-[4/3]",
        )}
      >
        {recette.image_url ? (
          <RecipeImage
            src={recette.image_url}
            alt={`Plat : ${recette.titre}`}
            featured={featured}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Logo className="w-12 h-auto opacity-30" />{" "}
          </div>
        )}

        {/* Nutri-Score overlay */}
        {recette.nutriscore && (
          <div className="absolute top-3 right-3">
            <NutriScore score={recette.nutriscore} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3
          className={cn(
            "font-display font-bold line-clamp-2 group-hover:text-accent transition-colors",
            featured ? "text-xl" : "text-base",
          )}
        >
          {recette.titre}
        </h3>

        {featured && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {recette.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {formatDuree(total)}
          </span>
          <span className="capitalize">{recette.difficulte}</span>
          <span>{recette.nombre_portions} portions</span>
        </div>

        {/* Rating */}
        {recette.note_moyenne > 0 && (
          <StarRating
            rating={recette.note_moyenne}
            count={recette.nombre_notes}
            size="sm"
          />
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {recette.modele_thermomix.map((m) => {
            // Chercher le label propre de l'appareil
            const label = APPLIANCES.find((a) => a.id === m)?.label || m;
            return (
              <Badge key={m} variant="accent" size="sm">
                {label}
              </Badge>
            );
          })}
          {recette.regime.slice(0, 2).map((r) => (
            <Badge key={r} variant="sage" size="sm">
              {REGIME_LABELS[r] || r}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
