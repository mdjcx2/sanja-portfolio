import styles from "./case.module.css";
import { Icon } from "./icons";

// Vertical timeline: icon chip + connector line, then title and text.
export default function ProcessSteps({ steps }) {
  return (
    <ol className={styles.process}>
      {steps.map((step) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.stepChip}><Icon name={step.icon} size={18} weight="duotone" /></span>
          <div className={styles.stepBody}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
