import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import style from "./styles.module.css";

type Props = {
  /** Grubość taśmy w pikselach. Domyślnie 25. */
  width?: number;
};

/**
 * Pionowe taśmy przy lewej i prawej krawędzi sekcji.
 *
 * WYMAGA rodzica z `relative` i określoną wysokością — taśma rozpina się przez
 * `top: 0; bottom: 0`, więc w kontenerze bez wysokości nie ma się o co oprzeć.
 *
 * Renderuj po canvasie, a przed treścią: wszystkie trzy warstwy są pozycjonowane
 * bez `z-index`, więc o kolejności malowania decyduje kolejność w DOM.
 */
export function TapeBorders({ width = 25 }: Props) {
  // custom property zamiast czterech osobnych liczb w CSS — patrz komentarz w module
  const vars = { "--tape-width": `${width}px` } as CSSProperties;

  return (
    <>
      <div className={cn(style.tape, style.left)} style={vars} aria-hidden />
      <div className={cn(style.tape, style.right)} style={vars} aria-hidden />
    </>
  );
}
