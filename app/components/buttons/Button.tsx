"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { cn } from "@/app/lib/utils";

type Props = {
  text: string;
  variant: "ct" | "tt";
  href?: string;
  type?: "submit" | "button";
  disabled?: boolean;
  fill?: boolean;
  className?: string;
};

const isHash = (href: string) => href.startsWith("#");
const isExternal = (href: string) => /^https?:\/\//.test(href);

export const Button = ({ text, variant, href, type = "button", disabled, fill, className }: Props) => {
  const lenis = useLenis();

  const classes = cn(
    "min-w-[300px] border p-4 text-center uppercase transition-colors",
    fill && variant === "ct" && "border-primary bg-primary text-primary-foreground hover:bg-primary/80",
    fill && variant === "tt" && "border-accent bg-accent text-accent-foreground hover:bg-accent/80",
    !fill && "bg-white/5",
    !fill && variant === "ct" && "hover:border-primary/80 hover:bg-primary/30",
    !fill && variant === "tt" && "hover:border-accent/80 hover:bg-accent/30",
    className
  );

  if (!href) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={cn(classes, "disabled:cursor-not-allowed disabled:opacity-50")}
      >
        {text}
      </button>
    );
  }

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {text}
      </a>
    );
  }

  if (isHash(href)) {
    // preventDefault is required: the native hash jump sets scroll instantly and
    // fights Lenis for a frame. Before hydration, fall through to the native jump.
    return (
      <a
        href={href}
        className={classes}
        onClick={(event) => {
          if (!lenis) return;
          event.preventDefault();
          lenis.scrollTo(href, { duration: 2.5 });
        }}
      >
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {text}
    </Link>
  );
};
