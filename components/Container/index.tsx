import type { CSSProperties, ElementType, ReactNode } from "react";

import styles from "./index.module.css";

export type ContainerSize = "default" | "narrow" | "full";

export interface ContainerProps {
  children?: ReactNode;
  /**
   * Max content width.
   * - `default` — the site container width (`--container-width`)
   * - `narrow` — a reduced measure for centered prose / focused content
   * - `full` — no max width, padding only
   */
  size?: ContainerSize;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/**
 * Horizontally centers content, applies the responsive gutter
 * (`--container-padding`) and constrains it to a max width. Full-bleed
 * backgrounds live on an outer element (or `Section`); `Container` only
 * governs the content column.
 */
export default function Container({
  children,
  size = "default",
  as: Tag = "div",
  className,
  style,
}: ContainerProps) {
  const classNames = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classNames} style={style}>
      {children}
    </Tag>
  );
}
