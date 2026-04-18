/* =============================================================
   Kitchen Mix — Upload d'UNE seule image de recette
   ============================================================= */

import { readFileSync, readdirSync, existsSync } from "fs";
import { resolve, extname, join } from "path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";

const IMAGES_DIR = resolve(process.cwd(), "images-recettes");
const BUCKET = "recettes-images";
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 80;
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
];

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Variables manquantes dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// Arguments CLI
const args = process.argv.slice(2);

function getArg(name: string): string | null {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const targetSlug = getArg("--slug");
const targetFile = getArg("--file");

if (!targetSlug) {
  console.error("❌ Slug manquant.");
  console.error(
    "   Usage : npm run images:one -- --slug <slug> [--file images-recettes/photo.jpg]",
  );
  process.exit(1);
}

// Garantie que targetSlug est une string
const slug: string = targetSlug;

// Trouver le fichier image
function findImageFile(slug: string, explicitFile: string | null): string {
  if (explicitFile) {
    const absPath = resolve(process.cwd(), explicitFile);
    if (!existsSync(absPath)) {
      console.error(`❌ Fichier introuvable : ${absPath}`);
      process.exit(1);
    }
    return absPath;
  }

  if (!existsSync(IMAGES_DIR)) {
    console.error(`❌ Dossier images-recettes/ introuvable.`);
    console.error(
      `   Créez-le et placez-y votre image : mkdir images-recettes`,
    );
    process.exit(1);
  }

  const files = readdirSync(IMAGES_DIR);
  const match = files.find((f) => {
    const ext = extname(f).toLowerCase();
    if (!IMAGE_EXTENSIONS.includes(ext)) return false;
    const nameWithoutExt = f.slice(0, f.length - ext.length);
    return nameWithoutExt === slug;
  });

  if (!match) {
    console.error(
      `❌ Aucun fichier nommé "${slug}.[jpg|png|webp|...]" trouvé dans images-recettes/`,
    );
    console.error(`\n   Solutions :`);
    console.error(`   1. Renommez votre fichier : ${slug}.jpg`);
    console.error(
      `   2. Ou précisez le chemin : npm run images:one -- --slug ${slug} --file images-recettes/votre-photo.jpg`,
    );
    process.exit(1);
  }

  return join(IMAGES_DIR, match);
}

async function main() {
  console.log(`\n🖼️  Upload image — slug : "${slug}"\n`);

  // 1. Vérifier que la recette existe
  const { data: recette, error: dbError } = await supabase
    .from("recettes")
    .select("slug, titre, image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (dbError) {
    console.error(`❌ Erreur BDD : ${dbError.message}`);
    process.exit(1);
  }

  if (!recette) {
    console.error(
      `❌ Aucune recette trouvée avec le slug "${slug}" en base de données.`,
    );
    console.error(
      `   Vérifiez le slug ou insérez d'abord la recette avec : npm run seed:one -- --slug ${slug}`,
    );
    process.exit(1);
  }

  console.log(`✅ Recette trouvée : "${recette.titre}"`);

  if (recette.image_url) {
    console.log(`   ⚠️  Une image existe déjà : ${recette.image_url}`);
    console.log(`   Elle sera remplacée.\n`);
  }

  // 2. Trouver le fichier
  const filePath = findImageFile(slug, targetFile);
  console.log(`📁 Fichier source : ${filePath}`);

  // 3. Compresser en WebP
  console.log(`⚙️  Compression WebP en cours...`);
  const compressed = await sharp(filePath)
    .resize(MAX_WIDTH, MAX_HEIGHT, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toBuffer();

  const originalSize = Math.round(readFileSync(filePath).length / 1024);
  const compressedSize = Math.round(compressed.length / 1024);
  console.log(`   ${originalSize} KB → ${compressedSize} KB WebP`);

  // 4. Uploader dans Supabase
  const fileName = `${slug}.webp`;
  console.log(`☁️  Upload dans le bucket "${BUCKET}"...`);

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, compressed, {
      contentType: "image/webp",
      upsert: true,
    });

  if (uploadError) {
    console.error(`❌ Erreur upload : ${uploadError.message}`);
    process.exit(1);
  }

  // 5. Récupérer l'URL publique
  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName);
  const publicUrl = urlData.publicUrl;
  console.log(`   URL publique : ${publicUrl}`);

  // 6. Mettre à jour image_url en BDD
  console.log(`💾 Mise à jour de image_url en base de données...`);
  const { error: updateError } = await supabase
    .from("recettes")
    .update({ image_url: publicUrl })
    .eq("slug", slug);

  if (updateError) {
    console.error(`❌ Erreur mise à jour BDD : ${updateError.message}`);
    process.exit(1);
  }

  console.log(
    `\n🎉 Image uploadée et liée avec succès à "${recette.titre}" !\n`,
  );
}

main().catch(console.error);
