/* =============================================================
   Kitchen Mix — Upload automatique d'images de recettes
   
   Usage : npm run images
   
   1. Place tes images dans le dossier ./images-recettes/
      Nommage libre : "soupe-carotte.jpg", "risotto.png", etc.
      Le script fait un fuzzy match avec les slugs en BDD.
   
   2. Le script :
      - Compresse chaque image en WebP (max 400KB, 1200px)
      - L'uploade dans le bucket Supabase "recettes-images"
      - Met à jour la colonne image_url de la recette matchée
   
   3. À la fin, il affiche un résumé des matchs et erreurs.
   
   Prérequis :
   - npm install sharp (si pas déjà installé)
   - .env.local avec SUPABASE_SERVICE_ROLE_KEY
   - Bucket "recettes-images" créé dans Supabase Storage (public)
   ============================================================= */

import { readFileSync, readdirSync, statSync } from "fs";
import { resolve, basename, extname } from "path";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { generateSlug } from "../lib/utils";

// ─── Config ──────────────────────────────────────────────────

const IMAGES_DIR = resolve(process.cwd(), "images-recettes");
const BUCKET = "recettes-images";
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 80; // WebP quality (1-100)
const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".bmp",
  ".tiff",
];

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
  console.error("❌ Variables manquantes dans .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

// ─── Fuzzy matching ──────────────────────────────────────────

/**
 * Normalise un nom de fichier en tokens comparables
 * "Soupe-Carotte_Gingembre (2).jpg" → ["soupe", "carotte", "gingembre"]
 */
function tokenize(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/\.[^.]+$/, "") // retirer extension
    .replace(/[^a-zàâäéèêëïîôùûüÿçœæ0-9]/g, " ") // caractères spéciaux → espaces
    .split(/\s+/)
    .filter((t) => t.length > 2); // ignorer les mots courts (le, de, au...)
}

/**
 * Score de similarité entre un nom de fichier et un slug
 * Retourne un nombre entre 0 (aucun match) et 1 (parfait)
 */
function matchScore(fileTokens: string[], slug: string): number {
  const slugTokens = slug.split("-").filter((t) => t.length > 2);
  if (slugTokens.length === 0) return 0;

  let matches = 0;
  for (const ft of fileTokens) {
    for (const st of slugTokens) {
      // Match exact
      if (ft === st) {
        matches += 1;
        break;
      }
      // Match partiel (le token du fichier contient le token du slug ou vice versa)
      if (
        ft.length >= 4 &&
        st.length >= 4 &&
        (ft.includes(st) || st.includes(ft))
      ) {
        matches += 0.7;
        break;
      }
      // Match début commun (≥4 chars)
      if (
        ft.length >= 4 &&
        st.length >= 4 &&
        ft.slice(0, 4) === st.slice(0, 4)
      ) {
        matches += 0.5;
        break;
      }
    }
  }

  // Score = proportion de tokens du slug qui ont matché, pondéré par le nombre de tokens fichier
  const coverage = matches / slugTokens.length;
  // Bonus si le nombre de tokens est similaire (pénalise les noms trop courts)
  const lengthBonus =
    Math.min(fileTokens.length, slugTokens.length) /
    Math.max(fileTokens.length, slugTokens.length);

  return coverage * 0.8 + lengthBonus * 0.2;
}

/**
 * Trouve le meilleur slug pour un nom de fichier
 */
function findBestMatch(
  filename: string,
  slugs: string[],
): { slug: string; score: number } | null {
  const tokens = tokenize(filename);
  if (tokens.length === 0) return null;

  let bestSlug = "";
  let bestScore = 0;

  for (const slug of slugs) {
    const score = matchScore(tokens, slug);
    if (score > bestScore) {
      bestScore = score;
      bestSlug = slug;
    }
  }

  // Seuil minimum : au moins 30% de match
  if (bestScore < 0.3) return null;
  return { slug: bestSlug, score: bestScore };
}

// ─── Compression ─────────────────────────────────────────────

async function compressImage(filePath: string): Promise<Buffer> {
  const buffer = await sharp(filePath)
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY })
    .toBuffer();

  return buffer;
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log("\n🖼️  Upload automatique d'images de recettes\n");

  // 1. Lister les images du dossier
  let files: string[];
  try {
    files = readdirSync(IMAGES_DIR).filter((f) => {
      const ext = extname(f).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });
  } catch {
    console.error(`❌ Dossier "${IMAGES_DIR}" introuvable.`);
    console.error(`   Créez-le et placez-y vos images :`);
    console.error(`   mkdir images-recettes`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error(`❌ Aucune image trouvée dans ${IMAGES_DIR}`);
    process.exit(1);
  }

  console.log(`📁 ${files.length} images trouvées dans images-recettes/\n`);

  // 2. Récupérer tous les slugs de recettes sans image
  const { data: recettes, error: dbError } = await supabase
    .from("recettes")
    .select("slug, image_url")
    .order("slug");

  if (dbError || !recettes) {
    console.error("❌ Erreur BDD:", dbError?.message);
    process.exit(1);
  }

  // Slugs sans image en priorité, mais permettre l'écrasement
  const allSlugs = recettes.map((r) => r.slug);
  const slugsWithoutImage = recettes
    .filter((r) => !r.image_url)
    .map((r) => r.slug);

  console.log(
    `🍽️  ${allSlugs.length} recettes en BDD (${slugsWithoutImage.length} sans image)\n`,
  );

  // 3. Matcher, compresser, uploader
  const results: {
    file: string;
    slug: string;
    score: number;
    status: string;
  }[] = [];
  const usedSlugs = new Set<string>();

  // D'abord, construire tous les matchs
  const matches: { file: string; slug: string; score: number }[] = [];

  for (const file of files) {
    const match = findBestMatch(file, allSlugs);
    if (match && !usedSlugs.has(match.slug)) {
      matches.push({ file, ...match });
      usedSlugs.add(match.slug);
    } else {
      results.push({
        file,
        slug: "",
        score: 0,
        status: match ? "⚠️  Slug déjà utilisé" : "❌ Pas de match",
      });
    }
  }

  // Trier par score descendant pour traiter les meilleurs matchs en premier
  matches.sort((a, b) => b.score - a.score);

  // Afficher les matchs pour confirmation
  console.log("═══ Matching ═══\n");
  for (const m of matches) {
    const confidence = m.score >= 0.7 ? "🟢" : m.score >= 0.5 ? "🟡" : "🔴";
    console.log(
      `  ${confidence} ${m.file.padEnd(45)} → ${m.slug} (${(m.score * 100).toFixed(0)}%)`,
    );
  }

  if (results.filter((r) => r.status.includes("❌")).length > 0) {
    console.log("\n  Non matchées :");
    for (const r of results.filter((r) => r.status.includes("❌"))) {
      console.log(`  ${r.status} ${r.file}`);
    }
  }

  console.log(
    `\n📊 ${matches.length} matchées, ${results.filter((r) => !r.slug).length} non matchées\n`,
  );

  // Demander confirmation
  const readline = await import("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = await new Promise<string>((resolve) => {
    rl.question("🚀 Lancer la compression et l'upload ? (o/N) ", resolve);
  });
  rl.close();

  if (answer.toLowerCase() !== "o" && answer.toLowerCase() !== "oui") {
    console.log("Annulé.");
    process.exit(0);
  }

  console.log("\n═══ Upload ═══\n");

  let uploaded = 0;
  let failed = 0;

  for (const m of matches) {
    const filePath = resolve(IMAGES_DIR, m.file);
    process.stdout.write(`  → ${m.slug}...`);

    try {
      // Compresser
      const compressed = await compressImage(filePath);
      const sizeKB = (compressed.length / 1024).toFixed(0);

      // Upload vers Supabase Storage
      const storagePath = `${generateSlug(m.slug)}.webp`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, compressed, {
          contentType: "image/webp",
          upsert: true, // écraser si existe
        });

      if (uploadError) throw new Error(uploadError.message);

      // Récupérer l'URL publique
      const {
        data: { publicUrl },
      } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);

      // Mettre à jour la BDD
      const { error: updateError } = await supabase
        .from("recettes")
        .update({ image_url: publicUrl })
        .eq("slug", m.slug);

      if (updateError) throw new Error(updateError.message);

      console.log(` ✅ (${sizeKB}KB)`);
      uploaded++;
    } catch (err) {
      console.log(` ❌ ${err instanceof Error ? err.message : "Erreur"}`);
      failed++;
    }
  }

  console.log(`\n🎉 Terminé ! ${uploaded} uploadées, ${failed} erreurs.\n`);
}

main().catch(console.error);
