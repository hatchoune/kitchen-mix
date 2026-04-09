"use client";

import { useState, useEffect, useCallback } from "react";
import type { ThemeName } from "@/types";

const STORAGE_KEY = "kmx-theme";
const DEFAULT_THEME: ThemeName = "dark";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (stored && ["dark", "light", "grey"].includes(stored)) {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    const order: ThemeName[] = ["dark", "light", "grey"];
    const idx = order.indexOf(theme);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  }, [theme, setTheme]);

  return { theme, setTheme, cycleTheme, mounted };
}
