import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

const supabase = createClient(
  'https://ivsuhfllmxyfquypgkzg.supabase.co',
  process.env.SUPABASE_SERVICE_KEY!
)

const OUTPUT_DIR = './images-recettes'

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} pour ${url}`))
        return
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); resolve() })
    }).on('error', reject)
  })
}

async function downloadAllImages() {
  // Créer le dossier de sortie
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR)

  const { data: recettes, error } = await supabase
    .from('recettes')
    .select('titre, image_url')
    .not('image_url', 'is', null)
    .order('titre')

  if (error) { console.error('Erreur Supabase:', error.message); return }

  console.log(`\n📦 ${recettes.length} images à télécharger...\n`)

  let ok = 0, fail = 0

  for (const r of recettes) {
    const url = r.image_url
    // Extrait le nom de fichier depuis l'URL
    const filename = path.basename(url)
    const dest = path.join(OUTPUT_DIR, filename)

    if (fs.existsSync(dest)) {
      console.log(`⏭️  Déjà présent : ${filename}`)
      ok++
      continue
    }

    try {
      await downloadFile(url, dest)
      console.log(`✅ ${filename}`)
      ok++
    } catch (e: any) {
      console.log(`❌ ERREUR ${r.titre} : ${e.message}`)
      fail++
    }
  }

  console.log(`\n🎉 Terminé : ${ok} OK, ${fail} erreurs`)
  console.log(`📁 Images dans : ${path.resolve(OUTPUT_DIR)}`)
}

downloadAllImages()
