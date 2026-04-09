# Kitchen Mix 🍳

**Recettes Thermomix premium** — [mcmalnus.com](https://mcmalnus.com)

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **Supabase** (PostgreSQL, Auth, Storage, Realtime)
- **Tailwind CSS** (3 thèmes : Dark/Light/Grey)
- **TypeScript** strict
- **Vercel** (déploiement)

## Getting Started

```bash
# 1. Cloner
git clone https://github.com/GaunterOxDimm/kitchen-mix-webapp-v2.git
cd kitchen-mix-webapp-v2

# 2. Installer
npm install

# 3. Configurer
cp .env.local.example .env.local
# Remplir les variables Supabase

# 4. Exécuter le SQL schema dans Supabase SQL Editor

# 5. Seed (optionnel)
npm run seed

# 6. Lancer
npm run dev
```

## Structure

```
app/              → Pages & API routes (App Router)
components/       → Composants réutilisables
  layout/         → Navbar, Footer, BottomNav
  ui/             → ThemeToggle, SearchBar, StarRating, etc.
  recettes/       → RecetteCard, SimulateurThermomix, etc.
lib/              → Supabase clients, utils, constants, SEO
hooks/            → useTheme, useFavoris, useAuth, etc.
types/            → Types TypeScript centralisés
scripts/          → Seed data
```

## Thèmes

- **Dark** (défaut) : bg `#141414`, accent `#F5A623`
- **Light** : bg `#FAFAF7`, accent `#D4891E`
- **Grey** : bg `#2A2A2A`, accent `#F5A623`

## License

Propriétaire — Tous droits réservés.
