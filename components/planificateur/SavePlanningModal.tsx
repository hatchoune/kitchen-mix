"use client";

import { useState } from "react";
import { X, Save, Loader2, Globe, Lock } from "lucide-react";
import { savePlanning } from "@/app/actions/plannings";
import { cn } from "@/lib/utils";

interface SavePlanningModalProps {
  weekStart: string;
  planData: Record<number, (string | null)[]>;
  onClose: () => void;
  onSaved: (id: string) => void;
}

export default function SavePlanningModal({
  weekStart,
  planData,
  onClose,
  onSaved,
}: SavePlanningModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Le nom est requis");
      return;
    }

    setSaving(true);
    setError("");

    try {
      // Convertir le plan en format stockable (juste les IDs)
      const data: Record<number, (string | null)[]> = {};
      for (let d = 0; d < 7; d++) {
        const slots = planData[d] || [null, null, null];
        data[d] = slots.map((r) => (r && typeof r === "object" && "id" in r ? (r as { id: string }).id : r));
      }

      const result = await savePlanning({
        name: name.trim(),
        description: description.trim() || undefined,
        is_public: isPublic,
        week_start: weekStart,
        data,
      });

      onSaved(result.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-6 space-y-5 animate-scale-in"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl flex items-center gap-2">
            <Save className="w-5 h-5 text-accent" />
            Sauvegarder le planning
          </h3>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Nom du planning *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Semaine healthy, Menu famille..."
              className="input-field"
              autoFocus
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Description (optionnel)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quelques mots sur ce planning..."
              className="input-field min-h-[80px] resize-none"
              maxLength={500}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Visibilité
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsPublic(false)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all",
                  !isPublic
                    ? "bg-accent/15 text-accent border-accent/30"
                    : "border-border text-muted-foreground hover:border-accent/20",
                )}
              >
                <Lock className="w-4 h-4" />
                Privé
              </button>
              <button
                type="button"
                onClick={() => setIsPublic(true)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all",
                  isPublic
                    ? "bg-accent/15 text-accent border-accent/30"
                    : "border-border text-muted-foreground hover:border-accent/20",
                )}
              >
                <Globe className="w-4 h-4" />
                Public
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">
              {isPublic
                ? "Visible par tous les utilisateurs, partageable et likeable."
                : "Visible uniquement par vous."}
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-error font-medium">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={saving || !name.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:bg-accent-hover disabled:opacity-40 transition-colors"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </div>
  );
}
