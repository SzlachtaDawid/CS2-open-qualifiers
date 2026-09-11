import { cn } from "@/lib/utils";
import Image from "next/image";
import style from "../styles.module.css";

const Faces = () => {
  return (
    <>
      <div className={cn(style.dark_bottom_full, style.face_fade_out, "absolute bottom-[-100] left-[-600]")}>
        <Image src="/images/ct_sas_face.webp" alt="" width={1000} height={1000} />
      </div>
      <div className={cn(style.dark_bottom_full, style.face_fade_out, "absolute right-[-600] bottom-[-100]")}>
        <Image src="/images/tt_phoenix_face.webp" alt="" width={1000} height={1000} />
      </div>
    </>
  );
};

export default Faces;
