"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  count?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
  userRating?: number | null;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({
  rating,
  count,
  interactive = false,
  onRate,
  userRating,
  size = "md",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const displayRating = hovered ?? userRating ?? rating;
  const sizeMap = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.round(displayRating);

          return (
            <button
              key={star}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRate?.(star)}
              onMouseEnter={() => interactive && setHovered(star)}
              onMouseLeave={() => interactive && setHovered(null)}
              className={cn(
                "transition-transform",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default"
              )}
              aria-label={`${star} étoile${star > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  iconSize,
                  "transition-colors",
                  filled
                    ? "fill-accent text-accent"
                    : "fill-transparent text-muted-foreground"
                )}
              />
            </button>
          );
        })}
      </div>

      {rating > 0 && (
        <span className="text-sm text-muted-foreground font-body">
          {rating.toFixed(1)}
        </span>
      )}

      {count !== undefined && count > 0 && (
        <span className="text-xs text-muted-foreground font-body">
          ({count})
        </span>
      )}
    </div>
  );
}
