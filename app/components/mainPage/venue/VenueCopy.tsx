import { Describe } from "@/app/components/copy/Describe";
import { Title } from "@/app/components/copy/Title";

export const VenueCopy = () => {
  return (
    <>
      <Title copy="Where we" coloredCopy="play" component="h2" id="venue-title" firstLetterId="venue-zoom-letter" />
      <div className="max-w-[400px]">
        <Describe
          copy="The whole tournament runs out of one gaming house. Same rigs, same 240 Hz panels, same room — nobody plays the final from their bedroom."
          id="venue-house"
        />
        <Describe
          copy="Doors open on the morning of the first map. Spectator seats are limited, so everything goes out on stream as well."
          id="venue-doors"
        />
      </div>
    </>
  );
};
