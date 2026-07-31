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
  direction?: Responsive<StackDirection>;
  gap?: Responsive<Space>;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}
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
