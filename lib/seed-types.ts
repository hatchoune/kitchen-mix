import type { Ingredient, EtapeThermomix, FAQItem } from "@/types";

export interface SeedRecette {
  slug: string;
  titre: string;
  description: string;
  image_url: string | null;
  video_youtube_id: string | null;
  temps_preparation: number;
  temps_cuisson: number;
  difficulte: "facile" | "moyen" | "difficile";
  nombre_portions: number;
  modele_thermomix: string[];
  categories: string[];
  regime: string[];
  tags: string[];
  calories_par_portion: number | null;
  nutriscore: string | null;
  nutriscore_note: string | null;
  ingredients: Ingredient[];
  etapes: EtapeThermomix[];
  faq: FAQItem[] | null;
  approuve: boolean;
  publie: boolean;
  vues: number;
}
