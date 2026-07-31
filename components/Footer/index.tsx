import styles from "./index.module.css";

import Container from "@/components/Container";
import Logo from "@/components/Logo";
import Stack from "@/components/Stack";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <Container>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap="md"
          align="center"
          justify="space-between"
        >
          <Logo size="sm" />
          <small className={styles.copyright}>
            © {new Date().getFullYear()} Redline Development — built in-house
          </small>
        </Stack>
      </Container>
    </footer>
  );
}
