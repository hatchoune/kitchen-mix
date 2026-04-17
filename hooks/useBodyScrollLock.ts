"use client";

import { useEffect } from "react";

/**
 * Verrouille le scroll du body de manière AGRESSIVE (position: fixed)
 * pour empêcher la barre d'adresse et les onglets mobiles (Chrome Android,
 * iOS Safari) de bouger pendant qu'un modal est ouvert.
 *
 * Sauvegarde et restaure la position de scroll à la fermeture.
 *
 * Usage :
 *   useBodyScrollLock(modalIsOpen);
 */
export function useBodyScrollLock(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const prev = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";

    return () => {
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.left = prev.bodyLeft;
      body.style.right = prev.bodyRight;
      body.style.width = prev.bodyWidth;
      body.style.overflow = prev.bodyOverflow;
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;

      // Restaure la position de scroll exacte
      window.scrollTo(0, scrollY);
    };
  }, [isActive]);
}
