import { type NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: CookieOptions;
          }[],
        ) {
          // D'abord mettre à jour les cookies sur la request
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          // Créer UNE SEULE response avec la request mise à jour
          response = NextResponse.next({ request });
          // Puis setter TOUS les cookies sur cette unique response
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // getUser() valide le token côté serveur et le rafraîchit si expiré
  // → les cookies mis à jour sont renvoyés au navigateur via setAll
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/parametres")) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }
  if (!user && request.nextUrl.pathname.startsWith("/favoris")) {
    return NextResponse.redirect(new URL("/connexion", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap|robots|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
