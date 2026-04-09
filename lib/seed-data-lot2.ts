/* =============================================================
   Kitchen Mix — Lot 2 : 9 nouvelles recettes
   3 entrées · 3 plats · 3 desserts
   
   INTÉGRATION : voir scripts/seed-lot2.ts
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

export const SEED_RECETTES_LOT2: SeedRecette[] = [
  // ═══════════════════════════════════════════════════════════════
  // ENTRÉES (3)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: "soupe-butternut-lait-de-coco",
    titre: "Soupe de butternut au lait de coco",
    description:
      "Une soupe veloutée et légèrement exotique. La butternut apporte la douceur, le lait de coco la rondeur, et une pointe de curry réveille le tout. Un classique automnal revisité au Thermomix.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 25,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["soupe", "entree"],
    regime: ["vegan", "sans-gluten"],
    tags: ["butternut", "lait de coco", "soupe", "curry", "automne", "vegan"],
    calories_par_portion: 165,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Butternut (épluchée, coupée en cubes)",
        quantite: 600,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousse d'ail",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Lait de coco",
        quantite: 200,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Bouillon de légumes",
        quantite: 400,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Curry en poudre",
        quantite: 1,
        unite: "c. à café",
        categorie: "Condiments",
      },
      {
        nom: "Huile d'olive",
        quantite: 1,
        unite: "c. à soupe",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Graines de courge (topping)",
        quantite: 20,
        unite: "g",
        categorie: "Épicerie",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Éplucher l'oignon et l'ail, les mettre dans le bol et hacher.",
        vitesse: 5,
        duree: 5,
      },
      {
        numero: 2,
        instruction: "Ajouter l'huile d'olive et faire revenir.",
        vitesse: 2,
        temperature: 120,
        duree: 180,
        accessoire: "spatule",
      },
      {
        numero: 3,
        instruction:
          "Ajouter les cubes de butternut, le bouillon de légumes et le curry. Cuire.",
        vitesse: 1,
        temperature: 100,
        duree: 1200,
        conseil: "Les cubes doivent être bien tendres à la fin de la cuisson.",
      },
      {
        numero: 4,
        instruction:
          "Ajouter le lait de coco, saler, poivrer. Mixer progressivement.",
        vitesse: 10,
        duree: 60,
        conseil:
          "Monter de vitesse 5 à 10 sur 30 secondes pour un velouté parfait.",
      },
      {
        numero: 5,
        instruction:
          "Servir dans des bols, garnir de graines de courge et d'un filet de lait de coco.",
      },
    ],
    faq: [
      {
        question: "Puis-je remplacer la butternut par du potimarron ?",
        reponse:
          "Oui, le potimarron fonctionne très bien et n'a même pas besoin d'être épluché si bio.",
      },
      {
        question: "La soupe se congèle-t-elle ?",
        reponse:
          "Parfaitement. Congelez sans les graines de courge, elles ramollissent à la décongélation.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 420,
  },

  {
    slug: "mousse-avocat-citron-vert",
    titre: "Mousse d'avocat au citron vert",
    description:
      "Une entrée fraîche et express en 5 minutes chrono. L'avocat donne une texture soyeuse, le citron vert apporte du peps, et le piment d'Espelette une touche subtile. Parfait en verrine.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 0,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["entree", "aperitif"],
    regime: ["vegan", "sans-gluten"],
    tags: ["avocat", "citron vert", "mousse", "verrine", "rapide", "frais"],
    calories_par_portion: 140,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Avocats mûrs",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Jus de citron vert",
        quantite: 30,
        unite: "ml",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Zeste de citron vert",
        quantite: 1,
        unite: "pincée",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Yaourt végétal (ou crème fraîche)",
        quantite: 80,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Gousse d'ail",
        quantite: 0.5,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Huile d'olive",
        quantite: 1,
        unite: "c. à soupe",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Piment d'Espelette",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Ciboulette ciselée",
        quantite: 5,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Mettre la demi-gousse d'ail dans le bol et hacher.",
        vitesse: 7,
        duree: 3,
      },
      {
        numero: 2,
        instruction:
          "Ajouter la chair des avocats, le jus et zeste de citron vert, le yaourt, l'huile d'olive, le sel et le piment. Mixer.",
        vitesse: 6,
        duree: 30,
        conseil:
          "Racler les bords avec la spatule si besoin pour une texture homogène.",
      },
      {
        numero: 3,
        instruction:
          "Goûter et ajuster l'assaisonnement (sel, citron, piment). Mixer à nouveau brièvement si nécessaire.",
        vitesse: 4,
        duree: 10,
      },
      {
        numero: 4,
        instruction:
          "Répartir dans 4 verrines, saupoudrer de piment d'Espelette et de ciboulette. Servir frais.",
        conseil:
          "Se prépare 30 min à l'avance max — l'avocat s'oxyde vite. Le citron ralentit le brunissement.",
      },
    ],
    faq: [
      {
        question: "Comment empêcher l'avocat de brunir ?",
        reponse:
          "Le jus de citron vert protège bien. Vous pouvez aussi filmer au contact et réfrigérer.",
      },
      {
        question: "Puis-je servir avec du pain grillé ?",
        reponse:
          "Absolument ! Des mouillettes de pain de campagne grillé ou des crackers sans gluten accompagnent parfaitement.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 310,
  },

  {
    slug: "veloute-petits-pois-menthe",
    titre: "Velouté de petits pois à la menthe",
    description:
      "Un velouté printanier d'un vert éclatant. Les petits pois surgelés rendent cette recette ultra-rapide, et la menthe fraîche apporte une note vivifiante. Aussi bon chaud que froid en été.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 15,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["soupe", "entree"],
    regime: ["vegetarien"],
    tags: ["petits pois", "menthe", "velouté", "printemps", "rapide", "vert"],
    calories_par_portion: 145,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Petits pois surgelés",
        quantite: 500,
        unite: "g",
        categorie: "Surgelés",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouillon de légumes",
        quantite: 400,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Crème fraîche",
        quantite: 80,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Feuilles de menthe fraîche",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Beurre",
        quantite: 15,
        unite: "g",
        categorie: "Produits laitiers",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Éplucher et couper l'oignon. Le mettre dans le bol avec le beurre et faire revenir.",
        vitesse: 2,
        temperature: 120,
        duree: 180,
        accessoire: "spatule",
      },
      {
        numero: 2,
        instruction:
          "Ajouter les petits pois surgelés et le bouillon de légumes. Cuire.",
        vitesse: 1,
        temperature: 100,
        duree: 720,
        conseil: "Pas besoin de décongeler les petits pois, le Thermomix gère.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter la menthe fraîche, la crème, saler et poivrer. Mixer finement.",
        vitesse: 10,
        duree: 60,
        conseil:
          "La menthe ajoutée en fin préserve sa couleur vive et son arôme.",
      },
      {
        numero: 4,
        instruction:
          "Servir chaud ou laisser refroidir et servir froid en été avec un filet de crème et quelques feuilles de menthe.",
      },
    ],
    faq: [
      {
        question: "Puis-je utiliser des petits pois frais ?",
        reponse:
          "Oui ! Comptez 10 minutes de cuisson supplémentaires. Les frais donnent un goût encore plus fin.",
      },
      {
        question: "Ce velouté peut-il se servir froid ?",
        reponse:
          "C'est même délicieux en version froide. Réfrigérez 2h minimum et ajustez l'assaisonnement avant de servir.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 280,
  },

  // ═══════════════════════════════════════════════════════════════
  // PLATS DE RÉSISTANCE (3)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: "poulet-tikka-masala",
    titre: "Poulet tikka masala",
    description:
      "Le grand classique anglo-indien, entièrement au Thermomix. Le poulet est tendre, la sauce tomate épicée et crémeuse enrobe chaque morceau. Avec du riz basmati, c'est un régal absolu.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 30,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["plat"],
    regime: ["sans-gluten", "halal"],
    tags: [
      "poulet",
      "tikka masala",
      "indien",
      "épicé",
      "sauce tomate",
      "crémeux",
    ],
    calories_par_portion: 380,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Blancs de poulet",
        quantite: 600,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gingembre frais (râpé)",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Tomates concassées (boîte)",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Crème fraîche épaisse",
        quantite: 100,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Yaourt nature",
        quantite: 100,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Garam masala",
        quantite: 2,
        unite: "c. à café",
        categorie: "Condiments",
      },
      {
        nom: "Curcuma",
        quantite: 1,
        unite: "c. à café",
        categorie: "Condiments",
      },
      {
        nom: "Cumin moulu",
        quantite: 1,
        unite: "c. à café",
        categorie: "Condiments",
      },
      {
        nom: "Paprika doux",
        quantite: 1,
        unite: "c. à café",
        categorie: "Condiments",
      },
      {
        nom: "Huile d'olive",
        quantite: 1,
        unite: "c. à soupe",
        categorie: "Condiments",
      },
      { nom: "Sucre", quantite: 1, unite: "c. à café", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Coriandre fraîche",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Couper le poulet en gros cubes. Mélanger dans un bol avec le yaourt, 1 c. à café de garam masala, le curcuma et du sel. Laisser mariner 15 min (ou la veille au frigo).",
        conseil:
          "Plus la marinade est longue, plus le poulet sera tendre et parfumé.",
      },
      {
        numero: 2,
        instruction:
          "Mettre l'oignon, l'ail et le gingembre dans le bol du Thermomix. Hacher.",
        vitesse: 5,
        duree: 5,
      },
      {
        numero: 3,
        instruction: "Ajouter l'huile d'olive et faire revenir.",
        vitesse: 2,
        temperature: 120,
        duree: 180,
        accessoire: "spatule",
      },
      {
        numero: 4,
        instruction:
          "Ajouter les tomates concassées, le cumin, le paprika, le reste du garam masala et le sucre. Cuire.",
        vitesse: 2,
        temperature: 100,
        duree: 600,
        accessoire: "spatule",
      },
      {
        numero: 5,
        instruction:
          "Ajouter les morceaux de poulet marinés (sans jeter la marinade). Mélanger et cuire en mode sens inverse.",
        vitesse: 1,
        temperature: 100,
        duree: 1200,
        accessoire: "spatule",
        conseil:
          "Le sens inverse et la vitesse 1 permettent de ne pas déchiqueter le poulet.",
      },
      {
        numero: 6,
        instruction:
          "Incorporer la crème fraîche, mélanger doucement. Servir avec du riz basmati et de la coriandre fraîche.",
        vitesse: 1,
        duree: 30,
        accessoire: "spatule",
      },
    ],
    faq: [
      {
        question:
          "Puis-je remplacer le poulet par des pois chiches pour une version veggie ?",
        reponse:
          "Oui ! Utilisez 400g de pois chiches cuits et réduisez le temps de cuisson de l'étape 5 à 10 minutes.",
      },
      {
        question: "Le plat est-il adapté à la congélation ?",
        reponse:
          "Oui, la sauce congèle très bien. Réchauffez doucement et ajoutez la crème au moment de servir.",
      },
      {
        question: "Comment rendre le plat plus piquant ?",
        reponse:
          "Ajoutez un petit piment oiseau à l'étape 2 ou du piment de Cayenne à l'étape 4.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 680,
  },

  {
    slug: "lasagnes-bolognaise-maison",
    titre: "Lasagnes bolognaise maison",
    description:
      "Des lasagnes généreuses avec une bolognaise mijotée au Thermomix et une béchamel onctueuse préparée juste après dans le même bol. Assemblage, four, et c'est le bonheur en gratin.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 50,
    difficulte: "moyen",
    nombre_portions: 6,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["plat"],
    regime: [],
    tags: [
      "lasagnes",
      "bolognaise",
      "gratin",
      "italien",
      "famille",
      "béchamel",
    ],
    calories_par_portion: 520,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Viande hachée de bœuf",
        quantite: 500,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Carotte",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Branche de céleri",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Tomates concassées (boîte)",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Concentré de tomates",
        quantite: 2,
        unite: "c. à soupe",
        categorie: "Épicerie",
      },
      { nom: "Vin rouge", quantite: 100, unite: "ml", categorie: "Boissons" },
      {
        nom: "Feuilles de lasagne",
        quantite: 12,
        unite: "pièce",
        categorie: "Épicerie",
      },
      {
        nom: "Lait entier",
        quantite: 500,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Beurre",
        quantite: 40,
        unite: "g",
        categorie: "Produits laitiers",
      },
      { nom: "Farine", quantite: 40, unite: "g", categorie: "Épicerie" },
      {
        nom: "Gruyère râpé",
        quantite: 120,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Noix de muscade",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Herbes de Provence",
        quantite: 1,
        unite: "c. à café",
        categorie: "Condiments",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mettre l'oignon, la carotte, le céleri et l'ail dans le bol. Hacher.",
        vitesse: 5,
        duree: 7,
      },
      {
        numero: 2,
        instruction: "Ajouter un filet d'huile et faire revenir le soffritto.",
        vitesse: 2,
        temperature: 120,
        duree: 300,
        accessoire: "spatule",
        conseil: "Le soffritto est la base de saveur — laissez-le bien dorer.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter la viande hachée et la faire revenir en morcelant.",
        vitesse: 2,
        temperature: 120,
        duree: 300,
        accessoire: "spatule",
      },
      {
        numero: 4,
        instruction:
          "Verser le vin rouge, les tomates concassées, le concentré de tomates et les herbes de Provence. Saler, poivrer. Mijoter.",
        vitesse: 1,
        temperature: 100,
        duree: 1200,
        accessoire: "spatule",
        conseil:
          "Plus la bolognaise mijote, meilleure elle sera. 20 min c'est le minimum.",
      },
      {
        numero: 5,
        instruction:
          "Verser la bolognaise dans un récipient et réserver. Rincer le bol.",
      },
      {
        numero: 6,
        instruction:
          "Béchamel : mettre le beurre dans le bol et le faire fondre.",
        vitesse: 2,
        temperature: 90,
        duree: 120,
      },
      {
        numero: 7,
        instruction: "Ajouter la farine et mélanger.",
        vitesse: 3,
        duree: 30,
      },
      {
        numero: 8,
        instruction:
          "Verser le lait progressivement. Cuire en remuant jusqu'à épaississement.",
        vitesse: 4,
        temperature: 90,
        duree: 480,
        conseil:
          "La béchamel doit napper la cuillère. Ajouter muscade, sel et poivre.",
      },
      {
        numero: 9,
        instruction:
          "Assembler dans un plat à gratin : couche de bolognaise, feuilles de lasagne, béchamel. Répéter 3 fois. Finir par béchamel + gruyère râpé. Enfourner à 180°C pendant 30 minutes.",
        temperature: 180,
        duree: 1800,
        conseil:
          "Couvrir d'aluminium les 20 premières minutes si le dessus dore trop vite.",
      },
    ],
    faq: [
      {
        question: "Faut-il précuire les feuilles de lasagne ?",
        reponse:
          "Non, la béchamel et la bolognaise apportent assez de liquide pour les cuire au four. Utilisez des feuilles standard (pas les fraîches).",
      },
      {
        question: "Puis-je préparer les lasagnes la veille ?",
        reponse:
          "Oui ! Assemblez le plat, couvrez de film et réfrigérez. Ajoutez 10 minutes de cuisson le lendemain.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 950,
  },

  {
    slug: "curry-de-legumes-thai",
    titre: "Curry de légumes thaï",
    description:
      "Un curry parfumé, coloré et réconfortant. Lait de coco, pâte de curry rouge, légumes croquants et basilic thaï — le tout prêt en 25 minutes au Thermomix. Servez avec du riz jasmin.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 15,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["plat"],
    regime: ["vegan", "sans-gluten"],
    tags: [
      "curry",
      "thaï",
      "légumes",
      "lait de coco",
      "rapide",
      "vegan",
      "asiatique",
    ],
    calories_par_portion: 290,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Lait de coco",
        quantite: 400,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Pâte de curry rouge",
        quantite: 2,
        unite: "c. à soupe",
        categorie: "Condiments",
      },
      {
        nom: "Courgette",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poivron rouge",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Brocoli (fleurettes)",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Pois mange-tout",
        quantite: 100,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gingembre frais",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Sauce soja (tamari sans gluten)",
        quantite: 2,
        unite: "c. à soupe",
        categorie: "Condiments",
      },
      {
        nom: "Sucre de coco (ou cassonade)",
        quantite: 1,
        unite: "c. à café",
        categorie: "Épicerie",
      },
      {
        nom: "Jus de citron vert",
        quantite: 1,
        unite: "c. à soupe",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Basilic thaï (ou classique)",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Mettre l'oignon et le gingembre dans le bol. Hacher.",
        vitesse: 5,
        duree: 5,
      },
      {
        numero: 2,
        instruction:
          "Ajouter la pâte de curry et faire revenir pour libérer les arômes.",
        vitesse: 2,
        temperature: 100,
        duree: 120,
        accessoire: "spatule",
        conseil:
          "On « réveille » la pâte de curry en la chauffant avant d'ajouter le liquide.",
      },
      {
        numero: 3,
        instruction:
          "Verser le lait de coco, la sauce soja et le sucre. Mélanger.",
        vitesse: 2,
        temperature: 100,
        duree: 180,
      },
      {
        numero: 4,
        instruction:
          "Pendant ce temps, couper la courgette et le poivron en morceaux. Mettre tous les légumes dans le panier vapeur, insérer dans le bol. Cuire à la vapeur.",
        vitesse: 1,
        temperature: 100,
        duree: 720,
        accessoire: "panier",
        conseil:
          "Le Varoma est parfait ici. Les légumes restent croquants grâce à la vapeur.",
      },
      {
        numero: 5,
        instruction:
          "Retirer le panier. Ajouter les légumes vapeur dans la sauce. Ajouter le jus de citron vert et le basilic thaï. Mélanger délicatement.",
        vitesse: 1,
        duree: 30,
        accessoire: "spatule",
      },
      {
        numero: 6,
        instruction: "Servir immédiatement avec du riz jasmin.",
        conseil:
          "Ajoutez des cacahuètes concassées et de la coriandre pour un topping encore meilleur.",
      },
    ],
    faq: [
      {
        question: "Je ne trouve pas de pâte de curry rouge, que faire ?",
        reponse:
          "Vous pouvez utiliser du curry en poudre (2 c. à café) + un piment rouge frais. Le résultat sera différent mais savoureux.",
      },
      {
        question: "Comment adapter la recette pour les enfants ?",
        reponse:
          "Réduisez la pâte de curry à 1 c. à soupe et ajoutez un peu plus de sucre de coco pour adoucir.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 540,
  },

  // ═══════════════════════════════════════════════════════════════
  // DESSERTS (3)
  // ═══════════════════════════════════════════════════════════════

  {
    slug: "fondant-chocolat-coeur-coulant",
    titre: "Fondant au chocolat cœur coulant",
    description:
      "Le dessert ultime des amoureux du chocolat. Croûte légèrement croustillante, intérieur coulant et intense. La préparation au Thermomix prend 5 minutes — le four fait le reste.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 12,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["dessert"],
    regime: ["sans-gluten"],
    tags: ["chocolat", "fondant", "coulant", "dessert", "chic", "express"],
    calories_par_portion: 410,
    nutriscore: "D",
    nutriscore_note:
      "Estimation indicative — dessert riche en lipides et sucres",
    ingredients: [
      {
        nom: "Chocolat noir 70%",
        quantite: 200,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Beurre",
        quantite: 100,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Œufs",
        quantite: 3,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      { nom: "Sucre", quantite: 80, unite: "g", categorie: "Épicerie" },
      {
        nom: "Farine (ou fécule de maïs pour sans gluten)",
        quantite: 30,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Beurre + cacao (pour les moules)",
        quantite: 10,
        unite: "g",
        categorie: "Produits laitiers",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Préchauffer le four à 200°C. Beurrer et saupoudrer de cacao 4 ramequins.",
      },
      {
        numero: 2,
        instruction:
          "Casser le chocolat en morceaux, le mettre dans le bol avec le beurre coupé en dés. Fondre.",
        vitesse: 2,
        temperature: 50,
        duree: 240,
        conseil:
          "50°C et pas plus ! Le chocolat ne doit pas brûler. Si des morceaux restent, mélanger vitesse 3 pendant 10 secondes.",
      },
      {
        numero: 3,
        instruction: "Ajouter les œufs et le sucre. Mélanger.",
        vitesse: 4,
        duree: 20,
      },
      {
        numero: 4,
        instruction: "Ajouter la farine (ou fécule). Mélanger brièvement.",
        vitesse: 3,
        duree: 10,
        conseil: "Ne pas trop mélanger — c'est ce qui garde le cœur coulant.",
      },
      {
        numero: 5,
        instruction:
          "Répartir dans les 4 ramequins. Enfourner 11-12 minutes à 200°C. Le centre doit trembler légèrement.",
        temperature: 200,
        duree: 720,
        conseil:
          "11 min = très coulant. 12 min = coulant. 13 min = fondant mais plus coulant. Adaptez à votre four.",
      },
      {
        numero: 6,
        instruction:
          "Laisser reposer 1 minute, démouler sur assiette. Servir immédiatement avec une boule de glace vanille.",
        duree: 60,
      },
    ],
    faq: [
      {
        question: "Puis-je préparer les ramequins à l'avance ?",
        reponse:
          "Oui ! Remplissez les ramequins, couvrez de film et réfrigérez jusqu'à 24h. Ajoutez 1-2 minutes de cuisson car la pâte part du froid.",
      },
      {
        question: "Quel chocolat utiliser ?",
        reponse:
          "Un bon chocolat pâtissier 60-70%. Évitez le chocolat de dégustation trop amer (85%+), le résultat serait trop intense.",
      },
      {
        question: "Version sans gluten ?",
        reponse:
          "Remplacez la farine par 30g de fécule de maïs (Maïzena). Le résultat est identique.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 1100,
  },

  {
    slug: "tiramisu-classique-italien",
    titre: "Tiramisu classique italien",
    description:
      "Le vrai tiramisu à l'italienne, sans gélatine ni chantilly. Mascarpone aérien, café intense, biscuits imbibés et cacao amer. Préparé au Thermomix pour une crème parfaitement lisse.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 0,
    difficulte: "moyen",
    nombre_portions: 6,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["dessert"],
    regime: [],
    tags: [
      "tiramisu",
      "italien",
      "mascarpone",
      "café",
      "classique",
      "sans cuisson",
    ],
    calories_par_portion: 380,
    nutriscore: "C",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Mascarpone",
        quantite: 500,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Œufs (très frais)",
        quantite: 4,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      { nom: "Sucre", quantite: 100, unite: "g", categorie: "Épicerie" },
      {
        nom: "Café espresso (froid)",
        quantite: 300,
        unite: "ml",
        categorie: "Boissons",
      },
      {
        nom: "Biscuits à la cuillère (Savoiardi)",
        quantite: 250,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Cacao amer en poudre",
        quantite: 20,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Marsala ou Amaretto (optionnel)",
        quantite: 2,
        unite: "c. à soupe",
        categorie: "Boissons",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Séparer les blancs des jaunes d'œufs dans deux récipients.",
        conseil:
          "Les œufs doivent être très frais (consommés crus). Utilisez des œufs extra-frais datés de moins de 9 jours.",
      },
      {
        numero: 2,
        instruction:
          "Mettre les jaunes d'œufs et le sucre dans le bol. Fouetter jusqu'à blanchiment.",
        vitesse: 4,
        duree: 240,
        accessoire: "fouet",
        conseil:
          "Le mélange doit tripler de volume et devenir mousseux et pâle.",
      },
      {
        numero: 3,
        instruction: "Ajouter le mascarpone. Mélanger délicatement.",
        vitesse: 3,
        duree: 30,
        accessoire: "fouet",
        conseil: "Ne pas trop mélanger pour garder la légèreté.",
      },
      {
        numero: 4,
        instruction:
          "Transférer la crème dans un grand saladier. Laver et sécher le bol et le fouet.",
      },
      {
        numero: 5,
        instruction: "Monter les blancs en neige ferme dans le bol.",
        vitesse: 4,
        duree: 300,
        accessoire: "fouet",
        conseil:
          "Les blancs doivent être fermes et brillants. Le bol doit être parfaitement propre et sec.",
      },
      {
        numero: 6,
        instruction:
          "Incorporer les blancs en neige dans la crème au mascarpone en 3 fois, délicatement à la spatule (hors Thermomix).",
        conseil:
          "Mouvement du bas vers le haut pour ne pas casser les blancs. C'est ce qui rend le tiramisu aérien.",
      },
      {
        numero: 7,
        instruction:
          "Préparer le café froid. Ajouter le Marsala si désiré. Tremper rapidement les biscuits un par un (2 secondes max) et tapisser le fond du plat.",
        conseil:
          "Trop trempés = tiramisu mou et détrempé. Un aller-retour rapide suffit.",
      },
      {
        numero: 8,
        instruction:
          "Alterner : couche de biscuits imbibés, couche de crème. Terminer par la crème. Réfrigérer minimum 6 heures (idéal : une nuit).",
        duree: 21600,
      },
      {
        numero: 9,
        instruction:
          "Avant de servir, saupoudrer généreusement de cacao amer tamisé.",
        conseil:
          "Tamiser le cacao pour éviter les grumeaux. Saupoudrer au dernier moment.",
      },
    ],
    faq: [
      {
        question: "Puis-je faire un tiramisu sans œufs crus ?",
        reponse:
          "Oui, montez les jaunes au bain-marie à 65°C avec le sucre pendant 5 minutes avant de les ajouter au mascarpone. Cela pasteurise les œufs.",
      },
      {
        question: "Combien de temps se conserve-t-il ?",
        reponse:
          "3 jours au réfrigérateur. Le deuxième jour est souvent le meilleur — les saveurs sont bien fondues.",
      },
      {
        question: "Puis-je le faire sans alcool ?",
        reponse:
          "Bien sûr, c'est optionnel. Le café seul suffit amplement pour le goût authentique.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 870,
  },

  {
    slug: "tarte-citron-meringuee",
    titre: "Tarte au citron meringuée",
    description:
      "Un grand classique de la pâtisserie française. Pâte sablée croustillante, crème de citron acidulée et meringue italienne aérienne. Le Thermomix prépare la crème et la meringue sans effort.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 25,
    temps_cuisson: 25,
    difficulte: "difficile",
    nombre_portions: 8,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["dessert"],
    regime: [],
    tags: [
      "tarte",
      "citron",
      "meringue",
      "pâtisserie",
      "classique",
      "français",
    ],
    calories_par_portion: 350,
    nutriscore: "C",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      {
        nom: "Pâte sablée (prête à dérouler)",
        quantite: 1,
        unite: "pièce",
        categorie: "Épicerie",
      },
      {
        nom: "Citrons jaunes (jus)",
        quantite: 4,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Zeste de citron",
        quantite: 2,
        unite: "pincée",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Œufs entiers",
        quantite: 3,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Jaunes d'œufs",
        quantite: 2,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Sucre (crème citron)",
        quantite: 150,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Beurre froid",
        quantite: 80,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Fécule de maïs",
        quantite: 20,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Blancs d'œufs (meringue)",
        quantite: 3,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Sucre (meringue)",
        quantite: 120,
        unite: "g",
        categorie: "Épicerie",
      },
      { nom: "Eau", quantite: 40, unite: "ml", categorie: "Boissons" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Préchauffer le four à 180°C. Foncer un moule à tarte (24-26 cm) avec la pâte sablée, piquer le fond, cuire à blanc 15 minutes avec des billes de cuisson.",
        temperature: 180,
        duree: 900,
      },
      {
        numero: 2,
        instruction:
          "Pendant ce temps, presser les citrons (environ 150 ml de jus). Mettre le jus, les zestes, les œufs entiers, les jaunes, le sucre et la fécule dans le bol du Thermomix.",
        conseil:
          "Filtrer le jus de citron pour retirer les pépins et la pulpe.",
      },
      {
        numero: 3,
        instruction: "Cuire la crème de citron en remuant.",
        vitesse: 4,
        temperature: 90,
        duree: 600,
        conseil:
          "La crème doit épaissir et napper la cuillère. Ne pas dépasser 90°C pour ne pas cuire les œufs.",
      },
      {
        numero: 4,
        instruction:
          "Ajouter le beurre froid coupé en dés. Mélanger jusqu'à incorporation complète.",
        vitesse: 4,
        duree: 30,
        conseil: "Le beurre donne du brillant et de la tenue à la crème.",
      },
      {
        numero: 5,
        instruction:
          "Verser la crème de citron sur le fond de tarte précuit. Réserver au frais.",
      },
      {
        numero: 6,
        instruction:
          "Meringue italienne : dans une casserole hors Thermomix, chauffer le sucre meringue avec l'eau à 121°C (bec ferme).",
        temperature: 121,
        conseil:
          "Utilisez un thermomètre à sucre. Sans thermomètre : le sirop fait des bulles serrées et un fil ferme entre les doigts mouillés.",
      },
      {
        numero: 7,
        instruction:
          "Pendant la chauffe du sirop, monter les blancs en neige dans le bol propre.",
        vitesse: 4,
        duree: 180,
        accessoire: "fouet",
      },
      {
        numero: 8,
        instruction:
          "Verser le sirop de sucre chaud en filet sur les blancs montés, fouetter jusqu'à refroidissement complet.",
        vitesse: 4,
        duree: 300,
        accessoire: "fouet",
        conseil:
          "La meringue doit être ferme, brillante et tiède quand c'est prêt.",
      },
      {
        numero: 9,
        instruction:
          "Dresser la meringue sur la crème de citron à la poche à douille ou à la cuillère. Caraméliser au chalumeau ou sous le gril du four 2 minutes.",
        conseil:
          "Servir dans les 4 heures — la meringue italienne ne coule pas mais ramollit avec le temps.",
      },
    ],
    faq: [
      {
        question: "Puis-je faire ma propre pâte sablée au Thermomix ?",
        reponse:
          "Oui : 250g farine + 125g beurre froid + 80g sucre glace + 1 œuf + 1 pincée de sel. Vitesse 6 pendant 15 secondes. Réfrigérer 30 min avant de l'étaler.",
      },
      {
        question: "La crème de citron se prépare-t-elle la veille ?",
        reponse:
          "Oui, c'est même conseillé. Filmez-la au contact et réfrigérez. Elle prend encore en fermeté au froid.",
      },
      {
        question: "Quelle différence entre meringue française et italienne ?",
        reponse:
          "La meringue italienne utilise un sirop de sucre cuit, ce qui la rend plus stable, brillante et lisse. Elle ne coule pas et n'a pas besoin d'être cuite au four.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 760,
  },
];
