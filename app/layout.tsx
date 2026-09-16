import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Background } from "./_components/background/Background";
import { ReactLenis } from "lenis/react";
import { SmoothScroll } from "./_components/three/SmoothScroll";
import { SceneCanvas } from "./_components/three/SceneCanvas";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "CS2 Tournament",
  description: "Counter-Strike 2 tournament — team sign-ups.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", barlowCondensed.variable, jetbrainsMono.variable)}>
      <body className="flex min-h-full flex-col font-sans">
        <Background />
        <ReactLenis root options={{ autoRaf: false }} />
        <SmoothScroll />
        <SceneCanvas />
        {children}
      </body>
    </html>
  );
}
