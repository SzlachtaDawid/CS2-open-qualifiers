"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { cn } from "@/app/lib/utils";

type Props = {
  text: string;
  variant: "ct" | "tt";
  href: string;
};

const isHash = (href: string) => href.startsWith("#");
const isExternal = (href: string) => /^https?:\/\//.test(href);

export const Button = ({ text, variant, href }: Props) => {
  const lenis = useLenis();

  const className = cn(
    "min-w-[300px] border bg-white/5 p-4 text-center uppercase",
    variant === "ct" ? "hover:border-primary/80 hover:bg-primary/30" : "hover:border-accent/80 hover:bg-accent/30"
  );

  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
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
        className={className}
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
    <Link href={href} className={className}>
      {text}
    </Link>
  );
};
