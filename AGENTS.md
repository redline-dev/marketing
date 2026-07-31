<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project

Marketing site for **Redline Development**. Next.js 16 App Router, React 19,
TypeScript (strict), CSS Modules, Storybook 10, Vitest 4. No CSS framework and
no UI library — everything is hand-built on the design tokens in
[`app/theme.css`](app/theme.css).

Design reference lives in [`design/`](design/) (PDF mockups). The site is
dark-only; there is no light theme.

## Commands

```bash
npm run dev              # next dev
npm run build            # next build
npm run storybook        # Storybook on :6006
npm test                 # vitest run
npm run test:watch       # vitest watch
npm run test:coverage    # vitest run --coverage
npm run lint             # eslint
npm run prettier         # prettier --check .  (CI gate)
npm run prettier:write   # prettier --write .
npm run knip             # unused files/exports/deps (CI gate)
```

CI runs on every PR and push to `main`: **prettier**, **lint**, **test**, and
**knip**. All four must pass. Knip means an exported symbol nothing imports
(or a dependency nothing uses) fails the build — don't add speculative exports.

## Layout

```
app/           App Router — layout.tsx, page.tsx, globals.css, theme.css, fonts.ts
components/    One folder per component (see below) + LAYOUT.md
lib/           Shared non-component code (currently responsive.ts)
skills/        Working instructions this repo expects agents to follow
design/        Mockups / design references
.storybook/    Storybook config (stories are globbed from ../**/*.stories.tsx)
```

Import with the `@/*` alias (`@/components/Header`, `@/lib/responsive`), not
relative paths across top-level directories. The alias is mirrored in
[`vitest.config.ts`](vitest.config.ts).

## Components

Read [`skills/architecture/instrcutions.md`](skills/architecture/instrcutions.md)
and [`skills/styling/instructions.md`](skills/styling/instructions.md) before
adding one. The established shape is a folder named after the component with
four colocated files:

```
components/Button/
  index.tsx           default-exported component
  index.module.css    CSS module
  index.stories.tsx   Storybook story
  index.test.tsx      Vitest + Testing Library
```

Conventions in existing components:

- **Default export**, named after the folder. Props interface declared inline
  above it; variant/size unions are local `type` aliases.
- **Server components by default.** Nothing in `components/` is `"use client"`
  today — keep it that way unless the component genuinely needs browser state.
- Compose class names with
  `[styles.base, styles[variant], className].filter(Boolean).join(" ")` and
  always accept an optional `className` passthrough.
- Layout primitives also accept `as` (polymorphic tag) and `style`, merged via
  `mergeStyle` from [`lib/responsive.ts`](lib/responsive.ts).

### Layout primitives

`Container`, `Section`, `Stack`, `Grid`, and `Divider` are content-free building
blocks — read [`components/LAYOUT.md`](components/LAYOUT.md) before laying out a
page, and prefer composing them over writing new page-level layout CSS.

## Styling

- **CSS Modules only.** No inline style objects except for the responsive custom
  properties emitted by `responsiveVars`.
- **Use the tokens.** Never hardcode a color, spacing value, font stack,
  duration, or easing curve — everything is a `var(--…)` from
  [`app/theme.css`](app/theme.css). If a token is missing, first try to express
  the value with an existing one; only add a new token when that fails, and add
  it to the right section of `theme.css`.
- Reference the semantic `--theme-*` layer (e.g. `--theme-primary`,
  `--theme-text-muted`), not the raw `--color-*` palette, in component CSS.
- Global element styles and the shared `.section-*` / `.container` helpers live
  in [`app/globals.css`](app/globals.css) — don't duplicate them per component.
- Fonts are loaded via `next/font/google` in [`app/fonts.ts`](app/fonts.ts) and
  exposed as `--font-inter` / `--font-ibm-plex-mono`; use `--font-sans` and
  `--font-mono`.

## Responsive model

Mobile-first with two breakpoints, defined once in
[`lib/responsive.ts`](lib/responsive.ts): `md` = 768px, `lg` = 1024px.

Responsive props take a single value or a cascading object:

```tsx
gap="lg"                        // every breakpoint
gap={{ base: "md", lg: "xl" }}  // md until 1024px, then xl
```

`responsiveVars` turns these into `--x-base` / `--x-md` / `--x-lg` custom
properties; the CSS module reads them through a fallback cascade so unset
breakpoints inherit downward. **The breakpoint literals are duplicated in every
primitive's CSS module** (media queries can't read custom properties) — if you
change `BREAKPOINTS`, update those `@media` blocks too.

Prefer `clamp()`-based fluid tokens (`--section-spacing`, `--container-padding`,
`--text-2xl`) over new breakpoints.

## Testing

Vitest with `pool: "threads"` (forks hang on some machines — see the comment in
[`vitest.config.ts`](vitest.config.ts)). Component tests need two things:

```tsx
/** @vitest-environment jsdom */ // first line of the file

vi.mock("./index.module.css", () => ({
  default: { button: "button", primary: "primary" /* … */ },
})); // CSS modules aren't processed by Vitest
```

Use Testing Library with role-based queries (`getByRole`), call
`afterEach(cleanup)`, and assert on behavior and rendered semantics (element
tag, `aria-disabled`, handler firing) rather than on styles.

## Storybook

Stories use `@storybook/nextjs-vite`. Title with the section prefix already in
use — `Components/Button`, `Layout/Stack`. Use
`satisfies Meta<typeof Component>` plus `StoryObj<typeof meta>`, declare
`argTypes` controls for every variant prop, and export one story per meaningful
state. `app/globals.css` is loaded globally in
[`.storybook/preview.tsx`](.storybook/preview.tsx), so tokens are available.

## Conventions

- Commit messages: Conventional Commits (`feat:`, `chore:`, `fix:`).
- Run `npm run prettier:write` before committing; formatting is a CI gate.
- Keep `README.md` and this file current when structure or commands change.
