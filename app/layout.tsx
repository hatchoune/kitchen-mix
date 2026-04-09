// KITCHENMIX-2026-04-08-PROOF-OWNERSHIP
import type { Metadata, Viewport } from "next";
import { getDefaultMetadata } from "@/lib/seo";
import Providers from "@/components/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";
import { Space_Grotesk, Inter } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  ...getDefaultMetadata(),
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#141414" },
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
  ],
};

/**
 * Script anti-FOUC : applique le thème AVANT le premier paint.
 * Exécuté dans <head> en blocking pour éviter le flash.
 */
const antiFlashScript = `
(function(){
  try {
    var t = localStorage.getItem("kmx-theme");
    if (t && ["dark","light","grey"].indexOf(t) !== -1) {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      data-theme="dark"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <QueryProvider>
          <Providers>
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </main>
            <Footer />
            <BottomNav />
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
