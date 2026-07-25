import Image from "next/image";
import Link from "next/link";

import Button from "@/components/Button";
import MobileNav from "@/components/MobileNav";

import styles from "./index.module.css";

const NAV_ITEMS = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
];

interface HeaderProps {
  activeHref?: string;
  logoSrc?: string;
}

export default function Header({ activeHref, logoSrc }: HeaderProps) {
  return (
    <header className={styles.headerContainer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.logo}>
          {logoSrc && (
            <Image
              src={logoSrc}
              alt=""
              width={20}
              height={20}
              className={styles.logoMark}
            />
          )}
          <span className={styles.logoText}>
            REDLINE<span className={styles.logoSuffix}>/dev</span>
          </span>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.navLink}
              aria-current={activeHref === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <Button href="/#contact" size="sm">
            Start a project
          </Button>
        </nav>

        <MobileNav
          items={NAV_ITEMS}
          activeHref={activeHref}
          ctaHref="/#contact"
          ctaLabel="Start a project"
        />
      </div>
    </header>
  );
}
