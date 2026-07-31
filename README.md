# Redline Development — Marketing Site

The marketing site for Redline Development. Built with the Next.js App Router,
React 19, TypeScript, and CSS Modules — no CSS framework or component library.
Everything is composed from local design tokens and a small set of layout
primitives.

|            |                            |
| ---------- | -------------------------- |
| Framework  | Next.js 16 (App Router)    |
| UI         | React 19, CSS Modules      |
| Language   | TypeScript (strict)        |
| Components | Storybook 10               |
| Tests      | Vitest 4 + Testing Library |
| Node       | 20 (matches CI)            |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Pages live in `app/` and
hot-reload as you edit.

### Component development

Components are built in isolation in Storybook:

```bash
npm run storybook   # http://localhost:6006
```

## Scripts

| Script                    | Description                                  |
| ------------------------- | -------------------------------------------- |
| `npm run dev`             | Start the dev server                         |
| `npm run build`           | Production build                             |
| `npm start`               | Serve the production build                   |
| `npm run storybook`       | Storybook on port 6006                       |
| `npm run build-storybook` | Static Storybook build                       |
| `npm test`                | Run the test suite once                      |
| `npm run test:watch`      | Tests in watch mode                          |
| `npm run test:coverage`   | Tests with a coverage report                 |
| `npm run lint`            | ESLint                                       |
| `npm run prettier`        | Check formatting                             |
| `npm run prettier:write`  | Fix formatting                               |
| `npm run knip`            | Find unused files, exports, and dependencies |

## Project structure

```
app/           App Router entry — layout, pages, global CSS, design tokens, fonts
components/    UI components, one folder each (component + styles + story + test)
lib/           Shared helpers (responsive prop handling, breakpoints)
skills/        Repo conventions for architecture and styling
design/        Design mockups and references
.storybook/    Storybook configuration
```

Modules are imported through the `@/*` path alias, e.g.
`import Stack from "@/components/Stack"`.

## Design system

- **Tokens** — colors, typography, spacing, layout, and motion are all CSS
  custom properties in [`app/theme.css`](app/theme.css). Component styles
  reference the semantic `--theme-*` layer rather than the raw palette. Nothing
  is hardcoded.
- **Globals** — element defaults and shared helper classes live in
  [`app/globals.css`](app/globals.css).
- **Layout primitives** — `Container`, `Section`, `Stack`, `Grid`, and `Divider`
  handle page structure. See [`components/LAYOUT.md`](components/LAYOUT.md) for
  the responsive model and composition examples.
- **Theme** — dark only; there is no light mode.

## Contributing

Every pull request runs four checks in GitHub Actions, all of which must pass:

| Check       | Command            |
| ----------- | ------------------ |
| Formatting  | `npm run prettier` |
| Linting     | `npm run lint`     |
| Tests       | `npm test`         |
| Unused code | `npm run knip`     |

Run `npm run prettier:write` before committing. Commit messages follow
[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`,
`chore:`).

Conventions for adding components, styles, and tests are documented in
[`AGENTS.md`](AGENTS.md) and [`skills/`](skills/) — read those before writing
new code.
