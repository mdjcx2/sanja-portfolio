import styles from "./case.module.css";
import { Icon } from "./icons";
import Reveal from "./Reveal";

// { icon, title, text }[] as a grid of up to 3 columns (4 items → 2×2, so
// nothing is left orphaned); cards stagger in 0.1s apart.
export default function CardGrid({ items }) {
  const cols = items.length === 4 ? 2 : Math.min(3, items.length);
  return (
    <div className={styles.cards} style={{ "--cards-cols": cols }}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.1} className={styles.card}>
          <Icon name={item.icon} size={32} weight="duotone" className={styles.cardIcon} />
          <h3 className={styles.cardTitle}>{item.title}</h3>
          <p className={styles.cardText}>{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}
