"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Loader2,
  Check,
  AlertCircle,
  Send,
  Clock,
  Thermometer,
  Gauge,
  Wrench,
  Lightbulb,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Zap,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  CATEGORIES,
  REGIMES,
  MODELES_THERMOMIX,
  DIFFICULTES,
  INGREDIENT_CATEGORIES,
  MAX_IMAGE_SIZE_MB,
} from "@/lib/constants";
import {
  VITESSES_BASE,
  ACCESSOIRES_TM,
  TURBO_DUREES,
  getTemperaturesForModels,
  getModesForModels,
  formatVitesse,
  formatTimeMMSS,
} from "@/lib/thermomix-specs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ApplianceSelector from "@/components/ui/ApplianceSelector";
import { soumettreRecette } from "@/app/actions/recettes";
import { recetteSchema, type RecetteFormData } from "@/lib/validation";
import ImageUploader from "@/components/ui/ImageUploader";

const UNITES = [
  "g",
  "kg",
  "ml",
  "l",
  "c. à café",
  "c. à soupe",
  "pièce",
  "pincée",
  "tranche",
  "feuille",
  "gousse",
  "brin",
  "sachet",
  "boîte",
  "verre",
];
const NUTRI_OPTIONS = ["", "A", "B", "C", "D", "E"];

export default function SoumettrePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Multi‑étapes
  const [step, setStep] = useState(1);
  const STEPS = 5;

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RecetteFormData>({
    resolver: zodResolver(recetteSchema),
    defaultValues: {
      titre: "",
      description: "",
      image_url: null,
      video_youtube_id: null,
      temps_preparation: 15,
      temps_cuisson: 20,
      difficulte: "facile",
      nombre_portions: 4,
      modele_thermomix: ["TM6", "TM7"],
      categories: ["plat"],
      regime: [],
      tags: [], // ← obligatoire
      calories_par_portion: null,
      nutriscore: null,
      nutriscore_note: null,
      ingredients: [
        { nom: "", quantite: 0, unite: "g", categorie: "Épicerie" },
      ],
      etapes: [
        {
          instruction: "",
          vitesse: "",
          turboDuree: "1s",
          temperature: "",
          dureeMin: 0,
          dureeSec: 0,
          accessoire: "",
          sensInverse: false,
          modeSpecial: "",
          conseil: "",
        },
      ],
      faq: null, // ← obligatoire
    },
  });

  // Tableaux dynamiques
  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });
  const {
    fields: etapeFields,
    append: addEtape,
    remove: removeEtape,
  } = useFieldArray({ control, name: "etapes" });
  const {
    fields: faqFields,
    append: addFaq,
    remove: removeFaq,
  } = useFieldArray({ control, name: "faq" });

  // Valeurs surveillées
  const modeles = watch("modele_thermomix");
  const cats = watch("categories");
  const regimes = watch("regime");

  // Helper toggle pour les boutons multi‑sélection
  const toggleArray = (
    arr: string[],
    value: string,
    onChange: (val: string[]) => void,
  ) => {
    if (arr.includes(value)) onChange(arr.filter((v) => v !== value));
    else onChange([...arr, value]);
  };

  // Navigation avec validation partielle
  const nextStep = async () => {
    let fieldsToValidate: (keyof RecetteFormData)[] = [];
    if (step === 1)
      fieldsToValidate = [
        "titre",
        "description",
        "modele_thermomix",
        "categories",
      ];
    if (step === 2) fieldsToValidate = ["ingredients"];
    if (step === 3) fieldsToValidate = ["etapes"];
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  // Soumission finale
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<RecetteFormData> = async (data) => {
    setSubmitError("");
    try {
      // Plus de gestion manuelle de l'image : elle est déjà dans data.image_url via ImageUploader
      const payload = { ...data };
      await soumettreRecette(payload);
      setSuccess(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Erreur inconnue");
    }
  };

  // États de chargement / non connecté
  if (authLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="skeleton h-12 w-3/4 mb-8 rounded-xl" />
        <div className="space-y-6">
          <div className="skeleton h-32 w-full rounded-2xl" />
          <div className="skeleton h-64 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 space-y-6 max-w-md mx-auto px-4">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Plus className="w-10 h-10 text-accent" />
        </div>
        <h1 className="font-display font-bold text-3xl">
          Proposer une recette
        </h1>
        <p className="text-muted-foreground">
          Connectez-vous pour partager vos créations.
        </p>
        <Link
          href="/connexion?next=/soumettre"
          className="inline-flex px-8 py-4 rounded-2xl bg-accent text-black font-bold hover:bg-accent-hover transition-all"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-6">
        <div className="w-20 h-20 rounded-full bg-sage/15 flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-sage" />
        </div>
        <h1 className="font-display font-bold text-2xl">Recette soumise !</h1>
        <p className="text-muted-foreground">
          Votre recette sera examinée avant publication. Suivez son statut dans
          votre{" "}
          <Link href="/profil" className="text-accent hover:underline">
            profil
          </Link>
          .
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/profil"
            className="px-6 py-3 rounded-xl bg-accent text-black font-medium"
          >
            Mon profil
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl border border-border hover:bg-card-hover"
          >
            Nouvelle recette
          </button>
        </div>
      </div>
    );
  }

  // Données dynamiques pour les étapes
  const availTemps = getTemperaturesForModels(modeles);
  const availModes = getModesForModels(modeles);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="font-display font-bold text-3xl">Créer une recette</h1>
        <p className="text-muted-foreground">
          Partagez vos créations. Chaque recette est vérifiée.
        </p>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>
            Étape {step}/{STEPS}
          </span>
          <span>
            {
              [
                "Informations",
                "Ingrédients",
                "Préparation",
                "Médias & FAQ",
                "Résumé",
              ][step - 1]
            }
          </span>
        </div>
        <div className="h-2 bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(step / STEPS) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ÉTAPE 1 */}
        {step === 1 && (
          <div className="glass-card p-6 space-y-6 animate-fade-in">
            <h2 className="font-display font-bold text-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm flex items-center justify-center">
                1
              </span>
              Informations générales
            </h2>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Titre *</label>
              <input
                {...register("titre")}
                placeholder="Velouté de butternut..."
                className="input-field"
              />
              {errors.titre && (
                <p className="text-xs text-error">{errors.titre.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Description *</label>
              <textarea
                {...register("description")}
                rows={3}
                className="input-field resize-none"
              />
              {errors.description && (
                <p className="text-xs text-error">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Difficulté</label>
                <select {...register("difficulte")} className="input-field">
                  {DIFFICULTES.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.emoji} {d.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Prépa (min)</label>
                <input
                  type="number"
                  {...register("temps_preparation", { valueAsNumber: true })}
                  className="input-field"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Cuisson (min)</label>
                <input
                  type="number"
                  {...register("temps_cuisson", { valueAsNumber: true })}
                  className="input-field"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Portions</label>
                <input
                  type="number"
                  {...register("nombre_portions", { valueAsNumber: true })}
                  className="input-field"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Appareils compatibles *
              </label>
              <ApplianceSelector
                selected={modeles}
                onChange={(val) => setValue("modele_thermomix", val)}
                max={4}
              />
              {errors.modele_thermomix && (
                <p className="text-xs text-error">
                  {errors.modele_thermomix.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Catégories *</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    type="button"
                    key={c.value}
                    onClick={() =>
                      toggleArray(cats, c.value, (val) =>
                        setValue("categories", val),
                      )
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      cats.includes(c.value)
                        ? "bg-accent text-black"
                        : "bg-card border border-border",
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              {errors.categories && (
                <p className="text-xs text-error">
                  {errors.categories.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Régimes alimentaires
              </label>
              <div className="flex flex-wrap gap-2">
                {REGIMES.map((r) => (
                  <button
                    type="button"
                    key={r.value}
                    onClick={() =>
                      toggleArray(regimes, r.value, (val) =>
                        setValue("regime", val),
                      )
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                      regimes.includes(r.value)
                        ? "bg-[#7A9E7E] text-white"
                        : "bg-card border border-border",
                    )}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Tags (séparés par des virgules)
              </label>
              <input
                {...register("tags")}
                placeholder="rapide, automne, familial"
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Nutri-Score</label>
                <select {...register("nutriscore")} className="input-field">
                  {NUTRI_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n || "—"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Calories / portion
                </label>
                <input
                  type="number"
                  {...register("calories_par_portion", { valueAsNumber: true })}
                  className="input-field"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Note Nutri-Score</label>
                <input
                  {...register("nutriscore_note")}
                  placeholder="Estimation..."
                  className="input-field"
                />
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : Ingrédients */}
        {step === 2 && (
          <div className="glass-card p-6 space-y-6 animate-fade-in">
            <h2 className="font-display font-bold text-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm flex items-center justify-center">
                2
              </span>
              Ingrédients
            </h2>
            <div className="space-y-3">
              {ingredientFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <span className="text-xs text-muted-foreground pt-3 w-5 text-right">
                    {idx + 1}.
                  </span>
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      {...register(`ingredients.${idx}.nom`)}
                      placeholder="Ingrédient"
                      className="input-field col-span-2 sm:col-span-1"
                    />
                    <input
                      type="number"
                      {...register(`ingredients.${idx}.quantite`, {
                        valueAsNumber: true,
                      })}
                      placeholder="Qté"
                      className="input-field"
                    />
                    <select
                      {...register(`ingredients.${idx}.unite`)}
                      className="input-field"
                    >
                      {UNITES.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                    <select
                      {...register(`ingredients.${idx}.categorie`)}
                      className="input-field"
                    >
                      {INGREDIENT_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    disabled={ingredientFields.length === 1}
                    className="p-2 text-muted-foreground hover:text-error disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addIngredient({
                    nom: "",
                    quantite: 0,
                    unite: "g",
                    categorie: "Épicerie",
                  })
                }
                className="flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <Plus className="w-4 h-4" /> Ajouter un ingrédient
              </button>
              {errors.ingredients && (
                <p className="text-xs text-error">
                  {errors.ingredients.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ÉTAPE 3 : Étapes */}
        {step === 3 && (
          <div className="glass-card p-6 space-y-6 animate-fade-in">
            <h2 className="font-display font-bold text-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm flex items-center justify-center">
                3
              </span>
              Étapes de préparation
            </h2>
            <div className="space-y-6">
              {etapeFields.map((field, idx) => {
                const vitesse = watch(`etapes.${idx}.vitesse`);
                return (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-card/50 border border-border space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-accent">
                        Étape {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeEtape(idx)}
                        disabled={etapeFields.length === 1}
                        className="text-muted-foreground hover:text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <textarea
                      {...register(`etapes.${idx}.instruction`)}
                      rows={2}
                      placeholder="Décrivez cette étape..."
                      className="input-field resize-none"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs">Vitesse</label>
                        <select
                          {...register(`etapes.${idx}.vitesse`)}
                          className="input-field text-xs"
                        >
                          <option value="">—</option>
                          {VITESSES_BASE.map((v) => (
                            <option key={String(v)} value={String(v)}>
                              {formatVitesse(v)}
                            </option>
                          ))}
                        </select>
                      </div>
                      {vitesse === "Turbo" && (
                        <div className="space-y-1">
                          <label className="text-xs">Durée Turbo</label>
                          <select
                            {...register(`etapes.${idx}.turboDuree`)}
                            className="input-field text-xs"
                          >
                            {TURBO_DUREES.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div className="space-y-1">
                        <label className="text-xs">Température</label>
                        <select
                          {...register(`etapes.${idx}.temperature`)}
                          className="input-field text-xs"
                        >
                          <option value="">—</option>
                          {availTemps.map((t) => (
                            <option key={String(t)} value={String(t)}>
                              {typeof t === "number" ? `${t}°C` : t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs">Accessoire</label>
                        <select
                          {...register(`etapes.${idx}.accessoire`)}
                          className="input-field text-xs"
                        >
                          <option value="">—</option>
                          {ACCESSOIRES_TM.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                      {availModes.length > 0 && (
                        <div className="space-y-1">
                          <label className="text-xs">Mode spécial</label>
                          <select
                            {...register(`etapes.${idx}.modeSpecial`)}
                            className="input-field text-xs"
                          >
                            <option value="">—</option>
                            {availModes.map((m) => (
                              <option key={m} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs">Durée (min:sec)</label>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <TimePicker
                            value={watch(`etapes.${idx}.dureeMin`)}
                            onChange={(v) =>
                              setValue(`etapes.${idx}.dureeMin`, v)
                            }
                            min={0}
                            max={99}
                            label="min"
                          />
                          <span className="text-lg font-bold text-muted-foreground">
                            :
                          </span>
                          <TimePicker
                            value={watch(`etapes.${idx}.dureeSec`)}
                            onChange={(v) =>
                              setValue(`etapes.${idx}.dureeSec`, v)
                            }
                            min={0}
                            max={59}
                            label="sec"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ={" "}
                          {formatTimeMMSS(
                            watch(`etapes.${idx}.dureeMin`) * 60 +
                              watch(`etapes.${idx}.dureeSec`),
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setValue(
                            `etapes.${idx}.sensInverse`,
                            !watch(`etapes.${idx}.sensInverse`),
                          )
                        }
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                          watch(`etapes.${idx}.sensInverse`)
                            ? "bg-accent/15 text-accent border-accent/30"
                            : "bg-card border-border text-muted-foreground",
                        )}
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Sens inverse
                      </button>
                    </div>
                    <input
                      {...register(`etapes.${idx}.conseil`)}
                      placeholder="Conseil / astuce (optionnel)"
                      className="input-field text-xs"
                    />
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() =>
                  addEtape({
                    instruction: "",
                    vitesse: "",
                    turboDuree: "1s",
                    temperature: "",
                    dureeMin: 0,
                    dureeSec: 0,
                    accessoire: "",
                    sensInverse: false,
                    modeSpecial: "",
                    conseil: "",
                  })
                }
                className="flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <Plus className="w-4 h-4" /> Ajouter une étape
              </button>
              {errors.etapes && (
                <p className="text-xs text-error">{errors.etapes.message}</p>
              )}
            </div>
          </div>
        )}

        {/* ÉTAPE 4 : Médias & FAQ */}
        {step === 4 && (
          <div className="glass-card p-6 space-y-8 animate-fade-in">
            <h2 className="font-display font-bold text-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm flex items-center justify-center">
                4
              </span>
              Photo, vidéo & FAQ
            </h2>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Photo du plat</label>
              <ImageUploader
                onImageUploaded={(url) => setValue("image_url", url)}
                existingImageUrl={watch("image_url")}
                aspect={16 / 9}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Vidéo YouTube (ID)</label>
              <input
                {...register("video_youtube_id")}
                placeholder="dQw4w9WgXcQ"
                className="input-field"
              />
            </div>
            <div className="space-y-4">
              <label className="text-sm font-medium">
                Questions fréquentes
              </label>
              {faqFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-4 rounded-xl bg-card/50 border border-border space-y-2"
                >
                  <div className="flex justify-between">
                    <span className="text-xs text-accent">
                      Question {idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(idx)}
                      className="text-muted-foreground hover:text-error"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    {...register(`faq.${idx}.question`)}
                    placeholder="Question..."
                    className="input-field text-sm"
                  />
                  <textarea
                    {...register(`faq.${idx}.reponse`)}
                    rows={2}
                    placeholder="Réponse..."
                    className="input-field text-sm resize-none"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addFaq({ question: "", reponse: "" })}
                className="flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <Plus className="w-4 h-4" /> Ajouter une question
              </button>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 : Résumé */}
        {step === 5 && (
          <div className="glass-card p-6 space-y-6 animate-fade-in">
            <h2 className="font-display font-bold text-xl flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-accent/15 text-accent text-sm flex items-center justify-center">
                5
              </span>
              Résumé et envoi
            </h2>
            <div className="space-y-3">
              <Row l="Titre" v={watch("titre")} />
              <Row l="Difficulté" v={watch("difficulte")} />
              <Row
                l="Temps total"
                v={`${(watch("temps_preparation") || 0) + (watch("temps_cuisson") || 0)} min`}
              />
              <Row l="Portions" v={String(watch("nombre_portions"))} />
              <Row l="Modèles" v={watch("modele_thermomix").join(", ")} />
              <Row l="Catégories" v={watch("categories").join(", ")} />
              {watch("regime").length > 0 && (
                <Row l="Régimes" v={watch("regime").join(", ")} />
              )}
              <Row
                l="Ingrédients"
                v={String(watch("ingredients").filter((i) => i.nom).length)}
              />
              <Row
                l="Étapes"
                v={String(watch("etapes").filter((e) => e.instruction).length)}
              />
              <Row l="Photo" v={watch("image_url") ? "✅ Oui" : "Non"} />{" "}
              {watch("faq") && watch("faq")!.length > 0 && (
                <Row l="FAQ" v={`${watch("faq")!.length} question(s)`} />
              )}
            </div>
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <p className="text-sm font-medium text-accent flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Modération obligatoire
              </p>
              <p className="text-xs text-muted-foreground">
                Votre recette sera examinée avant publication.
              </p>
            </div>
            {submitError && (
              <div className="p-4 rounded-xl bg-error/10 border border-error/20 text-sm text-error">
                {submitError}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 pb-8">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-3 rounded-xl border border-border text-sm hover:bg-card-hover disabled:opacity-30"
          >
            Précédent
          </button>
          {step < STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 rounded-xl bg-accent text-black font-medium text-sm hover:bg-accent-hover"
            >
              Suivant
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Envoi...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Soumettre
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Composants auxiliaires
function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{l}</span>
      <span className="text-sm font-medium">{v}</span>
    </div>
  );
}

function TimePicker({
  value,
  onChange,
  min,
  max,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  label: string;
}) {
  const inc = () => onChange(Math.min(max, value + 1));
  const dec = () => onChange(Math.max(min, value - 1));
  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        type="button"
        onClick={inc}
        className="p-1 rounded-md hover:bg-card-hover text-muted-foreground hover:text-accent"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <div className="w-12 text-center">
        <span className="text-lg font-display font-bold tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="text-[9px] text-muted-foreground block -mt-1">
          {label}
        </span>
      </div>
      <button
        type="button"
        onClick={dec}
        className="p-1 rounded-md hover:bg-card-hover text-muted-foreground hover:text-accent"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
}
