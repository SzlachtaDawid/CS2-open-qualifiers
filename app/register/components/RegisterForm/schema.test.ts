import { describe, expect, test } from "vitest";
import { ROSTER_SIZE, schema, toName, type FormValues } from "./schema";

const validValues = (overrides: Partial<FormValues> = {}): FormValues => ({
  teamName: "Phoenix Five",
  players: ["s1mple", "ZywOo", "NiKo", "device", "ropz"].map((nickname) => ({ nickname })),
  ...overrides,
});

const rosterOf = (...nicknames: string[]) => nicknames.map((nickname) => ({ nickname }));

describe("toName", () => {
  test("keeps interior spaces so a multi-word name stays typeable", () => {
    expect(toName("Natus Vincere")).toBe("Natus Vincere");
  });

  test("drops leading spaces and collapses runs as they are typed", () => {
    expect(toName("  Natus   Vincere")).toBe("Natus Vincere");
  });

  test("leaves a single trailing space alone — the next word may still follow it", () => {
    expect(toName("Natus ")).toBe("Natus ");
  });

  test("keeps the punctuation clan tags rely on", () => {
    expect(toName("[NaVi]Boombl4")).toBe("[NaVi]Boombl4");
    expect(toName("x|Twistzz|x")).toBe("x|Twistzz|x");
    expect(toName("-nAts_.")).toBe("-nAts_.");
  });

  test("keeps non-Latin letters", () => {
    expect(toName("Женя")).toBe("Женя");
  });

  test("drops characters outside the set", () => {
    expect(toName("<script>ok")).toBe("scriptok");
  });
});

describe("schema", () => {
  test("accepts a full, valid roster", async () => {
    await expect(schema.validate(validValues())).resolves.toBeTruthy();
  });

  test("holds a team name and a nickname to the same character rule", async () => {
    const values = validValues({
      teamName: "Natus Vincere",
      players: rosterOf("Big Boss", "ZywOo", "NiKo", "device", "ropz"),
    });

    await expect(schema.validate(values)).resolves.toBeTruthy();
  });

  test("trims what the client never should have sent", async () => {
    const data = await schema.validate(validValues({ teamName: "  Phoenix Five  " }));

    expect(data.teamName).toBe("Phoenix Five");
  });

  test("rejects a nickname holding a character outside the set", async () => {
    const values = validValues({ players: rosterOf("s1mple", "ZywOo", "NiKo", "device", "rop<z>") });

    await expect(schema.validate(values)).rejects.toThrow("Letters, digits, spaces and _ . - [ ] | & only");
  });

  test("rejects a team name holding a character outside the set", async () => {
    await expect(schema.validate(validValues({ teamName: "Phoenix <Five>" }))).rejects.toThrow(
      "Letters, digits, spaces and _ . - [ ] | & only"
    );
  });

  test("reports an empty field as required rather than as a character error", async () => {
    await expect(schema.validate(validValues({ teamName: "" }))).rejects.toThrow("Required");
  });

  test("keeps the length limits apart — 32 for a team name, 24 for a nickname", async () => {
    await expect(schema.validate(validValues({ teamName: "a".repeat(33) }))).rejects.toThrow(
      "Use 32 characters or fewer"
    );

    const values = validValues({ players: rosterOf("a".repeat(25), "ZywOo", "NiKo", "device", "ropz") });
    await expect(schema.validate(values)).rejects.toThrow("Use 24 characters or fewer");
  });

  test("rejects a roster that is not exactly the roster size", async () => {
    const values = validValues({ players: rosterOf("s1mple", "ZywOo") });

    await expect(schema.validate(values)).rejects.toThrow(`A roster is exactly ${ROSTER_SIZE} players`);
  });

  test("rejects nicknames that differ only in case", async () => {
    const values = validValues({ players: rosterOf("s1mple", "ZywOo", "NiKo", "device", "S1MPLE") });

    await expect(schema.validate(values)).rejects.toThrow("Nicknames must be unique");
  });
});
