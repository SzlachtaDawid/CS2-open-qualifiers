import { beforeEach, describe, expect, it } from "vitest";
import { getScrollProgress, setScrollProgress, useScrollStore } from "./scrollStore";

describe("scrollStore", () => {
  beforeEach(() => {
    useScrollStore.setState({ progress: { about: 0, prizes: 0, venue: 0, join: 0 } });
  });

  it("zapisuje postęp pod wskazanym kluczem", () => {
    setScrollProgress("about", 0.42);
    expect(getScrollProgress("about")).toBe(0.42);
  });

  it("nie rusza pozostałych sekcji przy zapisie", () => {
    setScrollProgress("about", 0.9);
    setScrollProgress("prizes", 0.1);

    expect(getScrollProgress("about")).toBe(0.9);
    expect(getScrollProgress("prizes")).toBe(0.1);
    expect(getScrollProgress("venue")).toBe(0);
  });

  it("startuje z zerowym postępem dla każdej sekcji", () => {
    expect(getScrollProgress("about")).toBe(0);
    expect(getScrollProgress("prizes")).toBe(0);
    expect(getScrollProgress("venue")).toBe(0);
    expect(getScrollProgress("join")).toBe(0);
  });

  it("powiadamia subskrybentów o zmianie", () => {
    const seen: number[] = [];
    const unsubscribe = useScrollStore.subscribe((state) => seen.push(state.progress.prizes));

    setScrollProgress("prizes", 0.5);
    unsubscribe();
    setScrollProgress("prizes", 0.7);

    expect(seen).toEqual([0.5]);
  });
});
