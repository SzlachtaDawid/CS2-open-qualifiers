import { describe, expect, it } from "vitest";
import { clamp01, clipTime, FACING, lerp, modelOffsetY, modelRotationY } from "./scrollAnim";

describe("clamp01", () => {
  it("clamps to the 0-1 range", () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(7)).toBe(1);
  });
});

describe("lerp", () => {
  it("returns the endpoints at t = 0 and t = 1", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("interpolates linearly in between", () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
});

describe("modelRotationY", () => {
  it("grows monotonically with progress", () => {
    expect(modelRotationY(0)).toBeLessThan(modelRotationY(0.5));
    expect(modelRotationY(0.5)).toBeLessThan(modelRotationY(1));
  });

  it("stays in range for progress outside 0-1", () => {
    expect(modelRotationY(-5)).toBe(modelRotationY(0));
    expect(modelRotationY(5)).toBe(modelRotationY(1));
  });

  it("adds the offset across the whole range", () => {
    expect(modelRotationY(0, FACING.back)).toBeCloseTo(modelRotationY(0) + FACING.back);
    expect(modelRotationY(1, FACING.back)).toBeCloseTo(modelRotationY(1) + FACING.back);
  });

  it("offset moves the starting point, not the rate", () => {
    const plain = modelRotationY(1) - modelRotationY(0);
    const shifted = modelRotationY(1, FACING.back) - modelRotationY(0, FACING.back);
    expect(shifted).toBeCloseTo(plain);
  });
});

describe("FACING", () => {
  it("is four distinct quarter turns", () => {
    const values = Object.values(FACING);
    expect(new Set(values).size).toBe(4);
  });

  it("front leaves the model alone, back turns it halfway", () => {
    expect(FACING.front).toBe(0);
    expect(Math.abs(FACING.back)).toBeCloseTo(Math.PI);
  });

  it("the sides are opposite quarters", () => {
    expect(FACING.sideLeft).toBeCloseTo(-FACING.sideRight);
    expect(Math.abs(FACING.sideRight)).toBeCloseTo(Math.PI / 2);
  });
});

describe("modelOffsetY", () => {
  it("crosses zero halfway through the section", () => {
    expect(modelOffsetY(0.5)).toBeCloseTo(0);
  });
});

describe("clipTime", () => {
  it("starts at zero", () => {
    expect(clipTime(0, 9.6)).toBe(0);
  });

  it("plays the clip through once per cycle", () => {
    expect(clipTime(1, 10, 3)).toBeCloseTo(30);
    expect(clipTime(0.5, 10, 2)).toBe(10);
  });

  it("clamps progress from outside 0-1", () => {
    expect(clipTime(2, 10, 1)).toBeCloseTo(10);
    expect(clipTime(-1, 10, 1)).toBe(0);
  });

  it("never lands exactly on the loop boundary", () => {
    expect(clipTime(1, 10, 1)).toBeLessThan(10);
    expect(clipTime(5, 10, 1)).toBeLessThan(10);
  });

  it("never goes below zero for a zero-length clip", () => {
    expect(clipTime(1, 0, 1)).toBe(0);
  });
});
