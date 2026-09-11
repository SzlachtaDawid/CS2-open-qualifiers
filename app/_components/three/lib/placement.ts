export type Side = "left" | "right";

export type Placement = {
  position: [number, number, number];
  scale: number;
};

export const NARROW_BREAKPOINT_PX = 768;

export function modelPlacement(
  viewportW: number,
  viewportH: number,
  screenPx: number,
  side: Side = "left",
  sideNumber: number = 0.25
): Placement {
  const isNarrow = screenPx < NARROW_BREAKPOINT_PX;
  const offsetX = viewportW * sideNumber * (side === "left" ? -1 : 1);

  return {
    position: [isNarrow ? 0 : offsetX, -viewportH * 0.18, 0],
    scale: isNarrow ? 0.75 : 1,
  };
}
