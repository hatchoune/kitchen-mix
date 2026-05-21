import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

const env = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
for (const line of env.split("\n")) {
  const eq = line.indexOf("=");
  if (eq > 0)
    process.env[line.slice(0, eq).trim()] ??= line.slice(eq + 1).trim();
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const RENAMES = [
  { from: "sauté-poulet-legumes-cookeo", to: "saute-poulet-legumes-cookeo" },
  { from: "cake-marbré-kitchenaid", to: "cake-marbre-kitchenaid" },
  { from: "taboulé-libanais-cookexpert", to: "taboule-libanais-cookexpert" },
];

async function run() {
  for (const { from, to } of RENAMES) {
    const { error } = await supabase
      .from("recettes")
      .update({ slug: to })
      .eq("slug", from);
    console.log(error ? `❌ ${from} : ${error.message}` : `✅ ${from} → ${to}`);
  }
}

run().catch(console.error);
