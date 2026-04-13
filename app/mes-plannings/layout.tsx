import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes Plannings — Kitchen Mix",
  robots: { index: false, follow: false },
};

export default function MesPlanningsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
