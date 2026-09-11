import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  variant: "ct" | "tt";
  /** Dokąd prowadzi. Domyślne "#" zostawia przycisk bez nawigacji. */
  href?: string;
};

const Button = ({ text, variant, href = "#" }: Props) => {
  return (
    // next/link zamiast <a>: nawigacja po stronie klienta i prefetch trasy formularza
    <Link
      href={href}
      role="button"
      className={cn(
        "min-w-[300] border bg-white/5 p-4 text-center uppercase",
        variant === "ct" ? "hover:border-primary/80" : "hover:border-accent/80",
        variant === "ct" ? "hover:bg-primary/30" : "hover:bg-accent/30"
      )}
    >
      {text}
    </Link>
  );
};

export default Button;
