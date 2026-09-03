import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Background } from "./_components/background/Background";

// globals.css maps --font-heading / --font-jetbrains onto Tailwind's font-heading and font-sans.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "CS2 Tournament",
  description: "Turniej Counter-Strike 2 — zapisy drużyn.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={cn("h-full antialiased", barlowCondensed.variable, jetbrainsMono.variable)}>
      <body className="flex min-h-full flex-col font-sans">
        <Background />
        {children}
      </body>
    </html>
  );
}
