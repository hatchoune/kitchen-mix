"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PHRASES = [
  "Enfin un seul site pour tous vos robots !",
  "Thermomix, Companion, Airfryer, Cookeo et plus encore.",
  "Votre planificateur de repas devient universel.",
];

const TYPING_SPEED = 50;
const PAUSE_BETWEEN = 2000;
const VAPORIZE_LETTER_DELAY = 20;

export default function RotatingTypewriter() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isVaporizing, setIsVaporizing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const vaporizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Effet de frappe (uniquement si l'animation n'est pas terminée)
  useEffect(() => {
    if (isFinished) return;

    const currentPhrase = PHRASES[phraseIndex];

    const tick = () => {
      if (!isVaporizing) {
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        } else {
          // Fin de frappe : programme la vaporisation après une pause
          vaporizeTimerRef.current = setTimeout(() => {
            setIsVaporizing(true);
          }, PAUSE_BETWEEN);
          return;
        }
      }

      if (!isVaporizing) {
        timeoutRef.current = setTimeout(tick, TYPING_SPEED);
      }
    };

    // Nettoie les anciens timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (vaporizeTimerRef.current) clearTimeout(vaporizeTimerRef.current);

    // Démarre la frappe
    timeoutRef.current = setTimeout(tick, TYPING_SPEED);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (vaporizeTimerRef.current) clearTimeout(vaporizeTimerRef.current);
    };
  }, [displayText, isVaporizing, phraseIndex, isFinished]);

  // Callback quand toutes les lettres d'une phrase se sont évaporées
  const handleVaporizeComplete = () => {
    setIsVaporizing(false);
    setDisplayText("");

    // Si on vient de terminer la troisième phrase (index 2), on passe en mode "fini"
    if (phraseIndex === PHRASES.length - 1) {
      setIsFinished(true);
    } else {
      setPhraseIndex((prev) => prev + 1);
    }
  };

  // Rendu final : "Kitchen Mix" en orange, fixe
  if (isFinished) {
    return (
      <h1 className="font-display font-bold max-w-3xl mx-auto text-4xl sm:text-5xl md:text-6xl text-accent">
        Kitchen Mix
      </h1>
    );
  }

  // Rendu pendant l'animation
  return (
    <h1 className="font-display font-bold max-w-3xl mx-auto text-3xl sm:text-4xl min-h-[4.5rem] sm:min-h-[6rem] flex items-center justify-center">
      <span className="relative inline-block">
        <AnimatePresence mode="wait">
          {!isVaporizing ? (
            <motion.span
              key={`typing-${phraseIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-foreground"
            >
              {displayText}
              <span
                className={cn(
                  "ml-1 inline-block w-[2px] h-[1.2em] -mb-1 bg-accent",
                  "animate-pulse",
                )}
              />
            </motion.span>
          ) : (
            <motion.span
              key={`vaporizing-${phraseIndex}`}
              className="text-foreground inline-block"
            >
              {displayText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  animate={{
                    opacity: 0,
                    y: -20,
                    filter: "blur(4px)",
                    transition: {
                      delay: index * (VAPORIZE_LETTER_DELAY / 1000),
                      duration: 0.2,
                    },
                  }}
                  onAnimationComplete={
                    index === displayText.length - 1
                      ? handleVaporizeComplete
                      : undefined
                  }
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </h1>
  );
}
