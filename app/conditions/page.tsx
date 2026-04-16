export const metadata = {
  title: "Conditions d'utilisation | Kitchenmix",
  description:
    "Règles et conditions d'utilisation de la plateforme Kitchenmix.",
};

export default function ConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* En-tête */}
      <div className="border-b border-border pb-6">
        <h1 className="font-display font-bold text-4xl sm:text-5xl italic text-foreground uppercase tracking-tight">
          Conditions d'utilisation
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
        </p>
      </div>

      {/* Contenu */}
      <div className="prose prose-sm sm:prose prose-invert max-w-none space-y-6 text-foreground/90">
        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            1. Acceptation des conditions
          </h2>
          <p>
            En accédant ou en utilisant le site Kitchenmix (ci-après "le
            Service"), vous acceptez d'être lié par les présentes Conditions
            d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne
            pas utiliser le Service.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            2. Description du Service
          </h2>
          <p>Kitchenmix est une plateforme communautaire permettant de :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Partager et découvrir des recettes compatibles Thermomix®.</li>
            <li>Planifier des menus hebdomadaires.</li>
            <li>Interagir avec d'autres passionnés de cuisine.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Thermomix® est une marque déposée de Vorwerk. Kitchenmix n'est ni
            affilié, ni sponsorisé par Vorwerk.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            3. Compte utilisateur
          </h2>
          <p>
            Pour accéder à certaines fonctionnalités (soumettre une recette,
            commenter, sauvegarder des plannings), vous devez créer un compte.
            Vous êtes responsable de la confidentialité de vos identifiants et
            de toutes les activités effectuées via votre compte.
          </p>
          <p>
            Vous devez être âgé d'au moins 16 ans pour créer un compte. En
            créant un compte, vous certifiez que vous avez l'âge requis.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            4. Contenu utilisateur
          </h2>
          <p>
            En soumettant du contenu (recettes, commentaires, photos) sur
            Kitchenmix, vous conservez vos droits de propriété intellectuelle.
            Cependant, vous nous accordez une licence mondiale, non exclusive et
            gratuite pour utiliser, reproduire, modifier et afficher ce contenu
            dans le cadre du Service.
          </p>
          <p>Vous vous engagez à ne pas publier de contenu :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Illégal, diffamatoire, haineux ou pornographique.</li>
            <li>
              Portant atteinte aux droits de propriété intellectuelle d'autrui.
            </li>
            <li>Contenant des virus ou du code malveillant.</li>
          </ul>
          <p>
            Nous nous réservons le droit de supprimer tout contenu qui enfreint
            ces règles, sans préavis.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            5. Règles de conduite
          </h2>
          <p>En utilisant le Service, vous acceptez de :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Respecter les autres utilisateurs (pas d'insultes, harcèlement).
            </li>
            <li>Ne pas usurper l'identité d'une autre personne.</li>
            <li>Ne pas tenter de contourner les mesures de sécurité.</li>
            <li>
              Ne pas collecter les données des autres utilisateurs sans
              consentement.
            </li>
          </ul>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            6. Modération
          </h2>
          <p>
            Les recettes soumises sont soumises à une validation par notre
            équipe avant publication. Nous nous efforçons de traiter les
            soumissions dans les meilleurs délais. Vous serez notifié de la
            validation ou du refus de votre recette par e-mail (si activé).
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            7. Résiliation
          </h2>
          <p>
            Vous pouvez supprimer votre compte à tout moment depuis la page
            Paramètres. Nous pouvons suspendre ou supprimer votre compte en cas
            de violation grave ou répétée des présentes conditions.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            8. Limitation de responsabilité
          </h2>
          <p>
            Kitchenmix est fourni "tel quel". Nous ne garantissons pas que le
            Service sera ininterrompu ou exempt d'erreurs. Nous ne sommes pas
            responsables des dommages indirects résultant de l'utilisation du
            Service.
          </p>
          <p>
            Les recettes partagées le sont à titre informatif. Vérifiez toujours
            les ingrédients et les instructions avant de cuisiner, en tenant
            compte de vos allergies et restrictions alimentaires.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            9. Propriété intellectuelle
          </h2>
          <p>
            Le code source, le design, le logo et les éléments graphiques de
            Kitchenmix sont notre propriété exclusive ou sont utilisés sous
            licence. Vous ne pouvez pas les reproduire sans autorisation.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            10. Loi applicable
          </h2>
          <p>
            Les présentes conditions sont régies par le droit français. Tout
            litige sera soumis à la compétence exclusive des tribunaux français.
          </p>
        </section>

        <section className="glass-card p-6 sm:p-8 rounded-[2rem] border border-border space-y-4">
          <h2 className="font-display text-xl font-bold text-accent">
            11. Contact
          </h2>
          <p>
            Pour toute question relative à ces conditions, contactez-nous à :{" "}
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
