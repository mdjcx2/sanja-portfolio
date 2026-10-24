import styles from "./case.module.css";

// The big-number strip: { value, label }[].
export default function Metrics({ items }) {
  return (
    <div className={styles.metrics}>
      {items.map(({ value, label }) => (
        <div key={label} className={styles.metric} role="group" aria-label={`${value}: ${label}`}>
          <div className={styles.metricValue} aria-hidden="true">{value}</div>
          <div className={styles.label} aria-hidden="true">{label}</div>
        </div>
      ))}
    </div>
  );
}
