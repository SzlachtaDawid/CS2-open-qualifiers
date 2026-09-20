import { cn } from "@/app/lib/utils";
import style from "./styles.module.css";

type Props = {
  direction: "left" | "right";
};

export const Arrow = ({ direction }: Props) => {
  return <span className={cn(style.arrow, direction === "left" ? style.left : style.right)} />;
};
