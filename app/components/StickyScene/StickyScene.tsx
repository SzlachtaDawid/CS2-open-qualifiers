import type { ReactNode, Ref } from "react";
import { cn } from "@/app/lib/utils";
import { ModelView } from "@/app/components/three/ModelView";
import type { ModelViewProps } from "@/app/components/three/ModelViewScene";
import { TapeBorders } from "@/app/components/TapeBorders/TapeBorders";
import { SectionFade } from "@/app/components/SectionFade/SectionFade";

type Props = {
  ref?: Ref<HTMLElement>;
  id?: string;
  /** Section height in vh. This is what paces the scrubbed timeline — taller means slower. */
  heightVh: number;
  /** Omit for a section with no 3D model. */
  scene?: ModelViewProps;
  topFade?: boolean;
  /** Extra classes for the pinned panel, e.g. `overflow-hidden` when something scales out of frame. */
  panelClassName?: string;
  children: ReactNode;
};

/**
 * A tall section with a pinned, full-height panel: model behind, tape at the edges, content on top.
 *
 * The panel is a one-cell grid, so every child marked `col-start-1 row-start-1` stacks in the
 * same place — that is how a section cross-fades between two blocks of copy.
 */
export function StickyScene({ ref, id, heightVh, scene, topFade, panelClassName, children }: Props) {
  return (
    <section ref={ref} id={id} className="relative z-3" style={{ height: `${heightVh}vh` }}>
      {topFade && <SectionFade side="top" height={150} />}
      <div className={cn("sticky top-0 grid h-dvh place-items-center", panelClassName)}>
        {scene && <ModelView {...scene} />}
        <TapeBorders />
        {children}
      </div>
    </section>
  );
}
