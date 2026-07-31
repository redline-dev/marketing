import type { CSSProperties } from "react";

import { mergeStyle, spaceToken, type Space } from "@/lib/responsive";

import styles from "./index.module.css";

export type DividerOrientation = "horizontal" | "vertical";

export interface DividerProps {
  orientation?: DividerOrientation;
  spacing?: Space;
  className?: string;
  style?: CSSProperties;
}
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
