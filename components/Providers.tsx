"use client";

import { type ReactNode } from "react";
import AchievementNotifier from "@/components/ui/AchievementNotifier";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      {children}
      <AchievementNotifier />
    </>
  );
}
