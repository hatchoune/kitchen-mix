"use client";

import { cn } from "@/lib/utils";
import {
  getAchievementByCode,
  TIER_BG,
  TIER_COLORS,
  TIER_LABELS,
  type AchievementDef,
} from "@/lib/achievements";

interface AchievementBadgeProps {
  code: string;
  unlocked_at?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

export default function AchievementBadge({
  code,
  unlocked_at,
  size = "md",
  showTooltip = true,
}: AchievementBadgeProps) {
  const def = getAchievementByCode(code);
  if (!def) return null;

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
  };

  return (
    <div className="group relative inline-flex flex-col items-center">
      <div
        className={cn(
          "rounded-xl border flex items-center justify-center transition-transform hover:scale-110",
          TIER_BG[def.tier],
          sizeClasses[size],
        )}
      >
        {def.icon}
      </div>

      {showTooltip && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          <div
            className="rounded-lg px-3 py-2 text-xs whitespace-nowrap border border-border shadow-lg"
            style={{ backgroundColor: "var(--color-bg)" }}
          >
            <p className="font-display font-bold">{def.name}</p>
            <p className="text-muted-foreground">{def.description}</p>
            <div className="flex items-center justify-between gap-3 mt-1">
              <span className={cn("font-bold text-[10px]", TIER_COLORS[def.tier])}>
                {TIER_LABELS[def.tier]}
              </span>
              {unlocked_at && (
                <span className="text-muted-foreground text-[10px]">
                  {new Date(unlocked_at).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {size !== "sm" && (
        <span className="text-[10px] font-medium text-muted-foreground mt-1 text-center leading-tight max-w-[4rem] line-clamp-1">
          {def.name}
        </span>
      )}
    </div>
  );
}

/* ─── Grille complète des achievements d'un utilisateur ──── */

interface AchievementGridProps {
  achievements: { achievement_code: string; unlocked_at: string }[];
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  if (achievements.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        Aucun trophée débloqué pour le moment.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {achievements.map((a) => (
        <AchievementBadge
          key={a.achievement_code}
          code={a.achievement_code}
          unlocked_at={a.unlocked_at}
          size="md"
        />
      ))}
    </div>
  );
}
