type Props = {
  copy: string;
  id?: string;
};

export const Describe = ({ copy, id }: Props) => {
  return (
    <div className="mx-auto my-2 mt-5 max-w-[400px] text-center text-sm" id={id}>
      <p>{copy}</p>
    </div>
  );
};
