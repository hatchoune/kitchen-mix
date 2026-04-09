"use client";

import { type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Providers client-side.
 * Pour le moment on n'a pas besoin de contexte global,
 * mais ce wrapper est prêt pour ajouter :
 * - React Query / TanStack Query
 * - Toast notifications
 * - Auth context global
 * - Tout provider futur
 */
export default function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
