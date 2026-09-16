type Props = {
  copy: string;
  coloredCopy: string;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  /** Puts the first letter of `copy` in its own span, so it can be animated alone. */
  firstLetterId?: string;
};

export const Title = ({ copy, coloredCopy, component: Tag = "h1", id, firstLetterId }: Props) => {
  return (
    <Tag className="text-center text-5xl font-bold uppercase md:text-7xl lg:text-8xl" id={id}>
      {firstLetterId ? (
        <>
          {/* inline-block is required: transforms do not apply to inline elements */}
          <span id={firstLetterId} className="inline-block">
            {copy.slice(0, 1)}
          </span>
          {copy.slice(1)}
        </>
      ) : (
        copy
      )}
      <br />
      <span className="text_background_colors font-bold text-transparent">{coloredCopy}</span>
    </Tag>
  );
};
