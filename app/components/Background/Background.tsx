import Image from "next/image";
import { cn } from "@/app/lib/utils";
import style from "./styles.module.css";

export function Background() {
  return (
    <>
      <div className="fixed top-0 left-0 flex h-dvh w-full items-center justify-center bg-black">
        <Image
          src="/images/backgroundImage.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          className={cn(style.background_photo, "-z-10 object-cover")}
        />
        <div className={cn("absolute inset-0", style.background_grid)} />
        <div className={cn("h-full w-full", style.background_blue_orange)} />
      </div>
      <div className={cn("fixed bottom-0 z-2 h-1/2 w-full", style.dark_bottom)} />
    </>
  );
}
