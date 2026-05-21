/* =============================================================
   Kitchen Mix — Récupération des image_url après seed:mega
   Usage : npx tsx scripts/recover-images.ts
   Ce script :
     1. Liste tous les fichiers dans le bucket "recettes-images"
     2. Affiche toutes les recettes dont image_url = null
     3. Te permet de réassocier manuellement ou via un mapping
   ============================================================= */

import { readFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

// Charger .env.local
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, serviceRoleKey);

async function recover() {
  console.log("\n🔍 ÉTAPE 1 — Listing du bucket recettes-images...\n");

  // Lister tous les fichiers dans le bucket (récursif sur les dossiers user_id)
  const { data: folders, error: foldersError } = await supabase.storage
    .from("recettes-images")
    .list("", { limit: 1000 });

  if (foldersError) {
    console.error("❌ Impossible de lister le bucket :", foldersError.message);
    process.exit(1);
  }

  console.log(`📁 ${folders?.length ?? 0} dossier(s) trouvé(s) dans le bucket :\n`);

  const allFiles: { name: string; publicUrl: string }[] = [];

  // Pour chaque dossier (= user_id), lister les fichiers
  for (const folder of folders ?? []) {
    if (folder.id === null) {
      // C'est un dossier
      const { data: files, error: filesError } = await supabase.storage
        .from("recettes-images")
        .list(folder.name, { limit: 1000 });

      if (filesError) {
        console.warn(`  ⚠️  Erreur sur le dossier ${folder.name} : ${filesError.message}`);
        continue;
      }

      for (const file of files ?? []) {
        const path = `${folder.name}/${file.name}`;
        const { data: { publicUrl } } = supabase.storage
          .from("recettes-images")
          .getPublicUrl(path);
        allFiles.push({ name: path, publicUrl });
      }
    } else {
      // Fichier à la racine
      const { data: { publicUrl } } = supabase.storage
        .from("recettes-images")
        .getPublicUrl(folder.name);
      allFiles.push({ name: folder.name, publicUrl });
    }
  }

  console.log(`✅ ${allFiles.length} image(s) trouvée(s) dans le bucket :\n`);
  allFiles.forEach((f, i) => {
    console.log(`  [${i + 1}] ${f.name}`);
    console.log(`       ${f.publicUrl}\n`);
  });

  // ─────────────────────────────────────────────────────────
  console.log("\n🔍 ÉTAPE 2 — Recettes sans image en base...\n");

  const { data: recettes, error: recettesError } = await supabase
    .from("recettes")
    .select("id, slug, titre, image_url")
    .is("image_url", null)
    .order("titre");

  if (recettesError) {
    console.error("❌ Erreur lecture recettes :", recettesError.message);
    process.exit(1);
  }

  console.log(`⚠️  ${recettes?.length ?? 0} recette(s) avec image_url = null :\n`);
  recettes?.forEach((r, i) => {
    console.log(`  [${i + 1}] slug: ${r.slug}`);
    console.log(`       titre: ${r.titre}`);
    console.log(`       id: ${r.id}\n`);
  });

  // ─────────────────────────────────────────────────────────
  console.log("\n📋 ÉTAPE 3 — Instructions de réassociation :\n");
  console.log("  Option A (rapide) : Ouvre le Dashboard Supabase → Table Editor → recettes");
  console.log("                      Édite manuellement la colonne image_url pour chaque recette.");
  console.log("");
  console.log("  Option B (script) : Modifie le tableau MAPPING ci-dessous dans ce fichier,");
  console.log("                      puis relance avec : npx tsx scripts/recover-images.ts --apply");
  console.log("");
  console.log("  Option C (nucléaire) : Si tu as les images par slug (npm run image),");
  console.log("                         utilise le script rebuild-image-urls.ts ci-joint.");

  // ─────────────────────────────────────────────────────────
  // Option B : mapping manuel slug → URL
  // Remplir ce tableau avec les associations que tu retrouves
  const MAPPING: { slug: string; imageUrl: string }[] = [
    // Exemple :
    // { slug: "riz-pilaf-cookeo", imageUrl: "https://ivsuhfllmxyfquypgkzg.supabase.co/storage/v1/object/public/recettes-images/abc123/1714000000000.jpg" },
  ];

  if (process.argv.includes("--apply") && MAPPING.length > 0) {
    console.log(`\n🔧 Application du mapping (${MAPPING.length} recettes)...\n`);

    for (const { slug, imageUrl } of MAPPING) {
      const { error } = await supabase
        .from("recettes")
        .update({ image_url: imageUrl })
        .eq("slug", slug);

      if (error) {
        console.log(`  ❌ ${slug} : ${error.message}`);
      } else {
        console.log(`  ✅ ${slug} → image réassociée`);
      }
    }
  } else if (process.argv.includes("--apply")) {
    console.log("\n⚠️  --apply activé mais MAPPING vide. Remplir d'abord le tableau MAPPING dans le script.");
  }
}

recover().catch(console.error);
