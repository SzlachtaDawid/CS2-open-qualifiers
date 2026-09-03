export const DEFAULT_CLIP = "Jump";

/**
 * Wybiera nazwę klipu animacji do odtworzenia.
 * Gdy preferowanego klipu nie ma w modelu, spada do pierwszego dostępnego,
 * żeby scena nie została bez animacji po wymianie pliku .glb.
 */
export function pickClip(names: string[], preferred: string = DEFAULT_CLIP): string | null {
  if (names.includes(preferred)) return preferred;
  return names[0] ?? null;
}
