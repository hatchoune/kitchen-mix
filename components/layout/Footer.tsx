import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE_NAME } from "@/lib/constants";
import NewsletterForm from "@/components/ui/NewsletterForm";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-16 pb-20 md:pb-0 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-accent font-display font-bold text-lg"
            >
              <Logo className="w-10 h-auto" />
              {SITE_NAME}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Recettes au robot cuiseur multifonction, originales et gourmandes.
              Simulateur intégré, planificateur de repas.
            </p>
          </div>

          {/* Recettes */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
              Recettes
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/recettes?categorie=plat", label: "Plats" },
                { href: "/recettes?categorie=dessert", label: "Desserts" },
                { href: "/recettes?categorie=soupe", label: "Soupes" },
                {
                  href: "/recettes?categorie=boulangerie",
                  label: "Boulangerie",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/recherche", label: "Recherche" },
                { href: "/planificateur", label: "Planificateur" },
                { href: "/favoris", label: "Mes Favoris" },
                { href: "/profil", label: "Mon Profil" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Modèles */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
              Par appareil
            </h3>
            <ul className="space-y-2">
              {[
                { modele: "TM6", label: "Thermomix TM6" },
                { modele: "COMPANION", label: "Moulinex Companion" },
                { modele: "COOK_EXPERT", label: "Magimix Cook Expert" },
              ].map((item) => (
                <li key={item.modele}>
                  <Link
                    href={`/recettes?modele=${item.modele}`}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 pt-8 border-t border-border">
          <div className="max-w-md">
            <h3 className="font-display font-semibold text-sm uppercase tracking-wider mb-3 text-muted-foreground">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Recevez nos nouvelles recettes chaque semaine.
            </p>
            <NewsletterForm source="footer" compact />
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE_NAME}. Tous droits réservés.
          </p>
          <p className="text-xs text-muted-foreground">
            Kitchen Mix est un site indépendant, non affilié à Vorwerk,
            Thermomix®, Magimix, Moulinex ou toute autre marque. Les noms de
            marques sont utilisés uniquement à titre informatif.
          </p>
        </div>
      </div>
    </footer>
  );
}
