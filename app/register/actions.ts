"use server";

import { ValidationError } from "yup";
import { schema, type FormValues } from "./components/RegisterForm/schema";

// yup addresses array items as `players[0].nickname`, react-hook-form as `players.0.nickname`.
const toFieldPath = (path: string | undefined) => (path ? path.replace(/\[(\d+)\]/g, ".$1") : "root");

const toFieldErrors = (error: unknown) => {
  if (!(error instanceof ValidationError)) throw error;

  // `inner` is empty when the schema aborts early, and then the error itself is the only issue.
  const issues = error.inner.length > 0 ? error.inner : [error];

  return issues.reduce<Record<string, string>>((fieldErrors, issue) => {
    const path = toFieldPath(issue.path);
    return path in fieldErrors ? fieldErrors : { ...fieldErrors, [path]: issue.message };
  }, {});
};

export async function registerTeam(
  values: FormValues
): Promise<{ fieldErrors: Record<string, string> } | { ok: true; teamName: string }> {
  let data: FormValues;

  try {
    // The return value, not `values`: yup trims the strings and drops anything the schema
    // does not declare. A server action is a public endpoint, so its argument is untrusted
    // whatever its TypeScript type says.
    data = await schema.validate(values, { abortEarly: false, stripUnknown: true });
  } catch (error) {
    return { fieldErrors: toFieldErrors(error) };
  }

  // TODO: persist `data` with Prisma once Neon is wired up. A duplicate team name comes back as
  // a unique-constraint violation from the insert, not as a lookup before it — two requests can
  // both pass a lookup.
  return { ok: true as const, teamName: data.teamName };
}
