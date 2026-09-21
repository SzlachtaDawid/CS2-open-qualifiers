import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "./components/Header";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";

export const metadata: Metadata = {
  title: "Sign up — CS2 Tournament",
  description: "Enter your team into the Counter-Strike 2 tournament.",
};

export default function RegisterPage() {
  return (
    <section className="relative z-3 my-12 flex min-h-dvh flex-col items-center justify-center gap-8 px-4">
      <Header />

      <Card className="w-full max-w-[560px]">
        <CardHeader>
          <CardTitle className="text-xl uppercase">Roster</CardTitle>
          <CardDescription>
            Nicknames have to match the ones you play under in-game. Player 1 is the captain — we contact them about
            match times.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>

      <Link href="/" className="text-sm text-muted-foreground uppercase hover:text-foreground">
        Back to the tournament
      </Link>
    </section>
  );
}
