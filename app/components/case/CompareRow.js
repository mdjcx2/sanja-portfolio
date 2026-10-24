import styles from "./case.module.css";

// 2–4 options side by side; the chosen one's label ends in " ★".
export default function CompareRow({ items }) {
  return (
    <div className={styles.compare} style={{ "--compare-cols": items.length }}>
      {items.map((item) => (
        <figure key={item.label} className={styles.compareItem}>
          <div className={styles.frame}><img src={item.src} alt={item.label} width={item.width} height={item.height} loading="lazy" /></div>
          <figcaption className={styles.caption}>
            {item.label}{item.chosen && <span aria-label=", chosen direction"> ★</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
