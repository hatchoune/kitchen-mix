"use client";

import { useState } from "react";
import { ThumbsUp, Heart, Copy, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  togglePlanningLike,
  togglePlanningFavorite,
  duplicatePlanningToWeek,
} from "@/app/actions/plannings";
import { getMondayOfWeek, toDateString } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PlanningActionsProps {
  planningId: string;
  weekStart: string;
  isOwner: boolean;
}

export default function PlanningActions({
  planningId,
  weekStart,
  isOwner,
}: PlanningActionsProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [duplicated, setDuplicated] = useState(false);

  const handleLike = async () => {
    if (!user) return;
    try {
      const result = await togglePlanningLike(planningId);
      setLiked(result.action === "added");
    } catch {
      // silent
    }
  };

  const handleFavorite = async () => {
    if (!user) return;
    try {
      const result = await togglePlanningFavorite(planningId);
      setFavorited(result.action === "added");
    } catch {
      // silent
    }
  };

  const handleDuplicate = async () => {
    if (!user) return;
    setDuplicating(true);
    try {
      const currentWeek = toDateString(getMondayOfWeek());
      const result = await duplicatePlanningToWeek(planningId, currentWeek);
      setDuplicated(true);
      setTimeout(() => setDuplicated(false), 3000);
    } catch (err) {
      alert("Erreur : " + (err instanceof Error ? err.message : ""));
    } finally {
      setDuplicating(false);
    }
  };

  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        <a href="/connexion" className="text-accent hover:underline font-bold">
          Connectez-vous
        </a>{" "}
        pour aimer, sauvegarder ou utiliser ce planning.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={handleLike}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
          liked
            ? "bg-accent/15 text-accent border-accent/30"
            : "border-border hover:border-accent/30 hover:text-accent",
        )}
      >
        <ThumbsUp className={cn("w-4 h-4", liked && "fill-accent")} />
        {liked ? "Aimé" : "J'aime"}
      </button>

      <button
        onClick={handleFavorite}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all",
          favorited
            ? "bg-error/10 text-error border-error/30"
            : "border-border hover:border-error/30 hover:text-error",
        )}
      >
        <Heart className={cn("w-4 h-4", favorited && "fill-error")} />
        {favorited ? "Sauvegardé" : "Sauvegarder"}
      </button>

      {!isOwner && (
        <button
          onClick={handleDuplicate}
          disabled={duplicating || duplicated}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-accent text-black hover:bg-accent-hover transition-all disabled:opacity-60"
        >
          {duplicating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {duplicated
            ? "Copié dans mon planning !"
            : "Utiliser ce planning"}
        </button>
      )}
    </div>
  );
}
