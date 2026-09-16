import { cn } from "@/lib/utils";
import style from "./styles.module.css";

type SectionFadeProps = {
  side?: "top" | "bottom";
  height?: number;
  className?: string;
};

/** Absolutely positioned — REQUIRES a `relative` parent or it attaches to one further up. */
export function SectionFade({ side = "bottom", height = 120, className }: SectionFadeProps) {
  return <div aria-hidden className={cn(style.fade, side === "top" && style.top, className)} style={{ height }} />;
}
