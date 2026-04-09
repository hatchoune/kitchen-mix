import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposer une recette",
  description: "Partagez vos recettes Thermomix avec la communauté Kitchen Mix.",
  robots: { index: false, follow: false },
};

export default function SoumettreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
