import { array, object, string } from "yup";

export const ROSTER_SIZE = 5;

// `\p{L}` rather than `a-z` so non-Latin names pass. `-` sits last so it is not a range.
const DISALLOWED = /[^\p{L}\p{N} _.[\]|&-]/gu;

const CHARACTERS = "Letters, digits, spaces and _ . - [ ] | & only";

// Interior spaces survive — "Natus Vincere" has to be typeable. Leading ones and runs go
// immediately; the trailing one is cut on blur, once the next word can no longer follow it.
export const toName = (value: string) => value.replace(DISALLOWED, "").replace(/^ +/, "").replace(/ {2,}/g, " ");

const hasAllowedCharactersOnly = (value = "") => value.replace(DISALLOWED, "") === value;

const name = (maxLength: number) =>
  string()
    .trim()
    .required("Required")
    .test("characters", CHARACTERS, hasAllowedCharactersOnly)
    .min(2, "Use at least 2 characters")
    .max(maxLength, `Use ${maxLength} characters or fewer`);

export type FormValues = {
  teamName: string;
  players: { nickname: string }[];
};

export const defaultValues: FormValues = {
  teamName: "",
  players: Array.from({ length: ROSTER_SIZE }, () => ({ nickname: "" })),
};

export const schema = object({
  teamName: name(32),
  players: array()
    .of(object({ nickname: name(24) }))
    .length(ROSTER_SIZE, `A roster is exactly ${ROSTER_SIZE} players`)
    .test("unique-nicknames", "Nicknames must be unique", (players) => {
      const nicknames = (players ?? []).map((player) => player.nickname?.trim().toLowerCase()).filter(Boolean);
      return new Set(nicknames).size === nicknames.length;
    })
    .required(),
});
