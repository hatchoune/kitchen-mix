/* =============================================================
   Kitchen Mix — Reset total des recettes
   ⚠️  SUPPRIME TOUTES LES RECETTES EN BASE — IRRÉVERSIBLE
   Usage : npm run reset:recettes
   Tape "CONFIRMER" quand demandé.
   ============================================================= */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";
import * as readline from "readline";

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
  console.error("❌ Variables manquantes dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "⚠️  Cette action supprime TOUTES les recettes. Tape CONFIRMER pour continuer : ",
  async (answer) => {
    rl.close();
    if (answer !== "CONFIRMER") {
      console.log("❌ Annulé.");
      process.exit(0);
    }

    console.log("\n🗑️  Suppression en cours...");

    // Supprimer d'abord les données liées (favoris, ratings, comments, meal_plans)
    await supabase
      .from("recipe_ratings")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("recipe_comments")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("favoris")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    await supabase
      .from("meal_plans")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    const { error } = await supabase
      .from("recettes")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    if (error) {
      console.error("❌ Erreur :", error.message);
    } else {
      console.log("✅ Toutes les recettes supprimées.");
      console.log("\nRelance maintenant tes seeds :");
      console.log("  npm run seed");
      console.log("  npm run seed:lot2");
      console.log("  npm run seed:companion");
      console.log("  npm run seed:cook-expert");
    }
  },
);
