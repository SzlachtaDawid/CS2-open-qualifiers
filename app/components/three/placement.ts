export type Side = "left" | "right";

export const NARROW_BREAKPOINT_PX = 768;

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
  sideOffset = 0.25
): [number, number, number] {
  return [viewportW * sideOffset * (side === "left" ? -1 : 1), -viewportH * 0.18, 0];
}
