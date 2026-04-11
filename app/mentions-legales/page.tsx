// app/mentions-legales/page.tsx
import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  title: "Mentions légales & CGU",
  description: `Mentions légales, conditions générales d'utilisation et politique de confidentialité de ${SITE_NAME}.`,
  path: "/mentions-legales",
  noIndex: false, // On indexe cette page (utile pour la transparence)
});

export default function MentionsLegalesPage() {
  const lastUpdate = "10 avril 2026";

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10 animate-fade-in">
      <header className="space-y-2">
        <h1 className="font-display font-bold text-4xl">
          Mentions légales & CGU
        </h1>
        <p className="text-muted-foreground">
          Dernière mise à jour : {lastUpdate}
        </p>
      </header>

      {/* Section 1 : Éditeur du site */}
      <Section title="1. Éditeur du site">
        <p>
          <strong>{SITE_NAME}</strong> est édité par :
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Nom du responsable :</strong> Khaled LARIBI
          </li>
          <li>
            <strong>Adresse :</strong> [Votre adresse complète]
          </li>
          <li>
            <strong>Email :</strong>{" "}
            <a
              href="mailto:laribi.khaled69150@gmail.com"
              className="text-accent hover:underline"
            >
              laribi.khaled69150@gmail.com
            </a>
          </li>
          <li>
            <strong>Numéro de téléphone :</strong> [Votre numéro]
          </li>
          <li>
            <strong>Numéro SIRET :</strong> [Votre SIRET si applicable]
          </li>
        </ul>
      </Section>

      {/* Section 2 : Hébergeur */}
      <Section title="2. Hébergement">
        <p>
          Le site <strong>{SITE_NAME}</strong> est hébergé par :
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Vercel Inc.</strong>
          </li>
          <li>340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
          <li>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              vercel.com
            </a>
          </li>
        </ul>
      </Section>

      {/* Section 3 : Propriété intellectuelle */}
      <Section title="3. Propriété intellectuelle">
        <p>
          L&apos;ensemble du code source, du design, des logos et des contenus
          éditoriaux (hors recettes soumises par les utilisateurs) est la
          propriété exclusive de l&apos;éditeur et est protégé par les lois
          françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p className="mt-2">
          Toute reproduction, distribution ou modification, même partielle, est
          strictement interdite sans autorisation écrite préalable.
        </p>
        <p className="mt-2">
          Les recettes soumises par les utilisateurs restent leur propriété,
          mais leur publication sur {SITE_NAME} confère au site une licence non
          exclusive de diffusion.
        </p>
      </Section>

      {/* Section 4 : Conditions Générales d'Utilisation */}
      <Section title="4. Conditions Générales d'Utilisation (CGU)">
        <p>
          L&apos;utilisation du site {SITE_NAME} implique l&apos;acceptation
          pleine et entière des conditions générales d&apos;utilisation décrites
          ci-dessous.
        </p>

        <SubSection title="4.1 Accès au site">
          Le site est accessible gratuitement à tout utilisateur disposant
          d&apos;un accès à Internet. Tous les coûts afférents à l&apos;accès au
          site (matériel, logiciel, connexion) sont à la charge exclusive de
          l&apos;utilisateur.
        </SubSection>

        <SubSection title="4.2 Compte utilisateur">
          La création d&apos;un compte est nécessaire pour accéder à certaines
          fonctionnalités (favoris, commentaires, soumission de recettes).
          L&apos;utilisateur est responsable de la confidentialité de ses
          identifiants et s&apos;engage à fournir des informations exactes.
        </SubSection>

        <SubSection title="4.3 Contenu utilisateur">
          En soumettant une recette ou un commentaire, l&apos;utilisateur
          garantit qu&apos;il détient les droits nécessaires et autorise{" "}
          {SITE_NAME} à publier, modifier et diffuser ce contenu sur le site et
          ses réseaux sociaux. {SITE_NAME} se réserve le droit de modérer ou de
          refuser tout contenu sans préavis.
        </SubSection>

        <SubSection title="4.4 Limitation de responsabilité">
          Les recettes et conseils présents sur {SITE_NAME} sont fournis à titre
          informatif. L&apos;utilisateur est seul responsable de
          l&apos;utilisation qu&apos;il en fait, notamment en ce qui concerne
          les allergies, les régimes spécifiques ou l&apos;utilisation des
          robots de cuisine. {SITE_NAME} ne pourra être tenu responsable des
          dommages directs ou indirects résultant de l&apos;utilisation du site.
        </SubSection>

        <SubSection title="4.5 Liens hypertextes">
          Le site peut contenir des liens vers d&apos;autres sites web.{" "}
          {SITE_NAME} n&apos;exerce aucun contrôle sur ces sites et décline
          toute responsabilité quant à leur contenu.
        </SubSection>
      </Section>

      {/* Section 5 : Données personnelles */}
      <Section title="5. Données personnelles et cookies">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD)
          et à la loi Informatique et Libertés, vous disposez d&apos;un droit
          d&apos;accès, de rectification et de suppression de vos données
          personnelles. Pour l&apos;exercer, contactez-nous à l&apos;adresse
          email indiquée ci-dessus.
        </p>
        <p className="mt-2">
          Le site utilise des cookies strictement nécessaires à son
          fonctionnement (authentification, préférences de thème). Aucun cookie
          publicitaire n&apos;est déposé sans votre consentement.
        </p>
      </Section>

      {/* Section 6 : Droit applicable */}
      <Section title="6. Droit applicable">
        <p>
          Les présentes mentions légales et CGU sont régies par le droit
          français. En cas de litige, les tribunaux français seront seuls
          compétents.
        </p>
      </Section>
    </div>
  );
}

// Composants auxiliaires pour une mise en page cohérente
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card p-6 space-y-3">
      <h2 className="font-display font-bold text-xl text-accent">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-2">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}
