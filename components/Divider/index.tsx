import type { CSSProperties } from "react";

import { mergeStyle, spaceToken, type Space } from "@/lib/responsive";

import styles from "./index.module.css";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  /** Line direction. `vertical` is for inline separators (e.g. logo bars). */
  orientation?: DividerOrientation;
  /**
   * Margin on either side of the line, from the spacing scale — `margin-block`
   * when horizontal, `margin-inline` when vertical.
   */
  spacing?: Space;
  className?: string;
  style?: CSSProperties;
}

/**
 * A one-pixel rule in `--theme-border`. Serves as a horizontal section rule, a
 * vertical inline separator between items (the client logo bar), or the
 * connective line in the process timeline. Exposed as a semantic separator to
 * assistive tech via `role`/`aria-orientation`.
 */
export default function Divider({
  orientation = "horizontal",
  spacing = "none",
  className,
  style,
}: DividerProps) {
  const classNames = [styles.divider, styles[orientation], className]
    .filter(Boolean)
    .join(" ");

  const mergedStyle = mergeStyle(
    { "--divider-spacing": spaceToken(spacing) },
    style,
  );

  return (
    <hr
      className={classNames}
      style={mergedStyle}
      aria-orientation={orientation}
    />
  );
}
