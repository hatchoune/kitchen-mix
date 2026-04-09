import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planificateur de repas",
  robots: { index: false, follow: false },
};

export default function PlanificateurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
