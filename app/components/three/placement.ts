export type Side = "left" | "right";

export const NARROW_BREAKPOINT_PX = 768;

const DEFAULT_SIDE_OFFSET = 0.25;
const GROUND_DROP = 0.18;

/**
 * Where the model stands in the frame, in world units.
 *
 * Only ever called above NARROW_BREAKPOINT_PX — ModelView returns null below it, so
 * there is no narrow-screen case to handle here.
 */
export function modelPlacement(
  viewportW: number,
  viewportH: number,
  side: Side = "left",
  sideOffset = DEFAULT_SIDE_OFFSET
): [number, number, number] {
  return [viewportW * sideOffset * (side === "left" ? -1 : 1), -viewportH * GROUND_DROP, 0];
}

/**
 * The same spot as CSS percentages, so a DOM overlay can sit where the model will.
 * R3F's viewport width is the full width of the view, so the offsets map straight over.
 */
export function modelPlacementCss(side: Side = "left", sideOffset = DEFAULT_SIDE_OFFSET) {
  return {
    left: `${50 + sideOffset * 100 * (side === "left" ? -1 : 1)}%`,
    top: `${50 + GROUND_DROP * 100}%`,
  };
}
