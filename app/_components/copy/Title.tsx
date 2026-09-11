type Props = {
  copy: string;
  coloredCopy: string;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
};

const Title = ({ copy, coloredCopy, component: Tag = "h1", id }: Props) => {
  return (
    <Tag className="text-center text-8xl font-bold uppercase" id={id}>
      {copy}
      <br />
      <span className="text_background_colors font-bold text-transparent">{coloredCopy}</span>
    </Tag>
  );
};

export default Title;
