"use client";

import { useEffect, useRef } from "react";

interface ScrollToResultsProps {
  shouldScroll: boolean;
  children: React.ReactNode;
}

export default function ScrollToResults({
  shouldScroll,
  children,
}: ScrollToResultsProps) {
  const hasScrolled = useRef(false);

  useEffect(() => {
    if (shouldScroll && !hasScrolled.current) {
      const element = document.getElementById("search-results");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        hasScrolled.current = true;
      }
    }
  }, [shouldScroll]);

  return <>{children}</>;
}
