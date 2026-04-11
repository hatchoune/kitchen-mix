"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAchievementByCode } from "@/lib/achievements";
import {
  getUnnotifiedAchievements,
  markAchievementsNotified,
} from "@/app/actions/achievements";
import { TIER_COLORS } from "@/lib/achievements";
import { cn } from "@/lib/utils";
import { Trophy, X } from "lucide-react";

interface ToastItem {
  id: string;
  code: string;
  visible: boolean;
}

const POLL_INTERVAL = 30_000; // 30 secondes

export default function AchievementNotifier() {
  const { user } = useAuth();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const checkAchievements = useCallback(async () => {
    if (!user) return;
    try {
      const unnotified = await getUnnotifiedAchievements();
      if (unnotified.length === 0) return;

      // Marquer comme notifié immédiatement
      await markAchievementsNotified(unnotified.map((a) => a.id));

      // Afficher les toasts en cascade
      for (let i = 0; i < unnotified.length; i++) {
        const a = unnotified[i];
        setTimeout(() => {
          setToasts((prev) => [
            ...prev,
            { id: a.id, code: a.achievement_code, visible: true },
          ]);

          // Auto-dismiss après 5s
          setTimeout(() => {
            setToasts((prev) =>
              prev.map((t) => (t.id === a.id ? { ...t, visible: false } : t)),
            );
            // Retirer du DOM après animation
            setTimeout(() => {
              setToasts((prev) => prev.filter((t) => t.id !== a.id));
            }, 400);
          }, 5000);
        }, i * 1200);
      }
    } catch {
      // Silent fail — achievements are non-critical
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // Check initial (petit délai pour laisser la page se charger)
    const initialTimeout = setTimeout(checkAchievements, 3000);

    // Poll
    const interval = setInterval(checkAchievements, POLL_INTERVAL);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [user, checkAchievements]);

  const dismiss = (id: string) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 400);
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const def = getAchievementByCode(toast.code);
        if (!def) return null;

        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border border-accent/30 shadow-2xl shadow-accent/10 max-w-sm transition-all duration-400",
              toast.visible
                ? "animate-in slide-in-from-right fade-in"
                : "animate-out slide-out-to-right fade-out",
            )}
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <div className="text-2xl shrink-0">{def.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <Trophy className={cn("w-3.5 h-3.5", TIER_COLORS[def.tier])} />
                <span className="font-display font-bold text-sm">
                  {def.name}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {def.description}
              </p>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 p-1 rounded-lg hover:bg-card-hover text-muted-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
