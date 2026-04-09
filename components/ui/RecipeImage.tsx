"use client";

import Image from "next/image";
import LogoIcon from "@/components/LogoIcon";
import { cn } from "@/lib/utils";

interface RecipeImageProps {
  src?: string | null;
  alt: string;
  featured?: boolean;
  className?: string;
}

export default function RecipeImage({
  src,
  alt,
  featured = false,
  className,
}: RecipeImageProps) {
  const aspectClass = featured ? "aspect-[16/10]" : "aspect-[4/3]";

  if (src) {
    return (
      <div className={cn("relative overflow-hidden", aspectClass, className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    );
  }

  // Fallback : ton logo
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectClass,
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <LogoIcon className="w-16 h-16 opacity-30" />
      </div>
    </div>
  );
}
