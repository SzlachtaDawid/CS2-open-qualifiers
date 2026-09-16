import { Arrow } from "@/app/_components/arrows/Arrow";
import { Title } from "@/app/_components/copy/Title";

export const Header = () => {
  return (
    <header className="mt-15 flex flex-col items-center text-center text-shadow-lg">
      <div className="my-2 flex items-center gap-4 text-xs tracking-widest">
        <Arrow direction="left" />
        <p className="uppercase">Counter-Strike 2 · Open Qualifiers</p>
        <Arrow direction="right" />
      </div>
      <Title copy="Accept the" coloredCopy="challenge" />
    </header>
  );
};
