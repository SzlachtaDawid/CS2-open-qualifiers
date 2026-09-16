import { Describe } from "../../copy/Describe";
import { Title } from "../../copy/Title";

export const PrizesCopy = () => {
  return (
    <>
      <Title copy="What you" coloredCopy="can win" component="h2" id="prizes-title" />
      <div className="mx-auto max-w-[400px]">
        <Describe
          copy="The prize pool grows with every sponsor we bring on board, and it is split across the podium — second and third place walk away with something too."
          id="prize-pool"
        />
        <Describe
          copy="On top of the cash, every player who finishes on the podium picks a CS2 skin from the tournament case."
          id="prize-skins"
        />
      </div>
    </>
  );
};
