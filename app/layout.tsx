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
import BackgroundWrapper from "@/components/layout/BackgroundWrapper";

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
  other: {
    "p:domain_verify": "9e3db6b632838b4b8ffcbd804903ae82",
  },
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

const chunkRecoveryScript = `
(function(){
  var reloaded = sessionStorage.getItem("kmx-chunk-reload");
  window.addEventListener("error", function(e) {
    if (
      e.message && (
        e.message.indexOf("Loading chunk") !== -1 ||
        e.message.indexOf("Loading CSS chunk") !== -1 ||
        e.message.indexOf("Failed to fetch") !== -1 ||
        e.message.indexOf("ChunkLoadError") !== -1
      ) && !reloaded
    ) {
      sessionStorage.setItem("kmx-chunk-reload", "1");
      window.location.reload();
    }
  });
  window.addEventListener("unhandledrejection", function(e) {
    var msg = e.reason && (e.reason.message || String(e.reason));
    if (
      msg && (
        msg.indexOf("Loading chunk") !== -1 ||
        msg.indexOf("Loading CSS chunk") !== -1 ||
        msg.indexOf("ChunkLoadError") !== -1
      ) && !reloaded
    ) {
      sessionStorage.setItem("kmx-chunk-reload", "1");
      window.location.reload();
    }
  });
  if (reloaded) sessionStorage.removeItem("kmx-chunk-reload");
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
        <script dangerouslySetInnerHTML={{ __html: chunkRecoveryScript }} />
      </head>
      <body className="min-h-dvh flex flex-col">
        <QueryProvider>
          <Providers>
            <Navbar />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <BackgroundWrapper>{children}</BackgroundWrapper>
            </main>
            <Footer />
            <BottomNav />
          </Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
