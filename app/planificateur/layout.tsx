import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Planificateur",
};

export default function PlanificateurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
