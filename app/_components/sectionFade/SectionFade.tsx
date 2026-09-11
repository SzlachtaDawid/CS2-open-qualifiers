import { cn } from "@/lib/utils";
import style from "./styles.module.css";

type SectionFadeProps = {
  /** "bottom" (domyślnie) wygasza dolną krawędź sekcji, "top" górną. */
  side?: "top" | "bottom";
  /** Wysokość przejścia w pikselach. */
  height?: number;
  className?: string;
};

/**
 * Miękkie przejście na krawędzi sekcji.
 *
 * Leży w warstwie absolutnej, więc nie zajmuje miejsca w layoucie i nie przesuwa treści.
 * WYMAGA rodzica z `relative` — inaczej przyklei się do pierwszego pozycjonowanego
 * przodka wyżej i wyląduje w losowym miejscu.
 */
export function SectionFade({ side = "bottom", height = 120, className }: SectionFadeProps) {
  return (
    <div
      aria-hidden
      className={cn(style.fade, side === "top" && style.top, className)}
      // liczba w style => React sam dopisze "px", więc nie da się zgubić jednostki
      style={{ height }}
    />
  );
}
