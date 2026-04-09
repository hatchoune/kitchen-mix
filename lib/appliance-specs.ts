/* =============================================================
   Kitchen Mix — Base de données complète des appareils de cuisine
   
   Chaque appareil a : catégorie, températures, vitesses, modes,
   accessoires, temps max, et notes spécifiques.
   
   Pour ajouter un appareil : ajouter une entrée dans APPLIANCES.
   ============================================================= */

// ─── Types ───────────────────────────────────────────────────

export interface ApplianceSpec {
  id: string;                    // clé unique (stockée en DB dans modele_thermomix[])
  label: string;                 // nom affiché
  category: ApplianceCategory;   // catégorie
  brand?: string;                // marque
  temperatures?: (number | string)[];  // températures disponibles
  speeds?: (number | string)[];        // vitesses disponibles
  modes?: string[];                    // modes/programmes automatiques
  accessories?: string[];              // accessoires
  timeMax?: number;                    // temps max en minutes
  notes?: string[];                    // infos spécifiques
  hasReverseMode?: boolean;            // sens inverse
  hasPulse?: boolean;                  // mode pulse
  hasScale?: boolean;                  // balance intégrée
  hasSteam?: boolean;                  // cuisson vapeur
}

export type ApplianceCategory =
  | "robot-cuiseur"
  | "robot-patissier"
  | "friteuse"
  | "machine-a-pain"
  | "cuiseur-riz"
  | "deshydrateur"
  | "multicuiseur"
  | "yaourt"
  | "micro-ondes"
  | "batteur"
  | "sous-vide"
  | "sorbetiere"
  | "bouilloire"
  | "grille-pain"
  | "induction"
  | "cuiseur-vapeur"
  | "centrifugeuse"
  | "gaufrier"
  | "autre";

export const CATEGORY_LABELS: Record<ApplianceCategory, string> = {
  "robot-cuiseur": "Robot cuiseur",
  "robot-patissier": "Robot pâtissier",
  "friteuse": "Friteuse sans huile",
  "machine-a-pain": "Machine à pain",
  "cuiseur-riz": "Cuiseur à riz",
  "deshydrateur": "Déshydrateur",
  "multicuiseur": "Multicuiseur",
  "yaourt": "Yaourtière",
  "micro-ondes": "Four micro-ondes",
  "batteur": "Batteur sur socle",
  "sous-vide": "Machine sous vide",
  "sorbetiere": "Sorbetière",
  "bouilloire": "Bouilloire",
  "grille-pain": "Grille-pain",
  "induction": "Plaque à induction",
  "cuiseur-vapeur": "Cuiseur vapeur",
  "centrifugeuse": "Centrifugeuse",
  "gaufrier": "Gaufrier",
  "autre": "Autre",
};

// ─── BASE DE DONNÉES COMPLÈTE ────────────────────────────────

export const APPLIANCES: ApplianceSpec[] = [

  // ═══ ROBOTS CUISEURS ═══════════════════════════════════════

  {
    id: "TM5",
    label: "Thermomix TM5",
    category: "robot-cuiseur",
    brand: "Vorwerk",
    temperatures: [37,40,45,50,55,60,65,70,75,80,85,90,95,100,120,"Varoma"],
    speeds: ["Mijotage",1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,"Turbo"],
    modes: [],
    accessories: ["Spatule","Fouet papillon","Panier de cuisson","Varoma","Couvercle","Gobelet doseur"],
    timeMax: 99,
    hasReverseMode: true,
    hasPulse: false,
    hasScale: true,
    hasSteam: true,
  },
  {
    id: "TM6",
    label: "Thermomix TM6",
    category: "robot-cuiseur",
    brand: "Vorwerk",
    temperatures: [37,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,"Varoma"],
    speeds: ["Mijotage",1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,"Turbo"],
    modes: ["Pétrin","Nettoyage","Mixage","Cuisson lente","Sous-vide","Fermentation","Bouilloire","Épaissir","Cuisson du riz"],
    accessories: ["Spatule","Fouet papillon","Panier de cuisson","Varoma","Couvercle","Gobelet doseur","Pétrisseur"],
    timeMax: 720,
    hasReverseMode: true,
    hasPulse: true,
    hasScale: true,
    hasSteam: true,
    notes: ["160°C uniquement en mode Haute Température guidée","Cuisson lente/sous-vide jusqu'à 12h"],
  },
  {
    id: "TM7",
    label: "Thermomix TM7",
    category: "robot-cuiseur",
    brand: "Vorwerk",
    temperatures: [37,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,"Varoma"],
    speeds: ["Mijotage",1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,"Turbo"],
    modes: ["Pétrin","Nettoyage","Mixage","Cuisson lente","Sous-vide","Fermentation","Bouilloire","Épaissir","Cuisson du riz","Hachage contrôlé","Épluchage","Saisie contrôlée"],
    accessories: ["Spatule","Fouet papillon","Panier de cuisson","Varoma","Couvercle","Gobelet doseur","Pétrisseur"],
    timeMax: 1440,
    hasReverseMode: true,
    hasPulse: true,
    hasScale: true,
    hasSteam: true,
    notes: ["Précision au degré près en modes experts","Fermentation longue jusqu'à 24h"],
  },
  {
    id: "COOK_EXPERT",
    label: "Magimix Cook Expert",
    category: "robot-cuiseur",
    brand: "Magimix",
    temperatures: [30,35,40,50,60,70,80,90,100,110,120,130,140,160],
    speeds: ["1A","2A",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,"Pulse"],
    modes: ["Soupe moulinée","Soupe veloutée","Mijotage","Vapeur","Pain/Brioche","Pâte/Gâteau","Blancs en neige","Smoothie","Dessert glacé","Glace pilée","Rissolage","Pétrin XL","Rinçage"],
    accessories: ["Lame universelle","Batteur","Mini bol","Midi bol","Bol transparent","Panier vapeur","Spatule métal","Spatule plastique"],
    timeMax: 240,
    hasReverseMode: false,
    hasPulse: true,
    hasScale: false,
    hasSteam: true,
    notes: ["Vitesse 1A: rotation intermittente (5s on / 110s off)","160°C via mise à jour firmware (programme Rissolage)","18 vitesses + Pulse","Cuisson par induction"],
  },
  {
    id: "COMPANION",
    label: "Moulinex Companion",
    category: "robot-cuiseur",
    brand: "Moulinex",
    temperatures: [37,50,60,70,80,90,100,110,120,130,140,150],
    speeds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    modes: ["Mijoter","Cuire à la vapeur","Sauter","Pétrir","Mixer","Hacher","Râper","Trancher","Émulsionner"],
    accessories: ["Couteau hachoir","Mélangeur","Batteur","Pétrisseur","Panier vapeur","Trancheur/Râpeur"],
    timeMax: 240,
    hasReverseMode: true,
    hasPulse: true,
    hasScale: true,
    hasSteam: true,
    notes: ["Balance intégrée sur modèles XL","Jusqu'à 20 vitesses sur modèles récents"],
  },

  // ═══ ROBOTS PÂTISSIERS ═════════════════════════════════════

  {
    id: "KITCHENAID",
    label: "KitchenAid Artisan",
    category: "robot-patissier",
    brand: "KitchenAid",
    speeds: [1,2,3,4,5,6,7,8,9,10],
    modes: [],
    accessories: ["Fouet à 6 fils","Batteur plat (feuille)","Crochet pétrisseur","Batteur flex edge","Râpe","Hachoir","Presse-agrumes","Moulin à grains","Coupe-légumes","Extrudeuse à pâtes"],
    hasPulse: false,
    notes: ["Mouvement planétaire","10 vitesses (11 sur modèles 5.6L+)","Compatible lave-vaisselle (accessoires inox)"],
  },
  {
    id: "BATTEUR_SOCLE",
    label: "Batteur sur socle (générique)",
    category: "batteur",
    speeds: [1,2,3,4,5,6,7,8,9,10,11,12],
    modes: [],
    accessories: ["Fouet métallique","Batteur plat","Crochet pétrisseur","Batteur flexible"],
    hasPulse: true,
    notes: ["2 à 12 vitesses selon modèles","Mouvement planétaire"],
  },

  // ═══ FRITEUSE SANS HUILE ═══════════════════════════════════

  {
    id: "AIRFRYER",
    label: "Airfryer (friteuse sans huile)",
    category: "friteuse",
    temperatures: [80,90,100,110,120,130,140,150,160,170,180,190,200],
    speeds: [],
    modes: ["Frites","Poulet","Poisson","Viande","Légumes","Gâteau","Pizza","Réchauffer","Déshydrater"],
    timeMax: 60,
    notes: ["80-200°C par paliers de 10°C","Notification mi-cuisson","Préchauffage","Maintien au chaud"],
  },

  // ═══ MACHINE À PAIN ════════════════════════════════════════

  {
    id: "MACHINE_PAIN",
    label: "Machine à pain",
    category: "machine-a-pain",
    modes: ["Classique","Complet","Sans gluten","Ultra-rapide","Pâte à pizza","Brioche","Confiture","Gâteau","Porridge","Pain sucré","Pain de mie","Baguette"],
    notes: ["Croûte : Claire / Moyenne / Foncée","Poids : 500g à 1.5kg","Départ différé jusqu'à 15h","Maintien au chaud 1h auto","17-19 programmes selon modèles"],
  },

  // ═══ CUISEUR À RIZ ═════════════════════════════════════════

  {
    id: "CUISEUR_RIZ",
    label: "Cuiseur à riz",
    category: "cuiseur-riz",
    temperatures: [70,80,90,100,135],
    modes: ["Riz blanc","Riz complet","Riz gluant (sushi)","Céréales","Cuisson rapide","Gâteau","Cuisson lente","Soupe","Vapeur","Porridge"],
    accessories: ["Panier vapeur","Verre doseur","Cuillère à riz"],
    notes: ["Maintien au chaud auto 65-75°C jusqu'à 24h","Départ différé jusqu'à 24h","8-13 programmes selon modèles"],
  },

  // ═══ DÉSHYDRATEUR ══════════════════════════════════════════

  {
    id: "DESHYDRATEUR",
    label: "Déshydrateur alimentaire",
    category: "deshydrateur",
    temperatures: [35,40,45,50,55,60,65,70,75],
    modes: ["Fruits","Légumes","Viande (Jerky)","Herbes","Fleurs"],
    timeMax: 4320,
    notes: ["35-75°C par paliers de 5°C","Minuterie jusqu'à 72h (99h Excalibur)","Arrêt automatique"],
  },

  // ═══ MULTICUISEUR (COOKEO) ═════════════════════════════════

  {
    id: "COOKEO",
    label: "Multicuiseur (Cookeo)",
    category: "multicuiseur",
    brand: "Moulinex",
    temperatures: [40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160],
    modes: ["Riz","Pâtes","Soupe","Ragoût","Viande","Poisson","Légumes","Dessert","Yaourt","Cuisson sous pression","Cuisson lente","Vapeur","Saisir","Maintien au chaud","Départ différé"],
    notes: ["40-160°C par paliers de 5°C","Haute pression / Basse pression","Jusqu'à 150 recettes préprogrammées","Départ différé 24h"],
  },
  {
    id: "MULTICUISEUR",
    label: "Multicuiseur (générique)",
    category: "multicuiseur",
    temperatures: [40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160],
    modes: ["Riz","Pâtes","Soupe","Ragoût","Viande","Poisson","Légumes","Dessert","Cuisson sous pression","Cuisson lente","Vapeur","Saisir"],
    notes: ["40-160°C par paliers de 5°C","2 niveaux de pression"],
  },

  // ═══ YAOURTIÈRE ════════════════════════════════════════════

  {
    id: "YAOURTIERE",
    label: "Yaourtière",
    category: "yaourt",
    temperatures: [30,35,40,42,45,50,55],
    timeMax: 1440,
    modes: ["Yaourt nature","Yaourt aromatisé","Fromage blanc","Faisselle"],
    notes: ["Fermentation idéale : 42-45°C","6 à 24h selon recette","Par paliers de 1h"],
  },

  // ═══ FOUR MICRO-ONDES ═════════════════════════════════════

  {
    id: "MICRO_ONDES",
    label: "Four micro-ondes",
    category: "micro-ondes",
    modes: ["Micro-ondes seul","Grill","Combiné (micro+grill)","Convection","Chaleur tournante","Décongélation au poids","Décongélation rapide","Réchauffage","Maintien au chaud","Popcorn","Pommes de terre","Légumes","Poisson","Viande","Pizza","Boissons"],
    notes: ["Puissance : 100W à 1000W","Décongélation : 100-300W","Minuterie + départ différé"],
  },

  // ═══ MACHINE SOUS VIDE ════════════════════════════════════

  {
    id: "SOUS_VIDE",
    label: "Machine sous vide",
    category: "sous-vide",
    modes: ["Automatique","Manuel","Humide","Sec","Doux","Marinade rapide","Conservation longue durée"],
    notes: ["Soudure à température réglable","Mise sous vide par paliers pour aliments fragiles"],
  },

  // ═══ SORBETIÈRE ═══════════════════════════════════════════

  {
    id: "SORBETIERE",
    label: "Sorbetière / Turbine à glace",
    category: "sorbetiere",
    temperatures: [-15,-14,-13],
    timeMax: 60,
    modes: ["Glace","Sorbet","Granité","Yaourt glacé"],
    notes: ["Temps de turbinage : 10 à 60 min par paliers de 10 min","Température de service : -15 à -13°C"],
  },

  // ═══ BOUILLOIRE ═══════════════════════════════════════════

  {
    id: "BOUILLOIRE",
    label: "Bouilloire à température réglable",
    category: "bouilloire",
    temperatures: [40,45,50,55,60,65,70,75,80,85,90,95,100],
    modes: ["Thé vert (70-80°C)","Thé noir (95-100°C)","Café filtre (90-96°C)","Biberon (40°C)"],
    notes: ["Maintien au chaud 20min à 2h selon modèles","Arrêt automatique","Anti-débordement"],
  },

  // ═══ GRILLE-PAIN ══════════════════════════════════════════

  {
    id: "GRILLE_PAIN",
    label: "Grille-pain",
    category: "grille-pain",
    modes: ["Décongélation","Réchauffage","Annulation","Bagel"],
    notes: ["5 à 9 niveaux de brunissement","Sortie haute","Tiroir à miettes"],
  },

  // ═══ PLAQUE À INDUCTION ═══════════════════════════════════

  {
    id: "INDUCTION",
    label: "Plaque à induction",
    category: "induction",
    modes: ["Booster","Maintien au chaud","Minuteur par foyer","Pause","Zone flexible"],
    notes: ["9 à 17 niveaux de puissance","Booster 2200W à 3700W par foyer","Détection de casserole","Sécurité enfant"],
  },

  // ═══ CUISEUR VAPEUR ═══════════════════════════════════════

  {
    id: "CUISEUR_VAPEUR",
    label: "Cuiseur vapeur électrique",
    category: "cuiseur-vapeur",
    temperatures: [40,60,80,98,100,120],
    timeMax: 60,
    modes: ["Légumes","Poisson","Riz","Œufs","Réchauffage","Décongélation"],
    notes: ["40-120°C par paliers de 10-20°C","Minuterie par paliers de 5 min"],
  },

  // ═══ CENTRIFUGEUSE ════════════════════════════════════════

  {
    id: "CENTRIFUGEUSE",
    label: "Centrifugeuse",
    category: "centrifugeuse",
    speeds: [1,2,3,4,5],
    modes: ["Fruits durs","Fruits tendres","Légumes verts","Mixte"],
    hasPulse: true,
    notes: ["Jusqu'à 5 vitesses selon modèles","Arrêt automatique"],
  },

  // ═══ GAUFRIER ═════════════════════════════════════════════

  {
    id: "GAUFRIER",
    label: "Gaufrier",
    category: "gaufrier",
    temperatures: [120,140,160,180,200,220,240],
    modes: ["Gaufres","Croque-monsieur","Panini"],
    notes: ["3 à 5 niveaux de brunissement","Revêtement anti-adhésif","Plaques réversibles selon modèles"],
  },
];

// ─── HELPERS ─────────────────────────────────────────────────

/**
 * Tous les IDs d'appareils disponibles (pour les constantes)
 */
export const ALL_APPLIANCE_IDS = APPLIANCES.map(a => a.id);

/**
 * Trouver un appareil par ID
 */
export function getAppliance(id: string): ApplianceSpec | undefined {
  return APPLIANCES.find(a => a.id === id);
}

/**
 * Trouver plusieurs appareils par IDs
 */
export function getAppliances(ids: string[]): ApplianceSpec[] {
  return ids.map(id => getAppliance(id)).filter(Boolean) as ApplianceSpec[];
}

/**
 * Grouper les appareils par catégorie (pour les menus déroulants)
 */
export function getAppliancesByCategory(): Record<ApplianceCategory, ApplianceSpec[]> {
  const grouped = {} as Record<ApplianceCategory, ApplianceSpec[]>;
  for (const a of APPLIANCES) {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a);
  }
  return grouped;
}

/**
 * Fusionner les températures de plusieurs appareils (pour le formulaire)
 */
export function mergeTemperatures(ids: string[]): (number | string)[] {
  const all = new Set<number | string>();
  for (const id of ids) {
    const a = getAppliance(id);
    if (a?.temperatures) for (const t of a.temperatures) all.add(t);
  }
  const nums = [...all].filter((t): t is number => typeof t === "number").sort((a, b) => a - b);
  const strs = [...all].filter((t): t is string => typeof t === "string");
  return [...nums, ...strs];
}

/**
 * Fusionner les vitesses de plusieurs appareils
 */
export function mergeSpeeds(ids: string[]): (number | string)[] {
  const all = new Set<string>();
  for (const id of ids) {
    const a = getAppliance(id);
    if (a?.speeds) for (const s of a.speeds) all.add(String(s));
  }
  // Trier intelligemment : strings spéciaux d'abord, puis numériques, puis Turbo/Pulse
  const special = ["Mijotage", "1A", "2A"];
  const endSpecial = ["Turbo", "Pulse"];
  const result: (number | string)[] = [];

  for (const s of special) if (all.has(s)) { result.push(s); all.delete(s); }
  const nums = [...all].filter(s => !isNaN(parseFloat(s))).sort((a, b) => parseFloat(a) - parseFloat(b));
  for (const n of nums) { result.push(parseFloat(n)); all.delete(n); }
  for (const s of endSpecial) if (all.has(s)) { result.push(s); all.delete(s); }
  // Remaining strings
  for (const s of all) result.push(s);

  return result;
}

/**
 * Fusionner les modes/programmes de plusieurs appareils
 */
export function mergeModes(ids: string[]): string[] {
  const all = new Set<string>();
  for (const id of ids) {
    const a = getAppliance(id);
    if (a?.modes) for (const m of a.modes) all.add(m);
  }
  return [...all].sort();
}

/**
 * Fusionner les accessoires de plusieurs appareils
 */
export function mergeAccessories(ids: string[]): string[] {
  const all = new Set<string>();
  for (const id of ids) {
    const a = getAppliance(id);
    if (a?.accessories) for (const ac of a.accessories) all.add(ac);
  }
  return [...all].sort();
}

/**
 * Vérifier si au moins un appareil a le sens inverse
 */
export function hasReverse(ids: string[]): boolean {
  return ids.some(id => getAppliance(id)?.hasReverseMode);
}

/**
 * Formater une vitesse pour affichage
 */
export function formatSpeed(v: number | string): string {
  if (v === "Mijotage") return "🥄 Mijotage";
  if (v === "1A") return "1A (intermittent)";
  if (v === "2A") return "2A (intermittent)";
  if (v === "Turbo") return "⚡ Turbo";
  if (v === "Pulse") return "⚡ Pulse";
  return `Vit. ${v}`;
}

/**
 * Formater secondes en MM:SS
 */
export function formatTimeMMSS(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
