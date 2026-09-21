"use client";

import { FormProvider } from "react-hook-form";
import { Button } from "@/app/components/buttons/Button";
import { TextField } from "../TextField";
import { ROSTER_SIZE, toName } from "./schema";
import { useRegisterForm } from "./useRegisterForm";

export const RegisterForm = () => {
  const { methods, handleSubmit } = useRegisterForm();
  const { errors, isSubmitting, isSubmitSuccessful } = methods.formState;

  const rosterError = errors.players?.root?.message ?? errors.players?.message;

  return (
    <FormProvider {...methods}>
      {/* noValidate: yup owns validation, and the browser's own bubbles would pre-empt it. */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <TextField
          name="teamName"
          label="Team name"
          placeholder="Your team name"
          autoComplete="organization"
          sanitize={toName}
          required
        />

        <hr className="border-border" />

        <fieldset className="flex flex-col gap-5">
          <legend className="sr-only">Roster</legend>

          {Array.from({ length: ROSTER_SIZE }, (_, index) => (
            <TextField
              key={`player-${index}`}
              name={`players.${index}.nickname`}
              label={`Player ${index + 1} · Nickname`}
              placeholder="In-game name"
              sanitize={toName}
              required
            />
          ))}

          {rosterError && <p className="text-xs text-destructive">{rosterError}</p>}
        </fieldset>

        {errors.root && <p className="text-sm text-destructive">{errors.root.message}</p>}

        <Button
          type="submit"
          variant="tt"
          fill
          className="w-full min-w-0"
          text={isSubmitting ? "Submitting…" : "Submit roster"}
          disabled={isSubmitting}
        />

        {isSubmitSuccessful && (
          <p role="status" className="text-center text-sm">
            Roster received. We will confirm your slot by email.
          </p>
        )}
      </form>
    </FormProvider>
  );
};
