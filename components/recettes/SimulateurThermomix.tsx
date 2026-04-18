"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
} from "lucide-react";
import type { EtapeThermomix } from "@/types";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
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
  const { request: requestWakeLock, release: releaseWakeLock } = useWakeLock();
  const touchStartX = useRef<number | null>(null);
  const pushedHistoryRef = useRef(false);

  // Lock scroll du body tant que la fenêtre est ouverte
  useBodyScrollLock(isOpen);

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
  }, [isOpen]);

  // ─── WakeLock : maintient l'écran allumé pendant la cuisson ───────
  useEffect(() => {
    if (!isOpen) return;
    requestWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, [isOpen, requestWakeLock, releaseWakeLock]);

  // ─── Bouton RETOUR Android : empile un state, popstate = fermeture ─
  useEffect(() => {
    if (!isOpen) return;

    window.history.pushState({ kmxSimulateur: true }, "");
    pushedHistoryRef.current = true;

    const onPop = () => {
      // Le back a déjà consommé notre state, on ne doit pas refaire history.back()
      pushedHistoryRef.current = false;
      onClose();
    };

    window.addEventListener("popstate", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      // Si fermeture via croix/escape, on consomme notre state pour ne pas
      // laisser une entrée fantôme dans l'historique
      if (pushedHistoryRef.current) {
        pushedHistoryRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  // ─── Navigation ────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentStep((s) => Math.min(etapes.length - 1, s + 1));
  }, [etapes.length]);

  const goPrev = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  // ─── Raccourcis clavier (desktop) ──────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, goNext, goPrev]);

  // ─── Swipe horizontal (mobile) ─────────────────────────────────────
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

  if (!isOpen) return null;

  const etape = etapes[currentStep];
  const isLastStep = currentStep === etapes.length - 1;
  const progressPct = ((currentStep + 1) / etapes.length) * 100;

  const formatTime = (seconds: number | undefined) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="fixed inset-0 z-[100] h-[100dvh] w-[100vw] bg-neutral-950 text-white overscroll-none flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mode cuisine guidée"
    >
      {/* ─── Overlay rotation (mobile portrait uniquement) ─────────── */}
      {isPortrait && (
        <div className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center p-6 text-center overscroll-none">
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

      {/* ─── HEADER : tout en haut (croix + titre + étape + nav) ───── */}
      <header className="shrink-0 bg-black/80 backdrop-blur-sm border-b border-white/10">
        {/* Ligne de contrôles */}
        <div className="flex items-center gap-2 px-2 py-2 sm:px-3">
          {/* Croix sortie */}
          <button
            onClick={onClose}
            className="shrink-0 p-2 bg-accent text-black hover:bg-accent-hover active:scale-95 rounded-full transition-all shadow-md shadow-accent/20"
            aria-label="Fermer le mode guidé"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>

          {/* Titre (tronqué) */}
          <h3 className="flex-1 font-display font-bold text-xs sm:text-sm truncate min-w-0">
            {titre}
          </h3>

          {/* Compteur étape X / Y */}
          <div className="shrink-0 text-[10px] sm:text-xs font-mono bg-accent/20 text-accent px-2.5 py-1 rounded-full border border-accent/30 whitespace-nowrap">
            {currentStep + 1} / {etapes.length}
          </div>

          {/* Précédent */}
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="shrink-0 flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all text-xs font-medium"
            aria-label="Étape précédente"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          {/* Suivant / Terminer */}
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

        {/* Barre de progression (pleine largeur, sous les contrôles) */}
        <div className="h-1 w-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-accent shadow-[0_0_10px_rgba(var(--accent-rgb),0.4)] transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* ─── ZONE CENTRALE : étape courante ─────────────────────────── */}
      <main
        className="flex-1 overflow-y-auto overscroll-contain p-3 lg:p-8 flex flex-col items-center justify-center gap-3 lg:gap-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* 3 ronds Thermomix : Temps | Temp | Vitesse */}
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

        {/* Instruction */}
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
