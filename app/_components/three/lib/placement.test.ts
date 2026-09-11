import { describe, expect, it } from "vitest";
import { modelPlacement, NARROW_BREAKPOINT_PX } from "./placement";

describe("modelPlacement", () => {
  it("na szerokim ekranie odsuwa model w lewo", () => {
    const { position } = modelPlacement(10, 6, 1440);
    expect(position[0]).toBeLessThan(0);
  });

  it("na wąskim ekranie centruje model w poziomie", () => {
    const { position } = modelPlacement(4, 8, 390);
    expect(position[0]).toBe(0);
  });

  it("odbija model na prawą stronę przy side: right", () => {
    expect(modelPlacement(10, 6, 1440, "right").position[0]).toBeGreaterThan(0);
  });

  it("odbija symetrycznie — obie strony w tej samej odległości od środka", () => {
    const left = modelPlacement(10, 6, 1440, "left").position[0];
    const right = modelPlacement(10, 6, 1440, "right").position[0];
    expect(right).toBeCloseTo(-left);
  });

  it("na wąskim ekranie centruje niezależnie od strony", () => {
    expect(modelPlacement(4, 8, 390, "right").position[0]).toBe(0);
    expect(modelPlacement(4, 8, 390, "left").position[0]).toBe(0);
  });

  it("skaluje model w dół poniżej progu", () => {
    expect(modelPlacement(4, 8, NARROW_BREAKPOINT_PX - 1).scale).toBeLessThan(
      modelPlacement(10, 6, NARROW_BREAKPOINT_PX).scale
    );
  });

  it("trzyma tę samą proporcję niezależnie od szerokości viewportu", () => {
    const a = modelPlacement(10, 6, 1440);
    const b = modelPlacement(20, 12, 1440);
    expect(b.position[0] / a.position[0]).toBeCloseTo(2);
    expect(b.position[1] / a.position[1]).toBeCloseTo(2);
  });

  it("zawsze opuszcza model poniżej środka kadru", () => {
    expect(modelPlacement(10, 6, 1440).position[1]).toBeLessThan(0);
  });
});
