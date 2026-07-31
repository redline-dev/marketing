# Layout primitives

Reusable, content-free building blocks for page layout. Each is a server
component (no client JS) styled with CSS modules and the design tokens in
[`app/theme.css`](../app/theme.css). Interactive examples for every variant live
in Storybook under **Layout/** (`npm run storybook`).

| Primitive   | Responsibility                                                |
| ----------- | ------------------------------------------------------------- |
| `Container` | Centers content, applies the gutter, caps the max width.      |
| `Section`   | Vertical rhythm (`padding-block`) between page sections.      |
| `Stack`     | One-dimensional flex layout with a token gap.                 |
| `Grid`      | Two-dimensional grid — fixed responsive columns or auto-fit.  |
| `Divider`   | A 1px rule: section rule, inline separator, or timeline line. |

## Responsive model

Spacing follows the `--space-*` scale via a shared `Space` token
(`none | sm | md | lg | xl | xxl | xxxl`). `Container` and `Section` are fluid by
construction — they consume the `clamp()`-based `--container-padding` and
`--section-spacing` tokens, so they need no breakpoints.

`Stack` (direction/gap) and `Grid` (columns/gap) accept **responsive** props: a
single value, or a mobile-first object that cascades upward.

```tsx
gap="lg"                          // same everywhere
gap={{ base: "md", lg: "xl" }}    // md until 1024px, then xl
columns={{ base: 1, md: 3 }}      // 1 column, 3 from 768px up
```

Breakpoints are defined once in [`lib/responsive.ts`](../lib/responsive.ts):
`md` = 768px, `lg` = 1024px. (They're mirrored as literals in the CSS modules
because media queries can't read custom properties.)

## Composing the homepage

The primitives assemble the mockup without any page-specific styling of their
own:

```tsx
// A section band: full-bleed background on Section, content column via Container.
<Section>
  <Container>
    <Stack gap="xxl">
      <Stack gap="md">
        <span className="section-eyebrow">01 / Services</span>
        <h2>What we build</h2>
      </Stack>

      {/* 1 column on mobile, 3 across from md up */}
      <Grid columns={{ base: 1, md: 3 }} gap="xl">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Grid>
    </Stack>
  </Container>
</Section>
```

Other mockup mappings:

- **Hero buttons** — `<Stack direction={{ base: "column", md: "row" }} gap="md">`
- **Selected work** — `<Grid columns={{ base: 1, md: 2 }}>`
- **Process steps** — `<Grid columns={{ base: 1, md: 2, lg: 4 }}>`
- **Client logo bar** — inline items separated by
  `<Divider orientation="vertical" spacing="lg" />`
- **Narrow contact block** — `<Container size="narrow">`
