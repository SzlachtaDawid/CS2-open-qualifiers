import { describe, expect, it } from "vitest";
import { modelPlacement } from "./placement";

describe("modelPlacement", () => {
  it("domyślnie odsuwa model w lewo", () => {
    expect(modelPlacement(10, 6)[0]).toBeLessThan(0);
  });

  it("odbija model na prawą stronę przy side: right", () => {
    expect(modelPlacement(10, 6, "right")[0]).toBeGreaterThan(0);
  });

  it("odbija symetrycznie — obie strony w tej samej odległości od środka", () => {
    expect(modelPlacement(10, 6, "right")[0]).toBeCloseTo(-modelPlacement(10, 6, "left")[0]);
  });

  it("odsuwa tym dalej, im większy sideOffset", () => {
    expect(Math.abs(modelPlacement(10, 6, "left", 0.4)[0])).toBeGreaterThan(
      Math.abs(modelPlacement(10, 6, "left", 0.2)[0])
    );
  });

  it("trzyma tę samą proporcję niezależnie od szerokości viewportu", () => {
    const a = modelPlacement(10, 6);
    const b = modelPlacement(20, 12);
    expect(b[0] / a[0]).toBeCloseTo(2);
    expect(b[1] / a[1]).toBeCloseTo(2);
  });

  it("zawsze opuszcza model poniżej środka kadru", () => {
    expect(modelPlacement(10, 6)[1]).toBeLessThan(0);
  });
});
