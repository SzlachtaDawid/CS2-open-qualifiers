"use client";

import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";

/** Prędkość przewijania przy przytrzymaniu, w pikselach na sekundę. */
const HOLD_SPEED = 500;

/** Po tylu milisekundach wciśnięcie przestaje być klikiem, a staje się trzymaniem. */
const HOLD_AFTER_MS = 180;

type Props = {
  className?: string;
};

/**
 * Przycisk przewijający stronę w dół: klik przesuwa o jeden ekran, przytrzymanie
 * jedzie płynnie, dopóki go nie puścisz.
 *
 * Scroll idzie przez Lenisa, a nie przez window.scrollTo — Lenis trzyma własną
 * pozycję docelową i dwóch piszących do niej naraz daje szarpanie. Pętla trzymania
 * wisi na `gsap.ticker`, czyli na tym samym zegarze, który napędza Lenisa; własny
 * requestAnimationFrame rozjeżdżałby się z nim o klatkę.
 */
export function ScrollButton({ className }: Props) {
  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tick = useRef<((time: number, deltaTime: number) => void) | null>(null);
  const lenis = useLenis();

  const stop = useCallback(() => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
    if (tick.current) {
      gsap.ticker.remove(tick.current);
      tick.current = null;
    }
  }, []);

  // Bez tego callback tickera przeżywa odmontowanie i przewija stronę w nieskończoność
  useEffect(() => stop, [stop]);

  const startHold = useCallback(() => {
    if (!lenis) return;

    // deltaTime z tickera GSAP jest w milisekundach.
    // targetScroll, nie scroll: to pozycja, do której Lenis już zmierza, więc
    // doliczanie do niej nie gubi dystansu między klatkami.
    // immediate wyłącza wygładzanie — bez tego każda klatka startowałaby nowy
    // tween do nowego celu i ruch by pulsował zamiast płynąć.
    const step = (_time: number, deltaTime: number) => {
      lenis.scrollTo(lenis.targetScroll + (HOLD_SPEED * deltaTime) / 1000, { immediate: true });
    };

    tick.current = step;
    gsap.ticker.add(step);
  }, [lenis]);

  const handlePointerDown = useCallback(() => {
    stop();
    holdTimeout.current = setTimeout(() => {
      holdTimeout.current = null;
      startHold();
    }, HOLD_AFTER_MS);
  }, [startHold, stop]);

  const scrollOneScreen = useCallback(() => {
    if (!lenis) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lenis.scrollTo(lenis.targetScroll + window.innerHeight * 0.9, {
      duration: 2,
      immediate: reduced,
    });
  }, [lenis]);

  const handlePointerUp = useCallback(() => {
    // Timeout jeszcze nie wystrzelił, czyli to było krótkie kliknięcie, nie trzymanie
    const wasClick = holdTimeout.current !== null;
    stop();
    if (wasClick) scrollOneScreen();
  }, [scrollOneScreen, stop]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      // Klawiatura nie generuje pointerdown, więc Enter i spacja muszą trafić tutaj.
      // detail === 0 odróżnia klik z klawiatury od tego wywołanego myszą, który
      // obsłużył już handlePointerUp — bez tego strona przewijałaby się dwa razy.
      if (event.detail === 0) scrollOneScreen();
    },
    [scrollOneScreen]
  );

  return (
    <button
      type="button"
      aria-label="Przewiń w dół"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={stop}
      onPointerLeave={stop}
      onClick={handleClick}
      className={cn(
        // touch-none: bez tego przytrzymanie na dotyku przewija stronę natywnie
        // RÓWNOCZEŚNIE z naszą pętlą i strona ucieka dwa razy szybciej
        "fixed right-6 bottom-6 z-50 flex size-12 touch-none items-center justify-center",
        "border bg-white/5 backdrop-blur-sm transition-colors hover:border-primary/80 hover:bg-primary/30",
        className
      )}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} size={24} />
    </button>
  );
}
