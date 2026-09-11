type Props = {
  copy: string;
  id?: string;
};

const Describe = ({ copy, id }: Props) => {
  return (
    <div className="mx-auto my-2 mt-5 max-w-[400] text-center text-sm" id={id}>
      <p>{copy}</p>
    </div>
  );
};

export default Describe;
