"use client";

// next/dynamic z ssr:false nie działa w Server Component (App Router),
// więc dynamiczny import musi żyć w komponencie klienckim. R3F nie renderuje się po stronie serwera.
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-muted-foreground">Ładowanie sceny…</div>,
});

export function SceneCanvas() {
  return <Scene />;
}
