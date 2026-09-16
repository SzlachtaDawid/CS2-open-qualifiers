import Image from "next/image";

type Props = {
  src: string;
  copy: string;
  alt: string;
  id?: string;
};

const ImageCell = ({ src, copy, alt, id }: Props) => {
  return (
    <div className="flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 border bg-white/5" id={id}>
      <Image alt={alt} src={src} height={50} width={50} />
      <p>{copy}</p>
    </div>
  );
};

export default ImageCell;
