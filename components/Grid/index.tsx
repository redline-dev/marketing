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
  columns?: Responsive<number>;
  minChildWidth?: string;
  gap?: Responsive<Space>;
  align?: CSSProperties["alignItems"];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

const columnsTemplate = (count: number) => `repeat(${count}, minmax(0, 1fr))`;

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
