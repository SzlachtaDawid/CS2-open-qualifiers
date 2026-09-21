import { Describe } from "@/app/components/copy/Describe";
import { Title } from "@/app/components/copy/Title";

export const Header = () => {
  return (
    <div>
      <Title copy="Sign up your" coloredCopy="Team" component="h1" />
      <Describe copy="Eight-team open bracket. Submit your five-player lineup below to claim your qualifier slot." />
    </div>
  );
};
