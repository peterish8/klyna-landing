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

The hero tile field follows the requested deployment baseline: a 22×12 viewport of mathematically aligned 63 px cells, with a sparse perimeter pattern that cycles through four changing states every `1200ms`. The center remains clear for the intro panel while the edge tiles fade and scale through the CSS `cell-life` animation. The provider harness headline uses an eased 19.2-second CSS loop through Claude Code, Codex, Opencode, Cursor, Pi, DeepSeek, Kimi, and Muse Code. Hero-only motion lives in `src/app/globals.css`, and the field pause button freezes the tile animation. Users who enable reduced motion get static tiles and no decorative animation.

## Deployment

The project is compatible with Vercel’s Next.js deployment flow. Import the repository into a Vercel project, keep the framework preset as Next.js, and use the default build command (`npm run build`). For a local production check:

```bash
npm run build
npm run start
```

## Contributing

Keep changes focused on the product surface being updated. Preserve the evidence-first, product-specific visual language, validate both desktop and mobile layouts for UI changes, and run the relevant lint/build checks before opening a pull request.
