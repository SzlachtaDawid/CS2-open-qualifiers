import { cn } from "@/lib/utils";

type Props = {
  text: string;
  variant: "ct" | "tt";
};

const Button = ({ text, variant }: Props) => {
  return (
    <a
      href="#"
      role="button"
      className={cn(
        "min-w-[300] border bg-white/5 p-4 text-center uppercase",
        variant === "ct" ? "hover:border-primary/80" : "hover:border-accent/80",
        variant === "ct" ? "hover:bg-primary/30" : "hover:bg-accent/30"
      )}
    >
      {text}
    </a>
  );
};

export default Button;
