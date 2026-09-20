import { cn } from "@/app/lib/utils";
import Image from "next/image";
import style from "./styles.module.css";

export const Faces = () => {
  return (
    <>
      <div className={cn(style.dark_bottom_full, style.face_fade_out, "absolute bottom-[-100px] left-[-600px]")}>
        <Image src="/images/ct_sas_face.webp" alt="" width={1000} height={1000} />
      </div>
      <div className={cn(style.dark_bottom_full, style.face_fade_out, "absolute right-[-600px] bottom-[-100px]")}>
        <Image src="/images/tt_phoenix_face.webp" alt="" width={1000} height={1091} />
      </div>
    </>
  );
};
