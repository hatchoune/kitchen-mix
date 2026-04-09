/* =============================================================
   Kitchen Mix — Companion Lot 1 : 1 recette
   Appareil : Moulinex Companion (id: "COMPANION")

   INTÉGRATION : voir scripts/seed-companion.ts
   Commande   : npm run seed:companion
   ============================================================= */

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

export const SEED_RECETTES_COMPANION_LOT1: SeedRecette[] = [
  {
    slug: "blanquette-de-veau-moulinex-companion",
    titre: "Blanquette de veau classique au Moulinex Companion",
    description:
      "Une blanquette de veau onctueuse et parfumée, mijotée doucement dans une sauce veloutée aux champignons. Le Companion s'occupe de tout, de la cuisson de la viande à la liaison de la sauce. Un grand classique de la cuisine française réussi sans surveillance.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 55,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COMPANION"],
    categories: ["plat"],
    regime: [],
    tags: [
      "blanquette",
      "veau",
      "sauce blanche",
      "classique",
      "familial",
      "companion",
      "moulinex",
    ],
    calories_par_portion: 420,
    nutriscore: "C",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Veau (épaule ou tendron), coupé en cubes de 4 cm",
        quantite: 800,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Champignons de Paris",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Carottes",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouquet garni",
        quantite: 1,
        unite: "pièce",
        categorie: "Épicerie",
      },
      {
        nom: "Bouillon de volaille chaud",
        quantite: 500,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Crème fraîche épaisse",
        quantite: 150,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Beurre",
        quantite: 30,
        unite: "g",
        categorie: "Produits laitiers",
      },
      { nom: "Farine", quantite: 30, unite: "g", categorie: "Épicerie" },
      {
        nom: "Jaunes d'œufs",
        quantite: 2,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Jus de citron",
        quantite: 1,
        unite: "c. à soupe",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Éplucher et couper les carottes en rondelles. Émincer l'oignon. Nettoyer et trancher les champignons en lamelles. Réserver.",
        conseil:
          "Tout préparer avant de démarrer le Companion — une fois lancé, ça va vite.",
      },
      {
        numero: 2,
        instruction:
          "Installer le mélangeur dans le bol du Companion. Ajouter le beurre, l'oignon et les carottes. Lancer en mode Sauter à 130°C, vitesse 3, pendant 5 minutes.",
        vitesse: 3,
        temperature: 130,
        duree: 300,
        accessoire: "Mélangeur",
      },
      {
        numero: 3,
        instruction:
          "Ajouter les cubes de veau dans le bol. Continuer en mode Sauter à 130°C, vitesse 2, pendant 3 minutes pour saisir légèrement la viande.",
        vitesse: 2,
        temperature: 130,
        duree: 180,
        accessoire: "Mélangeur",
        conseil:
          "On ne cherche pas à bien dorer — juste à saisir la surface pour garder le jus à l'intérieur.",
      },
      {
        numero: 4,
        instruction:
          "Saupoudrer la farine sur la viande et mélanger. Verser le bouillon chaud, ajouter le bouquet garni. Passer en mode Mijoter à 90°C, vitesse 1, pendant 35 minutes.",
        vitesse: 1,
        temperature: 90,
        duree: 2100,
        accessoire: "Mélangeur",
        conseil:
          "Le bouillon doit être chaud — un bouillon froid ralentirait la montée en température et durcirait la viande.",
      },
      {
        numero: 5,
        instruction:
          "Ajouter les champignons en lamelles. Prolonger la cuisson en mode Mijoter à 90°C, vitesse 1, pendant 10 minutes.",
        vitesse: 1,
        temperature: 90,
        duree: 600,
        accessoire: "Mélangeur",
      },
      {
        numero: 6,
        instruction:
          "Pendant ce temps, dans un bol à part, fouetter la crème fraîche avec les 2 jaunes d'œufs et le jus de citron. Retirer le bouquet garni du Companion. Baisser à 70°C, vitesse 2. Verser le mélange crème-jaunes en filet et laisser épaissir 2 minutes. Saler, poivrer. Servir aussitôt avec du riz blanc ou des pommes vapeur.",
        vitesse: 2,
        temperature: 70,
        duree: 120,
        accessoire: "Mélangeur",
        conseil:
          "Ne jamais dépasser 80°C après l'ajout des jaunes — ils coaguleraient et la sauce deviendrait granuleuse. Si ça arrive, mixer à vitesse 5 pendant 10 secondes pour rattraper.",
      },
    ],
    faq: [
      {
        question: "Peut-on préparer la blanquette la veille ?",
        reponse:
          "Oui, et c'est même conseillé — les saveurs se développent au repos. Conserver au frigo et réchauffer à 70°C en mode Mijoter, sans faire bouillir pour ne pas casser la sauce.",
      },
      {
        question: "Quelle coupe de veau utiliser ?",
        reponse:
          "L'épaule est idéale pour sa texture tendre après mijotage. Le tendron est plus gélatineux et donne une sauce encore plus onctueuse. Éviter le filet ou la noix — ils sèchent à la cuisson longue.",
      },
      {
        question: "Peut-on remplacer le veau par du poulet ?",
        reponse:
          "Oui, avec des cuisses de poulet désossées. Réduire le temps de mijotage de l'étape 4 à 25 minutes au lieu de 35.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },
];
