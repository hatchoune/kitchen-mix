/* =============================================================
   Kitchen Mix — Seed One
   Insère ou met à jour UNE seule recette par son slug.
   Préserve toujours l'image_url et la video_youtube_id existantes.

   Usage :
     npm run seed:one -- --slug gratin-blettes-bechamel-thermomix

   Prérequis : .env.local configuré avec SUPABASE_SERVICE_ROLE_KEY
   ============================================================= */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// ── Importer TOUTES les sources de recettes ──────────────────
import { SEED_THERMOMIX } from "../lib/seed-mega-thermomix";
import { SEED_COOK_EXPERT } from "../lib/seed-mega-cookexpert";
import { SEED_COMPANION } from "../lib/seed-mega-companion";
import { SEED_KITCHENAID } from "../lib/seed-mega-kitchenaid";
import { SEED_COOKEO } from "../lib/seed-mega-cookeo";
import { SEED_MULTICUISEUR } from "../lib/seed-mega-multicuiseur";
import { SEED_PETITS_APPAREILS } from "../lib/seed-mega-petits-appareils";
import { SEED_RECETTES } from "../lib/seed-data";

// ─── Charger .env.local ──────────────────────────────────────
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envFile = readFileSync(envPath, "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  console.error("⚠️  .env.local introuvable.");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Variables manquantes. Configurez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ─── Récupérer le slug depuis les arguments CLI ──────────────
const args = process.argv.slice(2);
const slugIndex = args.indexOf("--slug");
const targetSlug = slugIndex !== -1 ? args[slugIndex + 1] : null;

if (!targetSlug) {
  console.error("❌ Slug manquant. Usage : npm run seed:one -- --slug <votre-slug>");
  process.exit(1);
}

// ─── Toutes les recettes disponibles ────────────────────────
const ALL_RECIPES = [
  ...SEED_THERMOMIX,
  ...SEED_COOK_EXPERT,
  ...SEED_COMPANION,
  ...SEED_KITCHENAID,
  ...SEED_COOKEO,
  ...SEED_MULTICUISEUR,
  ...SEED_PETITS_APPAREILS,
  ...SEED_RECETTES,
];

async function seedOne() {
  console.log(`\n🔍 Recherche de la recette avec le slug : "${targetSlug}"...\n`);

  const recette = ALL_RECIPES.find((r) => r.slug === targetSlug);

  if (!recette) {
    console.error(`❌ Aucune recette trouvée avec le slug "${targetSlug}".`);
    console.log("\n📋 Slugs disponibles dans les seeds :\n");
    ALL_RECIPES.forEach((r) => console.log(`   • ${r.slug}`));
    process.exit(1);
  }

  console.log(`✅ Recette trouvée : "${recette.titre}"`);
  console.log(`   Vérification de l'existence en base de données...`);

  // ── Récupérer les champs médias existants pour ne pas les écraser ──
  const { data: existing } = await supabase
    .from("recettes")
    .select("image_url, video_youtube_id")
    .eq("slug", targetSlug)
    .maybeSingle();

  const imageUrlFinal = existing?.image_url ?? recette.image_url;
  const videoFinal = existing?.video_youtube_id ?? recette.video_youtube_id;

  if (existing) {
    console.log(`   → Recette déjà en base, mise à jour sans toucher aux médias.`);
    if (existing.image_url) {
      console.log(`   📸 image_url préservée : ${existing.image_url}`);
    }
  } else {
    console.log(`   → Nouvelle recette, insertion...`);
  }

  const { error } = await supabase.from("recettes").upsert(
    {
      ...recette,
      image_url: imageUrlFinal,
      video_youtube_id: videoFinal,
      auteur_id: null,
      note_moyenne: 0,
      nombre_notes: 0,
    },
    { onConflict: "slug" }
  );

  if (error) {
    console.error(`\n❌ Erreur lors de l'insertion : ${error.message}`);
    process.exit(1);
  }

  console.log(`\n🎉 "${recette.titre}" insérée/mise à jour avec succès !\n`);
}

seedOne().catch(console.error);
