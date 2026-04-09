/* =============================================================
   Kitchen Mix — Supabase Client (Server)
   Utilisé dans Server Components, Route Handlers, Middleware.
   ============================================================= */

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";

/**
 * Client standard (anon key + cookies utilisateur)
 * Utilisé dans Server Components et Route Handlers
 * Passe par les policies RLS normales
 */
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: {
              path?: string;
              maxAge?: number;
              domain?: string;
              secure?: boolean;
              httpOnly?: boolean;
              sameSite?: "lax" | "strict" | "none";
            };
          }[],
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component — cookies en lecture seule, c'est normal.
          }
        },
      },
    },
  );
}

/**
 * Client ADMIN avec service_role key
 * BYPASS complet de toutes les policies RLS
 * Utilisé UNIQUEMENT dans les Route Handlers pour les opérations admin
 *
 * IMPORTANT : Utilise createClient de @supabase/supabase-js (PAS @supabase/ssr)
 * car createServerClient injecte les cookies utilisateur qui interfèrent
 * avec le service role.
 */
export function createAdminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
