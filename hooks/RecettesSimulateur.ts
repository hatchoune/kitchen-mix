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
import { useVoiceCommand } from "@/hooks/useVoiceCommand"; // <-- NOUVEAU HOOK

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

  // ─── Contrôle vocal ────────────────────────────────────────────
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const handleVoiceCommand = useCallback((command: string) => {
    // Le hook appelle déjà la fonction, mais on pourrait logger ici si besoin
    console.log(`[Voice] Commande reconnue: ${command}`);
  }, []);

  const { isListening, error: voiceError, isSupported } = useVoiceCommand({
    enabled: voiceEnabled && isOpen, // Actif seulement si le modal est ouvert et le toggle activé
    lang: "fr-FR",
    commands: {
      "suivant": goNext,
      "avance": goNext,
      "ok": goNext,
      "précédent": goPrev,
      "retour": goPrev,
    },
    onCommand: handleVoiceCommand,
  });

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

  // ─── Reset au step 0 à chaque ouverture ───────────────────────────
  useEffect(() => {
    if (isOpen) setCurrentStep(0);
    // Désactiver le micro quand on ferme le modal
    if (!isOpen) setVoiceEnabled(false);
  }, [isOpen]);

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

  const content = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
      }}
      className="bg-neutral-950 text-white overscroll-none flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mode cuisine guidée"
    >
      {/* ─── Overlay rotation (mobile portrait uniquement) ─────────── */}
      {isPortrait && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 110,
          }}
          className="bg-black flex flex-col items-center justify-center p-6 text-center overscroll-none"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-3 bg-accent text-black hover:bg-accent-hover active:scale-95 rounded-full transition-all shadow-lg shadow-accent/30"
            aria-label="Fermer le mode guidé"
          >
            <X className="w-6 h-6" strokeWidth={3} />
          </button>
          <div className="animate-bounce mb-4 text-accent">
            <RotateCw className="w-16 h-16" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            Mode Cuisine Guidée
          </h2>
          <p className="text-gray-400">
            Veuillez pivoter votre téléphone en mode paysage pour cuisiner avec
            confort.
          </p>
        </div>
      )}

      {/* ─── HEADER ─────────────────────────────────────────────────── */}
      <header className="shrink-0 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center gap-2 px-2 py-2 sm:px-3">
          <button
            onClick={onClose}
            className="shrink-0 p-2 bg-accent text-black hover:bg-accent-hover active:scale-95 rounded-full transition-all shadow-md shadow-accent/20"
            aria-label="Fermer le mode guidé"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>

          <h3 className="flex-1 font-display font-bold text-xs sm:text-sm truncate min-w-0">
            {titre}
          </h3>

          {/* ─── BOUTON CONTRÔLE VOCAL ───────────────────────────────── */}
          {isSupported && (
            <button
              onClick={() => setVoiceEnabled((prev) => !prev)}
              className={cn(
                "shrink-0 p-2 rounded-full transition-all shadow-md relative",
                voiceEnabled
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white/10 text-gray-400 hover:bg-white/20"
              )}
              aria-label={voiceEnabled ? "Désactiver le contrôle vocal" : "Activer le contrôle vocal"}
              title={voiceEnabled ? "Micro actif - Dites 'Suivant' ou 'Précédent'" : "Activer la commande vocale"}
            >
              {voiceEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              {isListening && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>
          )}

          <div className="shrink-0 text-[10px] sm:text-xs font-mono bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/30 whitespace-nowrap">
            {currentStep + 1} / {etapes.length}
          </div>

          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="shrink-0 flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all text-xs font-medium"
            aria-label="Étape précédente"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <button
            onClick={() => (isLastStep ? onClose() : goNext())}
            className="shrink-0 flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-accent text-black hover:scale-105 active:scale-95 transition-all text-xs font-bold shadow-md shadow-accent/20"
            aria-label={isLastStep ? "Terminer" : "Étape suivante"}
          >
            <span className="hidden sm:inline">
              {isLastStep ? "Terminer" : "Suivant"}
            </span>
            {isLastStep ? (
              <Check className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Petite alerte si erreur micro */}
        {voiceError && voiceEnabled && (
          <div className="text-[10px] text-red-400 text-center pb-1">
            {voiceError}
          </div>
        )}

        <div className="h-1 w-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.4)] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* ─── ZONE CENTRALE ──────────────────────────────────────────── */}
      <main
        className="flex-1 overflow-y-auto overscroll-contain p-3 lg:p-8 flex flex-col items-center justify-center gap-3 lg:gap-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex gap-3 sm:gap-12 justify-center w-full">
          <CircleParam
            icon={Timer}
            value={formatTime(etape.duree)}
            label="Temps"
          />
          <CircleParam
            icon={Thermometer}
            value={etape.temperature || "---"}
            unit="°"
            label="Temp"
          />
          <CircleParam
            icon={Gauge}
            value={etape.vitesse || "0"}
            label="Vitesse"
          />
        </div>

        <div className="max-w-4xl w-full text-center px-2">
          <p className="text-sm sm:text-xl font-medium leading-relaxed text-balance">
            {etape.instruction}
          </p>
          {etape.accessoire && (
            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
              <UtensilsCrossed className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">
                {etape.accessoire}
              </span>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  // Render via Portal
  return createPortal(content, document.body);
}

function CircleParam({ icon: Icon, value, unit, label }: any) {
  return (
    <div className="flex flex-col items-center gap-1 lg:gap-2">
      <div className="w-16 h-16 lg:w-32 lg:h-32 rounded-full border-2 border-white/10 flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm">
        <Icon className="w-3 h-3 lg:w-6 lg:h-6 text-accent/60 mb-0.5" />
        <span className="text-sm lg:text-4xl font-bold font-display">
          {value}
          {unit}
        </span>
      </div>
      <span className="text-[8px] lg:text-[11px] uppercase tracking-[0.2em] text-gray-500 font-black">
        {label}
      </span>
    </div>
  );
}

// Helper cn pour les classes (si tu ne l'as pas déjà importé)
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}