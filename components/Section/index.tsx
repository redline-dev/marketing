import type { CSSProperties, ElementType, ReactNode } from "react";

import styles from "./index.module.css";

export type SectionSpacing = "default" | "compact" | "spacious" | "none";

export interface SectionProps {
  children?: ReactNode;
  spacing?: SectionSpacing;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}
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
