// app/a-propos/layout.tsx
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `À propos | ${SITE_NAME}`,
  robots: { index: true, follow: true },
};

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
