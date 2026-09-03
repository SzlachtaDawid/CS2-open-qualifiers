import { cn } from "@/lib/utils";
import style from "./styles.module.css";

type Props = {
  direction: "left" | "right";
};

const Arrow = ({ direction }: Props) => {
  return <span className={cn(style.arrow, direction === "left" ? style.left : style.right)} />;
};

export default Arrow;
