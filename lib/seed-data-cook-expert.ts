/* =============================================================
   Kitchen Mix — Cook Expert Lot 1
   Appareil : Magimix Cook Expert (id: "COOK_EXPERT")
   Commande  : npm run seed:cook-expert
   ============================================================= */

import type { Ingredient, EtapeThermomix, FAQItem } from "@/types";
import type { SeedRecette } from "./seed-types";

// Copie l'interface SeedRecette depuis seed-data-companion-lot1.ts
// (même interface, pas besoin de la redéfinir si tu l'exportes depuis un fichier commun)

export const SEED_RECETTES_COOK_EXPERT: SeedRecette[] = [
  {
    slug: "mousse-au-chocolat-magimix-cook-expert",
    titre: "Mousse au chocolat aérienne au Magimix Cook Expert",
    description:
      "Une mousse au chocolat classique et inratable. Le Cook Expert monte les blancs en neige parfaits grâce au batteur, puis incorpore délicatement le chocolat fondu. Légère, intense, prête en 20 minutes.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 5,
    difficulte: "facile",
    nombre_portions: 6,
    modele_thermomix: ["COOK_EXPERT"],
    categories: ["dessert"],
    regime: ["vegetarien", "sans-gluten"],
    tags: [
      "mousse",
      "chocolat",
      "dessert",
      "cook expert",
      "magimix",
      "classique",
      "rapide",
    ],
    calories_par_portion: 280,
    nutriscore: "D",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Chocolat noir 70%",
        quantite: 200,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Œufs (blancs et jaunes séparés)",
        quantite: 6,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Beurre",
        quantite: 40,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Sucre en poudre",
        quantite: 40,
        unite: "g",
        categorie: "Épicerie",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Casser le chocolat en morceaux. Mettre le chocolat et le beurre dans le bol transparent du Cook Expert. Lancer le programme Mixage à 50°C, vitesse 3, pendant 3 minutes jusqu'à fonte complète.",
        vitesse: 3,
        temperature: 50,
        duree: 180,
        accessoire: "Lame universelle",
        conseil:
          "Le bol transparent permet de surveiller la fonte sans ouvrir. Ne pas dépasser 55°C — le chocolat granulerait.",
      },
      {
        numero: 2,
        instruction:
          "Retirer le bol du socle. Laisser tiédir 5 minutes. Ajouter les 6 jaunes d'œufs un par un dans le chocolat fondu en mélangeant à la spatule. Réserver.",
        conseil:
          "Le chocolat doit être tiède, pas chaud — si trop chaud, les jaunes cuisent et font des grumeaux.",
      },
      {
        numero: 3,
        instruction:
          "Bien laver et sécher le bol. Installer le batteur. Mettre les 6 blancs d'œufs et la pincée de sel. Lancer vitesse 14, sans température, pendant 2 minutes.",
        vitesse: 14,
        duree: 120,
        accessoire: "Batteur",
        conseil:
          "Le bol doit être parfaitement propre et sec — la moindre trace de gras empêche les blancs de monter.",
      },
      {
        numero: 4,
        instruction:
          "Quand les blancs commencent à mousser, ajouter le sucre en pluie fine et continuer à vitesse 16 pendant 1 minute 30 jusqu'à obtenir des blancs bien fermes qui forment un bec d'oiseau.",
        vitesse: 16,
        duree: 90,
        accessoire: "Batteur",
      },
      {
        numero: 5,
        instruction:
          "Incorporer d'abord une grosse cuillère de blancs en neige dans le chocolat et mélanger vigoureusement à la spatule pour détendre la masse. Ensuite verser le reste des blancs en 2 fois, en soulevant délicatement de bas en haut pour ne pas les casser.",
        conseil:
          "Ne jamais utiliser le robot pour cette étape — l'incorporation se fait obligatoirement à la main avec une maryse.",
      },
      {
        numero: 6,
        instruction:
          "Répartir la mousse dans 6 ramequins ou verrines. Filmer et réfrigérer minimum 3 heures avant de servir.",
        duree: 10800,
        conseil:
          "La mousse est encore meilleure le lendemain. Elle se garde 48h au frigo.",
      },
    ],
    faq: [
      {
        question: "Peut-on utiliser du chocolat au lait ?",
        reponse:
          "Oui, mais réduire le sucre à 20g car le chocolat au lait est déjà sucré. La mousse sera moins intense et un peu plus sucrée.",
      },
      {
        question: "Pourquoi mes blancs ne montent pas ?",
        reponse:
          "Deux causes possibles : le bol n'était pas parfaitement propre (trace de gras ou de jaune), ou les œufs étaient trop froids. Les blancs à température ambiante montent mieux.",
      },
      {
        question: "Peut-on congeler la mousse ?",
        reponse:
          "Non — la congélation casse la structure aérée des blancs. La mousse devient granuleuse et perd sa légèreté.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },
];
