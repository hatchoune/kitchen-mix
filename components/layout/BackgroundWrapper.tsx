"use client";

import { usePathname } from "next/navigation";
import styles from "@/app/page.module.css";

const EXCLUDED_PATHS = [
  "/profil",
  "/parametres",
  "/admin",
  // "/profil/[id]" correspond à tout chemin commençant par "/profil/"
];

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Vérifie si le chemin actuel est exclu
  const isExcluded = EXCLUDED_PATHS.some((path) => {
    if (path === "/profil") {
      // Exclut "/profil" et "/profil/[id]"
      return pathname.startsWith("/profil");
    }
    return pathname.startsWith(path);
  });

  return (
    <div className={!isExcluded ? styles.pageBackground : undefined}>
      {children}
    </div>
  );
}
