export const metadata = {
  title: "Politique de confidentialité | Kitchenmix",
  description:
    "Comment Kitchenmix collecte, utilise et protège vos données personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* En-tête */}
      <div className="border-b border-border pb-6">
        <h1 className="font-display font-bold text-4xl sm:text-5xl italic text-foreground uppercase tracking-tight">
          Politique de confidentialité
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>

      {/* Contenu */}
      <div className="prose prose-sm sm:prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            1. Introduction
          </h2>
          <p>
            Kitchenmix (ci-après "nous", "notre", "le Site") s'engage à protéger
            la vie privée de ses utilisateurs. Cette politique explique comment
            nous collectons, utilisons et protégeons vos données personnelles
            lorsque vous utilisez notre plateforme de partage de recettes et de
            planification de repas.
          </p>
          <p>
            En utilisant Kitchenmix, vous acceptez les pratiques décrites dans
            cette politique. Si vous n'acceptez pas ces conditions, veuillez ne
            pas utiliser nos services.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            2. Données collectées
          </h2>
          <p>Nous collectons les informations suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Informations de compte :</strong> adresse e-mail,
              pseudonyme, avatar (optionnel), préférences de thème.
            </li>
            <li>
              <strong>Contenu généré :</strong> recettes que vous soumettez,
              commentaires, plannings sauvegardés.
            </li>
            <li>
              <strong>Données d'utilisation :</strong> pages visitées, actions
              effectuées, interactions avec les recettes (favoris, likes).
            </li>
            <li>
              <strong>Données techniques :</strong> adresse IP, type de
              navigateur, système d'exploitation, identifiants de session.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-2">
            Nous utilisons Supabase pour l'authentification et le stockage
            sécurisé des données.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            3. Utilisation des données
          </h2>
          <p>Vos données sont utilisées pour :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Fournir et améliorer nos services (affichage des recettes,
              planificateur).
            </li>
            <li>Personnaliser votre expérience (thème, suggestions).</li>
            <li>
              Communiquer avec vous (notifications de modération, réponses aux
              commentaires).
            </li>
            <li>Assurer la sécurité et prévenir les abus.</li>
            <li>Respecter nos obligations légales.</li>
          </ul>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            4. Partage des données
          </h2>
          <p>
            Nous ne vendons jamais vos données personnelles. Nous pouvons les
            partager dans les cas limités suivants :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Fournisseurs de services :</strong> Supabase
              (hébergement/base de données), Google (authentification OAuth).
            </li>
            <li>
              <strong>Obligations légales :</strong> si la loi l'exige ou pour
              protéger nos droits.
            </li>
            <li>
              <strong>Contenu public :</strong> les recettes que vous publiez,
              votre pseudonyme et votre avatar sont visibles par tous les
              utilisateurs.
            </li>
          </ul>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            5. Cookies et technologies similaires
          </h2>
          <p>
            Kitchenmix utilise des cookies essentiels pour maintenir votre
            session connectée et mémoriser vos préférences (thème). Nous
            n'utilisons pas de cookies publicitaires ou de traçage tiers.
          </p>
          <p>
            Vous pouvez configurer votre navigateur pour refuser les cookies,
            mais cela peut affecter le fonctionnement du Site.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            6. Sécurité des données
          </h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            pour protéger vos données contre tout accès non autorisé,
            modification ou destruction. L'authentification est gérée par
            Supabase avec des protocoles sécurisés (OAuth 2.0, JWT).
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            7. Vos droits
          </h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accéder à vos données personnelles.</li>
            <li>Rectifier ou supprimer vos données.</li>
            <li>Vous opposer au traitement ou le limiter.</li>
            <li>
              Récupérer vos données dans un format structuré (portabilité).
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à :{" "}
            <a
              href="mailto:contact@kitchenmix.com"
              className="text-accent hover:underline"
            >
              contact@kitchenmix.com
            </a>
            . Vous pouvez également supprimer votre compte directement depuis
            les paramètres de votre profil.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            8. Conservation des données
          </h2>
          <p>
            Nous conservons vos données tant que votre compte est actif. En cas
            de suppression de compte, toutes vos données personnelles sont
            supprimées de nos systèmes dans un délai de 30 jours, à l'exception
            des informations nécessaires au respect d'obligations légales.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            9. Modifications
          </h2>
          <p>
            Nous pouvons mettre à jour cette politique occasionnellement. Nous
            vous informerons de tout changement significatif par e-mail ou via
            une notification sur le Site.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            10. Contact
          </h2>
          <p>
            Pour toute question relative à cette politique, écrivez-nous à :{" "}
            <a
              href="mailto:contact@kitchenmix.com"
              className="text-accent hover:underline"
            >
              contact@kitchenmix.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
