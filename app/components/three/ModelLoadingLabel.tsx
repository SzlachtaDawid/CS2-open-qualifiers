import type { CSSProperties } from "react";
import { cn } from "@/app/lib/utils";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export function ModelLoadingLabel({ className, style }: Props) {
  return (
    <span
      className={cn("animate-pulse text-xs tracking-widest whitespace-nowrap text-white/60 uppercase", className)}
      style={style}
    >
      Loading model
    </span>
  );
}
