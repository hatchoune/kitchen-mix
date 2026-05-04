import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  turbopack: {
    root: __dirname,
  },
  images: {
    // ─── Désactive l'optimisation Vercel ────────────────────────
    // Les images sont déjà compressées en WebP 1200×800 q80 par
    // scripts/upload-images.ts (sharp) avant upload sur Supabase.
    // Inutile de payer une 2e couche d'optim côté Vercel et de
    // consommer le quota de 5000 transformations/mois du free tier.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/recettes/:slug",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      ],
    },
    {
      source: "/_next/image(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=0, must-revalidate",
        },
      ],
    },
  ],
};

export default nextConfig;
