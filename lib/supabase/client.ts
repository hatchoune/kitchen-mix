/* =============================================================
   Kitchen Mix — Supabase Client (Browser)
   Utilise @supabase/ssr pour la gestion des cookies côté client.
   ============================================================= */

import { createBrowserClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/** Client avec auth (pour les opérations utilisateur) */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

/**
 * Client SANS auth — pour les requêtes publiques (recettes, etc.)
 * Ne partage PAS le lock GoTrue → ne peut jamais être bloqué par l'auth
 */
let anonClient: ReturnType<typeof createSupabaseClient> | null = null;

export function createAnonClient() {
  if (typeof window === "undefined") {
    return createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          storageKey: "kmx-anon",
          detectSessionInUrl: false,
        },
      },
    );
  }
  if (!anonClient) {
    anonClient = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          storageKey: "kmx-anon",
          detectSessionInUrl: false,
        },
      },
    );
  }
  return anonClient;
}
