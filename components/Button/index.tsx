import type { MouseEventHandler, ReactNode } from "react";

import styles from "./index.module.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  href,
  type = "button",
  target,
  rel,
  onClick,
  className,
  children,
}: ButtonProps) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {children}
        </span>
      );
    }

    return (
      <a
        className={classes}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
