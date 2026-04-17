"use client";

import { useState, useEffect } from "react";
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
import Modal from "@/components/ui/Modal";
import type { EtapeThermomix } from "@/types";

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

  // Détection de l'orientation pour le mobile
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

  if (!isOpen) return null;

  const etape = etapes[currentStep];
  const isLastStep = currentStep === etapes.length - 1;

  const formatTime = (seconds: number | undefined) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} fullScreen>
      {/* 1. ALERTE ROTATION (Mobile Portrait uniquement) */}
      {isPortrait && (
        <div className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center p-6 text-center overscroll-none">
          {/* Croix BIEN VISIBLE pour sortir même en portrait */}
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

      {/* 2. CONTENU DU SIMULATEUR — Full Screen stable.
          `h-full` hérite de la hauteur bornée par le Modal parent (100dvh),
          donc plus aucun débordement sous la toolbar iOS. */}
      <div className="flex flex-col h-full bg-neutral-950 text-white overflow-hidden overscroll-none">
        {/* Header */}
        <div className="grid grid-cols-3 items-center gap-2 p-2 lg:p-4 border-b border-white/10 bg-black/50 shrink-0">
          {/* Gauche : croix de sortie BIEN VISIBLE (fond accent) + titre */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="p-2.5 bg-accent text-black hover:bg-accent-hover active:scale-95 rounded-full shrink-0 transition-all shadow-lg shadow-accent/20"
              aria-label="Fermer le mode guidé"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
            </button>
            <h3 className="font-display font-bold text-sm truncate">{titre}</h3>
          </div>
          {/* Centre : étape X/Y */}
          <div className="flex justify-center">
            <div className="text-xs font-mono bg-accent/20 text-accent px-3 py-1 rounded-full border border-accent/30 whitespace-nowrap">
              ÉTAPE {currentStep + 1} / {etapes.length}
            </div>
          </div>
          {/* Droite : vide pour équilibrer */}
          <div />
        </div>

        {/* Zone Centrale */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-2 lg:p-8 flex flex-col items-center justify-center gap-3 lg:gap-10">
          {/* Les 3 Ronds style Thermomix */}
          <div className="flex gap-3 sm:gap-12 justify-center w-full">
            {/* @ts-ignore - duree peut être undefined selon tes données */}
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

          {/* L'Instruction */}
          <div className="max-w-4xl w-full text-center px-2">
            <p className="text-sm sm:text-xl font-medium leading-relaxed text-balance">
              {etape.instruction}
            </p>
            {etape.accessoire && (
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 text-accent border border-accent/20">
                <UtensilsCrossed className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  {etape.accessoire}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 pb-safe max-md:pb-8 lg:pb-6 bg-black/80 border-t border-white/5 flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-20 transition-all text-sm font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          {/* Barre de progression */}
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)] transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / etapes.length) * 100}%` }}
            />
          </div>

          <button
            onClick={() =>
              !isLastStep ? setCurrentStep(currentStep + 1) : onClose()
            }
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent text-black hover:scale-105 active:scale-95 transition-all text-sm font-bold shadow-lg shadow-accent/20"
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
      </div>
    </Modal>
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
