import styles from "./index.module.css";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  bold?: boolean;
  className?: string;
}

export default function Logo({
  size = "md",
  bold = true,
  className,
}: LogoProps) {
  const classes = [styles.logo, styles[size], className]
    .filter(Boolean)
    .join(" ");

  const wordmarkClasses = [styles.wordmark, bold ? styles.bold : styles.regular]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={wordmarkClasses}>REDLINE</span>
      <span className={styles.suffix}>/dev</span>
    </span>
  );
}
