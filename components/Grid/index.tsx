import type { CSSProperties, ElementType, ReactNode } from "react";

import {
  mergeStyle,
  responsiveVars,
  spaceToken,
  type Responsive,
  type Space,
} from "@/lib/responsive";

import styles from "./index.module.css";

export interface GridProps {
  children?: ReactNode;
  /**
   * Explicit column count. Responsive — e.g. `{ base: 1, md: 2, lg: 3 }` for
   * the services grid. Ignored when `minChildWidth` is set.
   */
  columns?: Responsive<number>;
  /**
   * Fluid alternative to `columns`: auto-fits as many columns as fit, each at
   * least this wide (e.g. `"16rem"`). Wraps without media queries.
   */
  minChildWidth?: string;
  /** Gap between cells, from the spacing scale. Defaults to `--grid-gap`. */
  gap?: Responsive<Space>;
  /** `align-items` value for the cells. */
  align?: CSSProperties["alignItems"];
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const columnsTemplate = (count: number) => `repeat(${count}, minmax(0, 1fr))`;

/**
 * A two-dimensional CSS grid. Use `columns` for the mockup's exact counts
 * (3-up services, 2-up work, 4-up process), or `minChildWidth` for a fluid
 * auto-fit grid. Column count can't be interpolated, so responsive `columns`
 * drives real breakpoints; everything else stays token-driven.
 */
export default function Grid({
  children,
  columns,
  minChildWidth,
  gap,
  align,
  as: Tag = "div",
  className,
  style,
}: GridProps) {
  const mergedStyle = mergeStyle(
    responsiveVars("--grid-gap", gap, spaceToken),
    minChildWidth
      ? {
          // Inline wins over the class, so this applies at every breakpoint.
          gridTemplateColumns: `repeat(auto-fit, minmax(min(${minChildWidth}, 100%), 1fr))`,
        }
      : responsiveVars("--grid-columns", columns, columnsTemplate),
    { alignItems: align },
    style,
  );

  const classNames = [styles.grid, className].filter(Boolean).join(" ");

  return (
    <Tag className={classNames} style={mergedStyle}>
      {children}
    </Tag>
  );
}
