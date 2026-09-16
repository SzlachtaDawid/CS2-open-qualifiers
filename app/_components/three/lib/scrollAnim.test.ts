import { describe, expect, it } from "vitest";
import { clamp01, clipTime, FACING, lerp, modelOffsetY, modelRotationY } from "./scrollAnim";

describe("clamp01", () => {
  it("przycina do zakresu 0–1", () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(7)).toBe(1);
  });
});

describe("lerp", () => {
  it("zwraca krańce dla t = 0 i t = 1", () => {
    expect(lerp(10, 20, 0)).toBe(10);
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("interpoluje liniowo w środku", () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
});

describe("modelRotationY", () => {
  it("rośnie monotonicznie wraz z postępem", () => {
    expect(modelRotationY(0)).toBeLessThan(modelRotationY(0.5));
    expect(modelRotationY(0.5)).toBeLessThan(modelRotationY(1));
  });

  it("nie wychodzi poza zakres przy postępie spoza 0–1", () => {
    expect(modelRotationY(-5)).toBe(modelRotationY(0));
    expect(modelRotationY(5)).toBe(modelRotationY(1));
  });

  it("dolicza offset do całego zakresu", () => {
    expect(modelRotationY(0, FACING.back)).toBeCloseTo(modelRotationY(0) + FACING.back);
    expect(modelRotationY(1, FACING.back)).toBeCloseTo(modelRotationY(1) + FACING.back);
  });

  it("offset nie zmienia tempa obrotu, tylko punkt startu", () => {
    const bez = modelRotationY(1) - modelRotationY(0);
    const z = modelRotationY(1, FACING.back) - modelRotationY(0, FACING.back);
    expect(z).toBeCloseTo(bez);
  });
});

describe("FACING", () => {
  it("to cztery różne ćwiartki obrotu", () => {
    const values = Object.values(FACING);
    expect(new Set(values).size).toBe(4);
  });

  it("front nie rusza modelu, back odwraca go o pół obrotu", () => {
    expect(FACING.front).toBe(0);
    expect(Math.abs(FACING.back)).toBeCloseTo(Math.PI);
  });

  it("boki są przeciwnymi ćwiartkami", () => {
    expect(FACING.sideLeft).toBeCloseTo(-FACING.sideRight);
    expect(Math.abs(FACING.sideRight)).toBeCloseTo(Math.PI / 2);
  });
});

describe("modelOffsetY", () => {
  it("przechodzi przez zero w połowie sekcji", () => {
    expect(modelOffsetY(0.5)).toBeCloseTo(0);
  });
});

describe("clipTime", () => {
  it("startuje od zera", () => {
    expect(clipTime(0, 9.6)).toBe(0);
  });

  it("przewija klip tyle razy, ile wynosi cycles", () => {
    expect(clipTime(1, 10, 3)).toBeCloseTo(30);
    expect(clipTime(0.5, 10, 2)).toBe(10);
  });

  it("przycina postęp spoza zakresu 0–1", () => {
    expect(clipTime(2, 10, 1)).toBeCloseTo(10);
    expect(clipTime(-1, 10, 1)).toBe(0);
  });

  it("nigdy nie dobija dokładnie do granicy pętli", () => {
    expect(clipTime(1, 10, 1)).toBeLessThan(10);
    expect(clipTime(5, 10, 1)).toBeLessThan(10);
  });

  it("nie schodzi poniżej zera dla klipu o zerowej długości", () => {
    expect(clipTime(1, 0, 1)).toBe(0);
  });
});
