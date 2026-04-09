/* =============================================================
   Kitchen Mix — Fonctions utilitaires
   ============================================================= */

/**
 * Génère un slug SEO-friendly à partir d'un titre français.
 * Supprime accents, caractères spéciaux, espaces multiples.
 */
export function generateSlug(titre: string): string {
  return titre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   // keep only alphanum, spaces, hyphens
    .replace(/\s+/g, "-")            // spaces → hyphens
    .replace(/-+/g, "-")             // dedupe hyphens
    .replace(/^-|-$/g, "");          // trim leading/trailing hyphens
}

/**
 * Formate une durée en minutes → "Xh Ymin" ou "Xmin"
 */
export function formatDuree(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

/**
 * Formate un nombre avec séparateur de milliers français
 */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("fr-FR").format(n);
}

/**
 * Pluralise un mot français (simpliste mais suffisant)
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  if (count <= 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
}

/**
 * Tronque un texte avec ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Classe CSS conditionnelle (mini clsx)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Calcule le temps total d'une recette
 */
export function tempsTotal(prep: number, cuisson: number): number {
  return prep + cuisson;
}

/**
 * Formate une date ISO → "12 mars 2026"
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Retourne la date du lundi de la semaine courante
 */
export function getMondayOfWeek(date: Date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Convertit une date en format ISO date-only (YYYY-MM-DD)
 */
export function toDateString(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Debounce
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
