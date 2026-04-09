import { NUTRISCORE_COLORS } from "@/lib/constants";
import type { NutriScore as NutriScoreType } from "@/types";

interface NutriScoreProps {
  score: NutriScoreType;
  size?: "sm" | "md";
}

export default function NutriScore({ score, size = "sm" }: NutriScoreProps) {
  const color = NUTRISCORE_COLORS[score] || "#999";
  const sizeClass = size === "sm" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm";

  return (
    <div
      className={`${sizeClass} rounded-md flex items-center justify-center font-display font-bold text-white`}
      style={{ backgroundColor: color }}
      title={`Nutri-Score ${score} (indicatif)`}
      aria-label={`Nutri-Score ${score}`}
    >
      {score}
    </div>
  );
}
