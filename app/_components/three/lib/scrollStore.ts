import { create } from "zustand";

export type SectionKey = "about" | "prizes" | "venue" | "join";

type ScrollState = {
  /** 0 = entering the section, 1 = leaving. Keyed because several 3D scenes share the page. */
  progress: Record<SectionKey, number>;
};

export const useScrollStore = create<ScrollState>(() => ({
  progress: { about: 0, prizes: 0, venue: 0, join: 0 },
}));

/** Written outside React on every scroll event — via useState this would re-render per pixel. */
export const setScrollProgress = (key: SectionKey, progress: number) =>
  useScrollStore.setState((state) => ({ progress: { ...state.progress, [key]: progress } }));

export const getScrollProgress = (key: SectionKey) => useScrollStore.getState().progress[key];
