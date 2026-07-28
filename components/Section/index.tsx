import type { CSSProperties, ElementType, ReactNode } from "react";

import styles from "./index.module.css";

export type SectionSpacing = "default" | "compact" | "spacious" | "none";

export interface SectionProps {
  children?: ReactNode;
  /**
   * Vertical rhythm applied as `padding-block`. `default` uses the shared
   * `--section-spacing` token; the others scale it up or down.
   */
  spacing?: SectionSpacing;
  /** Element to render. Defaults to `section`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * A vertical rhythm band — the consistent `padding-block` between page
 * sections, plus semantic grouping. Intentionally free of page content and of
 * width constraints: compose a `Container` inside for the content column, and
 * put any full-bleed background on `Section` itself via `className`.
 */
export default function Section({
  children,
  spacing = "default",
  as: Tag = "section",
  className,
  style,
}: SectionProps) {
  const classNames = [
    styles.section,
    spacing !== "default" && styles[spacing],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} style={style}>
      {children}
    </Tag>
  );
}
