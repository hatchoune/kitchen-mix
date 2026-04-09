/* =============================================================
   Kitchen Mix — Seed Data
   5 recettes complètes prêtes à insérer via scripts/seed.ts
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

export const SEED_RECETTES: SeedRecette[] = [
  {
    slug: "veloute-champignons-forestiers",
    titre: "Velouté de champignons forestiers",
    description:
      "Un velouté crémeux et parfumé aux champignons de saison. Réconfortant en hiver, élégant en entrée. Le Thermomix assure une texture soyeuse en quelques minutes.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 25,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["soupe", "entree"],
    regime: ["vegetarien"],
    tags: ["champignons", "velouté", "automne", "réconfortant"],
    calories_par_portion: 180,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      { nom: "Champignons de Paris", quantite: 400, unite: "g", categorie: "Fruits & Légumes" },
      { nom: "Oignon", quantite: 1, unite: "pièce", categorie: "Fruits & Légumes" },
      { nom: "Gousse d'ail", quantite: 1, unite: "pièce", categorie: "Fruits & Légumes" },
      { nom: "Pomme de terre", quantite: 1, unite: "pièce", categorie: "Fruits & Légumes" },
      { nom: "Bouillon de légumes", quantite: 500, unite: "ml", categorie: "Épicerie" },
      { nom: "Crème fraîche", quantite: 100, unite: "ml", categorie: "Produits laitiers" },
      { nom: "Beurre", quantite: 20, unite: "g", categorie: "Produits laitiers" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Persil frais", quantite: 5, unite: "g", categorie: "Fruits & Légumes" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Éplucher l'oignon et l'ail, couper en morceaux. Mettre dans le bol du Thermomix.",
        vitesse: 5,
        duree: 5,
        conseil: "Pas besoin de couper finement, le Thermomix s'en charge.",
      },
      {
        numero: 2,
        instruction: "Ajouter le beurre et faire revenir.",
        vitesse: 2,
        temperature: 120,
        duree: 180,
        accessoire: "spatule",
      },
      {
        numero: 3,
        instruction: "Ajouter les champignons nettoyés et coupés en quartiers, la pomme de terre en morceaux.",
        vitesse: 4,
        duree: 5,
      },
      {
        numero: 4,
        instruction: "Verser le bouillon de légumes. Cuire.",
        vitesse: 1,
        temperature: 100,
        duree: 1200,
      },
      {
        numero: 5,
        instruction: "Ajouter la crème fraîche, saler, poivrer. Mixer progressivement jusqu'à obtenir un velouté lisse.",
        vitesse: 10,
        duree: 60,
        conseil: "Augmenter progressivement de vitesse 5 à 10 pour une texture soyeuse.",
      },
      {
        numero: 6,
        instruction: "Servir chaud, parsemé de persil frais ciselé.",
      },
    ],
    faq: [
      {
        question: "Puis-je utiliser des champignons surgelés ?",
        reponse:
          "Oui, mais laissez-les décongeler et égouttez l'excès d'eau avant de les ajouter.",
      },
      {
        question: "Comment rendre le velouté plus épais ?",
        reponse:
          "Ajoutez une deuxième pomme de terre ou réduisez la quantité de bouillon de 100ml.",
      },
      {
        question: "Ce velouté se congèle-t-il bien ?",
        reponse:
          "Oui, sans la crème. Ajoutez la crème au moment de réchauffer.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 1250,
  },

  {
    slug: "risotto-cremeux-parmesan",
    titre: "Risotto crémeux au parmesan",
    description:
      "Un risotto onctueux et parfaitement crémeux, cuit entièrement au Thermomix. Le résultat est bluffant : al dente, fondant, sans effort de surveillance.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 20,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["plat"],
    regime: ["vegetarien"],
    tags: ["risotto", "parmesan", "italien", "crémeux"],
    calories_par_portion: 420,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      { nom: "Riz arborio", quantite: 300, unite: "g", categorie: "Épicerie" },
      { nom: "Oignon", quantite: 1, unite: "pièce", categorie: "Fruits & Légumes" },
      { nom: "Vin blanc sec", quantite: 100, unite: "ml", categorie: "Boissons" },
      { nom: "Bouillon de légumes chaud", quantite: 700, unite: "ml", categorie: "Épicerie" },
      { nom: "Parmesan râpé", quantite: 80, unite: "g", categorie: "Produits laitiers" },
      { nom: "Beurre", quantite: 30, unite: "g", categorie: "Produits laitiers" },
      { nom: "Huile d'olive", quantite: 1, unite: "c. à soupe", categorie: "Condiments" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Éplucher et couper l'oignon en deux. Le hacher dans le Thermomix.",
        vitesse: 5,
        duree: 5,
      },
      {
        numero: 2,
        instruction: "Ajouter l'huile d'olive et faire revenir l'oignon.",
        vitesse: 2,
        temperature: 120,
        duree: 180,
        accessoire: "spatule",
      },
      {
        numero: 3,
        instruction: "Ajouter le riz arborio et le nacrer en remuant.",
        vitesse: 1,
        temperature: 120,
        duree: 120,
        accessoire: "spatule",
        conseil: "Le riz doit devenir translucide sur les bords.",
      },
      {
        numero: 4,
        instruction: "Verser le vin blanc et laisser absorber.",
        vitesse: 1,
        temperature: 100,
        duree: 120,
      },
      {
        numero: 5,
        instruction: "Ajouter le bouillon chaud. Cuire à couvert.",
        vitesse: 1,
        temperature: 100,
        duree: 900,
        accessoire: "spatule",
        conseil: "Utiliser le mode sens inverse si votre modèle le permet.",
      },
      {
        numero: 6,
        instruction: "Ajouter le beurre et le parmesan. Mélanger délicatement. Saler, poivrer, servir immédiatement.",
        vitesse: 2,
        duree: 30,
        accessoire: "spatule",
      },
    ],
    faq: [
      {
        question: "Quel riz utiliser ?",
        reponse: "L'arborio ou le carnaroli sont idéaux. Évitez le riz basmati ou long grain.",
      },
      {
        question: "Peut-on remplacer le vin blanc ?",
        reponse: "Oui, utilisez du bouillon supplémentaire avec un filet de jus de citron.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 890,
  },

  {
    slug: "pain-brioche-moelleux",
    titre: "Pain brioché moelleux",
    description:
      "Un pain brioché délicieusement moelleux et doré. Le pétrissage au Thermomix garantit une mie filante et aérée. Parfait pour le petit-déjeuner ou le goûter.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 35,
    difficulte: "moyen",
    nombre_portions: 8,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["boulangerie", "petit-dejeuner"],
    regime: [],
    tags: ["brioche", "pain", "moelleux", "boulangerie"],
    calories_par_portion: 310,
    nutriscore: "C",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      { nom: "Farine T45", quantite: 500, unite: "g", categorie: "Épicerie" },
      { nom: "Lait tiède", quantite: 150, unite: "ml", categorie: "Produits laitiers" },
      { nom: "Beurre mou", quantite: 80, unite: "g", categorie: "Produits laitiers" },
      { nom: "Sucre", quantite: 60, unite: "g", categorie: "Épicerie" },
      { nom: "Œufs", quantite: 3, unite: "pièce", categorie: "Produits laitiers" },
      { nom: "Levure de boulanger", quantite: 20, unite: "g", categorie: "Épicerie" },
      { nom: "Sel", quantite: 8, unite: "g", categorie: "Condiments" },
      { nom: "Jaune d'œuf (dorure)", quantite: 1, unite: "pièce", categorie: "Produits laitiers" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Mettre le lait tiède et la levure dans le bol. Mélanger.",
        vitesse: 2,
        duree: 10,
        conseil: "Le lait doit être à 37°C max pour ne pas tuer la levure.",
      },
      {
        numero: 2,
        instruction: "Ajouter la farine, le sucre, le sel et les œufs. Pétrir.",
        vitesse: 6,
        duree: 120,
        conseil: "Le mode Pétrin / Épi est idéal si disponible.",
      },
      {
        numero: 3,
        instruction: "Ajouter le beurre mou en morceaux. Continuer à pétrir jusqu'à ce que la pâte se décolle du bol.",
        vitesse: 4,
        duree: 180,
      },
      {
        numero: 4,
        instruction: "Former une boule, couvrir d'un linge humide. Laisser lever 1h à température ambiante jusqu'au doublement de volume.",
        duree: 3600,
        conseil: "Près d'un radiateur ou four éteint avec lumière allumée.",
      },
      {
        numero: 5,
        instruction: "Dégazer la pâte, former le pain brioché ou des petites boules. Déposer sur plaque beurrée. Laisser lever 30 min.",
        duree: 1800,
      },
      {
        numero: 6,
        instruction: "Préchauffer le four à 180°C. Dorer au jaune d'œuf. Enfourner 25-30 minutes jusqu'à belle coloration dorée.",
        temperature: 180,
        duree: 1500,
      },
    ],
    faq: [
      {
        question: "Puis-je faire la pâte la veille ?",
        reponse:
          "Oui ! Après le premier pétrissage, couvrez et placez au frigo toute la nuit. Sortir 1h avant de former.",
      },
      {
        question: "Comment savoir si la brioche est cuite ?",
        reponse: "Tapotez le dessous : il doit sonner creux. La température interne doit être ~90°C.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 2100,
  },

  {
    slug: "houmous-maison-onctueux",
    titre: "Houmous maison onctueux",
    description:
      "Un houmous ultra-crémeux fait maison en 5 minutes au Thermomix. Bien plus savoureux que du commerce, avec un beau topping d'huile d'olive et paprika.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 0,
    difficulte: "facile",
    nombre_portions: 6,
    modele_thermomix: ["TM5", "TM6", "TM7"],
    categories: ["aperitif", "entree"],
    regime: ["vegan", "sans-gluten"],
    tags: ["houmous", "pois chiches", "apéritif", "rapide"],
    calories_par_portion: 150,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative basée sur les ingrédients",
    ingredients: [
      { nom: "Pois chiches cuits (égouttés)", quantite: 400, unite: "g", categorie: "Épicerie" },
      { nom: "Tahini (purée de sésame)", quantite: 60, unite: "g", categorie: "Condiments" },
      { nom: "Jus de citron", quantite: 40, unite: "ml", categorie: "Fruits & Légumes" },
      { nom: "Gousse d'ail", quantite: 1, unite: "pièce", categorie: "Fruits & Légumes" },
      { nom: "Huile d'olive", quantite: 30, unite: "ml", categorie: "Condiments" },
      { nom: "Eau glacée", quantite: 30, unite: "ml", categorie: "Boissons" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Cumin moulu", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Paprika (topping)", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Mettre l'ail dans le bol et hacher.",
        vitesse: 7,
        duree: 5,
      },
      {
        numero: 2,
        instruction: "Ajouter les pois chiches, le tahini, le jus de citron, l'huile d'olive, l'eau glacée, le sel et le cumin.",
        vitesse: 8,
        duree: 60,
        conseil: "L'eau glacée est le secret d'un houmous ultra-crémeux !",
      },
      {
        numero: 3,
        instruction: "Racler les bords avec la spatule et mixer à nouveau pour une texture parfaitement lisse.",
        vitesse: 10,
        duree: 30,
      },
      {
        numero: 4,
        instruction: "Servir dans un bol, créer un puits au centre, arroser d'huile d'olive et saupoudrer de paprika.",
        conseil: "Accompagner de pain pita chaud ou de crudités.",
      },
    ],
    faq: [
      {
        question: "Pois chiches en conserve ou secs ?",
        reponse: "Les deux fonctionnent. Les secs (trempés 12h puis cuits) donnent un goût plus fin.",
      },
      {
        question: "Combien de temps se conserve-t-il ?",
        reponse: "3-4 jours au réfrigérateur dans un contenant hermétique.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 1800,
  },

  {
    slug: "creme-brulee-vanille",
    titre: "Crème brûlée à la vanille",
    description:
      "La crème brûlée classique, cuite au Thermomix puis gratinée au chalumeau. Texture soyeuse, caramel craquant. Un dessert chic mais étonnamment simple.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 10,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["TM6", "TM7"],
    categories: ["dessert"],
    regime: ["sans-gluten"],
    tags: ["crème brûlée", "vanille", "dessert", "chic"],
    calories_par_portion: 340,
    nutriscore: "D",
    nutriscore_note: "Estimation indicative — dessert riche en lipides et sucres",
    ingredients: [
      { nom: "Crème liquide entière", quantite: 500, unite: "ml", categorie: "Produits laitiers" },
      { nom: "Jaunes d'œufs", quantite: 5, unite: "pièce", categorie: "Produits laitiers" },
      { nom: "Sucre", quantite: 80, unite: "g", categorie: "Épicerie" },
      { nom: "Gousse de vanille", quantite: 1, unite: "pièce", categorie: "Épicerie" },
      { nom: "Cassonade (pour caraméliser)", quantite: 40, unite: "g", categorie: "Épicerie" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Fendre la gousse de vanille, gratter les graines. Mettre les graines et la gousse dans le bol avec la crème.",
        vitesse: 2,
        temperature: 90,
        duree: 420,
        conseil: "Ne pas dépasser 90°C pour ne pas cuire les protéines.",
      },
      {
        numero: 2,
        instruction: "Retirer la gousse de vanille. Ajouter les jaunes d'œufs et le sucre.",
        vitesse: 4,
        duree: 15,
      },
      {
        numero: 3,
        instruction: "Cuire le mélange en remuant doucement.",
        vitesse: 3,
        temperature: 80,
        duree: 420,
        conseil: "C'est la cuisson à basse température qui fait la texture soyeuse.",
      },
      {
        numero: 4,
        instruction: "Verser dans 4 ramequins. Réfrigérer au minimum 4 heures (idéal : une nuit).",
        duree: 14400,
      },
      {
        numero: 5,
        instruction: "Avant de servir, saupoudrer de cassonade et caraméliser au chalumeau de cuisine ou sous le gril du four.",
        conseil: "Laisser durcir 1 minute le caramel avant de servir.",
      },
    ],
    faq: [
      {
        question: "Puis-je les préparer la veille ?",
        reponse: "C'est même recommandé ! La texture sera encore plus onctueuse après une nuit au frigo.",
      },
      {
        question: "Sans chalumeau, comment caraméliser ?",
        reponse: "Passez les ramequins sous le gril du four (position haute) pendant 2-3 minutes en surveillant.",
      },
      {
        question: "Peut-on remplacer la vanille ?",
        reponse: "Oui : essayez du café, du chocolat fondu ou du zeste de citron pour varier.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 1500,
  },
];
