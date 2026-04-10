"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { createClient } from "@/lib/supabase/client";
import {
  Settings,
  Moon,
  Sun,
  Monitor,
  Bell,
  Lock,
  Trash2,
  Save,
  CheckCircle2,
  Shield,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ParametresPage() {
  const { user, isAdmin, profil } = useAuth();
  const { theme, setTheme } = useTheme();
  const [supabase] = useState(() => createClient());
  const [notifs, setNotifs] = useState({ replies: true, moderation: true });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState("");
  const [deleteReason, setDeleteReason] = useState("");

  useEffect(() => {
    if (profil) {
      setNotifs({
        replies: profil.notify_replies ?? true,
        moderation: profil.notify_moderation ?? true,
      });
    }
  }, [profil]);

  const handleSavePreferences = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profils")
      .update({
        notify_replies: notifs.replies,
        notify_moderation: notifs.moderation,
        theme_preference: theme,
      })
      .eq("id", user.id);
    setLoading(false);
    if (error) {
      alert("Erreur lors de la sauvegarde. Réessayez.");
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleFinalDelete = async () => {
    if (deleteConfirmInput !== "supprimer mon compte") return;
    setLoading(true);
    if (deleteReason) {
      await supabase
        .from("suppression_feedbacks")
        .insert({ raison: deleteReason });
    }
    const { error } = await supabase.rpc("delete_user_account");
    if (error) {
      alert("Erreur technique. Contactez l'admin.");
      setLoading(false);
    } else {
      await supabase.auth.signOut();
      window.location.href = "/";
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-2xl text-accent">
            <Settings className="w-8 h-8" />
          </div>
          <div>
            <h1 className="font-display font-bold text-3xl italic text-foreground uppercase tracking-tight">
              Paramètres
            </h1>
            <p className="text-xs text-muted-foreground">
              Gérez vos préférences et la sécurité de votre compte
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-accent/20 text-accent border border-accent/30 rounded-full text-[10px] font-bold tracking-widest">
            <Shield className="w-3 h-3" /> ADMIN
          </div>
        )}
      </div>

      <div className="grid gap-12">
        {/* SECTION 1 : APPARENCE */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-accent font-bold">
            <Monitor className="w-5 h-5" />
            <h2 className="text-lg uppercase tracking-wider">
              Apparence du site
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ThemeButton
              active={theme === "light"}
              onClick={() => setTheme("light")}
              icon={<Sun className="w-6 h-6" />}
              label="Clair"
            />
            <ThemeButton
              active={theme === "dark"}
              onClick={() => setTheme("dark")}
              icon={<Moon className="w-6 h-6" />}
              label="Sombre"
            />
            <ThemeButton
              active={theme === "grey"}
              onClick={() => setTheme("grey")}
              icon={<Monitor className="w-6 h-6" />}
              label="Gris"
            />
          </div>
          <p className="text-xs text-muted-foreground italic">
            Le thème est sauvegardé sur votre profil. Il vous suivra sur tous
            vos appareils.
          </p>
        </section>

        {/* SECTION 2 : NOTIFICATIONS */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-accent font-bold">
            <Bell className="w-5 h-5" />
            <h2 className="text-lg uppercase tracking-wider">Notifications</h2>
          </div>
          <div className="glass-card p-6 space-y-6 rounded-[2rem] border border-border/40 shadow-inner">
            <ToggleOption
              label="Réponses aux commentaires"
              description="Recevoir une alerte quand un utilisateur répond à l'un de vos messages."
              checked={notifs.replies}
              onChange={() =>
                setNotifs({ ...notifs, replies: !notifs.replies })
              }
            />
            <div className="h-px bg-border/40 w-full" />
            <ToggleOption
              label="Suivi de modération"
              description="Être informé dès qu'un de vos commentaires ou recettes est validé."
              checked={notifs.moderation}
              onChange={() =>
                setNotifs({ ...notifs, moderation: !notifs.moderation })
              }
            />
          </div>
        </section>

        {/* SECTION 3 : SÉCURITÉ */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-error font-bold">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg uppercase tracking-wider">Sécurité</h2>
          </div>
          <div className="p-8 bg-error/5 rounded-[2rem] border border-error/20 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="font-bold text-foreground">
                  Suppression du compte
                </p>
                <p className="text-xs text-muted-foreground max-w-md">
                  Cette action est définitive. Toutes vos données seront
                  anonymisées et vos favoris perdus.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-3 bg-error/10 text-error border border-error/20 rounded-xl font-bold hover:bg-error hover:text-white transition-all text-sm"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* BOUTON SAUVEGARDER */}
      <div className="sticky bottom-6 flex justify-end">
        <button
          onClick={handleSavePreferences}
          disabled={loading}
          className={cn(
            "flex items-center gap-3 px-10 py-4 rounded-2xl font-bold shadow-2xl transition-all hover:scale-105 active:scale-95",
            saved ? "bg-sage text-white" : "btn-primary",
          )}
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : saved ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saved ? "Modifications enregistrées !" : "Sauvegarder les réglages"}
        </button>
      </div>

      {/* MODALE SUPPRESSION */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-card border border-error/30 p-8 rounded-[2.5rem] max-w-md w-full space-y-6 shadow-2xl scale-in-center">
            <div className="flex items-center gap-4 text-error">
              <div className="p-3 bg-error/10 rounded-2xl">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-2xl tracking-tighter">
                Action Critique
              </h3>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                Pourquoi nous quittez-vous ?
              </label>
              <textarea
                className="w-full bg-background border border-border rounded-2xl p-4 text-sm focus:ring-2 ring-error/20 outline-none transition-all"
                placeholder="Optionnel..."
                rows={3}
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
              />
            </div>
            <div className="space-y-3 p-4 bg-error/5 rounded-2xl border border-error/10">
              <p className="text-xs text-center font-bold italic">
                Tapez exactement la phrase ci-dessous :
              </p>
              <p className="text-center text-error font-mono text-sm font-bold">
                supprimer mon compte
              </p>
              <input
                type="text"
                className="w-full bg-background border border-border rounded-xl p-3 text-center font-mono text-error focus:ring-2 ring-error/20 outline-none"
                value={deleteConfirmInput}
                onChange={(e) =>
                  setDeleteConfirmInput(e.target.value.toLowerCase())
                }
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 rounded-2xl border border-border font-bold hover:bg-card-hover transition-colors"
              >
                Annuler
              </button>
              <button
                disabled={
                  deleteConfirmInput !== "supprimer mon compte" || loading
                }
                onClick={handleFinalDelete}
                className="flex-1 py-4 rounded-2xl bg-error text-white font-bold disabled:opacity-20 transition-all hover:brightness-110 shadow-lg shadow-error/20"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center p-6 rounded-[1.5rem] border-2 transition-all duration-300",
        active
          ? "border-accent bg-accent/10 text-accent scale-100 shadow-lg shadow-accent/10"
          : "border-border bg-card/40 text-muted-foreground hover:border-accent/30 hover:text-foreground scale-95 opacity-70 hover:opacity-100",
      )}
    >
      {icon}
      <span className="text-[10px] font-bold mt-3 uppercase tracking-[0.2em]">
        {label}
      </span>
    </button>
  );
}

function ToggleOption({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 group">
      <div className="space-y-1">
        <p className="text-sm font-bold group-hover:text-accent transition-colors">
          {label}
        </p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <button
        onClick={onChange}
        className={cn(
          "w-14 h-7 rounded-full transition-all duration-500 relative shrink-0",
          checked ? "bg-accent shadow-lg shadow-accent/20" : "bg-muted",
        )}
      >
        <div
          className={cn(
            "absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md",
            checked ? "left-8" : "left-1",
          )}
        />
      </button>
    </div>
  );
}
