/* =============================================================
   Kitchen Mix — Seeding Companion Lot 1
   Usage : npm run seed:companion
   Prérequis : .env.local configuré avec SUPABASE_SERVICE_ROLE_KEY
   ============================================================= */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import { SEED_RECETTES_COOK_EXPERT } from "../lib/seed-data-cook-expert";
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
  console.error("⚠️  Fichier .env.local introuvable.");
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "❌ Variables manquantes. Vérifiez NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY dans .env.local",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function seed() {
  console.log("🌱 Seeding Cook Expert Lot 1...\n");

  let ok = 0;
  let fail = 0;

  for (const recette of SEED_RECETTES_COOK_EXPERT) {
    console.log(`  → ${recette.titre}...`);

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
      console.error(`    ❌ Erreur : ${error.message}`);
      fail++;
    } else {
      console.log(`    ✅ OK`);
      ok++;
    }
  }

  console.log(`\n🎉 Terminé ! ${ok} réussies, ${fail} errées.`);
}

seed().catch(console.error);
