"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/app/lib/gsap";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/app/lib/utils";
import { useLenis } from "lenis/react";

const HOLD_SPEED_PX_PER_S = 500;

const HOLD_AFTER_MS = 180;

type Props = {
  className?: string;
};

/** Scrolls via Lenis on gsap.ticker: a second writer or a separate rAF would judder. */
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

  // Without this the ticker callback outlives unmount and scrolls forever
  useEffect(() => stop, [stop]);

  const startHold = useCallback(() => {
    if (!lenis) return;

    // targetScroll (not scroll) keeps the distance between frames; immediate stops each
    // frame from starting a fresh tween, which would pulse instead of flow.
    const step = (_time: number, deltaTime: number) => {
      lenis.scrollTo(lenis.targetScroll + (HOLD_SPEED_PX_PER_S * deltaTime) / 1000, { immediate: true });
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

    // Lenis forces immediate for programmatic scrolls under prefers-reduced-motion
    lenis.scrollTo(lenis.targetScroll + window.innerHeight * 0.9, { duration: 2 });
  }, [lenis]);

  const handlePointerUp = useCallback(() => {
    const wasClick = holdTimeout.current !== null;
    stop();
    if (wasClick) scrollOneScreen();
  }, [scrollOneScreen, stop]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      // detail === 0 means keyboard: a mouse click was already handled by handlePointerUp
      if (event.detail === 0) scrollOneScreen();
    },
    [scrollOneScreen]
  );

  return (
    <button
      type="button"
      aria-label="Scroll down"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={stop}
      onPointerLeave={stop}
      onClick={handleClick}
      className={cn(
        // touch-none: otherwise a touch hold scrolls natively alongside our loop
        "fixed right-6 bottom-6 z-50 hidden size-12 touch-none items-center justify-center md:flex",
        "border bg-white/5 backdrop-blur-sm transition-colors hover:border-primary/80 hover:bg-primary/30",
        className
      )}
    >
      <HugeiconsIcon icon={ArrowDown01Icon} size={24} />
    </button>
  );
}
