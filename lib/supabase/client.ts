/* =============================================================
   Kitchen Mix — Supabase Client (Browser)
   Utilise @supabase/ssr pour la gestion des cookies côté client.
   ============================================================= */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
