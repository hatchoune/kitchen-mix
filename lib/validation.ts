import { z } from "zod";

const ingredientSchema = z.object({
  nom: z.string().min(1, "Nom requis"),
  quantite: z.number().positive("Quantité > 0"),
  unite: z.string().min(1),
  categorie: z.string().default("Épicerie"),
});

const etapeSchema = z.object({
  instruction: z.string().min(5, "Instruction trop courte"),
  vitesse: z.string().optional(),
  turboDuree: z.string().optional(),
  temperature: z.string().optional(),
  dureeMin: z.number().min(0).default(0),
  dureeSec: z.number().min(0).max(59).default(0),
  accessoire: z.string().optional(),
  sensInverse: z.boolean().default(false),
  modeSpecial: z.string().optional(),
  conseil: z.string().optional(),
});

const faqSchema = z.object({
  question: z.string().min(1, "Question requise"),
  reponse: z.string().min(1, "Réponse requise"),
});

// ⚠️ TOUS les champs sont requis (pas de "?"). Les defaults garantissent une valeur.
export const recetteSchema = z.object({
  titre: z.string().min(3).max(120),
  description: z.string().min(10).max(2000),
  image_url: z.string().nullable(),
  video_youtube_id: z.string().nullable(),
  temps_preparation: z.number().int().min(0),
  temps_cuisson: z.number().int().min(0),
  difficulte: z.enum(["facile", "moyen", "difficile"]),
  nombre_portions: z.number().int().min(1).max(20),
  modele_thermomix: z.array(z.string()).min(1),
  categories: z.array(z.string()).min(1),
  regime: z.array(z.string()).default([]), // toujours un tableau
  tags: z.array(z.string()).default([]), // toujours un tableau
  calories_par_portion: z.number().nullable().default(null),
  nutriscore: z.string().nullable().default(null),
  nutriscore_note: z.string().nullable().default(null),
  ingredients: z.array(ingredientSchema).min(1),
  etapes: z.array(etapeSchema).min(1),
  faq: z.array(faqSchema).nullable().default(null), // null ou tableau
});

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
  pseudo: z.string().min(2).max(30),
});

export type RecetteFormData = z.infer<typeof recetteSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
