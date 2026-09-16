import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Sign up — CS2 Tournament",
  description: "Enter your team into the Counter-Strike 2 tournament.",
};

const ROSTER_SIZE = 5;

export default function RegisterPage() {
  return (
    <main className="relative z-3 flex min-h-dvh items-center justify-center p-6">
      <Card className="w-full max-w-[520px]">
        <CardHeader>
          <CardTitle className="text-2xl uppercase">Sign up your team</CardTitle>
          <CardDescription>
            Five players, one form. Nicknames must match the ones you play under on the server.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* TODO: skeleton only — move to the RegisterForm/useRegisterForm/schema convention */}
          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="teamName">Team name</Label>
              <Input id="teamName" name="teamName" placeholder="e.g. Phoenix Five" autoComplete="organization" />
            </div>

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-3 text-sm font-medium">Roster</legend>

              {Array.from({ length: ROSTER_SIZE }, (_, i) => {
                const id = `player-${i + 1}`;
                return (
                  <div key={id} className="flex flex-col gap-2">
                    <Label htmlFor={id}>
                      Player {i + 1}
                      {i === 0 && <span className="text-muted-foreground"> (captain)</span>}
                    </Label>
                    <Input id={id} name={id} placeholder="nickname" autoComplete="off" />
                  </div>
                );
              })}
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button asChild variant="ghost" size="lg" type="button">
                <Link href="/">Back</Link>
              </Button>
              <Button size="lg" type="submit" disabled>
                Submit entry
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
