import { cn } from "@/lib/utils";
import style from "../styles.module.css";
import Arrow from "../../arrows/Arrow";

const Title = () => {
  return (
    <header className="mt-15 flex flex-col items-center text-center uppercase text-shadow-lg">
      <div className="my-2 flex items-center gap-4 text-xs tracking-widest">
        <Arrow direction="left" />
        <p>Counter-Strike 2 · Open Qualifiers</p>
        <Arrow direction="right" />
      </div>
      <h1 className="text-8xl font-bold">
        Accept the
        <br />
        <span className={cn(style.text_background_colors, "font-bold text-transparent")}>challenge</span>
      </h1>
    </header>
  );
};

export default Title;
