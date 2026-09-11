import { create } from "zustand";

/** Sekcje sterowane scrollem. Każda ma własny postęp — patrz komentarz przy `progress`. */
export type SectionKey = "about" | "prizes" | "venue" | "join";

type ScrollState = {
  /**
   * Postęp scrollowania per sekcja: 0 = wejście w sekcję, 1 = wyjście.
   *
   * Klucz jest konieczny, bo na stronie stoi więcej niż jedna scena 3D. Przy jednej
   * wspólnej liczbie ScrollTriggery kolejnych sekcji nadpisywałyby się nawzajem
   * i model w sekcji, przez którą właśnie nie przewijasz, skakałby po kadrze.
   */
  progress: Record<SectionKey, number>;
};

export const useScrollStore = create<ScrollState>(() => ({
  progress: { about: 0, prizes: 0, venue: 0, join: 0 },
}));

/**
 * Zapis postępu POZA Reactem — ScrollTrigger woła to na każdym zdarzeniu scrolla.
 * Celowo przez setState na obiekcie store'a, a nie przez hooka: gdyby postęp szedł
 * przez useState, każdy piksel scrolla powodowałby re-render drzewa Reacta.
 */
export const setScrollProgress = (key: SectionKey, progress: number) =>
  useScrollStore.setState((state) => ({ progress: { ...state.progress, [key]: progress } }));

/** Odczyt w useFrame (60 fps) — getState() nie subskrybuje, więc nie re-renderuje. */
export const getScrollProgress = (key: SectionKey) => useScrollStore.getState().progress[key];
