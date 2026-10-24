import styles from "./case.module.css";

// Keyboard shortcut list: { keys, action }[].
export default function Shortcuts({ items }) {
  return (
    <dl className={styles.shortcuts}>
      {items.map(({ keys, action }) => (
        <div key={keys} className={styles.shortcut}>
          <dt><kbd className={styles.kbd}>{keys}</kbd></dt>
          <dd>{action}</dd>
        </div>
      ))}
    </dl>
  );
}
