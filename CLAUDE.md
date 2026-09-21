# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

CS2 Tournament — a web app for a Counter-Strike 2 tournament: team sign-up, a team list and, later,
the bracket. **No user accounts or login** — teams register through a form, nothing more.

**Everything in the repo is in English** — UI copy, code comments, test names, docs. The landing
targets the CS2 scene, so `<html lang="en">`.

The **priority is the 3D landing page**, not the tournament logic: a scroll-driven experience where
CS2 character models move, the camera travels and text reveals as the user scrolls. Everything else
(auth, teams, later brackets and matches) is deliberately conventional so that the effort goes into
the 3D layer.

Conventions here are modelled on the owner's other project,
`/Users/dawidszlachta/MotoSklejka/moto-sklejka-front` — same Next.js/TypeScript/Vitest setup and the
same form conventions. **Two deliberate departures**: this project uses **shadcn/ui instead of daisyUI**,
and it has **no CI pipeline**.

## Comments

**Write a comment only when it is genuinely necessary.** The default is no comment. Code that needs
explaining should usually be renamed or restructured instead.

A comment earns its place only when removing it would let someone plausibly "simplify" or "fix" the
code into a bug — a non-obvious browser/library constraint, a workaround whose reason is invisible,
a magic number nobody could re-derive. Keep it to one or two lines.

Do **not** write comments that:

- restate what the line already says (`// set the title`, `/** Scroll speed in px/s. */` above
  `HOLD_SPEED`);
- describe a prop that the prop name and type already describe;
- narrate standard React/Next/GSAP behaviour (`// useEffect cleans this up on unmount`);
- open a file or component with a summary of what it obviously is.

Prefer a better name over a comment: `HOLD_SPEED_PX_PER_S` beats `HOLD_SPEED` plus a line of prose.

## Commands

- `npm run dev` — dev server
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npm run format` — Prettier over the repo
- `npm test` — Vitest. The script is bare `vitest`, so it **watches** in an interactive terminal and
  runs once in a non-TTY. For a one-shot run use `npx vitest run`.
  - Single file: `npx vitest run app/some/File.test.tsx`
  - Single test by name: `npx vitest run -t "test name"`

## UI / styling

**Tailwind CSS v4 + shadcn/ui.** There is no `tailwind.config.js`; theming lives in `app/globals.css`
as CSS variables (`@import "shadcn/tailwind.css"` plus `@theme inline`).

`components.json` pins the setup: style `radix-mira`, Radix primitives, **icon library `hugeicons`**.

> **`lucide-react` is banned in this project.** Most shadcn presets default to it, so when adding a
> component check the generated imports and swap any `lucide-react` import for `@hugeicons/react` +
> `@hugeicons/core-free-icons`. Verify with `grep -ri lucide package.json app components`.

`shadcn` is a **real dependency, not just a CLI** — `app/globals.css` imports `shadcn/tailwind.css`
from it. Removing it from `package.json` breaks the build with
`Can't resolve 'shadcn/tailwind.css'`.

### Where things live

Next's "store project files in top-level folders inside of `app`" layout. Colocation is safe because
a folder only becomes a route once it holds a `page.tsx` or `route.ts`.

- `app/components/` — **every component we write**, including the whole `three/` layer and
  `mainPage/` (the landing sections)
- `app/lib/` — helpers and hooks; the only `lib` in the repo
- `components/ui/` — the one thing outside `app`: shadcn registry output. Prettier-ignored, never
  hand-edited

A component used by exactly one route lives in `app/<route>/components/`, next to the `page.tsx` that
renders it. It moves to `app/components/` the day a second route imports it — not before.

**Folder names follow what the folder is.** A folder that holds one component takes that
component's name in PascalCase (`Hero/Hero.tsx`, `TapeBorders/TapeBorders.tsx`), together with its
`styles.module.css` and any parts only it uses (`Hero/Faces.tsx`). A folder that groups several
independent components stays camelCase (`buttons/`, `copy/`, `three/`, `mainPage/`). Same rule as
MotoSklejka's `_components/NavBar/` next to `_components/forms/`.

`components.json` aliases point at `@/app/...` so `npx shadcn@latest add` writes `cn()` imports to
the right place and does not recreate a root `lib/`. Only `ui` still points outside `app`.

Cross-folder imports go through the `@/` alias, not `../../`.

Add components with `npx shadcn@latest add <name>` (they land in `components/ui/`, which is
Prettier-ignored so it stays as the registry ships it). Conditional classes go through `cn()` from
`@/lib/utils`.

## 3D layer (the point of the project)

Installed and ready: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap` + `@gsap/react`
(ScrollTrigger), `lenis` (smooth scroll), `zustand`.

Intended architecture — **one `<Canvas>` fixed in the background, normal DOM scrolling above it**:

```
<SceneCanvas />               // fixed inset-0, z-0, pointer-events: none
<main className="relative z-10">  // ordinary sections, forms, routes
```

Rules that matter:

- **All GSAP goes through `@/lib/gsap`**, which re-exports `gsap`, `ScrollTrigger` and `useGSAP`
  after registering the plugins. Importing `gsap/ScrollTrigger` directly works only as long as that
  module happens to load first; `no-restricted-imports` blocks it.
- The canvas is client-only — mount it via `next/dynamic(..., { ssr: false })`. R3F cannot be
  server-rendered.
- ScrollTrigger writes scroll progress into a zustand store **outside React**
  (`useScrollStore.setState`), and R3F reads it inside `useFrame` via `getState()`. Never through
  `useState` or a subscription — that would re-render 60×/second and destroy the frame rate.
- Camera/animation maths belongs in **plain functions** (e.g. `app/components/three/placement.ts`) so it is
  testable in Vitest. jsdom has no WebGL, so the scene itself is never unit-tested.
- `.glb` files go in `public/models/`, compressed with
  `npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-compress webp`, then
  turned into typed components with `npx gltfjsx --types --transform`. Budget: one model < 3 MB,
  total 3D payload < 10 MB.

## Testing

Vitest 4 + jsdom + `@testing-library/react`. `vitest.setup.ts` registers jest-dom matchers and calls
`cleanup()` after each test.

**There is no `@vitejs/plugin-react`** — Vitest's esbuild compiles JSX using the automatic runtime from
`tsconfig.json` (`"jsx": "react-jsx"`), which is verified to work. The Babel-based plugin also cannot
be installed alongside `shadcn` (Babel 7 vs Babel 8 peer conflict), and `@vitejs/plugin-react-swc` was
removed as unnecessary. Do not reintroduce either without a concrete reason.

Conventions: colocate `X.test.tsx` next to `X.tsx`; `vi.mock` server actions and assert on the mock;
query by accessible role/label rather than test IDs.

## Forms (convention carried over from MotoSklejka)

`react-hook-form` + `yup` via `@hookform/resolvers`. Every form is a folder of four files:

```
SomeForm/
├── SomeForm.tsx        # presentation only: FormProvider + fields + submit
├── useSomeForm.ts      # useForm + yupResolver, onSubmit (server action), error handling
├── schema.ts           # FormValues type, defaultValues, yup schema (English messages)
└── SomeForm.test.tsx   # Vitest + Testing Library, server action mocked
```

The hook returns `{ methods, handleSubmit }`; the component spreads `methods` into `FormProvider`.
Server actions should re-validate with the same yup schema — do not trust client-side validation only.

## Not set up yet

Prisma, Neon, the `Team`/`TeamMember` models and every route beyond `/` are still to come.
The plan is Neon Postgres + Prisma 7.

**Do not add a CI pipeline.** No GitHub Actions, no workflows — this is a deliberate choice by the
repo owner.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
