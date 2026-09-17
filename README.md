# CS2 Tournament

A website for a Counter-Strike 2 tournament, and a project I use to grow as a developer.
I build it to learn things I do not get to use every day — mainly the 3D layer, scroll-driven
animation and performance work that comes with them.

## What it is

The heart of the project is a **scroll-driven 3D landing page**. A single WebGL canvas sits
fixed behind the page while five pinned sections scroll past it. A Counter-Strike character
model is scrubbed by scroll position — a different animation clip per section, alternating
sides of the frame — and the copy reveals as you go.

The tournament features around it are deliberately conventional, so the effort goes where
the learning is.

## Built with

- **Next.js 16** (App Router) and **React 19**, TypeScript throughout
- **three.js**, **React Three Fiber** and **drei** for the 3D layer
- **GSAP** with ScrollTrigger for the scroll timelines, **Lenis** for smooth scrolling
- **zustand** to pass scroll progress to the render loop without re-rendering React
- **Tailwind CSS v4** and **shadcn/ui**
- **Vitest** and Testing Library for the parts that can be tested without WebGL

## Roadmap

The landing page is in place. What comes next:

- [ ] **Team registration form** — five players per roster, validated with react-hook-form and yup
- [ ] **Team list** — who has signed up so far
- [ ] **Bracket** — the tournament tree, with match results feeding into it
- [ ] **Matches** — schedule, scores and map picks
- [ ] Persistence on Neon Postgres via Prisma

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

```bash
npm run build     # production build
npm run lint      # ESLint
npx vitest run    # tests, one-shot
npm run format    # Prettier
```

## Models

`public/models/cs2.glb` is the compressed model that ships with the site (2.4 MB, down from
60.6 MB). Source models stay out of the repo — see `.gitignore`. Compression:

```bash
npx @gltf-transform/cli optimize in.glb out.glb --compress meshopt --texture-compress webp
```
