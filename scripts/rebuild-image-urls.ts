/* =============================================================
   Kitchen Mix — Auto-rebuild image_url depuis les noms de fichiers
   Usage : npx tsx scripts/rebuild-image-urls.ts
   
   Principe : les fichiers nommés "{slug}.webp" dans le bucket
   sont directement associés au slug en base → update automatique.
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

const BUCKET = "recettes-images";

async function rebuildImageUrls() {
  console.log("\n🔧 Rebuild automatique des image_url\n");

  // ── 1. Lister tous les fichiers du bucket (racine uniquement = fichiers slug-nommés)
  const { data: rootFiles, error: listError } = await supabase.storage
    .from(BUCKET)
    .list("", { limit: 1000 });

  if (listError) {
    console.error("❌ Erreur listing bucket :", listError.message);
    process.exit(1);
  }

  // Ne garder que les fichiers à la racine (pas les dossiers = id est null pour les dossiers)
  // Les fichiers ont un id non-null, les dossiers ont id = null
  const slugFiles = (rootFiles ?? []).filter(f => f.id !== null);

  console.log(`📦 ${slugFiles.length} fichier(s) slug-nommés trouvés à la racine du bucket\n`);

  if (slugFiles.length === 0) {
    console.log("⚠️  Aucun fichier trouvé à la racine. Vérifier le bucket.");
    process.exit(1);
  }

  // ── 2. Construire le mapping slug → publicUrl
  const slugToUrl = new Map<string, string>();

  for (const file of slugFiles) {
    // Extraire le slug = nom du fichier sans extension
    const slug = file.name.replace(/\.(webp|jpg|jpeg|png|gif|avif)$/i, "");
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(file.name);
    slugToUrl.set(slug, publicUrl);
  }

  console.log(`🗂️  ${slugToUrl.size} mappings slug→URL construits\n`);

  // ── 3. Récupérer toutes les recettes avec image_url = null
  const { data: recettes, error: fetchError } = await supabase
    .from("recettes")
    .select("id, slug")
    .is("image_url", null);

  if (fetchError) {
    console.error("❌ Erreur lecture recettes :", fetchError.message);
    process.exit(1);
  }

  console.log(`📋 ${recettes?.length ?? 0} recette(s) sans image à traiter\n`);

  // ── 4. Faire les updates en batch
  let updated = 0;
  let notFound = 0;
  const notFoundSlugs: string[] = [];

  // Grouper les updates par lots de 50 pour ne pas saturer l'API
  const toUpdate = (recettes ?? [])
    .map(r => ({ id: r.id, slug: r.slug, url: slugToUrl.get(r.slug) }))
    .filter(r => r.url !== undefined);

  const noMatch = (recettes ?? [])
    .filter(r => !slugToUrl.has(r.slug));

  console.log(`✅ ${toUpdate.length} correspondances trouvées`);
  console.log(`❓ ${noMatch.length} recette(s) sans fichier correspondant\n`);

  // Update par lots de 50
  const BATCH_SIZE = 50;
  for (let i = 0; i < toUpdate.length; i += BATCH_SIZE) {
    const batch = toUpdate.slice(i, i + BATCH_SIZE);
    
    // Update chaque item du batch (Supabase ne supporte pas le bulk update conditionnel natif)
    const promises = batch.map(({ id, slug, url }) =>
      supabase
        .from("recettes")
        .update({ image_url: url })
        .eq("id", id)
        .then(({ error }) => {
          if (error) {
            console.log(`  ❌ ${slug} : ${error.message}`);
            return false;
          }
          return true;
        })
    );

    const results = await Promise.all(promises);
    const batchOk = results.filter(Boolean).length;
    updated += batchOk;

    const progress = Math.min(i + BATCH_SIZE, toUpdate.length);
    process.stdout.write(`\r  Progression : ${progress}/${toUpdate.length}...`);
  }

  console.log(`\n\n══════════════════════════════════════`);
  console.log(`✅ ${updated} image(s) réassociées avec succès`);
  
  if (noMatch.length > 0) {
    console.log(`\n❓ ${noMatch.length} recette(s) sans fichier dans le bucket :`);
    noMatch.forEach(r => console.log(`   - ${r.slug}`));
    console.log(`\n   → Ces recettes n'avaient probablement pas d'image avant le seed:mega.`);
    console.log(`   → Ou le fichier est dans un sous-dossier (upload user) — voir recover-images.ts`);
  }

  console.log(`══════════════════════════════════════\n`);
}

rebuildImageUrls().catch(console.error);
