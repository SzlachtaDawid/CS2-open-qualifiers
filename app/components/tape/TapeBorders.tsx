import type { CSSProperties } from "react";
import { cn } from "@/app/lib/utils";
import style from "./styles.module.css";

type Props = {
  width?: number;
};

/**
 * REQUIRES a `relative` parent with a height — the tape spans it via `top: 0; bottom: 0`.
 * Render after the canvas and before the content: with no `z-index`, DOM order paints.
 */
export function TapeBorders({ width = 25 }: Props) {
  const vars = { "--tape-width": `${width}px` } as CSSProperties;

  return (
    <>
      <div className={cn(style.tape, style.left)} style={vars} aria-hidden />
      <div className={cn(style.tape, style.right)} style={vars} aria-hidden />
    </>
  );
}
