import type { CSSProperties, ElementType, ReactNode } from "react";

import styles from "./index.module.css";

export type ContainerSize = "default" | "narrow" | "full";

export interface ContainerProps {
  children?: ReactNode;
  size?: ContainerSize;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

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
