import type { SeedRecette } from "./seed-data";

export const SEED_COOKEO: SeedRecette[] = [
  // ── EXPRESS ⚡ ──
  {
    slug: "riz-pilaf-cookeo",
    titre: "Riz pilaf parfumé",
    description:
      "Un riz pilaf doré et parfumé, cuit sous pression au Cookeo. Résultat parfait en 10 minutes.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 10,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["accompagnement"],
    regime: ["vegan", "sans-gluten", "sans-lactose"],
    tags: ["riz", "pilaf", "express", "base"],
    calories_par_portion: 210,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      { nom: "Riz basmati", quantite: 300, unite: "g", categorie: "Épicerie" },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouillon de volaille",
        quantite: 450,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Huile d'olive",
        quantite: 10,
        unite: "ml",
        categorie: "Condiments",
      },
      { nom: "Curcuma", quantite: 3, unite: "g", categorie: "Condiments" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : faire revenir l'oignon émincé dans l'huile 2 min.",
      },
      {
        numero: 2,
        instruction: "Ajouter le riz rincé et le curcuma. Nacrer 1 min.",
      },
      {
        numero: 3,
        instruction: "Verser le bouillon. Mode Cuisson sous pression 10 min.",
        duree: 600,
        conseil: "Laisser décompresser naturellement 5 min.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "oeufs-cocottes-cookeo",
    titre: "Œufs cocotte crémeux",
    description:
      "Des œufs cocotte fondants cuits en 5 minutes sous pression. Rapide et gourmand pour un brunch.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 5,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["entree", "petit-dejeuner"],
    regime: ["vegetarien", "sans-gluten"],
    tags: ["œufs", "cocotte", "brunch", "express"],
    calories_par_portion: 195,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Œufs",
        quantite: 4,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Crème fraîche",
        quantite: 80,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Gruyère râpé",
        quantite: 40,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Ciboulette",
        quantite: 5,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Eau", quantite: 200, unite: "ml", categorie: "Autre" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Beurrer 4 ramequins. Répartir crème, sel, poivre. Casser un œuf par ramequin. Saupoudrer de gruyère.",
      },
      {
        numero: 2,
        instruction:
          "Mettre l'eau dans la cuve. Disposer les ramequins sur le panier vapeur.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 5 min.",
        duree: 300,
        conseil: "Libération rapide de la pression. Parsemer de ciboulette.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "saute-poulet-legumes-cookeo",
    titre: "Sauté de poulet aux légumes",
    description:
      "Un sauté de poulet coloré et rapide, tout en un dans le Cookeo.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 8,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose", "halal"],
    tags: ["poulet", "légumes", "sauté", "express"],
    calories_par_portion: 280,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Blancs de poulet",
        quantite: 500,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Courgette",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poivron",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sauce soja", quantite: 20, unite: "ml", categorie: "Condiments" },
      { nom: "Huile", quantite: 10, unite: "ml", categorie: "Épicerie" },
      { nom: "Miel", quantite: 10, unite: "g", categorie: "Épicerie" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir le poulet en morceaux dans l'huile 3 min.",
      },
      {
        numero: 2,
        instruction: "Ajouter les légumes en dés, la sauce soja et le miel.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 8 min.",
        duree: 480,
        conseil: "Libération rapide. Servir avec du riz.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "lentilles-cookeo",
    titre: "Lentilles vertes du Puy",
    description:
      "Des lentilles parfaitement cuites au Cookeo en 15 minutes. Fondantes mais pas éclatées.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 15,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["accompagnement", "plat"],
    regime: ["vegan", "sans-gluten", "sans-lactose"],
    tags: ["lentilles", "Puy", "légumineuses", "express"],
    calories_par_portion: 230,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Lentilles vertes du Puy",
        quantite: 300,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Carotte",
        quantite: 1,
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
        categorie: "Fruits & Légumes",
      },
      { nom: "Eau", quantite: 600, unite: "ml", categorie: "Autre" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Vinaigre de vin",
        quantite: 10,
        unite: "ml",
        categorie: "Condiments",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Rincer les lentilles. Mettre dans la cuve avec la carotte en rondelles, l'oignon coupé en 4, le bouquet garni et l'eau.",
      },
      {
        numero: 2,
        instruction: "Mode Cuisson sous pression 15 min.",
        duree: 900,
      },
      {
        numero: 3,
        instruction: "Égoutter. Assaisonner avec sel et vinaigre.",
        conseil:
          "Saler après cuisson pour éviter que les lentilles ne durcissent.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "soupe-legumes-cookeo",
    titre: "Soupe de légumes d'hiver",
    description:
      "Une soupe rustique aux légumes de saison, cuite en 10 minutes sous pression.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 10,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["soupe"],
    regime: ["vegan", "sans-gluten", "sans-lactose"],
    tags: ["soupe", "légumes", "hiver", "express"],
    calories_par_portion: 95,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Pommes de terre",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Carottes",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poireaux",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Navet",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Eau", quantite: 800, unite: "ml", categorie: "Autre" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      { nom: "Poivre", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Éplucher et couper tous les légumes en morceaux. Mettre dans la cuve avec l'eau.",
      },
      {
        numero: 2,
        instruction: "Mode Cuisson sous pression 10 min.",
        duree: 600,
      },
      {
        numero: 3,
        instruction: "Mixer au mixeur plongeant. Assaisonner.",
        conseil:
          "Ajouter une noisette de beurre ou un filet de crème au service.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  // ── RAPIDE 🕒 ──
  {
    slug: "boeuf-stroganoff-cookeo",
    titre: "Bœuf Stroganoff",
    description:
      "Un bœuf Stroganoff crémeux et tendre, cuit rapidement sous pression au Cookeo.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 20,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten"],
    tags: ["bœuf", "stroganoff", "russe", "rapide"],
    calories_par_portion: 420,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Rumsteck",
        quantite: 500,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Champignons",
        quantite: 250,
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
        nom: "Crème fraîche",
        quantite: 150,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Moutarde de Dijon",
        quantite: 15,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Paprika", quantite: 5, unite: "g", categorie: "Condiments" },
      {
        nom: "Bouillon de bœuf",
        quantite: 150,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Huile", quantite: 10, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir le bœuf en lanières dans l'huile 3 min. Réserver.",
      },
      {
        numero: 2,
        instruction: "Faire revenir l'oignon émincé et les champignons 3 min.",
      },
      {
        numero: 3,
        instruction:
          "Remettre la viande, ajouter bouillon, paprika et moutarde. Mode Cuisson sous pression 15 min.",
        duree: 900,
      },
      {
        numero: 4,
        instruction: "Ouvrir. Ajouter la crème. Mode Mijoter 3 min.",
        conseil: "Servir avec des tagliatelles ou du riz.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "poulet-moutarde-cookeo",
    titre: "Poulet à la moutarde et crème",
    description:
      "Un classique bistrot français, le poulet moutarde-crème est un régal au Cookeo.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 20,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten"],
    tags: ["poulet", "moutarde", "crème", "bistrot", "rapide"],
    calories_par_portion: 360,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Cuisses de poulet",
        quantite: 4,
        unite: "pièce",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Moutarde à l'ancienne",
        quantite: 40,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Crème fraîche",
        quantite: 200,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Vin blanc", quantite: 100, unite: "ml", categorie: "Boissons" },
      {
        nom: "Bouillon de volaille",
        quantite: 100,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Huile", quantite: 10, unite: "ml", categorie: "Épicerie" },
      { nom: "Thym", quantite: 2, unite: "g", categorie: "Condiments" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir les cuisses de poulet 3 min par face.",
      },
      {
        numero: 2,
        instruction: "Ajouter l'oignon, le vin blanc, le bouillon et le thym.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 20 min.",
        duree: 1200,
      },
      {
        numero: 4,
        instruction:
          "Ouvrir. Ajouter la moutarde et la crème. Mode Mijoter 3 min.",
        conseil: "Ne pas faire bouillir après ajout de la moutarde.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "rogan-josh-cookeo",
    titre: "Rogan josh d'agneau",
    description:
      "Un curry d'agneau aux arômes intenses du Kashmir. Le Cookeo attendrit la viande rapidement.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 25,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose", "halal"],
    tags: ["agneau", "rogan josh", "indien", "rapide"],
    calories_par_portion: 440,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Épaule d'agneau",
        quantite: 600,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Oignon",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Tomates concassées",
        quantite: 300,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Yaourt nature",
        quantite: 100,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Garam masala",
        quantite: 10,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Cumin", quantite: 5, unite: "g", categorie: "Condiments" },
      { nom: "Paprika", quantite: 5, unite: "g", categorie: "Condiments" },
      {
        nom: "Gingembre",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Huile", quantite: 15, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir l'agneau en cubes dans l'huile 5 min.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter oignons émincés, ail, gingembre et épices. Dorer 3 min.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter tomates et 100ml d'eau. Mode Cuisson sous pression 25 min.",
        duree: 1500,
      },
      {
        numero: 4,
        instruction: "Ouvrir. Incorporer le yaourt. Mode Mijoter 2 min.",
        conseil: "Servir avec du riz basmati et du naan.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "penne-arrabiata-cookeo",
    titre: "Penne all'arrabbiata one pot",
    description:
      "Des pâtes épicées à la tomate, cuites directement dans leur sauce au Cookeo. Zéro vaisselle.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 8,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["vegan", "sans-lactose"],
    tags: ["pâtes", "arrabiata", "one pot", "rapide"],
    calories_par_portion: 350,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      { nom: "Penne rigate", quantite: 400, unite: "g", categorie: "Épicerie" },
      {
        nom: "Tomates concassées",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Piment rouge séché",
        quantite: 2,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Huile d'olive",
        quantite: 20,
        unite: "ml",
        categorie: "Condiments",
      },
      { nom: "Eau", quantite: 200, unite: "ml", categorie: "Autre" },
      {
        nom: "Basilic frais",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : faire revenir l'ail émincé et le piment dans l'huile 1 min.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter les tomates, l'eau, les pâtes et le sel. Bien immerger les pâtes.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 6 min.",
        duree: 360,
        conseil: "Libération rapide. Ajouter le basilic frais.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "chili-cookeo",
    titre: "Chili con carne express",
    description:
      "Un chili riche et savoureux cuit sous pression. Les saveurs se développent comme après des heures de mijotage.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 20,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: ["chili", "bœuf", "haricots", "rapide"],
    calories_par_portion: 380,
    nutriscore: "A",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Viande hachée",
        quantite: 400,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Haricots rouges",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Tomates concassées",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poivron",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Cumin", quantite: 5, unite: "g", categorie: "Condiments" },
      { nom: "Paprika fumé", quantite: 5, unite: "g", categorie: "Condiments" },
      { nom: "Huile", quantite: 10, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir la viande avec l'oignon émincé 5 min.",
      },
      {
        numero: 2,
        instruction: "Ajouter épices, poivron, tomates et haricots égouttés.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 15 min.",
        duree: 900,
        conseil: "Servir avec riz, crème fraîche et coriandre.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  // ── ÉQUILIBRÉE 🍲 ──
  {
    slug: "joue-boeuf-cookeo",
    titre: "Joue de bœuf fondante",
    description:
      "Des joues de bœuf qui fondent en bouche, cuites en 45 minutes au lieu de 3h grâce à la pression.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 45,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: ["joue", "bœuf", "fondant", "mijoté"],
    calories_par_portion: 460,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Joues de bœuf",
        quantite: 800,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      { nom: "Vin rouge", quantite: 300, unite: "ml", categorie: "Boissons" },
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
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouillon de bœuf",
        quantite: 200,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Huile", quantite: 15, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : saisir les joues dans l'huile 5 min par face.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter oignon, carottes, vin rouge, bouillon et bouquet garni.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 45 min.",
        duree: 2700,
        conseil:
          "Laisser décompresser naturellement pour une viande encore plus tendre.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "risotto-champignons-cookeo",
    titre: "Risotto aux champignons forestiers",
    description:
      "Un risotto crémeux aux champignons, cuit sans remuer au Cookeo.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 10,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["vegetarien"],
    tags: ["risotto", "champignons", "italien"],
    calories_par_portion: 390,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      { nom: "Riz arborio", quantite: 300, unite: "g", categorie: "Épicerie" },
      {
        nom: "Champignons mélangés",
        quantite: 300,
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
        nom: "Bouillon de légumes",
        quantite: 700,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Vin blanc", quantite: 80, unite: "ml", categorie: "Boissons" },
      {
        nom: "Parmesan",
        quantite: 60,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Beurre",
        quantite: 30,
        unite: "g",
        categorie: "Produits laitiers",
      },
      {
        nom: "Huile d'olive",
        quantite: 10,
        unite: "ml",
        categorie: "Condiments",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : revenir oignon et champignons dans l'huile 3 min.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter le riz, nacrer 1 min. Verser le vin blanc et le bouillon.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 7 min.",
        duree: 420,
      },
      {
        numero: 4,
        instruction: "Ouvrir. Ajouter beurre et parmesan. Mélanger.",
        conseil: "Laisser reposer 2 min couvert pour le crémeux.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  // ── MIJOTÉE 🔥 ──
  {
    slug: "jarret-veau-cookeo",
    titre: "Jarret de veau aux olives",
    description:
      "Un jarret de veau fondant aux olives et citron confit, façon méditerranéenne.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 50,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten"],
    tags: ["jarret", "veau", "olives", "méditerranéen", "mijoté"],
    calories_par_portion: 420,
    nutriscore: "B",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Jarret de veau",
        quantite: 4,
        unite: "pièce",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Olives vertes",
        quantite: 100,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Citron confit",
        quantite: 1,
        unite: "pièce",
        categorie: "Condiments",
      },
      {
        nom: "Tomates",
        quantite: 300,
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
        nom: "Ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Vin blanc", quantite: 150, unite: "ml", categorie: "Boissons" },
      { nom: "Bouillon", quantite: 200, unite: "ml", categorie: "Épicerie" },
      {
        nom: "Huile d'olive",
        quantite: 15,
        unite: "ml",
        categorie: "Condiments",
      },
      {
        nom: "Herbes de Provence",
        quantite: 5,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction: "Mode Dorer : saisir les jarrets 3 min par face.",
      },
      {
        numero: 2,
        instruction: "Ajouter oignon, ail, tomates, vin, bouillon, herbes.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 45 min.",
        duree: 2700,
      },
      {
        numero: 4,
        instruction:
          "Ouvrir. Ajouter olives et citron confit émincé. Mijoter 5 min.",
        conseil: "Servir avec de la polenta ou de la semoule.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  {
    slug: "porc-effiloche-cookeo",
    titre: "Porc effiloché (pulled pork)",
    description:
      "Du pulled pork fondant sauce BBQ, cuit en 50 minutes au Cookeo au lieu de 8h au four.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 10,
    temps_cuisson: 50,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: ["porc", "effiloché", "BBQ", "américain", "mijoté"],
    calories_par_portion: 480,
    nutriscore: "C",
    nutriscore_note: "Estimation indicative",
    ingredients: [
      {
        nom: "Échine de porc",
        quantite: 800,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      { nom: "Sauce BBQ", quantite: 150, unite: "ml", categorie: "Condiments" },
      {
        nom: "Vinaigre de cidre",
        quantite: 30,
        unite: "ml",
        categorie: "Condiments",
      },
      { nom: "Sucre roux", quantite: 30, unite: "g", categorie: "Épicerie" },
      {
        nom: "Paprika fumé",
        quantite: 10,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Oignon",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Ail",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Bouillon", quantite: 150, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Frotter la viande avec paprika, sucre et sel. Mode Dorer : saisir 3 min par face.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter oignon, ail, bouillon, vinaigre et la moitié de la sauce BBQ.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression 50 min.",
        duree: 3000,
      },
      {
        numero: 4,
        instruction:
          "Effilocher la viande à la fourchette. Mélanger avec le reste de sauce BBQ.",
        conseil: "Servir dans des buns avec du coleslaw.",
      },
    ],
    faq: null,
    approuve: true,
    publie: true,
    vues: 0,
  },
  // ══════════════════════════════════════════════════════════════════════
  //  10 NOUVELLES RECETTES COOKEO — VERSION COMPLÈTE
  //  À coller dans lib/seed-mega-cookeo.ts, juste avant le ]; final
  //
  //  ⚡ RAPIDES  (5) : cuisson sous pression ≤ 12 min
  //  🕒 MOYENNES (3) : cuisson sous pression 20-30 min
  //  🐌 LONGUES  (2) : cuisson sous pression 45-55 min
  // ══════════════════════════════════════════════════════════════════════

  // ── RAPIDES ⚡ ──────────────────────────────────────────────────────

  {
    slug: "curry-pois-chiches-cookeo",
    titre: "Curry de pois chiches au lait de coco",
    description:
      "Un curry vegan crémeux et parfumé, prêt en 12 minutes sous pression. Le lait de coco adoucit les épices tandis que les pois chiches absorbent tous les arômes du cumin, du curry et du gingembre. Un plat complet, riche en protéines végétales, sans aucune viande ni produit laitier — idéal pour tous les régimes. La cuisson sous pression du Cookeo concentre les saveurs comme si le plat avait mijoté une heure.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 8,
    temps_cuisson: 12,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["vegan", "sans-gluten", "sans-lactose", "vegetarien"],
    tags: [
      "curry",
      "pois chiches",
      "lait de coco",
      "vegan",
      "express",
      "sans viande",
      "légumineuses",
      "indien",
    ],
    calories_par_portion: 315,
    nutriscore: "A",
    nutriscore_note:
      "Riche en protéines végétales, fibres et fer. Faible en graisses saturées.",
    ingredients: [
      {
        nom: "Pois chiches en boîte, égouttés et rincés",
        quantite: 800,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Lait de coco entier",
        quantite: 400,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Tomates concassées en boîte",
        quantite: 200,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Oignon jaune moyen",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gingembre frais, râpé",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Curry en poudre (madras ou doux)",
        quantite: 12,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Curcuma en poudre",
        quantite: 4,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Garam masala", quantite: 5, unite: "g", categorie: "Condiments" },
      {
        nom: "Piment de Cayenne (optionnel)",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Huile de tournesol ou de coco",
        quantite: 15,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Coriandre fraîche pour servir",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Émincer l'oignon finement. Écraser et hacher l'ail. Râper le gingembre frais.",
        conseil:
          "Préparer tous les aromates avant d'allumer le Cookeo — la phase Dorer va vite et il faut tout avoir sous la main.",
      },
      {
        numero: 2,
        instruction:
          "Mode Dorer : verser l'huile, ajouter l'oignon émincé. Faire revenir 3 minutes en remuant régulièrement jusqu'à légère coloration.",
        duree: 180,
        conseil:
          "Un oignon bien doré (pas brûlé) développe des sucres naturels qui donnent de la profondeur à toute la sauce.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter l'ail haché et le gingembre râpé. Faire revenir 1 minute, puis ajouter le curry, le curcuma et le garam masala. Mélanger vivement 30 secondes pour torréfier les épices.",
        duree: 90,
        conseil:
          "Torréfier les épices à sec (ou avec très peu d'huile) 30 secondes libère leurs huiles essentielles et multiplie leur arôme. C'est l'étape la plus importante pour un curry savoureux.",
      },
      {
        numero: 4,
        instruction:
          "Ajouter les pois chiches égouttés, les tomates concassées et le lait de coco. Saler, mélanger. Fermer le couvercle.",
        conseil:
          "S'assurer que les pois chiches sont bien immergés dans le liquide pour une cuisson uniforme sous pression.",
      },
      {
        numero: 5,
        instruction: "Mode Cuisson sous pression : 12 minutes.",
        duree: 720,
        conseil:
          "Libération rapide de la pression. La sauce va paraître liquide à l'ouverture — elle épaissit en 2 minutes avec le Mode Mijoter si besoin.",
      },
      {
        numero: 6,
        instruction:
          "Goûter et ajuster le sel. Si la sauce est trop liquide, activer le Mode Mijoter 3 minutes à découvert pour la réduire. Servir sur du riz basmati, parsemé de coriandre fraîche.",
        duree: 180,
        conseil:
          "Un filet de jus de citron en finition rehausse tous les arômes. On peut aussi ajouter une poignée d'épinards frais à cette étape — ils fondent en 2 minutes.",
      },
    ],
    faq: [
      {
        question: "Peut-on utiliser des pois chiches secs plutôt qu'en boîte ?",
        reponse:
          "Oui, mais il faut les faire tremper 12h dans l'eau froide, puis les faire cuire seuls au Cookeo sous pression 35 minutes avant de démarrer la recette. Les pois chiches en boîte sont déjà cuits et font gagner beaucoup de temps.",
      },
      {
        question: "Comment rendre ce curry plus épicé ou plus doux ?",
        reponse:
          "Pour plus de piquant : ajouter du piment de Cayenne ou un piment frais haché à l'étape 3. Pour l'adoucir : remplacer une partie du lait de coco entier par du lait de coco léger, et utiliser un curry doux type Korma.",
      },
      {
        question: "Peut-on ajouter des légumes à cette recette ?",
        reponse:
          "Absolument. Des dés de patate douce, d'épinards (ajoutés après cuisson), de chou-fleur ou de courgette s'intègrent très bien. Les légumes racines se mettent avant la cuisson sous pression, les légumes tendres (épinards, petits pois) se font juste après, en Mode Mijoter 2 minutes.",
      },
      {
        question: "Ce plat se conserve-t-il bien ?",
        reponse:
          "Oui, c'est même meilleur le lendemain. Se conserve 3 jours au réfrigérateur dans une boîte hermétique, et se congèle parfaitement jusqu'à 3 mois. Réchauffer avec un peu d'eau si la sauce a trop épaissi.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "saumon-vapeur-citron-cookeo",
    titre: "Pavés de saumon vapeur citron-aneth",
    description:
      "Des pavés de saumon cuits à la perfection en 6 minutes sur le panier vapeur du Cookeo. La chair reste nacrée et moelleuse à cœur, infusée par les arômes du citron et de l'aneth. C'est l'une des cuissons vapeur les plus précises qui soit — la pression maintient une température constante impossible à obtenir à la casserole. Un plat léger, riche en oméga-3, prêt en moins de 15 minutes au total.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 8,
    temps_cuisson: 6,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: [
      "saumon",
      "vapeur",
      "citron",
      "aneth",
      "poisson",
      "express",
      "légume",
      "diététique",
      "oméga-3",
    ],
    calories_par_portion: 295,
    nutriscore: "A",
    nutriscore_note:
      "Excellent apport en oméga-3, protéines complètes et vitamine D. Faible en calories.",
    ingredients: [
      {
        nom: "Pavés de saumon atlantique (avec peau), 180 g chacun environ",
        quantite: 4,
        unite: "pièce",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Citron jaune non traité",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Aneth frais",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Ail en poudre (optionnel)",
        quantite: 2,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Eau", quantite: 250, unite: "ml", categorie: "Autre" },
      {
        nom: "Huile d'olive extra vierge",
        quantite: 20,
        unite: "ml",
        categorie: "Condiments",
      },
      {
        nom: "Fleur de sel",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Poivre noir fraîchement moulu",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Haricots verts ou brocoli pour accompagner (optionnel)",
        quantite: 300,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Sortir le saumon du réfrigérateur 10 minutes avant la cuisson. Sécher les pavés avec du papier absorbant. Assaisonner les deux faces avec la fleur de sel, le poivre et l'ail en poudre si utilisé.",
        conseil:
          "Sécher le poisson est crucial : l'excès d'humidité en surface fait 'bouillir' la chair plutôt que de la cuire proprement, même à la vapeur. La cuisson à température ambiante évite un choc thermique qui durcirait l'extérieur.",
      },
      {
        numero: 2,
        instruction:
          "Verser 250 ml d'eau dans la cuve. Couper le citron en fines rondelles. Déposer quelques rondelles dans l'eau pour parfumer la vapeur.",
        conseil:
          "L'eau citronnée dans la cuve va créer une vapeur aromatique qui parfumera délicatement le saumon de l'intérieur.",
      },
      {
        numero: 3,
        instruction:
          "Placer les pavés de saumon sur le panier vapeur, peau vers le bas. Disposer les rondelles de citron restantes sur le dessus des pavés. Parsemer de la moitié de l'aneth frais.",
        accessoire: "panier vapeur",
        conseil:
          "Ne pas superposer les pavés — ils doivent tous être en contact direct avec la vapeur pour cuire uniformément.",
      },
      {
        numero: 4,
        instruction:
          "Si vous accompagnez avec des légumes, les déposer autour des pavés sur le panier vapeur. Fermer le couvercle. Mode Cuisson sous pression : 6 minutes.",
        duree: 360,
        accessoire: "panier vapeur",
        conseil:
          "6 minutes donnent un saumon encore rosé et nacré au centre (cuisson idéale). Pour un saumon bien cuit à cœur : 8 minutes. Ne jamais dépasser 10 minutes sous pression — la chair deviendrait sèche et farineuse.",
      },
      {
        numero: 5,
        instruction:
          "Libération rapide de la pression. Ouvrir délicatement le couvercle en évitant la vapeur. Transférer les pavés dans les assiettes avec une spatule large pour ne pas les casser.",
        conseil:
          "Le saumon est fragile à ce stade. Glisser la spatule sous la peau pour le soulever d'un seul mouvement.",
      },
      {
        numero: 6,
        instruction:
          "Arroser d'un filet d'huile d'olive et d'un trait de jus de citron frais. Parsemer du reste de l'aneth. Servir immédiatement.",
        conseil:
          "Servir sans attendre — le saumon continue à cuire dans sa chaleur résiduelle et refroidit vite. En sauce : mélanger 2 c. à soupe de crème fraîche + aneth + jus de citron + sel en émulsion rapide.",
      },
    ],
    faq: [
      {
        question: "Comment savoir si le saumon est cuit à point ?",
        reponse:
          "Appuyer légèrement sur le centre du pavé avec le doigt. Il doit s'écraser légèrement et la chair doit être opaque en surface mais encore translucide rosé au cœur. Si une fourchette glisse sans résistance depuis le bord, la cuisson est parfaite.",
      },
      {
        question: "Peut-on utiliser du saumon surgelé directement ?",
        reponse:
          "Non, il faut impérativement décongeler complètement le saumon avant cuisson (idéalement la nuit au réfrigérateur). Un pavé encore partiellement congelé cuira de façon inégale — cuit en surface, cru au centre.",
      },
      {
        question: "Peut-on remplacer le saumon par un autre poisson ?",
        reponse:
          "Oui : truite (même temps), cabillaud (5 minutes), filet de bar (4 minutes), dos de lieu noir (5 minutes). Les poissons maigres ont tendance à se défaire plus facilement — les manipuler avec encore plus de précaution.",
      },
      {
        question: "Quelle sauce pour accompagner ce saumon vapeur ?",
        reponse:
          "La sauce la plus simple : crème fraîche + aneth + zeste de citron + sel. Autres options : sauce au yaourt grec et concombre (type tzatziki), sauce vierge à la tomate et basilic, ou simplement un beurre blanc rapide (beurre + échalote + vin blanc réduire à la casserole).",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "pates-thon-tomates-cookeo",
    titre: "Pâtes thon-tomates one pot express",
    description:
      "Un one pot pasta en 8 minutes où les pâtes cuisent directement dans leur sauce tomate. Zéro vaisselle supplémentaire, zéro surveillance — le Cookeo gère tout sous pression. Le thon s'incorpore en fin de cuisson pour rester moelleux, les olives et câpres apportent la touche méditerranéenne. Un plat complet que tout le monde a dans ses placards.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 5,
    temps_cuisson: 8,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-lactose"],
    tags: [
      "pâtes",
      "thon",
      "tomates",
      "one pot",
      "express",
      "méditerranéen",
      "économique",
      "placards",
    ],
    calories_par_portion: 375,
    nutriscore: "B",
    nutriscore_note:
      "Bon apport en protéines (thon) et glucides complexes. Modéré en sel selon les conserves choisies.",
    ingredients: [
      {
        nom: "Penne rigate ou fusilli",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Thon entier en boîte au naturel, égoutté",
        quantite: 240,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Tomates concassées en boîte",
        quantite: 400,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Gousses d'ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Câpres au vinaigre, égouttées",
        quantite: 25,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Olives noires dénoyautées",
        quantite: 80,
        unite: "g",
        categorie: "Épicerie",
      },
      { nom: "Eau bouillante", quantite: 300, unite: "ml", categorie: "Autre" },
      {
        nom: "Huile d'olive extra vierge",
        quantite: 20,
        unite: "ml",
        categorie: "Condiments",
      },
      { nom: "Origan séché", quantite: 4, unite: "g", categorie: "Condiments" },
      {
        nom: "Piment rouge séché ou flocons de piment (optionnel)",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Basilic frais pour servir",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : verser l'huile d'olive, faire revenir l'ail émincé et le piment 1 minute en remuant. Stopper le mode Dorer.",
        duree: 60,
        conseil:
          "Surveiller — l'ail brûle en quelques secondes. Dès qu'il blondit légèrement et que l'huile est parfumée, c'est prêt.",
      },
      {
        numero: 2,
        instruction:
          "Verser les tomates concassées, l'eau bouillante, l'origan et le sel. Ajouter les pâtes et les enfoncer dans le liquide en les cassant si nécessaire. Mélanger pour bien les immerger.",
        conseil:
          "Les pâtes doivent être entièrement couvertes par le liquide. Si elles dépassent, ajouter 50 ml d'eau supplémentaire. Un one pot raté, c'est souvent un manque de liquide au départ.",
      },
      {
        numero: 3,
        instruction:
          "Fermer le couvercle. Mode Cuisson sous pression : 6 minutes (pour des pâtes al dente) ou 7 minutes (pour des pâtes plus fondantes).",
        duree: 360,
        conseil:
          "Le temps de cuisson correspond à la moitié du temps indiqué sur le paquet, moins 1 minute. Adapter selon la marque et le format des pâtes.",
      },
      {
        numero: 4,
        instruction:
          "Libération rapide de la pression. Ouvrir et mélanger immédiatement — la sauce va continuer à épaissir au contact de l'amidon des pâtes. Si trop liquide : Mode Mijoter 2 minutes à découvert.",
        duree: 120,
        conseil:
          "Si trop épais : ajouter un peu d'eau de cuisson et mélanger. La sauce doit napper les pâtes sans les noyer.",
      },
      {
        numero: 5,
        instruction:
          "Incorporer le thon émietté grossièrement, les câpres et les olives. Mélanger délicatement pour ne pas trop écraser le thon. Laisser reposer 1 minute.",
        conseil:
          "Le thon se mélange hors cuisson pour rester en morceaux. Si on le met avant la pression, il se défait complètement et disparaît dans la sauce.",
      },
      {
        numero: 6,
        instruction:
          "Servir dans des assiettes creuses. Parsemer de basilic frais ciselé et arroser d'un filet d'huile d'olive crue.",
        conseil:
          "Un peu de parmesan râpé sur le dessus, même si ce n'est pas traditionnel avec le thon, fonctionne très bien.",
      },
    ],
    faq: [
      {
        question: "Pourquoi mes pâtes ont-elles attaché au fond ?",
        reponse:
          "Deux raisons possibles : pas assez de liquide au départ, ou les pâtes n'étaient pas assez immergées. Pour la prochaine fois, s'assurer que tout est bien recouvert et utiliser de l'eau bouillante (pas froide) pour un démarrage plus rapide.",
      },
      {
        question: "Peut-on remplacer le thon par autre chose ?",
        reponse:
          "Oui : du thon à l'huile pour une sauce plus riche, des sardines égouttées pour un goût plus prononcé, des crevettes décortiquées (ajouter aussi hors cuisson à l'étape 5), ou du poulet cuit émincé. Pour une version végétarienne : champignons sautés + câpres + olives.",
      },
      {
        question: "Le fond de la cuve est-il difficile à nettoyer après ?",
        reponse:
          "Non, à condition de ne pas laisser les pâtes refroidir trop longtemps dans la cuve. Remplir immédiatement d'eau chaude après service. L'amidon qui a légèrement attaché au fond part facilement après 10 minutes de trempage.",
      },
      {
        question: "Peut-on préparer ce plat en avance ?",
        reponse:
          "Les one pot pasta sont meilleurs servis immédiatement. Les pâtes continuent d'absorber la sauce en refroidissant et deviennent pâteuses. Pour réchauffer, ajouter obligatoirement un fond d'eau et mélanger à feu doux.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "veloute-courgette-vache-qui-rit-cookeo",
    titre: "Velouté de courgette crémeux à la Vache qui rit",
    description:
      "Le velouté de courgette onctueux que tout le monde adore, cuit en 10 minutes sous pression et mixé directement dans la cuve. Les portions de fromage fondu donnent ce côté ultra-crémeux et légèrement salé qui fait tout le succès de cette recette. Simple, rapide, économique et adoré aussi bien des enfants que des adultes. Parfait pour cuisiner les courgettes en abondance l'été.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 8,
    temps_cuisson: 10,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["soupe", "entree"],
    regime: ["vegetarien", "sans-gluten"],
    tags: [
      "velouté",
      "courgette",
      "soupe",
      "express",
      "crémeux",
      "enfants",
      "économique",
      "été",
    ],
    calories_par_portion: 125,
    nutriscore: "B",
    nutriscore_note:
      "Légère en calories, riche en eau et potassium. Apport modéré en calcium grâce au fromage fondu.",
    ingredients: [
      {
        nom: "Courgettes moyennes, épluchées et coupées en rondelles",
        quantite: 900,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon jaune moyen, émincé",
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
        nom: "Portions de fromage fondu type Vache qui rit ou Kiri",
        quantite: 4,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Bouillon de légumes (cube + eau chaude)",
        quantite: 500,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Huile d'olive",
        quantite: 10,
        unite: "ml",
        categorie: "Condiments",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Poivre noir",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Muscade moulue (optionnel)",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Crème fraîche et ciboulette pour servir (optionnel)",
        quantite: 50,
        unite: "ml",
        categorie: "Produits laitiers",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mode Dorer : faire revenir l'oignon émincé et l'ail écrasé dans l'huile d'olive pendant 2 minutes, jusqu'à ce qu'ils soient translucides et légèrement dorés.",
        duree: 120,
        conseil:
          "Ne pas faire trop dorer l'oignon — on veut juste enlever le côté cru et sucré. Un oignon bien sué (pas caramélisé) donne une soupe plus douce.",
      },
      {
        numero: 2,
        instruction:
          "Ajouter les rondelles de courgette et le bouillon de légumes chaud. Saler légèrement (le fromage fondu est déjà salé). Fermer le couvercle.",
        conseil:
          "Goûter avant de saler — selon les marques de fromage fondu et de bouillon cube, la soupe peut déjà être bien salée. Mieux vaut ajuster en fin de recette.",
      },
      {
        numero: 3,
        instruction: "Mode Cuisson sous pression : 10 minutes.",
        duree: 600,
        conseil:
          "Les courgettes vont complètement ramollir sous pression, ce qui donnera un velouté parfaitement lisse sans effort de mixage.",
      },
      {
        numero: 4,
        instruction:
          "Libération rapide. Ajouter les portions de fromage fondu dans la cuve encore chaude. Mixer au mixeur plongeant directement dans la cuve jusqu'à obtenir une texture parfaitement lisse.",
        conseil:
          "Tenir le couvercle en position inclinée lors du mixage plongeant pour éviter les projections. Commencer doucement et accélérer progressivement.",
      },
      {
        numero: 5,
        instruction:
          "Ajouter le poivre et la muscade. Goûter et ajuster le sel si nécessaire. Si le velouté est trop épais, ajouter un peu d'eau chaude et remixer brièvement.",
        conseil:
          "La consistance idéale : le velouté doit napper légèrement le dos d'une cuillère. Ni trop liquide, ni trop épais.",
      },
      {
        numero: 6,
        instruction:
          "Servir dans des bols chauds. Décorer d'une cuillerée de crème fraîche, de ciboulette ciselée et d'un trait d'huile d'olive. Accompagner de croûtons frottés à l'ail.",
        conseil:
          "Ce velouté supporte très bien d'être servi froid l'été (comme un gaspacho de courgette) avec une touche de menthe fraîche à la place de la ciboulette.",
      },
    ],
    faq: [
      {
        question: "Peut-on remplacer le fromage fondu par autre chose ?",
        reponse:
          "Oui : de la crème fraîche épaisse (100 ml) donne un résultat plus neutre. Du chèvre frais (80 g) apporte plus de caractère. Du cream cheese type Philadelphia (60 g) fonctionne aussi très bien. Pour une version vegan, utiliser de la crème de noix de cajou ou du lait de coco.",
      },
      {
        question: "Faut-il éplucher les courgettes ?",
        reponse:
          "Ce n'est pas obligatoire — la peau des courgettes est fine et disparaît complètement au mixage. Cependant, enlever la peau donne un velouté d'un vert plus pâle et d'une texture encore plus lisse. Avec la peau, la couleur est plus verte et le goût légèrement plus prononcé.",
      },
      {
        question: "Ce velouté se congèle-t-il bien ?",
        reponse:
          "Oui, mais sans le fromage fondu et la crème. Congeler le velouté courgette-bouillon, puis ajouter le fromage au moment du réchauffage. Les soupes mixées contenant du fromage fondu peuvent avoir une texture granuleuse après décongélation.",
      },
      {
        question: "Comment éviter que la soupe soit amère ?",
        reponse:
          "Le goût amer vient parfois des courgettes très grosses ou trop mûres. Préférer des courgettes petites ou moyennes (moins de 200g chacune) à la peau bien brillante. Les grosses courgettes d'été ont parfois développé des cucurbitacines amères, surtout dans les graines.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "quinoa-legumes-cookeo",
    titre: "Quinoa aux légumes du soleil",
    description:
      "Un quinoa complet cuit sous pression avec des légumes méditerranéens colorés — courgette, poivron, tomates cerises et oignon rouge. Prêt en 8 minutes après la montée en pression, c'est l'un des plats vegan les plus rapides et les plus complets du Cookeo. Le quinoa absorbe tout le bouillon parfumé aux herbes de Provence et ressort gonflé, légèrement croquant et plein de saveur. Idéal en plat principal ou en accompagnement.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 12,
    temps_cuisson: 8,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat", "accompagnement"],
    regime: ["vegan", "sans-gluten", "sans-lactose", "vegetarien"],
    tags: [
      "quinoa",
      "légumes",
      "méditerranéen",
      "vegan",
      "express",
      "sans gluten",
      "complet",
      "protéines végétales",
    ],
    calories_par_portion: 275,
    nutriscore: "A",
    nutriscore_note:
      "Protéine complète (acides aminés essentiels), riche en fibres, magnésium et fer. Faible index glycémique.",
    ingredients: [
      {
        nom: "Quinoa blanc ou tricolore, bien rincé",
        quantite: 300,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Courgette moyenne, coupée en petits dés",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poivron rouge, épépiné et coupé en dés",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Tomates cerises, coupées en deux",
        quantite: 150,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon rouge moyen, émincé",
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
        nom: "Bouillon de légumes chaud",
        quantite: 450,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Herbes de Provence",
        quantite: 6,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Huile d'olive extra vierge",
        quantite: 20,
        unite: "ml",
        categorie: "Condiments",
      },
      {
        nom: "Jus de citron",
        quantite: 15,
        unite: "ml",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Poivre noir",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Feta émiettée ou persil frais pour servir (optionnel)",
        quantite: 60,
        unite: "g",
        categorie: "Produits laitiers",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Rincer abondamment le quinoa dans une passoire fine sous l'eau froide pendant 1 à 2 minutes en le frottant avec les doigts.",
        conseil:
          "Cette étape est indispensable — le quinoa est naturellement recouvert de saponines, un composé légèrement amer. Un bon rinçage élimine cette amertume et change complètement le résultat final.",
      },
      {
        numero: 2,
        instruction:
          "Mode Dorer : verser l'huile d'olive, faire revenir l'oignon rouge et l'ail émincé 2 minutes jusqu'à légère coloration. Ajouter le poivron en dés, cuire encore 1 minute.",
        duree: 180,
        conseil:
          "Faire dorer légèrement les légumes avant la cuisson sous pression développe des arômes caramélisés qui enrichissent tout le plat.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter le quinoa rincé, les courgettes en dés, les tomates cerises et les herbes de Provence. Mélanger. Verser le bouillon chaud. Saler, poivrer.",
        conseil:
          "Le ratio quinoa/liquide pour la cuisson sous pression est 1:1,5 (300g de quinoa pour 450ml). Respecter ce ratio est essentiel pour éviter un quinoa pâteux ou trop sec.",
      },
      {
        numero: 4,
        instruction:
          "Fermer le couvercle. Mode Cuisson sous pression : 8 minutes.",
        duree: 480,
        conseil:
          "Laisser décompresser naturellement 3 minutes avant la libération rapide. Cette décompression douce permet au quinoa d'absorber le reste de bouillon progressivement.",
      },
      {
        numero: 5,
        instruction:
          "Ouvrir et égrener délicatement le quinoa avec une fourchette. Arroser du jus de citron, mélanger délicatement.",
        conseil:
          "Le quinoa doit être gonflé, grains séparés et légèrement transparents avec le petit germe blanc visible. S'il est collant, remettre Mode Mijoter 2 minutes à découvert.",
      },
      {
        numero: 6,
        instruction:
          "Servir dans des assiettes creuses. Parsemer de feta émiettée ou de persil frais ciselé. Arroser d'un filet d'huile d'olive crue.",
        conseil:
          "Ce plat est aussi excellent servi froid, en salade, avec un jus de citron supplémentaire. Il se conserve 3 jours au frigo et se déguste sans réchauffer.",
      },
    ],
    faq: [
      {
        question: "Pourquoi mon quinoa est-il amer ?",
        reponse:
          "Il n'a pas été assez rincé. Les saponines naturelles du quinoa (couche externe) sont responsables de cette amertume. Rincer minimum 90 secondes sous l'eau courante en frottant les graines entre les paumes. Certaines marques indiquent 'déjà rincé' mais un rinçage supplémentaire ne fait jamais de mal.",
      },
      {
        question: "Peut-on remplacer le bouillon de légumes par de l'eau ?",
        reponse:
          "Oui, mais le résultat sera nettement moins savoureux. Si vous n'avez pas de bouillon, ajouter au moins une c. à café de sel, un filet d'huile d'olive et des épices supplémentaires dans l'eau.",
      },
      {
        question: "Peut-on ajouter des légumineuses pour enrichir le plat ?",
        reponse:
          "Absolument. Des pois chiches en boîte (égouttés) ou des haricots blancs s'incorporent à l'étape 3, avant la cuisson sous pression. Ne pas ajouter de lentilles sèches sans les précuire — elles demandent plus de liquide.",
      },
      {
        question: "Ce plat convient-il aux enfants ?",
        reponse:
          "Oui, les enfants apprécient généralement la texture légèrement croquante du quinoa. Pour les plus petits, réduire ou supprimer les épices, et couper les légumes en plus petits morceaux. Ajouter du fromage râpé sur le dessus pour le rendre plus gourmand.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  // ── MOYENNES 🕒 ─────────────────────────────────────────────────────

  {
    slug: "tajine-poulet-citron-cookeo",
    titre: "Tajine de poulet aux citrons confits et olives",
    description:
      "Un tajine maghrébin authentique aux citrons confits et olives vertes, cuit sous pression en 25 minutes. Les arômes du ras el hanout, du curcuma et du gingembre se concentrent grâce à la pression pour donner des saveurs qu'une cuisson traditionnelle met des heures à développer. Le poulet devient fondant, la sauce est dorée et parfumée. Un plat familial généreux qui se partage avec de la semoule ou des pommes de terre.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 28,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose", "halal"],
    tags: [
      "tajine",
      "poulet",
      "citron confit",
      "maghrébin",
      "halal",
      "marocain",
      "olives",
      "ras el hanout",
    ],
    calories_par_portion: 375,
    nutriscore: "A",
    nutriscore_note:
      "Riche en protéines maigres. Huile d'olive et olives apportent des graisses mono-insaturées bénéfiques.",
    ingredients: [
      {
        nom: "Cuisses de poulet halal (avec os), 200 g chacune environ",
        quantite: 4,
        unite: "pièce",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Oignons jaunes moyens, émincés finement",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Citron confit au sel, rincé et coupé en quartiers",
        quantite: 1,
        unite: "pièce",
        categorie: "Condiments",
      },
      {
        nom: "Olives vertes dénoyautées (ou avec noyau pour plus de goût)",
        quantite: 100,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Bouillon de volaille halal",
        quantite: 150,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Ras el hanout",
        quantite: 12,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Curcuma en poudre",
        quantite: 4,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Gingembre en poudre",
        quantite: 4,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Poivre noir fraîchement moulu",
        quantite: 2,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Huile d'olive",
        quantite: 20,
        unite: "ml",
        categorie: "Condiments",
      },
      {
        nom: "Persil plat frais",
        quantite: 20,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Coriandre fraîche",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Rincer le citron confit abondamment sous l'eau froide pour enlever l'excès de sel. Le couper en quartiers puis retirer la pulpe — n'utiliser que l'écorce confite.",
        conseil:
          "L'excès de sel du citron confit peut déséquilibrer tout le plat. Bien rincer est indispensable. Si le citron est très salé, le faire tremper 10 minutes dans l'eau froide avant de le couper.",
      },
      {
        numero: 2,
        instruction:
          "Mélanger le ras el hanout, le curcuma, le gingembre, le poivre et une pincée de sel dans un bol. Badigeonner généreusement les cuisses de poulet de ce mélange d'épices sur toutes les faces.",
        conseil:
          "Mariner le poulet dans les épices 30 minutes minimum au frigo (ou toute la nuit) donne un résultat encore plus parfumé. Mais même à sec juste avant cuisson, l'effet est là.",
      },
      {
        numero: 3,
        instruction:
          "Mode Dorer : verser l'huile, faire dorer les cuisses de poulet 3 minutes par face jusqu'à belle coloration dorée. Réserver le poulet sur une assiette.",
        duree: 360,
        conseil:
          "Ne pas sauter l'étape de dorage — la réaction de Maillard sur la peau crée une couche savoureuse qui parfume toute la sauce pendant la cuisson sous pression.",
      },
      {
        numero: 4,
        instruction:
          "Dans la même cuve, faire revenir les oignons émincés et l'ail écrasé avec les épices qui restent dans le fond 2-3 minutes jusqu'à ce qu'ils ramollissent.",
        duree: 180,
        conseil:
          "Les sucs de cuisson du poulet collés au fond de la cuve sont pleins de saveur. En ajoutant les oignons, ils vont déglacer naturellement et enrichir la sauce.",
      },
      {
        numero: 5,
        instruction:
          "Remettre les cuisses de poulet dans la cuve. Ajouter le bouillon, les quartiers de citron confit. Fermer le couvercle. Mode Cuisson sous pression : 25 minutes.",
        duree: 1500,
        conseil:
          "Le poulet avec os supporte très bien 25 minutes sous pression — la chair se détache facilement et reste juteuse. Pour des blancs sans os, réduire à 15 minutes.",
      },
      {
        numero: 6,
        instruction:
          "Libération naturelle 5 minutes, puis rapide. Ouvrir, ajouter les olives. Mode Mijoter 3 minutes pour les réchauffer et réduire légèrement la sauce.",
        duree: 180,
        conseil:
          "Si la sauce est trop liquide, retirer le poulet, passer en Mode Dorer 3-4 minutes pour la réduire, puis remettre la viande. Les olives ne doivent pas trop cuire — juste les réchauffer pour qu'elles gardent leur texture.",
      },
      {
        numero: 7,
        instruction:
          "Parsemer généreusement de persil plat et coriandre fraîche hachés. Servir avec de la semoule de couscous fine, du pain maison ou des pommes de terre vapeur.",
        conseil:
          "Pour une version encore plus authentique, accompagner de harissa maison à côté pour ceux qui aiment le piquant.",
      },
    ],
    faq: [
      {
        question: "Où trouver du citron confit et peut-on le faire soi-même ?",
        reponse:
          "On trouve du citron confit en bocal dans les rayons condiments, les épiceries orientales ou sur internet. Pour le faire soi-même : frotter des citrons avec du gros sel, les mettre en bocal stérilisé avec du jus de citron et des épices (laurier, poivre), laisser mûrir 3 à 4 semaines à température ambiante. Résultat incomparable.",
      },
      {
        question: "Peut-on préparer ce tajine la veille ?",
        reponse:
          "Oui, et c'est encore meilleur le lendemain — les épices ont le temps de se marier. Conserver au réfrigérateur et réchauffer en Mode Mijoter 10 minutes en ajoutant un peu de bouillon si la sauce a trop épaissi. Ajouter les herbes fraîches au moment de servir.",
      },
      {
        question: "Peut-on utiliser d'autres morceaux de poulet ?",
        reponse:
          "Oui. Des pilons de poulet (même temps). Des hauts de cuisse désossés (20 minutes). Des blancs entiers (12-15 minutes seulement — ils sèchent facilement). Éviter les morceaux trop petits qui se défont. Le poulet entier coupé en 8 est excellent pour une version festive (30 min sous pression).",
      },
      {
        question: "Ce plat est-il adapté au mois de Ramadan ?",
        reponse:
          "Absolument. Tous les ingrédients sont halal et le plat est copieux, riche en protéines et en saveurs. Il se prépare facilement avant l'iftar et se réchauffe en 10 minutes. La semoule en accompagnement apporte les glucides nécessaires pour la soirée.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "boeuf-carottes-cookeo",
    titre: "Bœuf aux carottes fondant de grand-mère",
    description:
      "Le bœuf aux carottes fondant de grand-mère, avec ses morceaux de paleron qui se défont à la fourchette et sa sauce brun dorée légèrement sucrée par les carottes. La cuisson sous pression du Cookeo compresse en 30 minutes ce que 2h30 de mijotage au four donnaient autrefois. Le résultat est identique — voire meilleur, car la viande reste plus juteuse. Un grand classique de la cuisine française accessible en semaine.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 32,
    difficulte: "facile",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: [
      "bœuf",
      "carottes",
      "mijoté",
      "grand-mère",
      "classique",
      "fondant",
      "familial",
      "économique",
    ],
    calories_par_portion: 435,
    nutriscore: "B",
    nutriscore_note:
      "Riche en protéines et en fer héminique. Carottes apportent bêta-carotène et fibres.",
    ingredients: [
      {
        nom: "Paleron de bœuf, coupé en gros cubes de 5 cm",
        quantite: 700,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Carottes moyennes, épluchées et coupées en tronçons",
        quantite: 4,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon jaune moyen, émincé",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail, épluchées et écrasées",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Concentré de tomates",
        quantite: 25,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Bouillon de bœuf (cube + eau chaude)",
        quantite: 300,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Vin rouge corsé (ou bouillon supplémentaire)",
        quantite: 100,
        unite: "ml",
        categorie: "Boissons",
      },
      {
        nom: "Bouquet garni (laurier, thym, persil)",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Farine T45", quantite: 20, unite: "g", categorie: "Épicerie" },
      {
        nom: "Huile neutre (tournesol ou pépins de raisin)",
        quantite: 20,
        unite: "ml",
        categorie: "Épicerie",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Poivre noir fraîchement moulu",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Sécher les cubes de paleron avec du papier absorbant. Saler et poivrer généreusement sur toutes les faces. Fariner légèrement les morceaux en les roulant dans la farine, secouer l'excédent.",
        conseil:
          "Sécher la viande est crucial pour obtenir un beau dorage. La farine, en caramélisant, va épaissir la sauce naturellement pendant la cuisson. Ne pas mettre trop de farine — juste une fine couche.",
      },
      {
        numero: 2,
        instruction:
          "Mode Dorer : verser l'huile dans la cuve. Quand elle est chaude, saisir les morceaux de bœuf en plusieurs fois (pas tous en même temps) pendant 3-4 minutes jusqu'à belle croûte brun dorée sur toutes les faces. Réserver.",
        duree: 480,
        conseil:
          "La clé du bœuf aux carottes : un dorage intense, en petites quantités. Si on met toute la viande d'un coup, elle va bouillir dans son jus au lieu de dorer. Travailler en 2-3 fois selon la taille de la cuve.",
      },
      {
        numero: 3,
        instruction:
          "Dans la même cuve (sans nettoyer), faire revenir l'oignon émincé 2 minutes. Ajouter l'ail écrasé et le concentré de tomates. Mélanger et cuire encore 1 minute en grattant les sucs au fond.",
        duree: 180,
        conseil:
          "Les sucs bruns collés au fond de la cuve après le dorage sont de l'or en barre en termes de saveur. Le concentré de tomates va se 'pincer' légèrement à cette étape, développant des notes umami.",
      },
      {
        numero: 4,
        instruction:
          "Remettre les morceaux de bœuf. Ajouter les carottes, le bouillon chaud, le vin rouge et le bouquet garni. Mélanger. La viande doit être immergée aux 2/3.",
        conseil:
          "Si le vin est utilisé, le verser en premier et gratter le fond pour décoller tous les sucs avant d'ajouter le bouillon. Un vin pas terrible en bouteille donnera quand même un plat délicieux — il perd son alcool et ne reste que les arômes.",
      },
      {
        numero: 5,
        instruction:
          "Fermer le couvercle. Mode Cuisson sous pression : 30 minutes.",
        duree: 1800,
        conseil:
          "Laisser décompresser naturellement au moins 5 minutes avant d'ouvrir — cette décompression douce continue la cuisson en douceur et garde la viande plus juteuse que la libération rapide.",
      },
      {
        numero: 6,
        instruction:
          "Retirer le bouquet garni. Vérifier la tendreté de la viande — elle doit se défaire facilement avec une fourchette. Si besoin : re-fermer et cuire 10 minutes supplémentaires.",
        conseil:
          "La tendreté dépend de la qualité et de l'âge du paleron. Certains morceaux ont besoin de 40 minutes. Ne pas hésiter à prolonger.",
      },
      {
        numero: 7,
        instruction:
          "Si la sauce est trop liquide : retirer viande et carottes, activer Mode Dorer 3-4 minutes à découvert pour la réduire. Remettre la garniture et servir avec des pommes de terre vapeur, des tagliatelles fraîches ou de la polenta.",
        duree: 240,
        conseil:
          "Ce plat est encore meilleur réchauffé le lendemain. La sauce épaissit et les saveurs se développent davantage au repos.",
      },
    ],
    faq: [
      {
        question: "Peut-on remplacer le paleron par une autre coupe de bœuf ?",
        reponse:
          "Oui : le gîte, la macreuse et le plat de côtes donnent des résultats similaires. Éviter absolument les coupes à griller comme l'entrecôte ou le filet — elles deviendraient caoutchouteuses à la cuisson longue. Règle générale : plus la pièce est gélatineuse et économique, plus elle sera fondante après braisage.",
      },
      {
        question:
          "Mon bœuf aux carottes est trop liquide, comment épaissir la sauce ?",
        reponse:
          "Trois options : (1) Sortir viande et carottes, activer Mode Dorer et réduire à découvert 5-8 minutes. (2) Mélanger 1 c. à soupe de maïzena dans 2 c. à soupe d'eau froide, verser dans la sauce chaude en remuant. (3) Écraser 2-3 rondelles de carottes cuites dans la sauce pour l'épaissir naturellement.",
      },
      {
        question: "Ce plat peut-il se congeler ?",
        reponse:
          "Oui, c'est l'un des plats qui supporte le mieux la congélation. Diviser en portions individuelles, laisser refroidir complètement, mettre en boîtes hermétiques. Se conserve 3 mois au congélateur. Décongeler une nuit au réfrigérateur et réchauffer en Mode Mijoter 10 minutes.",
      },
      {
        question: "Quel vin utiliser dans cette recette ?",
        reponse:
          "N'importe quel vin rouge que vous seriez prêt à boire — un Côtes du Rhône, un Languedoc ou un simple vin de table. Éviter les vins très tanniques (Madiran, Cahors jeune) qui peuvent donner une sauce amère. Si vous ne souhaitez pas utiliser d'alcool, remplacer par 100 ml de bouillon supplémentaire et 1 c. à café de vinaigre balsamique.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "curry-agneau-patate-douce-cookeo",
    titre: "Curry d'agneau à la patate douce",
    description:
      "Un curry généreux avec des cubes d'agneau fondants et la douceur naturelle de la patate douce, le tout baigné dans une sauce au lait de coco richement épicée. Le curry madras et le garam masala s'associent pour donner de la profondeur, tandis que la patate douce apporte une légère sucrosité qui équilibre le piquant. Cuit en 25 minutes sous pression, c'est un plat qui remplace sans complexe un vrai curry de restaurant.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 15,
    temps_cuisson: 28,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose", "halal"],
    tags: [
      "agneau",
      "curry",
      "patate douce",
      "halal",
      "indien",
      "lait de coco",
      "épicé",
      "réconfortant",
    ],
    calories_par_portion: 465,
    nutriscore: "B",
    nutriscore_note:
      "Riche en protéines, vitamine A (patate douce), fer. Apport modéré en graisses saturées via le lait de coco.",
    ingredients: [
      {
        nom: "Épaule d'agneau halal désossée, coupée en cubes de 4 cm",
        quantite: 600,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Patates douces, épluchées et coupées en cubes de 3 cm",
        quantite: 400,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Lait de coco entier (agiter la boîte avant ouverture)",
        quantite: 400,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Tomates concassées en boîte",
        quantite: 200,
        unite: "g",
        categorie: "Épicerie",
      },
      {
        nom: "Oignon jaune moyen, émincé",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail, hachées",
        quantite: 3,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gingembre frais, râpé (ou 1 c. à café de gingembre en poudre)",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Curry madras (ou curry doux)",
        quantite: 15,
        unite: "g",
        categorie: "Condiments",
      },
      { nom: "Garam masala", quantite: 6, unite: "g", categorie: "Condiments" },
      {
        nom: "Curcuma en poudre",
        quantite: 3,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Piment de Cayenne (selon tolérance)",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      { nom: "Huile neutre", quantite: 20, unite: "ml", categorie: "Épicerie" },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Coriandre fraîche et riz basmati pour servir",
        quantite: 10,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Sécher les cubes d'agneau avec du papier absorbant. Saler légèrement. Mode Dorer : chauffer l'huile dans la cuve, saisir l'agneau en 2 fois pendant 4 minutes par fournée jusqu'à belle coloration. Réserver.",
        duree: 480,
        conseil:
          "L'agneau doit être bien sec pour dorer et non bouillir. Un bon dorage scelle les jus à l'intérieur et développe des arômes de viande grillée qui enrichissent considérablement la sauce.",
      },
      {
        numero: 2,
        instruction:
          "Sans nettoyer la cuve, faire revenir l'oignon émincé 2 minutes. Ajouter l'ail haché et le gingembre râpé, cuire 1 minute. Ajouter le curry, le garam masala, le curcuma et le piment. Mélanger vivement 30 secondes pour torréfier les épices.",
        duree: 210,
        conseil:
          "La torréfaction des épices dans le gras résiduel du dorage de l'agneau est essentielle. Les épices brûlent très vite — rester attentif et ne jamais dépasser 60 secondes avant d'ajouter du liquide.",
      },
      {
        numero: 3,
        instruction:
          "Remettre les cubes d'agneau. Ajouter les tomates concassées et le lait de coco. Mélanger pour enrober la viande. Ajouter les cubes de patate douce par-dessus sans mélanger. Saler.",
        conseil:
          "Mettre les patates douces au-dessus et non en dessous permet d'éviter qu'elles attachent au fond. Elles cuisent parfaitement à la vapeur en surface.",
      },
      {
        numero: 4,
        instruction:
          "Fermer le couvercle. Mode Cuisson sous pression : 25 minutes.",
        duree: 1500,
        conseil:
          "Libération naturelle 5 minutes, puis rapide. L'agneau a besoin d'une décompression douce pour garder une texture fondante et non fibreuse.",
      },
      {
        numero: 5,
        instruction:
          "Ouvrir délicatement. Les patates douces sont très molles — mélanger délicatement pour ne pas les écraser complètement (quelques morceaux fondus dans la sauce sont bienvenus car ils l'épaississent naturellement).",
        conseil:
          "Si la sauce est trop liquide, activer Mode Mijoter 5 minutes à découvert. Si trop épaisse, ajouter un peu d'eau chaude.",
      },
      {
        numero: 6,
        instruction:
          "Goûter et ajuster sel et épices. Servir sur du riz basmati, parsemé de coriandre fraîche et d'un quartier de citron vert.",
        conseil:
          "Accompagner de naan, pain pita ou riz pour absorber la sauce. Une cuillerée de yaourt nature (ou de lait de coco épais) en garniture adoucit le piquant pour les enfants.",
      },
    ],
    faq: [
      {
        question: "Peut-on remplacer l'agneau par du poulet ?",
        reponse:
          "Oui, avec des cuisses de poulet désossées en cubes. Réduire la cuisson sous pression à 15 minutes (au lieu de 25). Le résultat est excellent, plus léger et moins gras. Pour du poulet : utiliser du curry doux plutôt que du madras.",
      },
      {
        question:
          "La patate douce s'est complètement dissoute dans la sauce, est-ce normal ?",
        reponse:
          "Partiellement oui — c'est même ce qui donne à la sauce sa texture veloutée naturelle. Si vous préférez des morceaux identifiables, couper les patates douces en cubes plus gros (5 cm) et réduire la cuisson à 20 minutes. Vous pouvez aussi les ajouter en Mode Mijoter 10 minutes après la cuisson sous pression.",
      },
      {
        question: "Comment doser le piquant pour les enfants ?",
        reponse:
          "Supprimer le piment de Cayenne et utiliser un curry doux (Korma ou curry doux du rayon épices). Le garam masala et le curcuma sont aromatiques mais pas piquants — les garder. Servir avec du riz et une cuillerée de yaourt nature sur le dessus des assiettes des enfants pour adoucir encore.",
      },
      {
        question: "Peut-on préparer ce curry en quantité pour congeler ?",
        reponse:
          "Oui, c'est idéal. Doubler les quantités (vérifier que la cuve ne dépasse pas les 2/3 de remplissage), laisser refroidir puis congeler en portions. La patate douce supporte bien la congélation. Décongeler la nuit au frigo, réchauffer en Mode Mijoter avec un peu d'eau. Se conserve 3 mois au congélateur.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  // ── LONGUES 🐌 ──────────────────────────────────────────────────────

  {
    slug: "boeuf-bourguignon-cookeo",
    titre: "Bœuf bourguignon express au Cookeo",
    description:
      "Le bœuf bourguignon, roi des plats en sauce français, réinterprété pour le Cookeo sans trahir l'original. La cuisson sous pression 45 minutes remplace les 3h de four sans perdre en fondant, en saveur ou en richesse de sauce. Lardons fumés, champignons, oignons grelots, vin rouge de Bourgogne — tous les ingrédients traditionnels sont là. La différence : vous pouvez le préparer un dimanche soir de semaine sans commencer la veille.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 52,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten", "sans-lactose"],
    tags: [
      "bœuf bourguignon",
      "mijoté",
      "vin rouge",
      "classique",
      "français",
      "lardons",
      "champignons",
      "oignons grelots",
    ],
    calories_par_portion: 515,
    nutriscore: "B",
    nutriscore_note:
      "Riche en protéines et fer. L'alcool du vin s'évapore entièrement à la cuisson.",
    ingredients: [
      {
        nom: "Paleron ou gîte de bœuf, coupé en gros cubes de 5 cm",
        quantite: 800,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Vin rouge de Bourgogne ou Côtes du Rhône",
        quantite: 400,
        unite: "ml",
        categorie: "Boissons",
      },
      {
        nom: "Lardons fumés épais",
        quantite: 150,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Champignons de Paris, nettoyés et coupés en quatre",
        quantite: 250,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignons grelots épluchés (ou oignons grelots surgelés)",
        quantite: 150,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Carottes moyennes, épluchées et coupées en tronçons",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon jaune moyen, émincé",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Gousses d'ail, écrasées",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouillon de bœuf corsé",
        quantite: 200,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Concentré de tomates",
        quantite: 20,
        unite: "g",
        categorie: "Épicerie",
      },
      { nom: "Farine T45", quantite: 25, unite: "g", categorie: "Épicerie" },
      {
        nom: "Bouquet garni (laurier, thym, romarin)",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      { nom: "Huile neutre", quantite: 20, unite: "ml", categorie: "Épicerie" },
      {
        nom: "Beurre",
        quantite: 20,
        unite: "g",
        categorie: "Produits laitiers",
      },
      { nom: "Sel", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Poivre noir fraîchement moulu",
        quantite: 2,
        unite: "g",
        categorie: "Condiments",
      },
      {
        nom: "Persil plat frais pour servir",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Sécher les cubes de bœuf. Saler, poivrer, fariner légèrement en secouant l'excédent. Mode Dorer : chauffer l'huile et le beurre. Saisir le bœuf en 2-3 fournées (jamais tout en même temps) 4 minutes par fournée jusqu'à croûte brun foncé. Réserver.",
        duree: 720,
        conseil:
          "C'est l'étape la plus importante : un bœuf bien doré = une sauce profonde et colorée. Travailler par petites quantités et ne pas bouger les morceaux pendant 2 minutes pour qu'ils colorent vraiment. Si la cuve fume : baisser en Mode Mijoter quelques secondes, puis reprendre.",
      },
      {
        numero: 2,
        instruction:
          "Faire revenir les lardons dans la même cuve 2 minutes jusqu'à ce qu'ils commencent à dorer. Ajouter l'oignon émincé et les carottes, cuire encore 2 minutes.",
        duree: 240,
        conseil:
          "Les lardons vont rendre leur graisse qui va parfumer toute la sauce. Ne pas les rincer avant — leur sel naturel assaisonne le plat.",
      },
      {
        numero: 3,
        instruction:
          "Ajouter l'ail et le concentré de tomates. Mélanger 1 minute. Verser le vin rouge en grattant bien le fond pour décoller tous les sucs caramélisés. Laisser réduire 2 minutes.",
        duree: 180,
        conseil:
          "Le déglacage au vin est une étape clé : tout ce qui a attaché au fond pendant le dorage, c'est de la saveur. Le vin récupère tout ça. Laisser bouillir 2 minutes pour que l'alcool s'évapore.",
      },
      {
        numero: 4,
        instruction:
          "Remettre le bœuf dans la cuve. Ajouter le bouillon, le bouquet garni. Mélanger. La viande doit être immergée aux 2/3. Fermer le couvercle. Mode Cuisson sous pression : 45 minutes.",
        duree: 2700,
        conseil:
          "Résister à l'envie d'ouvrir à mi-cuisson — chaque ouverture fait chuter la pression et rallonge le temps. Laisser décompresser naturellement 10 minutes avant la libération rapide.",
      },
      {
        numero: 5,
        instruction:
          "Retirer le bouquet garni. Goûter la viande : elle doit se défaire à la fourchette. Si résistante : refermer et cuire encore 15 minutes.",
        conseil:
          "La tendreté dépend de la qualité de la pièce. Un paleron jeune sera prêt en 45 min. Un gîte plus âgé peut nécessiter 55-60 min. Mieux vaut prolonger que servir un bœuf qui tire.",
      },
      {
        numero: 6,
        instruction:
          "Retirer viande et carottes avec une écumoire. Activer Mode Dorer, ajouter champignons et oignons grelots dans la sauce. Cuire 5 minutes à découvert pour les dorer et réduire la sauce.",
        duree: 300,
        conseil:
          "Les champignons et oignons grelots se cuisent séparément en fin de recette plutôt que sous pression — ils garderaient de la texture et de la couleur, contrairement aux 45 minutes de pression qui les rendraient mous.",
      },
      {
        numero: 7,
        instruction:
          "Remettre le bœuf et les carottes dans la sauce. Mode Mijoter 2 minutes pour réchauffer l'ensemble. Parsemer de persil frais. Servir avec des tagliatelles fraîches, des pommes de terre vapeur ou de la purée.",
        duree: 120,
        conseil:
          "Pour une sauce encore plus brillante et nappante, incorporer 20 g de beurre froid en petits dés hors du feu en faisant tourner la cuve (beurre monté).",
      },
    ],
    faq: [
      {
        question: "Peut-on préparer le bœuf bourguignon la veille ?",
        reponse:
          "Oui, et c'est fortement conseillé — c'est le secret des grandes tables. Les saveurs se développent pendant le repos au froid. Le lendemain, la graisse solidifiée en surface peut être retirée facilement pour une sauce plus légère. Réchauffer en Mode Mijoter 15 minutes. Ajouter champignons et oignons grelots au moment du réchauffage si préparés la veille séparément.",
      },
      {
        question: "Puis-je faire cette recette sans vin ?",
        reponse:
          "Oui. Remplacer le vin rouge par 400 ml de bouillon de bœuf corsé + 2 c. à soupe de vinaigre balsamique + 1 c. à café de sucre roux. Le résultat sera différent mais très bon. L'acidité du vinaigre et la douceur du sucre reproduisent partiellement l'équilibre apporté par le vin.",
      },
      {
        question: "Mon bœuf bourguignon est fade, comment l'améliorer ?",
        reponse:
          "Plusieurs pistes : (1) La viande n'était pas assez dorée — refaire dorer les morceaux séparément à la poêle et les remettre. (2) Le bouillon était trop faible — ajouter un carré de bouillon de bœuf supplémentaire. (3) Manque d'umami — une c. à soupe de sauce Worcestershire ou de soja en finition rehausse tout. (4) Trop dilué — Mode Dorer à découvert 8-10 minutes pour concentrer la sauce.",
      },
      {
        question: "Ce bœuf bourguignon peut-il être congelé ?",
        reponse:
          "Oui, c'est l'un des meilleurs plats à congeler. Les champignons peuvent rendre un peu d'eau à la décongélation — les retirer avant congélation et en ajouter des frais au réchauffage. Se conserve 3 mois au congélateur. Décongeler 24h au frigo.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },

  {
    slug: "blanquette-veau-cookeo",
    titre: "Blanquette de veau à l'ancienne",
    description:
      "La blanquette de veau est l'un des plats les plus emblématiques de la cuisine française bourgeoise — une viande de veau tendre dans une sauce blanche veloutée, liée aux jaunes d'œufs et à la crème. Le Cookeo permet de cuire le veau sous pression en 40 minutes pour le rendre parfaitement fondant, puis d'élaborer la sauce blanche dans la même cuve avec le bouillon de cuisson. Un grand classique du dimanche devenu accessible le soir en semaine.",
    image_url: null,
    video_youtube_id: null,
    temps_preparation: 20,
    temps_cuisson: 48,
    difficulte: "moyen",
    nombre_portions: 4,
    modele_thermomix: ["COOKEO"],
    categories: ["plat"],
    regime: ["sans-gluten"],
    tags: [
      "blanquette",
      "veau",
      "sauce blanche",
      "classique",
      "français",
      "dimanche",
      "crème",
      "familial",
    ],
    calories_par_portion: 495,
    nutriscore: "C",
    nutriscore_note:
      "Riche en protéines et calcium. Teneur modérée en graisses saturées via la crème et les jaunes d'œufs.",
    ingredients: [
      {
        nom: "Veau (épaule ou tendron), coupé en cubes de 4-5 cm",
        quantite: 800,
        unite: "g",
        categorie: "Viandes & Poissons",
      },
      {
        nom: "Carottes moyennes, épluchées et coupées en tronçons",
        quantite: 2,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Champignons de Paris, nettoyés et coupés en quatre",
        quantite: 200,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Oignon jaune, piqué de 2 clous de girofle",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Céleri branche, coupé en tronçons",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouillon de veau ou de volaille chaud",
        quantite: 500,
        unite: "ml",
        categorie: "Épicerie",
      },
      {
        nom: "Crème fraîche épaisse entière",
        quantite: 200,
        unite: "ml",
        categorie: "Produits laitiers",
      },
      {
        nom: "Jaunes d'œufs frais",
        quantite: 2,
        unite: "pièce",
        categorie: "Produits laitiers",
      },
      {
        nom: "Beurre doux",
        quantite: 40,
        unite: "g",
        categorie: "Produits laitiers",
      },
      { nom: "Farine T45", quantite: 40, unite: "g", categorie: "Épicerie" },
      {
        nom: "Citron jaune (jus)",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Bouquet garni (thym, laurier, persil en tiges)",
        quantite: 1,
        unite: "pièce",
        categorie: "Fruits & Légumes",
      },
      {
        nom: "Poivre blanc moulu",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      {
        nom: "Noix de muscade râpée",
        quantite: 1,
        unite: "pincée",
        categorie: "Condiments",
      },
      { nom: "Sel fin", quantite: 1, unite: "pincée", categorie: "Condiments" },
      {
        nom: "Persil plat frais haché pour servir",
        quantite: 15,
        unite: "g",
        categorie: "Fruits & Légumes",
      },
    ],
    etapes: [
      {
        numero: 1,
        instruction:
          "Mettre les cubes de veau dans la cuve. Ajouter l'oignon piqué de clous de girofle, les carottes, le céleri et le bouquet garni. Couvrir avec le bouillon chaud. Saler légèrement.",
        conseil:
          "Contrairement au bœuf bourguignon, on ne fait PAS dorer le veau en blanquette — la viande doit rester blanche. C'est la signature de ce plat. Pas de réaction de Maillard voulue ici.",
      },
      {
        numero: 2,
        instruction:
          "Fermer le couvercle. Mode Cuisson sous pression : 40 minutes.",
        duree: 2400,
        conseil:
          "Laisser décompresser naturellement 5-8 minutes — c'est important pour la texture de la viande. Une décompression trop rapide peut briser les fibres musculaires et donner une viande filamenteuse.",
      },
      {
        numero: 3,
        instruction:
          "Ouvrir. Retirer délicatement les morceaux de veau et les carottes avec une écumoire. Filtrer le bouillon de cuisson en versant à travers une passoire fine. Réserver 300 ml de ce bouillon (garder le reste au chaud).",
        conseil:
          "Goûter le bouillon filtré — il doit être riche et parfumé. C'est lui qui fera toute la qualité de la sauce blanche. Si trop léger, le faire réduire 5 minutes en Mode Dorer avant de préparer la sauce.",
      },
      {
        numero: 4,
        instruction:
          "Mode Dorer : faire fondre le beurre dans la cuve nettoyée. Ajouter la farine d'un coup. Mélanger vivement avec une spatule pendant 2 minutes pour cuire le roux sans colorer.",
        duree: 120,
        conseil:
          "Le roux blond (farine + beurre) doit cuire 2 minutes minimum pour éliminer le goût farineux. Il doit mousser légèrement et sentir la noisette — pas le brûlé.",
      },
      {
        numero: 5,
        instruction:
          "Verser progressivement les 300 ml de bouillon chaud filtré en fouettant continuellement pour éviter les grumeaux. Ajouter les champignons. Passer en Mode Mijoter 5 minutes en remuant jusqu'à épaississement.",
        duree: 300,
        conseil:
          "Verser le bouillon en 3 fois : d'abord 1/3 en fouettant vivement pour dissoudre le roux, puis 2/3 restants en filet. Si des grumeaux se forment, mixer 10 secondes au mixeur plongeant.",
      },
      {
        numero: 6,
        instruction:
          "Hors mode chaud, dans un bol, fouetter les 2 jaunes d'œufs avec la crème fraîche et la moitié du jus de citron. Baisser en Mode Mijoter minimal. Verser ce mélange dans la sauce en filet en fouettant sans cesse.",
        conseil:
          "CRITIQUE : la sauce ne doit plus bouillir après l'ajout des jaunes d'œufs, sous peine de voir la sauce grainer (les jaunes coaguleraient). Si cela arrive, mixer immédiatement à pleine vitesse au mixeur plongeant pour rattraper.",
      },
      {
        numero: 7,
        instruction:
          "Remettre les morceaux de veau et les carottes dans la sauce. Ajouter la noix de muscade, le poivre blanc et le reste de jus de citron. Goûter et ajuster sel. Réchauffer 2 minutes sans bouillir.",
        duree: 120,
        conseil:
          "La sauce doit napper le dos d'une cuillère. Si trop épaisse : allonger avec un peu de bouillon de cuisson réservé. Si trop liquide : laisser réduire 2-3 minutes en Mode Mijoter à découvert.",
      },
      {
        numero: 8,
        instruction:
          "Servir dans des assiettes creuses chaudes, parsemé de persil plat frais. Accompagner de riz blanc, de pommes de terre vapeur ou de légumes glacés.",
        conseil:
          "Réchauffer des assiettes creuses au four 5 minutes à 80°C avant de dresser — la blanquette refroidit très vite et une assiette froide gâche tout.",
      },
    ],
    faq: [
      {
        question: "Quelle coupe de veau est idéale pour la blanquette ?",
        reponse:
          "L'épaule est le choix classique — bien tendre, légèrement gélatineuse, elle donne une sauce naturellement onctueuse. Le tendron (plus gras, très gélatineux) est utilisé par les grands chefs pour sa sauce incomparable mais peut rebuter si on n'aime pas le gras. Le flanchet est économique et fondant. Éviter absolument le filet, la noix ou l'escalope — trop maigres, ils se dessèchent.",
      },
      {
        question:
          "Ma sauce est granuleuse après l'ajout de la crème et des jaunes — comment rattraper ?",
        reponse:
          "Les jaunes ont cuit trop fort (température > 80°C). Solution immédiate : mixer la sauce au mixeur plongeant à pleine puissance pendant 20-30 secondes — cela réemulsionne la sauce et efface les grains dans 90% des cas. Si elle reste granuleuse, passer à travers une passoire fine et fouetter énergiquement.",
      },
      {
        question: "Peut-on préparer la blanquette à l'avance ?",
        reponse:
          "Oui, jusqu'à l'étape 5. Conserver viande + sauce sans les jaunes et la crème jusqu'au lendemain au frigo. Réchauffer doucement à 70°C, puis procéder aux étapes 6 à 8 au moment du service. Ajouter les jaunes et la crème à la dernière minute permet aussi de contrôler parfaitement la consistance.",
      },
      {
        question:
          "Peut-on remplacer le veau par du poulet pour une version halal ?",
        reponse:
          "Oui, c'est une alternative très répandue. Utiliser des cuisses de poulet halal désossées en cubes — réduire la cuisson sous pression à 20 minutes (étape 2). Tout le reste de la recette reste identique. La sauce sera un peu moins gélatineuse (moins de collagène que le veau) — ajouter 1 c. à café de maïzena dans la crème à l'étape 6 pour compenser.",
      },
      {
        question: "Les enfants apprécient-ils la blanquette ?",
        reponse:
          "C'est généralement l'un des plats les plus appréciés des enfants grâce à la sauce blanche douce et crémeuse. Supprimer les clous de girofle (goût fort) et le céleri si votre enfant est difficile. Servir avec du riz blanc, qui absorbe parfaitement la sauce. Éviter le poivre blanc pour les plus petits.",
      },
    ],
    approuve: true,
    publie: true,
    vues: 0,
  },
];
