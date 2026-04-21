"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Thermometer,
  Timer,
  Gauge,
  UtensilsCrossed,
  RotateCw,
  Check,
  X,
  Mic,
  MicOff,
} from "lucide-react";
import type { EtapeThermomix } from "@/types";
import { useWakeLock } from "@/hooks/useWakeLock";

interface SimulateurProps {
  isOpen: boolean;
  onClose: () => void;
  etapes: EtapeThermomix[];
  titre: string;
}

export default function SimulateurThermomix({
  isOpen,
  onClose,
  etapes,
  titre,
}: SimulateurProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPortrait, setIsPortrait] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock();
  const touchStartX = useRef<number | null>(null);
  const pushedHistoryRef = useRef(false);

  // ─── Portal mount guard (évite hydration mismatch SSR) ─────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Scroll lock ALLÉGÉ (overflow:hidden sans body:fixed) ──────────
  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    return () => {
      body.style.overflow = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
    };
  }, [isOpen]);

  // ─── Détection orientation (mobile portrait → alerte rotation) ───
  useEffect(() => {
    const checkOrientation = () => {
      setIsPortrait(
        window.innerHeight > window.innerWidth && window.innerWidth < 1024,
      );
    };
    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);
    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  // ─── WakeLock ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    requestWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, [isOpen, requestWakeLock, releaseWakeLock]);

  // ─── Bouton RETOUR Android ────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ kmxSimulateur: true }, "");
    pushedHistoryRef.current = true;

    const onPop = () => {
      pushedHistoryRef.current = false;
      onClose();
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      if (pushedHistoryRef.current) {
        pushedHistoryRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  // ─── Navigation ────────────────────────────────────────────────────
  function goNext() {
    setCurrentStep((s) => Math.min(etapes.length - 1, s + 1));
  }

  function goPrev() {
    setCurrentStep((s) => Math.max(0, s - 1));
  }

  // ─── Raccourcis clavier ────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // ─── Swipe horizontal ──────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const THRESHOLD = 50;
    if (deltaX > THRESHOLD) goPrev();
    else if (deltaX < -THRESHOLD) goNext();
    touchStartX.current = null;
  };

  if (!isOpen || !mounted) return null;

  const etape = etapes[currentStep];
  const isLastStep = currentStep === etapes.length - 1;
  const progressPct = ((currentStep + 1) / etapes.length) * 100;

  const formatTime = (seconds: number | undefined) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
}

// Helper cn pour les classes (si tu ne l'as pas déjà importé)
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
