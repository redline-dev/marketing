import type { CSSProperties, ElementType, ReactNode } from "react";

import {
  mergeStyle,
  responsiveVars,
  spaceToken,
  type Responsive,
  type Space,
} from "@/lib/responsive";

import styles from "./index.module.css";

export type StackDirection = "row" | "column";

export interface StackProps {
  children?: ReactNode;
  /** Flex direction. Responsive — e.g. `{ base: "column", md: "row" }`. */
  direction?: Responsive<StackDirection>;
  /** Gap between items, from the spacing scale. Responsive. */
  gap?: Responsive<Space>;
  /** `align-items` value. */
  align?: CSSProperties["alignItems"];
  /** `justify-content` value. */
  justify?: CSSProperties["justifyContent"];
  /** Allow items to wrap. */
  wrap?: boolean;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * A one-dimensional flex layout: stacks children in a column or row with a
 * consistent gap. `direction` and `gap` accept responsive values so a column
 * on mobile can become a row on wider screens (e.g. the hero's button pair).
 */
export default function Stack({
  children,
  direction = "column",
  gap = "lg",
  align,
  justify,
  wrap,
  as: Tag = "div",
  className,
  style,
}: StackProps) {
  const mergedStyle = mergeStyle(
    responsiveVars("--stack-direction", direction, (value) => value),
    responsiveVars("--stack-gap", gap, spaceToken),
    {
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? "wrap" : undefined,
    },
    style,
  );

  const classNames = [styles.stack, className].filter(Boolean).join(" ");

  return (
    <Tag className={classNames} style={mergedStyle}>
      {children}
    </Tag>
  );
}
