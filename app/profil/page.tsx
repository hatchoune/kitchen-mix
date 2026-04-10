"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  LogOut,
  BookOpen,
  Plus,
  Clock,
  Check,
  X,
  Camera,
  Loader2,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import {
  APPLIANCES,
  getAppliancesByCategory,
  CATEGORY_LABELS,
  type ApplianceCategory,
} from "@/lib/appliance-specs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import Image from "next/image";

// Type enrichi pour afficher le statut
interface MaRecette {
  id: string;
  slug: string;
  titre: string;
  difficulte: string;
  approuve: boolean;
  raison_rejet: string | null;
  created_at: string;
}

export default function ProfilPage() {
  const { user, profil, loading, signOut, refreshProfil } = useAuth();
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const [mesRecettes, setMesRecettes] = useState<MaRecette[]>([]);
  const [saving, setSaving] = useState(false);
  const [modele, setModele] = useState(profil?.modele_thermomix || "TM6");
  const [uploading, setUploading] = useState(false);

  // --- FONCTION D'UPLOAD DE L'AVATAR ---
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    try {
      // 1. Compression
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 500,
        useWebWorker: true,
        fileType: "image/webp",
      };
      const compressedFile = await imageCompression(file, options);

      // 2. Upload vers le bucket "avatars"
      const fileName = `${user.id}-${Math.random()}.webp`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, compressedFile);

      if (uploadError) throw uploadError;

      // 3. Récupération URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      // 4. Update BDD (Table profils avec un S)
      const { error: updateError } = await supabase
        .from("profils")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // 5. Refresh
      if (refreshProfil) await refreshProfil();
      alert("Photo de profil mise à jour !");
    } catch (error: unknown) {
      console.error("Erreur avatar:", error);
      const message =
        error instanceof Error ? error.message : "Erreur inconnue";
      alert("Erreur : " + message);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/connexion?next=/profil");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (profil) setModele(profil.modele_thermomix);
  }, [profil]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const { data } = await supabase
        .from("recettes")
        .select(
          "id, slug, titre, difficulte, approuve, raison_rejet, created_at",
        )
        .eq("auteur_id", user.id)
        .order("created_at", { ascending: false });
      setMesRecettes((data || []) as MaRecette[]);
    };
    load();
  }, [user]);

  const handleSaveModele = async () => {
    if (!user) return;
    setSaving(true);
    await supabase
      .from("profils")
      .update({ modele_thermomix: modele })
      .eq("id", user.id);
    if (refreshProfil) await refreshProfil();
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (loading || !user) {
    return (
      <div className="space-y-4 max-w-lg mx-auto py-10">
        <div className="w-20 h-20 rounded-full bg-card animate-pulse mx-auto" />
        <div className="h-6 w-48 bg-card animate-pulse rounded mx-auto" />
        <div className="h-40 bg-card animate-pulse rounded-xl" />
      </div>
    );
  }

  const pending = mesRecettes.filter(
    (r) => !r.approuve && !r.raison_rejet,
  ).length;
  const approved = mesRecettes.filter((r) => r.approuve).length;
  const rejected = mesRecettes.filter(
    (r) => !r.approuve && r.raison_rejet,
  ).length;

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-6 px-4">
      {/* Header avec Avatar Interactif */}
      <div className="text-center space-y-3">
        <div className="relative group w-24 h-24 mx-auto mb-4">
          <div className="w-full h-full rounded-full overflow-hidden bg-accent/15 border-2 border-accent/20 flex items-center justify-center">
            {profil?.avatar_url ? (
              <Image
                src={profil.avatar_url}
                alt="Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-accent" />
            )}
          </div>

          {/* Bouton Camera au survol */}
          <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-all border border-white/20">
            {uploading ? (
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            ) : (
              <Camera className="w-6 h-6 text-white" />
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
            />
          </label>
        </div>

        <h1 className="font-display font-bold text-2xl">
          {profil?.pseudo || user.email?.split("@")[0]}
        </h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      {/* CTA : Proposer une recette */}
      <Link
        href="/soumettre"
        className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-accent text-black font-display font-bold text-sm hover:bg-accent-hover transition-colors shadow-lg shadow-accent/10"
      >
        <Plus className="w-5 h-5" />
        Proposer une recette
      </Link>

      {/* Model selector */}
      <div className="glass-card p-6 space-y-4 rounded-2xl border border-border">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <Logo className="w-5 h-auto" />
          Mon appareil
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            className="input-field flex-1"
          >
            {Object.entries(getAppliancesByCategory()).map(([cat, apps]) => (
              <optgroup
                key={cat}
                label={CATEGORY_LABELS[cat as ApplianceCategory]}
              >
                {apps.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button
            onClick={handleSaveModele}
            disabled={saving || modele === profil?.modele_thermomix}
            className="ml-auto px-4 py-2 rounded-lg text-sm bg-accent/10 text-accent font-bold disabled:opacity-40 hover:bg-accent/20 transition-colors"
          >
            {saving ? "..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {/* Mes recettes */}
      <div className="space-y-4">
        <h2 className="font-display font-semibold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-accent" />
          Mes recettes ({mesRecettes.length})
        </h2>

        {mesRecettes.length > 0 && (
          <div className="flex gap-3 text-[10px] uppercase tracking-wider font-bold">
            {approved > 0 && (
              <span className="px-2 py-1 rounded bg-sage/10 text-sage border border-sage/20">
                {approved} EN LIGNE
              </span>
            )}
            {pending > 0 && (
              <span className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                {pending} EN ATTENTE
              </span>
            )}
            {rejected > 0 && (
              <span className="px-2 py-1 rounded bg-error/10 text-error border border-error/20">
                {rejected} REFUSÉE{rejected > 1 ? "S" : ""}
              </span>
            )}
          </div>
        )}

        {mesRecettes.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-dashed border-border">
            <Logo className="w-11 h-auto mx-auto mb-3 opacity-20" />{" "}
            <p className="text-muted-foreground text-sm">
              Vous n'avez pas encore soumis de recette.
            </p>
            <Link
              href="/soumettre"
              className="inline-flex items-center gap-1 mt-3 text-sm text-accent hover:underline font-bold"
            >
              <Plus className="w-4 h-4" /> Proposer ma première recette
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {mesRecettes.map((r) => (
              <div
                key={r.id}
                className={cn(
                  "flex items-center justify-between px-5 py-4 glass-card rounded-2xl border border-border hover:border-accent/30 transition-all",
                  !r.approuve && r.raison_rejet && "border-l-4 border-l-error",
                )}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="min-w-0">
                    <Link
                      href={r.approuve ? `/recettes/${r.slug}` : "#"}
                      className={cn(
                        "text-sm font-bold truncate block",
                        r.approuve ? "hover:text-accent" : "cursor-default",
                      )}
                    >
                      {r.titre}
                    </Link>
                    {!r.approuve && r.raison_rejet && (
                      <p className="text-[11px] text-error mt-1 font-medium italic">
                        Refusé : {r.raison_rejet}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={cn(
                      "text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded",
                      r.approuve
                        ? "bg-sage/10 text-sage"
                        : r.raison_rejet
                          ? "bg-error/10 text-error"
                          : "bg-yellow-500/10 text-yellow-500",
                    )}
                  >
                    {r.approuve
                      ? "Public"
                      : r.raison_rejet
                        ? "Refusé"
                        : "Vérification"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-card border border-error/20 text-error hover:bg-error/5 hover:border-error/40 transition-all font-bold text-sm"
      >
        <LogOut className="w-4 h-4" />
        Déconnexion
      </button>
    </div>
  );
}
