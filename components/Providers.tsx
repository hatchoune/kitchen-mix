"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import AchievementNotifier from "@/components/ui/AchievementNotifier";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <AchievementNotifier />
    </AuthProvider>
  );
}
