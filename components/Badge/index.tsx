import type { ReactNode } from "react";

import styles from "./index.module.css";

type BadgeTone = "accent" | "neutral";

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

export default function Badge({
  tone = "accent",
  className,
  children,
}: BadgeProps) {
  const classes = [styles.badge, styles[tone], className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
