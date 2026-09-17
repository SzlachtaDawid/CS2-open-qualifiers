import { describe, expect, it } from "vitest";
import { modelPlacement, modelPlacementCss } from "./placement";

describe("modelPlacement", () => {
  it("pushes the model left by default", () => {
    expect(modelPlacement(10, 6)[0]).toBeLessThan(0);
  });

  it("mirrors the model to the right for side: right", () => {
    expect(modelPlacement(10, 6, "right")[0]).toBeGreaterThan(0);
  });

  it("mirrors symmetrically — both sides the same distance from centre", () => {
    expect(modelPlacement(10, 6, "right")[0]).toBeCloseTo(-modelPlacement(10, 6, "left")[0]);
  });

  it("pushes further the larger sideOffset is", () => {
    expect(Math.abs(modelPlacement(10, 6, "left", 0.4)[0])).toBeGreaterThan(
      Math.abs(modelPlacement(10, 6, "left", 0.2)[0])
    );
  });

  it("keeps the same ratio whatever the viewport width", () => {
    const a = modelPlacement(10, 6);
    const b = modelPlacement(20, 12);
    expect(b[0] / a[0]).toBeCloseTo(2);
    expect(b[1] / a[1]).toBeCloseTo(2);
  });

  it("always drops the model below the centre of the frame", () => {
    expect(modelPlacement(10, 6)[1]).toBeLessThan(0);
  });
});

describe("modelPlacementCss", () => {
  it("offsets left and right symmetrically around the centre", () => {
    expect(modelPlacementCss("left", 0.3).left).toBe("20%");
    expect(modelPlacementCss("right", 0.3).left).toBe("80%");
  });

  it("drops below centre, matching the 3D version", () => {
    expect(modelPlacementCss().top).toBe("68%");
  });

  it("agrees in sign with modelPlacement", () => {
    const world = modelPlacement(10, 6, "left", 0.3)[0];
    const css = parseFloat(modelPlacementCss("left", 0.3).left);
    expect(Math.sign(world)).toBe(Math.sign(css - 50));
  });
});
