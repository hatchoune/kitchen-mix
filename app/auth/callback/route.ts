import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/profil";

  // ═══ GESTION DES ERREURS OAuth (ex: refus d'accès, email déjà utilisé) ═══
  const oauthError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (oauthError) {
    console.error("OAuth error:", oauthError, errorDescription);
    const errorMessage =
      oauthError === "access_denied"
        ? "Vous avez refusé l'accès à votre compte Google."
        : errorDescription || oauthError;
    return NextResponse.redirect(
      `${origin}/connexion?error=${encodeURIComponent(errorMessage)}`,
    );
  }

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
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
              options?: CookieOptions;
            }[],
          ) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch (error) {
              // The `setAll` method was called from a Server Component.
              // Ignoré de manière silencieuse, c'est géré par le middleware.
            }
          },
        },
      },
    );

    // Échange le code Google contre une vraie session Supabase
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Si l'échange échoue (ex: email déjà lié à un compte existant)
    console.error("Exchange error:", error);
    const friendlyMessage = error.message.includes("already registered")
      ? "Cet email est déjà associé à un compte. Connectez-vous plutôt."
      : "Erreur lors de la connexion avec Google.";

    return NextResponse.redirect(
      `${origin}/connexion?error=${encodeURIComponent(friendlyMessage)}`,
    );
  }

  // En cas d'absence de code et d'erreur (annulation)
  return NextResponse.redirect(
    `${origin}/connexion?error=${encodeURIComponent("Authentification annulée.")}`,
  );
}
