import type { ReactNode } from "react";

import styles from "./index.module.css";

type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  padding?: CardPadding;
  interactive?: boolean;
  accent?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Card({
  padding = "md",
  interactive = false,
  accent = false,
  className,
  children,
}: CardProps) {
  const classes = [
    styles.card,
    styles[padding],
    interactive && styles.interactive,
    accent && styles.accent,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
