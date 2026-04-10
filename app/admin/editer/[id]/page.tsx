"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import {
  CATEGORIES,
  REGIMES,
  MODELES_THERMOMIX,
  DIFFICULTES,
  INGREDIENT_CATEGORIES,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { Recette, Ingredient, EtapeThermomix, FAQItem } from "@/types";
import { Upload, X, ImageIcon } from "lucide-react"; // Pour les icônes
import imageCompression from "browser-image-compression";
import { updateRecette } from "@/app/actions/admin";
import { uploadImage } from "@/app/actions/upload";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditerPage({ params }: PageProps) {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [recette, setRecette] = useState<Recette | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [difficulte, setDifficulte] = useState("facile");
  const [tempsPrep, setTempsPrep] = useState(15);
  const [tempsCuisson, setTempsCuisson] = useState(20);
  const [portions, setPortions] = useState(4);
  const [modeles, setModeles] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>([]);
  const [regimesState, setRegimesState] = useState<string[]>([]);
  const [tagsStr, setTagsStr] = useState("");
  const [nutriscore, setNutriscore] = useState("");
  const [calories, setCalories] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [approuve, setApprouve] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [etapes, setEtapes] = useState<EtapeThermomix[]>([]);
  const [faq, setFaq] = useState<FAQItem[]>([]);

  // Sections ouvertes/fermées
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    infos: true,
    ingredients: false,
    etapes: false,
    medias: false,
    faq: false,
    admin: true,
  });

  const toggleSection = (key: string) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Load recipe
  useEffect(() => {
    const load = async () => {
      const { id } = await params;
      const { data, error: err } = await supabase
        .from("recettes")
        .select("*")
        .eq("id", id)
        .single();

      if (err || !data) {
        setError("Recette introuvable");
        setLoading(false);
        return;
      }

      const r = data as Recette;
      setRecette(r);
      setTitre(r.titre);
      setDescription(r.description);
      setDifficulte(r.difficulte);
      setTempsPrep(r.temps_preparation);
      setTempsCuisson(r.temps_cuisson);
      setPortions(r.nombre_portions);
      setModeles(r.modele_thermomix);
      setCats(r.categories);
      setRegimesState(r.regime);
      setTagsStr(r.tags.join(", "));
      setNutriscore(r.nutriscore || "");
      setCalories(r.calories_par_portion ? String(r.calories_par_portion) : "");
      setImageUrl(r.image_url || "");
      setVideoId(r.video_youtube_id || "");
      setApprouve(r.approuve);
      setIngredients(r.ingredients);
      setEtapes(r.etapes);
      setFaq(r.faq || []);
      setLoading(false);
    };

    if (!authLoading) {
      if (!user || !isAdmin) router.push("/");
      else load();
    }
  }, [authLoading, user, isAdmin, params, supabase, router]);

  // Save
  const handleSave = async () => {
    if (!recette) return;
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const updates = {
        titre,
        description,
        difficulte,
        temps_preparation: tempsPrep,
        temps_cuisson: tempsCuisson,
        nombre_portions: portions,
        modele_thermomix: modeles,
        categories: cats,
        regime: regimesState,
        tags: tagsStr
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        nutriscore: nutriscore || null,
        calories_par_portion: calories ? parseInt(calories) : null,
        image_url: imageUrl || null,
        video_youtube_id: videoId || null,
        approuve,
        ingredients,
        etapes,
        faq: faq.length > 0 ? faq : null,
      };

      await updateRecette(recette.id, updates);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  };
  // Ingredient helpers
  const addIng = () =>
    setIngredients([...ingredients, { nom: "", quantite: 0, unite: "g" }]);
  const rmIng = (i: number) =>
    setIngredients(ingredients.filter((_, j) => j !== i));
  const upIng = (i: number, updates: Partial<Ingredient>) => {
    const a = [...ingredients];
    a[i] = { ...a[i], ...updates };
    setIngredients(a);
  };

  // Etape helpers
  const addEtape = () =>
    setEtapes([...etapes, { numero: etapes.length + 1, instruction: "" }]);
  const rmEtape = (i: number) =>
    setEtapes(
      etapes.filter((_, j) => j !== i).map((e, j) => ({ ...e, numero: j + 1 })),
    );
  const upEtape = (i: number, updates: Partial<EtapeThermomix>) => {
    const a = [...etapes];
    a[i] = { ...a[i], ...updates };
    setEtapes(a);
  };

  // FAQ helpers
  const addFaqItem = () => setFaq([...faq, { question: "", reponse: "" }]);
  const rmFaqItem = (i: number) => setFaq(faq.filter((_, j) => j !== i));
  const upFaqItem = (i: number, updates: Partial<FAQItem>) => {
    const a = [...faq];
    a[i] = { ...a[i], ...updates };
    setFaq(a);
  };
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      const { url } = await uploadImage(formData);
      setImageUrl(url);
      setSaved(false);
    } catch (err: unknown) {
      console.error("Erreur upload:", err);
      alert("Erreur lors du traitement de l'image.");
    } finally {
      setSaving(false);
    }
  };
  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  if (loading || authLoading)
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );

  if (error && !recette)
    return (
      <div className="text-center py-20">
        <p className="text-error mb-4">{error}</p>
        <Link href="/admin" className="text-accent hover:underline">
          ← Retour admin
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="p-2 rounded-lg hover:bg-card-hover">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-2xl">
              Modifier la recette
            </h1>
            <p className="text-xs text-muted-foreground">{recette?.slug}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all",
            saved
              ? "bg-sage text-white"
              : "bg-accent text-black hover:bg-accent-hover",
          )}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Sauvegardé !" : "Enregistrer"}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-error/10 text-error text-sm">
          {error}
        </div>
      )}

      {/* ── SECTION : Admin ── */}
      <Section
        title="Statut"
        open={openSections.admin}
        toggle={() => toggleSection("admin")}
      >
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={approuve}
              onChange={(e) => setApprouve(e.target.checked)}
              className="w-4 h-4 accent-accent"
            />
            <span className="text-sm font-medium">
              Recette approuvée (visible sur le site)
            </span>
          </label>
        </div>
      </Section>

      {/* ── SECTION : Infos ── */}
      <Section
        title="Informations générales"
        open={openSections.infos}
        toggle={() => toggleSection("infos")}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Titre
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="input-field mt-1 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Difficulté
              </label>
              <select
                value={difficulte}
                onChange={(e) => setDifficulte(e.target.value)}
                className="input-field mt-1"
              >
                {DIFFICULTES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Prépa (min)
              </label>
              <input
                type="number"
                value={tempsPrep}
                onChange={(e) => setTempsPrep(+e.target.value)}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Cuisson (min)
              </label>
              <input
                type="number"
                value={tempsCuisson}
                onChange={(e) => setTempsCuisson(+e.target.value)}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Portions
              </label>
              <input
                type="number"
                value={portions}
                onChange={(e) => setPortions(+e.target.value)}
                className="input-field mt-1"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Modèles
            </label>
            <div className="flex gap-2">
              {MODELES_THERMOMIX.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => toggle(modeles, m, setModeles)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    modeles.includes(m)
                      ? "bg-accent text-black"
                      : "bg-card border border-border",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Catégories
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => toggle(cats, c.value, setCats)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    cats.includes(c.value)
                      ? "bg-accent text-black"
                      : "bg-card border border-border",
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Régimes
            </label>
            <div className="flex flex-wrap gap-2">
              {REGIMES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => toggle(regimesState, r.value, setRegimesState)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                    regimesState.includes(r.value)
                      ? "bg-[#7A9E7E] text-white"
                      : "bg-card border border-border",
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Tags
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="input-field mt-1"
                placeholder="tag1, tag2"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Nutri-Score
              </label>
              <select
                value={nutriscore}
                onChange={(e) => setNutriscore(e.target.value)}
                className="input-field mt-1"
              >
                <option value="">—</option>
                {["A", "B", "C", "D", "E"].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Calories
              </label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="input-field mt-1"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION : Ingrédients ── */}
      <Section
        title={`Ingrédients (${ingredients.length})`}
        open={openSections.ingredients}
        toggle={() => toggleSection("ingredients")}
      >
        <div className="space-y-2">
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={ing.nom}
                onChange={(e) => upIng(i, { nom: e.target.value })}
                placeholder="Nom"
                className="input-field flex-1 text-xs"
              />
              <input
                type="number"
                value={ing.quantite}
                onChange={(e) => upIng(i, { quantite: +e.target.value })}
                className="input-field w-20 text-xs"
              />
              <input
                type="text"
                value={ing.unite}
                onChange={(e) => upIng(i, { unite: e.target.value })}
                className="input-field w-24 text-xs"
              />
              <select
                value={ing.categorie || ""}
                onChange={(e) => upIng(i, { categorie: e.target.value })}
                className="input-field w-36 text-xs"
              >
                <option value="">Cat.</option>
                {INGREDIENT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button onClick={() => rmIng(i)} className="text-error p-1">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          <button
            onClick={addIng}
            className="text-accent text-xs hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Ajouter
          </button>
        </div>
      </Section>

      {/* ── SECTION : Étapes ── */}
      <Section
        title={`Étapes (${etapes.length})`}
        open={openSections.etapes}
        toggle={() => toggleSection("etapes")}
      >
        <div className="space-y-4">
          {etapes.map((et, i) => (
            <div
              key={i}
              className="p-3 bg-card/50 rounded-xl border border-border space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-accent">
                  Étape {et.numero}
                </span>
                <button onClick={() => rmEtape(i)} className="text-error">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <textarea
                value={et.instruction}
                onChange={(e) => upEtape(i, { instruction: e.target.value })}
                rows={2}
                className="input-field text-xs resize-none"
                placeholder="Instruction..."
              />
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="number"
                  value={et.vitesse ?? ""}
                  onChange={(e) =>
                    upEtape(i, {
                      vitesse: e.target.value ? +e.target.value : undefined,
                    })
                  }
                  placeholder="Vitesse"
                  className="input-field text-xs"
                />
                <input
                  type="number"
                  value={et.temperature ?? ""}
                  onChange={(e) =>
                    upEtape(i, {
                      temperature: e.target.value ? +e.target.value : undefined,
                    })
                  }
                  placeholder="Temp °C"
                  className="input-field text-xs"
                />
                <input
                  type="number"
                  value={et.duree ?? ""}
                  onChange={(e) =>
                    upEtape(i, {
                      duree: e.target.value ? +e.target.value : undefined,
                    })
                  }
                  placeholder="Durée (sec)"
                  className="input-field text-xs"
                />
                <input
                  type="text"
                  value={et.accessoire ?? ""}
                  onChange={(e) =>
                    upEtape(i, { accessoire: e.target.value || undefined })
                  }
                  placeholder="Accessoire"
                  className="input-field text-xs"
                />
              </div>
              <input
                type="text"
                value={et.conseil ?? ""}
                onChange={(e) =>
                  upEtape(i, { conseil: e.target.value || undefined })
                }
                placeholder="Conseil (optionnel)"
                className="input-field text-xs"
              />
            </div>
          ))}
          <button
            onClick={addEtape}
            className="text-accent text-xs hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Ajouter une étape
          </button>
        </div>
      </Section>

      {/* ── SECTION : Médias ── */}
      <Section
        title="Médias"
        open={openSections.medias}
        toggle={() => toggleSection("medias")}
      >
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase text-muted-foreground">
            Image de la recette
          </label>

          <div className="flex items-start gap-4">
            {/* Prévisualisation */}
            {imageUrl ? (
              <div className="relative w-40 h-24 rounded-lg overflow-hidden border border-border group">
                <Image
                  src={imageUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => setImageUrl("")}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 ..."
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="w-40 h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-card">
                <ImageIcon className="w-8 h-8 text-muted-foreground/20" />
              </div>
            )}

            {/* Bouton d'upload physique */}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-card-hover transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Cliquez pour remplacer la photo
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Ou collez une URL directe ici..."
                className="input-field text-[10px] mt-2 h-8"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ── SECTION : FAQ ── */}
      <Section
        title={`FAQ (${faq.length})`}
        open={openSections.faq}
        toggle={() => toggleSection("faq")}
      >
        <div className="space-y-3">
          {faq.map((f, i) => (
            <div
              key={i}
              className="p-3 bg-card/50 rounded-xl border border-border space-y-2"
            >
              <div className="flex justify-between">
                <span className="text-xs text-accent">Q{i + 1}</span>
                <button onClick={() => rmFaqItem(i)} className="text-error">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <input
                type="text"
                value={f.question}
                onChange={(e) => upFaqItem(i, { question: e.target.value })}
                placeholder="Question"
                className="input-field text-xs"
              />
              <textarea
                value={f.reponse}
                onChange={(e) => upFaqItem(i, { reponse: e.target.value })}
                placeholder="Réponse"
                rows={2}
                className="input-field text-xs resize-none"
              />
            </div>
          ))}
          <button
            onClick={addFaqItem}
            className="text-accent text-xs hover:underline flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Ajouter
          </button>
        </div>
      </Section>

      {/* Save button bottom */}
      <div className="sticky bottom-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={cn(
            "flex items-center gap-2 px-8 py-3 rounded-xl font-bold shadow-2xl transition-all",
            saved
              ? "bg-sage text-white"
              : "bg-accent text-black hover:bg-accent-hover",
          )}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saved ? "Sauvegardé !" : "Enregistrer les modifications"}
        </button>
      </div>
    </div>
  );
}

/* ─── Section collapsible ─── */
function Section({
  title,
  open,
  toggle,
  children,
}: {
  title: string;
  open: boolean;
  toggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-card-hover transition-colors"
      >
        <span className="font-display font-bold text-sm">{title}</span>
        <ChevronDown
          className={cn("w-4 h-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}
