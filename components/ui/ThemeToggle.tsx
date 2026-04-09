"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ICONS = {
  dark: Moon,
  light: Sun,
  grey: Monitor,
};

const LABELS = {
  dark: "Thème sombre",
  light: "Thème clair",
  grey: "Thème gris",
};

export default function ThemeToggle() {
  const { theme, cycleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div className="w-9 h-9 rounded-lg bg-card animate-pulse" />;
  }

  const Icon = ICONS[theme];

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg hover:bg-card-hover transition-colors text-muted-foreground hover:text-foreground"
      aria-label={LABELS[theme]}
      title={LABELS[theme]}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
