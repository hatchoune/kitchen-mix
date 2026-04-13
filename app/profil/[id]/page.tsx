import { notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import {
  User,
  BookOpen,
  MessageSquare,
  Calendar,
  Star,
  Heart,
  Trophy,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { AchievementGrid } from "@/components/ui/AchievementBadge";
import { getUserAchievements } from "@/app/actions/achievements";
import { getPublicPlannings } from "@/app/actions/plannings";

/* ─── Types locaux ────────────────────────────────────────── */

interface PublicProfil {
  id: string;
  pseudo: string | null;
  avatar_url: string | null;
  modele_thermomix: string;
  bio: string | null;
  created_at: string;
}

interface PublicRecette {
  id: string;
  slug: string;
  titre: string;
  image_url: string | null;
  difficulte: string;
  note_moyenne: number;
  nombre_notes: number;
  temps_preparation: number;
  temps_cuisson: number;
  categories: string[];
}

interface PublicComment {
  id: string;
  content: string;
  created_at: string;
  recette_id: string;
  recettes: { slug: string; titre: string } | null;
}

/* ─── Metadata SEO ────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabase();
  const { data: profil } = await supabase
    .from("profils")
    .select("pseudo, avatar_url")
    .eq("id", id)
    .single();

  if (!profil) {
    return { title: "Profil introuvable — Kitchen Mix" };
  }

  const name = profil.pseudo || "Utilisateur";
  return {
    title: `${name} — Kitchen Mix`,
    description: `Découvrez le profil de ${name} sur Kitchen Mix : ses recettes, commentaires et contributions.`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${name} — Kitchen Mix`,
      description: `Profil de ${name} sur Kitchen Mix`,
      ...(profil.avatar_url && { images: [profil.avatar_url] }),
    },
  };
}

/* ─── Page ────────────────────────────────────────────────── */

export default async function ProfilPublicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  // 1. Profil
  const { data: profil } = await supabase
    .from("profils")
    .select("id, pseudo, avatar_url, modele_thermomix, bio, created_at")
    .eq("id", id)
    .single();

  if (!profil) notFound();

  // 2. Recettes approuvées
  const { data: recettes } = await supabase
    .from("recettes")
    .select(
      "id, slug, titre, image_url, difficulte, note_moyenne, nombre_notes, temps_preparation, temps_cuisson, categories",
    )
    .eq("auteur_id", id)
    .eq("approuve", true)
    .eq("publie", true)
    .order("created_at", { ascending: false })
    .limit(20);

  // 3. Derniers commentaires approuvés
  const { data: commentaires } = await supabase
    .from("recipe_comments")
    .select("id, content, created_at, recette_id, recettes(slug, titre)")
    .eq("user_id", id)
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(10);

  // 4. Achievements
  const userAchievementsList = await getUserAchievements(id);

  // 5. Plannings publics
  const userPlannings = await getPublicPlannings(id);

  // 5. Stats
  const { count: nbFavoris } = await supabase
    .from("favoris")
    .select("id", { count: "exact", head: true })
    .eq("user_id", id);

  const { count: nbNotes } = await supabase
    .from("recipe_ratings")
    .select("id", { count: "exact", head: true })
    .eq("user_id", id);

  const p = profil as PublicProfil;
  const userRecettes = (recettes || []) as PublicRecette[];
  // Fix TS : Supabase retourne recettes comme objet ou tableau selon la relation
  const userComments = (commentaires || []) as unknown as PublicComment[];
  const displayName = p.pseudo || "Utilisateur";
  const memberSince = new Date(p.created_at).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6 px-4">
      {/* ═══ HEADER PROFIL ═══ */}
      <div className="text-center space-y-3">
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-accent/15 border-2 border-accent/20 flex items-center justify-center">
          {p.avatar_url ? (
            <Image
              src={p.avatar_url}
              alt={displayName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-10 h-10 text-accent" />
          )}
        </div>

        <h1 className="font-display font-bold text-2xl">{displayName}</h1>

        {p.bio && (
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {p.bio}
          </p>
        )}

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            Membre depuis {memberSince}
          </span>
          <span className="flex items-center gap-1.5 flex-wrap justify-center">
            {(Array.isArray(p.modele_thermomix)
              ? p.modele_thermomix
              : [p.modele_thermomix]
            ).map((app) => (
              <span
                key={app}
                className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-bold text-[10px] border border-accent/20"
              >
                {app}
              </span>
            ))}
          </span>
        </div>
      </div>

      {/* ═══ STATS RAPIDES ═══ */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            icon: BookOpen,
            label: "Recettes",
            value: userRecettes.length,
          },
          {
            icon: MessageSquare,
            label: "Commentaires",
            value: userComments.length,
          },
          { icon: Heart, label: "Favoris", value: nbFavoris || 0 },
          { icon: Star, label: "Notes", value: nbNotes || 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-3 rounded-xl text-center border border-border"
          >
            <stat.icon className="w-4 h-4 text-accent mx-auto mb-1" />
            <p className="font-display font-bold text-lg">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ═══ TROPHÉES ═══ */}
      {userAchievementsList.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display font-semibold flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Trophées ({userAchievementsList.length})
          </h2>
          <div className="glass-card p-4 rounded-2xl border border-border">
            <AchievementGrid achievements={userAchievementsList} />
          </div>
        </section>
      )}

      {/* ═══ RECETTES ═══ */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Recettes de {displayName} ({userRecettes.length})
        </h2>

        {userRecettes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center glass-card rounded-xl border border-dashed border-border">
            Aucune recette publiée pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {userRecettes.map((r) => (
              <Link
                key={r.id}
                href={`/recettes/${r.slug}`}
                className="glass-card rounded-xl border border-border hover:border-accent/30 transition-all overflow-hidden group"
              >
                {r.image_url ? (
                  <div className="relative w-full h-32">
                    <Image
                      src={r.image_url}
                      alt={r.titre}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-accent/5 flex items-center justify-center text-3xl">
                    🍽️
                  </div>
                )}
                <div className="p-3 space-y-1">
                  <h3 className="font-display font-semibold text-sm group-hover:text-accent transition-colors line-clamp-1">
                    {r.titre}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <span
                      className={cn(
                        "px-1.5 py-0.5 rounded font-bold uppercase",
                        r.difficulte === "facile"
                          ? "bg-sage/10 text-sage"
                          : r.difficulte === "moyen"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-error/10 text-error",
                      )}
                    >
                      {r.difficulte}
                    </span>
                    <span>{r.temps_preparation + r.temps_cuisson} min</span>
                    {r.note_moyenne > 0 && (
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-accent fill-accent" />
                        {r.note_moyenne.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ═══ COMMENTAIRES RÉCENTS ═══ */}
      {userComments.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-display font-semibold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent" />
            Derniers commentaires
          </h2>

          <div className="space-y-2">
            {userComments.map((c) => {
              const recette = c.recettes as {
                slug: string;
                titre: string;
              } | null;
              return (
                <div
                  key={c.id}
                  className="glass-card p-4 rounded-xl border border-border space-y-1"
                >
                  <p className="text-sm line-clamp-2">{c.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    {recette ? (
                      <Link
                        href={`/recettes/${recette.slug}`}
                        className="text-accent hover:underline font-medium"
                      >
                        sur {recette.titre}
                      </Link>
                    ) : (
                      <span>Recette supprimée</span>
                    )}
                    <span>
                      {new Date(c.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
            {/* ═══ PLANNINGS PUBLICS ═══ */}
            {userPlannings.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-display font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Plannings publics ({userPlannings.length})
                </h2>
                <div className="space-y-2">
                  {userPlannings.map((p) => (
                    <Link
                      key={p.id}
                      href={`/planificateur?load=${p.id}`}
                      className="glass-card p-4 rounded-xl border border-border hover:border-accent/30 transition-all block"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-semibold text-sm">
                          {p.name}
                        </h3>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {p.likes_count}
                        </span>
                      </div>
                      {p.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                          {p.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
