/* =============================================================
   Kitchen Mix — Seed Méga (tous appareils)
   Usage : npm run seed:mega
   Prérequis : .env.local configuré avec SUPABASE_SERVICE_ROLE_KEY
   ============================================================= */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Imports des données — ajouter les futurs fichiers ici
import { SEED_THERMOMIX } from "../lib/seed-mega-thermomix";
import { SEED_COOK_EXPERT } from "../lib/seed-mega-cookexpert";
import { SEED_COMPANION } from "../lib/seed-mega-companion";
import { SEED_KITCHENAID } from "../lib/seed-mega-kitchenaid";
import { SEED_COOKEO } from "../lib/seed-mega-cookeo";
import { SEED_MULTICUISEUR } from "../lib/seed-mega-multicuiseur";
import { SEED_PETITS_APPAREILS } from "../lib/seed-mega-petits-appareils";

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
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
} catch {
  console.error("⚠️  .env.local introuvable.");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Variables manquantes. Configurez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Assembler toutes les recettes
const ALL_RECIPES = [
  ...SEED_THERMOMIX,
  ...SEED_COOK_EXPERT,
  ...SEED_COMPANION,
  ...SEED_KITCHENAID,
  ...SEED_COOKEO,
  ...SEED_MULTICUISEUR,
  ...SEED_PETITS_APPAREILS,
];

async function seed() {
  console.log(`\n🌱 Seed Méga — ${ALL_RECIPES.length} recettes\n`);

  let ok = 0;
  let fail = 0;

  for (const recette of ALL_RECIPES) {
    process.stdout.write(`  → ${recette.titre}...`);

    const { error } = await supabase.from("recettes").upsert(
      {
        ...recette,
        auteur_id: null,
        note_moyenne: 0,
        nombre_notes: 0,
      },
      { onConflict: "slug" },
    );

    if (error) {
      console.log(` ❌ ${error.message}`);
      fail++;
    } else {
      console.log(" ✅");
      ok++;
    }
  }

  console.log(`\n🎉 Terminé ! ${ok} réussies, ${fail} erreurs.\n`);
}

seed().catch(console.error);
