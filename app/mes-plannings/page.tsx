"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Globe,
  Lock,
  Trash2,
  ThumbsUp,
  Loader2,
  Plus,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

interface MyPlanning {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  week_start: string;
  likes_count: number;
  created_at: string;
}

export default function MesPlanningsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [supabase] = useState(() => createClient());
  const [plannings, setPlannings] = useState<MyPlanning[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toastError } = useToast();
  const userId = user?.id;

  useEffect(() => {
    if (authLoading) return;
    if (!userId) {
      router.push("/connexion?next=/mes-plannings");
      return;
    }
    const load = async () => {
      const { data } = await supabase
        .from("user_plannings")
        .select(
          "id, name, description, is_public, week_start, likes_count, created_at",
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      setPlannings((data || []) as MyPlanning[]);
      setLoading(false);
    };
    load();
  }, [userId, authLoading, supabase, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce planning ?")) return;
    setDeleting(id);
    try {
      await supabase.from("user_plannings").delete().eq("id", id);
      setPlannings((prev) => prev.filter((p) => p.id !== id));
    } catch {
      toastError("Erreur lors de la suppression");
    } finally {
      setDeleting(null);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <div className="skeleton h-10 w-64 rounded-xl" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-card animate-pulse rounded-2xl border border-border"
          />
        ))}
      </div>
    );
  }

  const publics = plannings.filter((p) => p.is_public);
  const prives = plannings.filter((p) => !p.is_public);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-display font-bold text-3xl flex items-center gap-3">
          <Calendar className="w-8 h-8 text-accent" />
          Mes plannings
        </h1>
        <p className="text-muted-foreground text-sm">
          {plannings.length} planning{plannings.length > 1 ? "s" : ""}{" "}
          sauvegardé{plannings.length > 1 ? "s" : ""}
        </p>
      </div>

      {plannings.length === 0 && !loading && (
        <div className="text-center py-16 glass-card rounded-2xl border border-dashed border-border space-y-4">
          <Calendar className="w-12 h-12 text-accent/30 mx-auto" />
          <p className="text-muted-foreground text-sm">
            Vous n&apos;avez pas encore sauvegardé de planning.
          </p>
          <Link
            href="/planificateur"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Créer un planning
          </Link>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-accent" />
        </div>
      )}

      {/* Plannings privés */}
      {prives.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-sm flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            Privés ({prives.length})
          </h2>
          <div className="space-y-2">
            {prives.map((p) => (
              <PlanningRow
                key={p.id}
                planning={p}
                onDelete={handleDelete}
                deleting={deleting}
              />
            ))}
          </div>
        </section>
      )}

      {/* Plannings publics */}
      {publics.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-sm flex items-center gap-2 text-muted-foreground uppercase tracking-wider">
            <Globe className="w-4 h-4" />
            Publics ({publics.length})
          </h2>
          <div className="space-y-2">
            {publics.map((p) => (
              <PlanningRow
                key={p.id}
                planning={p}
                onDelete={handleDelete}
                deleting={deleting}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ─── Composant ligne ─────────────────────────────────────── */

function PlanningRow({
  planning,
  onDelete,
  deleting,
}: {
  planning: MyPlanning;
  onDelete: (id: string) => void;
  deleting: string | null;
}) {
  return (
    <div className="flex items-center gap-3 glass-card rounded-xl border border-border px-4 py-3 hover:border-accent/30 transition-all">
      <div className="flex-1 min-w-0">
        <Link
          href={`/planificateur?load=${planning.id}`}
          className="font-display font-semibold text-sm hover:text-accent transition-colors block truncate"
        >
          {planning.name}
        </Link>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-0.5">
          {planning.description && (
            <span className="truncate max-w-[200px]">
              {planning.description}
            </span>
          )}
          <span>
            {new Date(planning.created_at).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "short",
            })}
          </span>
          {planning.is_public && (
            <span className="flex items-center gap-0.5">
              <ThumbsUp className="w-3 h-3" />
              {planning.likes_count}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span
          className={cn(
            "text-[9px] font-bold uppercase px-2 py-0.5 rounded",
            planning.is_public
              ? "bg-accent/10 text-accent border border-accent/20"
              : "bg-card text-muted-foreground border border-border",
          )}
        >
          {planning.is_public ? "Public" : "Privé"}
        </span>
        <button
          onClick={() => onDelete(planning.id)}
          disabled={deleting === planning.id}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-error hover:bg-error/10 transition-colors disabled:opacity-40"
        >
          {deleting === planning.id ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Trash2 className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
