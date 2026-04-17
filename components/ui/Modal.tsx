"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  className,
  fullScreen = false,
}: ModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  // Scroll lock agressif centralisé dans le hook (empêche la barre d'adresse
  // mobile et les onglets du bas de bouger).
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        // FIX iOS : `h-[100dvh]` force la hauteur au viewport visible.
        // Sans ça, `fixed inset-0` peut déborder sous la toolbar Safari,
        // ce qui cache la partie basse du modal.
        "fixed inset-0 z-[100] h-[100dvh] overscroll-none",
        !fullScreen && "flex items-center justify-center",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop — masqué en fullScreen */}
      {!fullScreen && (
        <div
          className="absolute inset-0 bg-black/70 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 animate-scale-in overscroll-none",
          fullScreen
            ? "absolute inset-0 lg:inset-3 lg:rounded-2xl overflow-hidden"
            : "w-full max-w-2xl max-h-[90dvh] mx-4 rounded-2xl overflow-hidden",
          "bg-[#1A1A1A] text-[#F5F5F0]",
          className,
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h2 className="font-display font-bold text-lg">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Croix par défaut (sans titre) — MASQUÉE en fullScreen :
            le composant enfant gère sa propre croix bien visible. */}
        {!title && !fullScreen && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Body */}
        <div
          className={cn(
            fullScreen
              ? "h-full overflow-hidden"
              : "overflow-y-auto max-h-[calc(90dvh-4rem)]",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
