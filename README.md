# Klyna Landing

Klyna is a cloud coding agent: engineering teams delegate work to coding agents running in isolated cloud environments, then review what comes back.

This repository contains the responsive Klyna marketing landing page. It is a single Next.js App Router page with product-led sections for the workflow, integrations, sandboxed environments, analytics, customer proof, FAQ, and conversion CTAs.

## Highlights

- Dark, grid-based visual system with a mint accent and mono UI labels.
- Hero “Game of Life” agent field, animated harness headline, and accessible pause controls.
- Workflow, integrations, sandbox, analytics, customer, FAQ, and contact sections.
- Responsive layouts for desktop and mobile viewports.
- Reduced-motion support through `prefers-reduced-motion`.
- Product previews and environment films loaded from the external media URLs defined in the page.

## Stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- CSS in `src/app/globals.css`
- ESLint with the Next.js configuration

## Getting started

Prerequisite: Node.js 20 or newer.

```bash
git clone https://github.com/peterish8/klyna-landing.git
cd klyna-landing
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. The landing page does not require application credentials to run locally. Preview media requires network access to the external URLs referenced in `src/app/page.tsx`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |

## Project structure

```text
src/app/
├── page.tsx       # Landing page markup, data, and interactive state
├── layout.tsx     # Document metadata and root layout
└── globals.css    # Visual system, responsive rules, and motion
next.config.ts     # Next.js configuration
package.json       # Scripts and dependencies
```

## Hero motion

The hero tile field is a client-side Conway’s Game of Life simulation using the standard `B3/S23` rules: live cells survive with two or three neighbours, and dead cells are born with exactly three. The simulation uses a centered 256×160 virtual grid of mathematically aligned 64 px cells with toroidal edge wrapping; the viewport clips the field around the centered intro panel. Every initial seed is an oscillator or travelling pattern, so no cells are hand-pinned as permanent blocks. To keep the reference field alive instead of letting a finite seed set settle, the client reseeds three moving patterns every fourth generation or when the population becomes too small; the visible result remains a sparse, changing agent field rather than a permanent block layout. Generations advance every `1333ms`, intentionally running at approximately 0.75× the reference cadence. The provider harness headline uses an eased 19.2-second CSS loop through Claude Code, Codex, Opencode, Cursor, Pi, DeepSeek, Kimi, and Muse Code. The tile transitions and headline motion live in `src/app/globals.css`, and the hero pause button stops field updates. Users who enable reduced motion get static tiles and no decorative animation.

## Deployment

The project is compatible with Vercel’s Next.js deployment flow. Import the repository into a Vercel project, keep the framework preset as Next.js, and use the default build command (`npm run build`). For a local production check:

```bash
npm run build
npm run start
```

## Contributing

Keep changes focused on the product surface being updated. Preserve the evidence-first, product-specific visual language, validate both desktop and mobile layouts for UI changes, and run the relevant lint/build checks before opening a pull request.
