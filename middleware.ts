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
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response = NextResponse.next({ request });
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

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
  matcher: ["/admin/:path*", "/parametres/:path*", "/favoris/:path*"],
};
