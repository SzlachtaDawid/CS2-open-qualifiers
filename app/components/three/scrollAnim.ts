export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Base orientations in radians — clips in cs2.glb each face a different way. */
export const FACING = {
  front: 0,
  back: Math.PI,
  sideLeft: -Math.PI / 2,
  sideRight: Math.PI / 2,
} as const;

export type Facing = keyof typeof FACING;

export const modelRotationY = (progress: number, offset = 0) => lerp(-0.6, 2.4, clamp01(progress)) + offset;

export const modelOffsetY = (progress: number) => lerp(-0.15, 0.15, clamp01(progress));

const LOOP_EPSILON = 1e-4;

export const clipTime = (progress: number, duration: number, cycles = 3) => {
  const end = duration * cycles;
  if (end <= 0) return 0;

  // LoopRepeat wraps exactly at `end`, so setTime(end) shows the FIRST frame, not the
  // last — stopping a hair short leaves the model frozen in its final pose.
  return Math.min(clamp01(progress) * end, end - LOOP_EPSILON);
};
