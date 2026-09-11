import { describe, expect, it } from "vitest";
import { DEFAULT_CLIP, pickClip } from "./clips";

describe("pickClip", () => {
  it("zwraca preferowany klip, gdy model go zawiera", () => {
    expect(pickClip(["stand", "win1", "Jump", "ak_walk"])).toBe("Jump");
  });

  it("spada do pierwszego klipu, gdy brak preferowanego", () => {
    expect(pickClip(["stand", "win1"])).toBe("stand");
  });

  it("zwraca null dla modelu bez animacji", () => {
    expect(pickClip([])).toBeNull();
  });

  it("respektuje jawnie podany klip", () => {
    expect(pickClip(["stand", "ak_walk"], "ak_walk")).toBe("ak_walk");
  });

  it("znajduje klip zwycięstwa używany w sekcji Prizes", () => {
    expect(pickClip(["Jump", "win1", "stand", "ak_walk"], "win1")).toBe("win1");
  });

  it("domyślnym klipem jest Jump", () => {
    expect(DEFAULT_CLIP).toBe("Jump");
  });
});
