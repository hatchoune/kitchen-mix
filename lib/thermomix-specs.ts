/* =============================================================
   Kitchen Mix — Données techniques Thermomix
   TM5 / TM6 / TM7 — Températures, vitesses, modes
   ============================================================= */

// ─── Températures par modèle ─────────────────────────────────

export const TEMPERATURES: Record<string, (number | string)[]> = {
  TM5: [37, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 120, "Varoma"],
  TM6: [37, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, "Varoma"],
  TM7: [37, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, "Varoma"],
};

// Température spéciale TM6 (mode haute température guidée)
export const TEMP_HAUTE_TM6 = 160;

// ─── Vitesses ────────────────────────────────────────────────
// Communes aux 3 modèles : Mijotage, 1 à 10 par paliers de 0.5, Turbo

export const VITESSES_BASE: (number | string)[] = [
  "Mijotage", // Symbole cuillère en bois
  1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10,
  "Turbo",
];

// ─── Durées Turbo ────────────────────────────────────────────

export const TURBO_DUREES = ["0.5s", "1s", "2s"];

// ─── Modes spéciaux par modèle ───────────────────────────────

export const MODES_SPECIAUX: Record<string, string[]> = {
  TM5: [],
  TM6: [
    "Pétrin", "Nettoyage", "Mixage", "Cuisson lente",
    "Sous-vide", "Fermentation", "Bouilloire", "Épaissir", "Cuisson du riz",
  ],
  TM7: [
    "Pétrin", "Nettoyage", "Mixage", "Cuisson lente",
    "Sous-vide", "Fermentation", "Bouilloire", "Épaissir", "Cuisson du riz",
    "Hachage contrôlé", "Épluchage", "Saisie contrôlée",
  ],
};

// ─── Temps max par modèle (en minutes) ──────────────────────

export const TEMPS_MAX: Record<string, number> = {
  TM5: 99,
  TM6: 720,  // 12h pour cuisson lente / sous-vide
  TM7: 1440, // 24h pour fermentation longue
};

// ─── Accessoires ─────────────────────────────────────────────

export const ACCESSOIRES_TM = [
  "Spatule",
  "Fouet papillon",
  "Panier de cuisson",
  "Varoma (plateau + couvercle)",
  "Couvercle",
  "Gobelet doseur",
  "Pétrisseur",
] as const;

// ─── Helpers ─────────────────────────────────────────────────

/**
 * Retourne la liste de températures fusionnée pour les modèles sélectionnés
 */
export function getTemperaturesForModels(models: string[]): (number | string)[] {
  const allTemps = new Set<number | string>();
  for (const m of models) {
    const temps = TEMPERATURES[m] || TEMPERATURES.TM6;
    for (const t of temps) allTemps.add(t);
  }
  // Trier : nombres d'abord, puis "Varoma" à la fin
  const nums = [...allTemps].filter((t): t is number => typeof t === "number").sort((a, b) => a - b);
  const strs = [...allTemps].filter((t): t is string => typeof t === "string");
  return [...nums, ...strs];
}

/**
 * Retourne les modes spéciaux fusionnés pour les modèles sélectionnés
 */
export function getModesForModels(models: string[]): string[] {
  const allModes = new Set<string>();
  for (const m of models) {
    for (const mode of MODES_SPECIAUX[m] || []) allModes.add(mode);
  }
  return [...allModes];
}

/**
 * Formatte une vitesse pour affichage
 */
export function formatVitesse(v: number | string): string {
  if (v === "Mijotage") return "🥄 Mijotage";
  if (v === "Turbo") return "⚡ Turbo";
  return `Vit. ${v}`;
}

/**
 * Formatte secondes en MM:SS
 */
export function formatTimeMMSS(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/**
 * Parse MM:SS en secondes
 */
export function parseTimeMMSS(mmss: string): number {
  const [m, s] = mmss.split(":").map(Number);
  return (m || 0) * 60 + (s || 0);
}
