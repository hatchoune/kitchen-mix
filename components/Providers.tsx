"use client";

import { type ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import AchievementNotifier from "@/components/ui/AchievementNotifier";
import { ToastProvider } from "@/components/ui/Toast";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        {children}
        <AchievementNotifier />
      </ToastProvider>
    </AuthProvider>
  );
}
