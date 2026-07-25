"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";

import styles from "./index.module.css";

interface MobileNavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  items: MobileNavItem[];
  activeHref?: string;
  ctaHref: string;
  ctaLabel: string;
}

export default function MobileNav({
  items,
  activeHref,
  ctaHref,
  ctaLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={`${styles.bar} ${open ? styles.barOpenTop : ""}`} />
        <span className={`${styles.bar} ${open ? styles.barOpenHide : ""}`} />
        <span className={`${styles.bar} ${open ? styles.barOpenBottom : ""}`} />
      </button>

      <div
        id={panelId}
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        inert={!open}
      >
        <nav className={styles.panelNav} aria-label="Mobile">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.panelLink}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button href={ctaHref} size="md" onClick={() => setOpen(false)}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}
