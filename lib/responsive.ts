import type { CSSProperties } from "react";

/**
 * Layout primitives use a mobile-first, two-breakpoint model.
 *
 * These literals MUST stay in sync with the `@media (min-width: …)` queries in
 * the primitives' CSS modules — CSS media queries cannot read custom
 * properties, so the breakpoints have to be duplicated as literals there.
 *
 *   base : 0px and up   (mobile — the default, no media query)
 *   md   : 768px and up (tablet)
 *   lg   : 1024px and up (desktop)
 */
export const BREAKPOINTS = {
  md: "768px",
  lg: "1024px",
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * A single value, or per-breakpoint values that cascade upward (mobile-first):
 * an unspecified breakpoint inherits the next-smallest one that is set.
 *
 * @example
 * gap="lg"                       // same at every breakpoint
 * gap={{ base: "md", lg: "xl" }} // md up to 1024px, then xl
 */
export type Responsive<T> = T | Partial<Record<"base" | Breakpoint, T>>;

/** Spacing tokens — map onto the `--space-*` scale in `app/theme.css`. */
export type Space = "none" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

const SPACE_VARS: Record<Space, string> = {
  none: "0",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
  xxl: "var(--space-xxl)",
  xxxl: "var(--space-xxxl)",
};

/** Resolve a spacing token to its `var(--space-*)` reference. */
export function spaceToken(value: Space): string {
  return SPACE_VARS[value];
}

function isResponsiveObject<T>(
  value: Responsive<T>,
): value is Partial<Record<"base" | Breakpoint, T>> {
  return typeof value === "object" && value !== null;
}

/**
 * Turn a responsive prop into inline CSS custom properties named
 * `${prefix}-base`, `${prefix}-md`, `${prefix}-lg`.
 *
 * The matching CSS module consumes them with a fallback cascade
 * (`var(--x-lg, var(--x-md, var(--x-base, <default>)))`) so any breakpoint that
 * was not supplied inherits the next-smallest value.
 *
 * `transform` maps each raw value to its final CSS string — e.g. a spacing
 * token to a `var(--space-*)` reference, or a column count to a `repeat(...)`.
 */
export function responsiveVars<T>(
  prefix: string,
  value: Responsive<T> | undefined,
  transform: (value: T) => string,
): Record<string, string> {
  if (value === undefined) return {};

  const vars: Record<string, string> = {};

  if (isResponsiveObject(value)) {
    for (const key of ["base", "md", "lg"] as const) {
      const breakpointValue = value[key];
      if (breakpointValue !== undefined) {
        vars[`${prefix}-${key}`] = transform(breakpointValue);
      }
    }
  } else {
    vars[`${prefix}-base`] = transform(value);
  }

  return vars;
}

/**
 * Merge internal custom-property maps with a caller-supplied `style` and cast
 * back to `CSSProperties` (custom properties aren't part of the typed surface).
 */
export function mergeStyle(
  ...parts: Array<Record<string, string> | CSSProperties | undefined>
): CSSProperties {
  return Object.assign({}, ...parts) as CSSProperties;
}
