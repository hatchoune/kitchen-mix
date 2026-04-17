import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mes notifications",
  robots: { index: false, follow: false },
};

export default function NotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
