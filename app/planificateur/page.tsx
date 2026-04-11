"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  ShoppingCart,
  ChevronDown,
  X,
  Loader2,
  Plus,
  Trash2,
  Check,
  Printer,
  Share2,
  Save,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { getMondayOfWeek, toDateString, cn } from "@/lib/utils";
import type { Ingredient } from "@/types";
import Link from "next/link";
import { getShoppingListForDays } from "@/app/actions/shoppingList";
import Image from "next/image";
import SavePlanningModal from "@/components/planificateur/SavePlanningModal";

/* ─── Types ───────────────────────────────────────────────── */

interface RecetteMin {
  id: string;
  slug: string;
  titre: string;
  ingredients: Ingredient[];
  image_url?: string; // ← tu ajoutes cette ligne
}

type DaySlots = (RecetteMin | null)[];
type WeekPlan = Record<number, DaySlots>;

interface ListeItem {
  nom: string;
  quantite: number;
  unite: string;
  categorie: string;
}

const JOURS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const MAX_SLOTS = 3;

/* ═══════════════════════════════════════════════════════════════ */

export default function PlanificateurPage() {
  const { user, loading: authLoading } = useAuth();
  const [supabase] = useState(() => createClient());

  const [plan, setPlan] = useState<WeekPlan>({});
  const [loading, setLoading] = useState(true);

  // Sélection de recette
  const [selectingDay, setSelectingDay] = useState<number | null>(null);
  const [selectingSlot, setSelectingSlot] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RecetteMin[]>([]);
  const [dayModalOpen, setDayModalOpen] = useState<number | null>(null);

  // Liste de courses
  const [showListe, setShowListe] = useState(false);
  const [selectedDays, setSelectedDays] = useState<Set<number>>(new Set());
  const [listeItems, setListeItems] = useState<ListeItem[]>([]);
  const [listeLoading, setListeLoading] = useState(false);

  // Mobile accordion
  const [openDay, setOpenDay] = useState<number | null>(null);

  const semaine = toDateString(getMondayOfWeek());

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"search" | "favoris">("search");
  const [favoris, setFavoris] = useState<RecetteMin[]>([]);
  const [favorisLoaded, setFavorisLoaded] = useState(false);
  const [favorisLoading, setFavorisLoading] = useState(false);

  /* ─── Save plan ─────────────────────────────────────────── */

  const savePlan = useCallback(
    async (newPlan: WeekPlan) => {
      if (!user) return;
      setPlan(newPlan);

      await supabase
        .from("meal_plans")
        .delete()
        .eq("user_id", user.id)
        .eq("week_start", semaine);

      const rows = [];
      for (let d = 0; d < 7; d++) {
        for (let s = 0; s < MAX_SLOTS; s++) {
          const r = newPlan[d]?.[s];
          if (r) {
            rows.push({
              user_id: user.id,
              week_start: semaine,
              day_index: d,
              slot: s,
              recette_id: r.id,
            });
          }
        }
      }
      if (rows.length > 0) {
        await supabase.from("meal_plans").insert(rows);
      }
    },
    [user, semaine, supabase],
  );

  /* ─── Sécurité & Init ───────────────────────────────────── */

  // On ne fait plus de redirection automatique ici pour permettre
  // l'affichage du message "Connectez-vous pour planifier" plus bas dans le composant.

  useEffect(() => {
    // Si l'authentification charge ou si l'utilisateur n'est pas connecté, on ne fait rien
    if (authLoading || !user) return;

    const loadPlan = async () => {
      setLoading(true);
      const { data: rows } = await supabase
        .from("meal_plans")
        .select(
          "day_index, slot, recette_id, recettes(id, slug, titre, ingredients, image_url)",
        )
        .eq("user_id", user.id)
        .eq("week_start", semaine);

      const loaded: WeekPlan = {};
      for (let d = 0; d < 7; d++) loaded[d] = [null, null, null];

      if (rows && rows.length > 0) {
        for (const row of rows) {
          const r = row.recettes as unknown as RecetteMin;
          if (r && loaded[row.day_index]) {
            loaded[row.day_index][row.slot] = r;
          }
        }
      }
      setPlan(loaded);
      setLoading(false);
    };

    loadPlan();
  }, [user, authLoading, semaine, supabase]);

  /* ─── Gestion des affichages prioritaires (Auth) ────────── */

  // 1. Pendant le chargement initial de la session
  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="skeleton h-10 w-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-card animate-pulse rounded-2xl border border-border"
            />
          ))}
        </div>
      </div>
    );
  }

  // 2. Si l'utilisateur n'est pas connecté (Ton bel écran avec bouton)
  if (!user) {
    return (
      <div className="text-center py-20 space-y-6 max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="w-10 h-10 text-accent" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-bold text-3xl">Mon Planning</h1>
          <p className="text-muted-foreground text-balance">
            Organisez votre semaine culinaire et générez votre liste de courses
            en un clic.
          </p>
        </div>
        <Link
          href="/connexion?next=/planificateur"
          className="inline-flex px-8 py-4 rounded-2xl bg-accent text-black font-bold hover:bg-accent-hover transition-all hover:scale-105 shadow-lg shadow-accent/20"
        >
          Se connecter pour planifier
        </Link>
      </div>
    );
  }

  /* ─── Actions ───────────────────────────────────────────── */

  const searchRecipes = async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }

    const { data } = await supabase
      .from("recettes")
      .select("id, slug, titre, ingredients")
      .eq("approuve", true)
      .eq("publie", true)
      .ilike("titre", `%${q}%`)
      .limit(8);

    setSearchResults((data || []) as RecetteMin[]);
  };

  const loadFavoris = async () => {
    if (favorisLoaded || !user) return;
    setFavorisLoading(true);

    const { data } = await supabase
      .from("favoris")
      .select("recette_id, recettes(id, slug, titre, ingredients, image_url)")
      .eq("user_id", user.id);

    const fav = (data || [])
      .map((f) => f.recettes as unknown as RecetteMin & { image_url?: string })
      .filter(Boolean);

    setFavoris(fav);
    setFavorisLoaded(true);
    setFavorisLoading(false);
  };

  const assignRecipe = (
    dayIndex: number,
    slot: number,
    recette: RecetteMin,
  ) => {
    const newPlan = { ...plan };
    if (!newPlan[dayIndex]) newPlan[dayIndex] = [null, null, null];
    newPlan[dayIndex][slot] = recette;
    savePlan(newPlan);
    setSelectingDay(null);
    setSearchQuery("");
    setSearchResults([]);
  };

  const removeRecipe = (dayIndex: number, slot: number) => {
    const newPlan = { ...plan };
    if (newPlan[dayIndex]) newPlan[dayIndex][slot] = null;
    savePlan(newPlan);
  };

  const getFilledSlots = (dayIndex: number): number =>
    (plan[dayIndex] || []).filter(Boolean).length;

  /* ─── Liste de courses ──────────────────────────────────── */

  const toggleDayForListe = (d: number) => {
    const next = new Set(selectedDays);
    if (next.has(d)) next.delete(d);
    else next.add(d);
    setSelectedDays(next);
  };

  const selectAllDays = () => {
    if (selectedDays.size === 7) setSelectedDays(new Set());
    else setSelectedDays(new Set([0, 1, 2, 3, 4, 5, 6]));
  };

  const generateListe = async () => {
    if (selectedDays.size === 0) return;
    setListeLoading(true); // ← pas setLoading
    try {
      const items = await getShoppingListForDays(
        semaine,
        Array.from(selectedDays),
      );
      setListeItems(items);
      setShowListe(true);
    } catch (err: unknown) {
      alert("Erreur : " + (err instanceof Error ? err.message : ""));
    } finally {
      setListeLoading(false);
    }
  };

  /* ─── Print / Share ─────────────────────────────────────── */

  const formatListeTexte = (): string => {
    const grouped = new Map<string, ListeItem[]>();
    for (const item of listeItems) {
      if (!grouped.has(item.categorie)) grouped.set(item.categorie, []);
      grouped.get(item.categorie)!.push(item);
    }
    let text = "🛒 LISTE DE COURSES\n\n";
    for (const [cat, items] of Array.from(grouped.entries())) {
      text += `── ${cat} ──\n`;
      for (const i of items) {
        const q =
          i.quantite === Math.floor(i.quantite)
            ? i.quantite.toString()
            : i.quantite.toFixed(1);
        text += `  • ${i.nom} — ${q} ${i.unite}\n`;
      }
      text += "\n";
    }
    return text + "Générée par Kitchen Mix";
  };

  const shareListe = async () => {
    const text = formatListeTexte();
    if (navigator.share)
      await navigator.share({ title: "Liste de courses", text });
    else {
      await navigator.clipboard.writeText(text);
      alert("Copié !");
    }
  };

  const printListe = () => {
    const grouped = new Map<string, ListeItem[]>();
    for (const item of listeItems) {
      if (!grouped.has(item.categorie)) grouped.set(item.categorie, []);
      grouped.get(item.categorie)!.push(item);
    }
    let html = "";
    const EMOJI: Record<string, string> = {
      "Fruits & Légumes": "🥬",
      "Viandes & Poissons": "🥩",
      "Produits laitiers": "🧀",
      Épicerie: "🏪",
      Surgelés: "🧊",
      Boulangerie: "🍞",
      Boissons: "🥤",
      Condiments: "🧂",
      Autre: "📦",
    };
    for (const [cat, items] of Array.from(grouped.entries())) {
      html += `<h2>${EMOJI[cat] || "📦"} ${cat}</h2><ul>`;
      for (const i of items) {
        const q =
          i.quantite === Math.floor(i.quantite)
            ? i.quantite.toString()
            : i.quantite.toFixed(1);
        html += `<li><span>${i.nom}</span><span>${q} ${i.unite}</span></li>`;
      }
      html += "</ul>";
    }
    const daysStr = Array.from(selectedDays)
      .sort()
      .map((d) => JOURS[d])
      .join(", ");
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>Liste de courses</title>
    <style>body{font-family:system-ui;padding:2rem;max-width:600px;margin:0 auto}h1{font-size:1.5rem}h2{font-size:1.1rem;margin-top:1.5rem;color:#666;border-bottom:1px solid #ddd;padding-bottom:4px}ul{list-style:none;padding:0}li{padding:4px 0;display:flex;justify-content:space-between}li span:last-child{font-weight:600}.footer{margin-top:2rem;font-size:.8rem;color:#999}</style>
    </head><body><h1>🛒 Liste de courses</h1><p style="color:#888;font-size:.9rem">${daysStr}</p>${html}<p class="footer">Kitchen Mix — mcmalnus.com</p></body></html>`);
    win.document.close();
    win.print();
  };

  /* ─── Loading ───────────────────────────────────────────── */

  if (authLoading || !user || loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="skeleton h-10 w-64 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="skeleton h-48 rounded-2xl" />
          ))}
        </div>
      </div>
    );

  const totalRecipes = Object.values(plan).flat().filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="font-display font-bold text-3xl flex items-center gap-3">
            <Calendar className="w-8 h-8 text-accent" /> Planificateur
          </h1>
          {totalRecipes >= 3 && (
            <button
              onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
            >
              <Save className="w-4 h-4" />
              Sauvegarder
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground mt-1">
            Semaine du{" "}
            {new Date(semaine).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
            })}{" "}
            · {totalRecipes} repas
          </p>
          <div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold border border-accent/20 uppercase tracking-wider">
              Les quantités sont pour 4 personnes / portions par défaut
            </span>
          </div>
        </div>
      </div>

      {/* ═══ GRILLE DESKTOP ═══ */}
      <div className="hidden lg:grid grid-cols-7 gap-3">
        {JOURS.map((jour, dayIdx) => {
          const slots = plan[dayIdx] || [null, null, null];
          const filled = getFilledSlots(dayIdx);
          return (
            <div
              key={dayIdx}
              className="glass-card p-3 min-h-[14rem] flex flex-col"
            >
              <h3 className="font-display font-semibold text-sm mb-2 text-accent flex items-center justify-between">
                {jour}
                <span className="text-[10px] text-muted-foreground font-normal">
                  {filled}/{MAX_SLOTS}
                </span>
              </h3>

              <div className="flex-1 space-y-1.5">
                {slots.map((recipe, slotIdx) => (
                  <div key={slotIdx}>
                    {recipe ? (
                      <div className="group flex items-center gap-1.5 bg-card/50 rounded-lg px-2 py-1.5">
                        {recipe.image_url ? (
                          <div className="relative w-6 h-6 shrink-0">
                            <Image
                              src={recipe.image_url}
                              alt={recipe.titre}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center shrink-0 text-[10px]">
                            🍽️
                          </div>
                        )}
                        <Link
                          href={`/recettes/${recipe.slug}`}
                          className="text-xs font-medium hover:text-accent transition-colors line-clamp-1 flex-1 min-w-0"
                          title={recipe.titre}
                        >
                          {recipe.titre}
                        </Link>
                        <button
                          onClick={() => removeRecipe(dayIdx, slotIdx)}
                          className="opacity-0 group-hover:opacity-100 text-error ml-1 shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      filled < MAX_SLOTS &&
                      slotIdx === filled && (
                        <button
                          onClick={() => {
                            setSelectingDay(dayIdx);
                            setSelectingSlot(slotIdx);
                          }}
                          className="w-full py-1.5 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
                        >
                          + Ajouter
                        </button>
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* Bouton ouvrir modal jour */}
              <button
                onClick={() => setDayModalOpen(dayIdx)}
                className="mt-2 w-full py-1 rounded-lg text-[10px] text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/20"
              >
                ↗ Voir {jour}
              </button>
            </div>
          );
        })}
      </div>

      {/* ═══ MOBILE ACCORDION ═══ */}
      <div className="lg:hidden space-y-2">
        {JOURS.map((jour, dayIdx) => {
          const slots = plan[dayIdx] || [null, null, null];
          const filled = getFilledSlots(dayIdx);
          const isOpen = openDay === dayIdx;

          return (
            <div
              key={dayIdx}
              className="glass-card p-3 min-h-[14rem] flex flex-col"
            >
              <h3 className="font-display font-semibold text-sm mb-2 text-accent flex items-center justify-between">
                {jour}
                <span className="text-[10px] text-muted-foreground font-normal">
                  {filled}/{MAX_SLOTS}
                </span>
              </h3>

              <div className="flex-1 space-y-1.5">
                {slots.map((recipe, slotIdx) => (
                  <div key={slotIdx}>
                    {recipe ? (
                      <div className="group flex items-center gap-1.5 bg-card/50 rounded-lg px-2 py-1.5">
                        {recipe.image_url ? (
                          <div className="relative w-6 h-6 shrink-0">
                            <Image
                              src={recipe.image_url}
                              alt={recipe.titre}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center shrink-0 text-[10px]">
                            🍽️
                          </div>
                        )}
                        <Link
                          href={`/recettes/${recipe.slug}`}
                          className="text-xs font-medium hover:text-accent transition-colors line-clamp-1 flex-1 min-w-0"
                          title={recipe.titre}
                        >
                          {recipe.titre}
                        </Link>
                        <button
                          onClick={() => removeRecipe(dayIdx, slotIdx)}
                          className="opacity-0 group-hover:opacity-100 text-error ml-1 shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      filled < MAX_SLOTS &&
                      slotIdx === filled && (
                        <button
                          onClick={() => {
                            setSelectingDay(dayIdx);
                            setSelectingSlot(slotIdx);
                          }}
                          className="w-full py-1.5 border border-dashed border-border rounded-lg text-xs text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
                        >
                          + Ajouter
                        </button>
                      )
                    )}
                  </div>
                ))}
              </div>

              {/* Bouton ouvrir modal jour ← ICI c'est le nouveau */}
              <button
                onClick={() => setDayModalOpen(dayIdx)}
                className="mt-2 w-full py-1 rounded-lg text-[10px] text-muted-foreground hover:text-accent hover:bg-accent/5 transition-colors border border-transparent hover:border-accent/20"
              >
                ↗ Voir {jour}
              </button>
            </div>
          );
        })}
      </div>

      {/* ═══ SECTION LISTE DE COURSES ═══ */}
      {totalRecipes > 0 && (
        <div className="glass-card p-6 space-y-4">
          <h2 className="font-display font-bold text-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-accent" /> Liste de courses
          </h2>
          <p className="text-sm text-muted-foreground">
            Sélectionnez les jours pour générer la liste de courses
            correspondante.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={selectAllDays}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                selectedDays.size === 7
                  ? "bg-accent text-black border-accent"
                  : "border-border hover:border-accent/30",
              )}
            >
              Toute la semaine
            </button>
            {JOURS.map((jour, idx) => {
              const hasRecipes = getFilledSlots(idx) > 0;
              const isSelected = selectedDays.has(idx);
              return (
                <button
                  key={idx}
                  onClick={() => hasRecipes && toggleDayForListe(idx)}
                  disabled={!hasRecipes}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                    isSelected
                      ? "bg-accent text-black border-accent"
                      : "border-border hover:border-accent/30",
                    !hasRecipes && "opacity-30 cursor-not-allowed",
                  )}
                >
                  {jour.slice(0, 3)}
                  {isSelected && <Check className="w-3 h-3 inline ml-1" />}
                </button>
              );
            })}
          </div>

          <button
            onClick={generateListe}
            disabled={selectedDays.size === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-medium text-sm hover:bg-accent-hover disabled:opacity-40 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Générer la liste ({selectedDays.size} jour
            {selectedDays.size > 1 ? "s" : ""})
          </button>
        </div>
      )}
      {/* ═══ MODAL DÉTAIL JOUR ═══ */}
      {dayModalOpen !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDayModalOpen(null)}
          />
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl p-6 space-y-4 max-h-[85dvh] flex flex-col animate-scale-in"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-accent">
                {JOURS[dayModalOpen]}
              </h3>
              <button onClick={() => setDayModalOpen(null)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Liste des recettes du jour */}
            <div className="space-y-3 flex-1 overflow-y-auto">
              {(plan[dayModalOpen] || [null, null, null]).map(
                (recipe, slotIdx) => (
                  <div key={slotIdx}>
                    {recipe ? (
                      <div className="flex items-center gap-3 bg-card/50 rounded-xl px-3 py-3 border border-border">
                        {/* Image */}
                        {recipe.image_url ? (
                          <div className="relative w-12 h-12 shrink-0">
                            <Image
                              src={recipe.image_url}
                              alt={recipe.titre}
                              fill
                              className="rounded-lg object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 text-xl">
                            🍽️
                          </div>
                        )}
                        {/* Titre + lien */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground mb-0.5">
                            Repas {slotIdx + 1}
                          </p>
                          <Link
                            href={`/recettes/${recipe.slug}`}
                            onClick={() => setDayModalOpen(null)}
                            className="text-sm font-medium hover:text-accent transition-colors line-clamp-2"
                          >
                            {recipe.titre}
                          </Link>
                        </div>
                        {/* Supprimer */}
                        <button
                          onClick={() => removeRecipe(dayModalOpen, slotIdx)}
                          className="text-error shrink-0 p-1 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      getFilledSlots(dayModalOpen) < MAX_SLOTS &&
                      slotIdx === getFilledSlots(dayModalOpen) && (
                        <button
                          onClick={() => {
                            setDayModalOpen(null);
                            setTimeout(() => {
                              setSelectingDay(dayModalOpen);
                              setSelectingSlot(slotIdx);
                            }, 150);
                          }}
                          className="w-full py-3 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
                        >
                          + Ajouter une recette
                        </button>
                      )
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      )}
      {/* ═══ MODAL SÉLECTION RECETTE ═══ */}
      {selectingDay !== null && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              setSelectingDay(null);
              setActiveTab("search");
              setSearchQuery("");
              setSearchResults([]);
            }}
          />
          <div
            className="relative z-10 w-full max-w-md mx-4 rounded-t-2xl sm:rounded-2xl p-6 space-y-4 max-h-[80dvh] flex flex-col animate-slide-up"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between flex-shrink-0">
              <h3 className="font-display font-bold text-lg">
                {JOURS[selectingDay]} — Repas {selectingSlot + 1}
              </h3>
              <button
                onClick={() => {
                  setSelectingDay(null);
                  setActiveTab("search");
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Onglets */}
            <div className="flex gap-1 bg-card rounded-xl p-1 flex-shrink-0">
              <button
                onClick={() => setActiveTab("search")}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === "search"
                    ? "bg-accent text-black shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Rechercher
              </button>
              <button
                onClick={() => {
                  setActiveTab("favoris");
                  loadFavoris();
                }}
                className={cn(
                  "flex-1 py-2 rounded-lg text-sm font-medium transition-all",
                  activeTab === "favoris"
                    ? "bg-accent text-black shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                ❤️ Mes Favoris
              </button>
            </div>

            {/* Contenu onglet Recherche */}
            {activeTab === "search" && (
              <div className="space-y-2 overflow-y-auto flex-1">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => searchRecipes(e.target.value)}
                  placeholder="Chercher une recette..."
                  autoFocus
                  className="input-field"
                />
                <div className="space-y-1">
                  {searchResults.map((r) => (
                    <button
                      key={r.id}
                      onClick={() =>
                        assignRecipe(selectingDay!, selectingSlot, r)
                      }
                      className="w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      {r.titre}
                    </button>
                  ))}
                  {searchQuery && searchResults.length === 0 && (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      Aucun résultat
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Contenu onglet Favoris — carousel horizontal façon Finder */}
            {activeTab === "favoris" && (
              <div className="flex-1 overflow-hidden">
                {favorisLoading && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                  </div>
                )}

                {!favorisLoading && favoris.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Aucun favori pour le moment.
                  </div>
                )}

                {!favorisLoading && favoris.length > 0 && (
                  <div
                    className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {favoris.map((r) => (
                      <button
                        key={r.id}
                        onClick={() =>
                          assignRecipe(selectingDay!, selectingSlot, r)
                        }
                        className="flex-shrink-0 snap-start w-36 rounded-xl overflow-hidden border border-border hover:border-accent hover:scale-[1.03] transition-all duration-200 group bg-card text-left"
                      >
                        {/* Image ou placeholder */}
                        <div className="w-full h-24 bg-accent/10 overflow-hidden">
                          {(r as any).image_url ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={(r as any).image_url}
                                alt={r.titre}
                                fill
                                className="object-cover group-hover:scale-105 ..."
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              🍽️
                            </div>
                          )}
                        </div>
                        {/* Titre */}
                        <div className="p-2">
                          <p className="text-xs font-medium leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                            {r.titre}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ MODAL LISTE DE COURSES ═══ */}
      {showListe && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowListe(false)}
          />
          <div
            className="relative z-10 w-full max-w-lg mx-4 rounded-2xl max-h-[85dvh] flex flex-col animate-scale-in"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-accent" /> Liste de
                courses
              </h3>
              <div className="flex items-center gap-2">
                {listeItems.length > 0 && (
                  <>
                    <button
                      onClick={shareListe}
                      className="p-2 rounded-lg hover:bg-card-hover text-muted-foreground"
                      title="Partager"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={printListe}
                      className="p-2 rounded-lg hover:bg-card-hover text-muted-foreground"
                      title="Imprimer"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowListe(false)}
                  className="p-2 rounded-lg hover:bg-card-hover text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {listeItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  Aucun ingrédient pour les jours sélectionnés.
                </p>
              ) : (
                <ListeDisplay items={listeItems} />
              )}
            </div>
          </div>
        </div>
      )}
      {/* ═══ MODAL SAUVEGARDER PLANNING ═══ */}
      {showSaveModal && (
        <SavePlanningModal
          weekStart={semaine}
          planData={Object.fromEntries(
            Object.entries(plan).map(([day, slots]) => [
              day,
              slots.map((r) => r?.id ?? null),
            ]),
          )}
          onClose={() => setShowSaveModal(false)}
          onSaved={(id) => {
            setShowSaveModal(false);
            alert(
              "Planning sauvegardé ! Vous pouvez le retrouver dans votre profil.",
            );
          }}
        />
      )}
    </div>
  );
}

function ListeDisplay({ items }: { items: ListeItem[] }) {
  const grouped = new Map<string, ListeItem[]>();
  for (const item of items) {
    if (!grouped.has(item.categorie)) grouped.set(item.categorie, []);
    grouped.get(item.categorie)!.push(item);
  }
  const EMOJI: Record<string, string> = {
    "Fruits & Légumes": "🥬",
    "Viandes & Poissons": "🥩",
    "Produits laitiers": "🧀",
    Épicerie: "🏪",
    Surgelés: "🧊",
    Boulangerie: "🍞",
    Boissons: "🥤",
    Condiments: "🧂",
    Autre: "📦",
  };

  return (
    <div className="space-y-5">
      {Array.from(grouped.entries()).map(([cat, catItems]) => (
        <div key={cat}>
          <h4 className="text-sm font-display font-semibold text-accent mb-2 flex items-center gap-2">
            <span>{EMOJI[cat] || "📦"}</span> {cat}
          </h4>
          <ul className="space-y-1">
            {catItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded-lg text-sm bg-card/50"
              >
                <span>{item.nom}</span>
                <span className="font-medium text-accent">
                  {item.quantite} {item.unite}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
