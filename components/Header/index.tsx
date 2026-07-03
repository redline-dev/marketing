import styles from "./index.module.css";

import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Link href="/">
        <h1>Redline Development</h1>
      </Link>
    </header>
  );
}
