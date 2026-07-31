import styles from "./index.module.css";

interface CardServiceProps {
  index: string;
  title: string;
  description: string;
  className?: string;
}

export default function CardService({
  index,
  title,
  description,
  className,
}: CardServiceProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <span className={styles.index}>[{index}]</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
