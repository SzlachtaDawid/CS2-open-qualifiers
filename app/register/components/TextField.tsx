"use client";

import { Controller, useFormContext, type FieldPathByValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormValues } from "./RegisterForm/schema";

type Props = {
  name: FieldPathByValue<FormValues, string>;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  /** Runs on every keystroke, so a rejected character never appears in the field. */
  sanitize?: (value: string) => string;
  autoCapitalize?: "off" | "none" | "sentences" | "words" | "characters";
  spellCheck?: boolean;
};

export const TextField = ({
  name,
  label,
  placeholder,
  autoComplete = "off",
  required,
  sanitize,
  autoCapitalize = "off",
  spellCheck = false,
}: Props) => {
  const { control } = useFormContext<FormValues>();
  const errorId = `${name}-error`;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid, error } }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={name} className="text-xs tracking-[0.2em] uppercase">
            {label}
            {required && (
              <span className="text-destructive" aria-hidden>
                *
              </span>
            )}
          </Label>
          <Input
            {...field}
            onChange={(event) => field.onChange(sanitize ? sanitize(event.target.value) : event.target.value)}
            onBlur={() => {
              field.onChange(field.value.trim());
              field.onBlur();
            }}
            id={name}
            // The registry Input carries `md:text-xs/relaxed`, so `md:text-base` is what keeps
            // the field from shrinking back to the default size from 768px up.
            className="h-12 px-4 text-base md:text-base"
            placeholder={placeholder}
            autoComplete={autoComplete}
            autoCapitalize={autoCapitalize}
            spellCheck={spellCheck}
            // Native `required` would make the browser show its own bubble before yup runs.
            aria-required={required}
            aria-invalid={invalid}
            aria-describedby={invalid ? errorId : undefined}
          />
          {invalid && (
            <p id={errorId} className="text-xs text-destructive">
              {error?.message}
            </p>
          )}
        </div>
      )}
    />
  );
};
