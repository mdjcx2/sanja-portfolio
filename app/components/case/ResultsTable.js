import { gaugeFraction } from "../../../lib/caseStudy/geometry.js";
import styles from "./case.module.css";

const R = 11;
const CIRC = 2 * Math.PI * R;
const unit = (kind) => (kind === "percent" ? "%" : kind === "time" ? "s" : "");

function Gauge({ value, kind, max }) {
  const fill = gaugeFraction(value, kind, max);
  return (
    <span className={styles.gauge}>
      <svg viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
        <circle cx="14" cy="14" r={R} className={styles.gaugeTrack} />
        <circle cx="14" cy="14" r={R} className={styles.gaugeFill}
          strokeDasharray={`${fill * CIRC} ${CIRC}`} transform="rotate(-90 14 14)" />
      </svg>
      <span className={styles.gaugeValue}>{value}{unit(kind)}</span>
    </span>
  );
}

// Usability results: one row per task, one ring gauge per metric.
// highlight: "problem" tints the row red, "fixed" green.
export default function ResultsTable({ columns, kinds, timeMax, rows, caption }) {
  return (
    <div className={styles.results} role="table" aria-label={caption ?? "Usability test results"}>
      <div className={`${styles.resultsRow} ${styles.resultsHead}`} role="row">
        <span role="columnheader">Task</span>
        {columns.map((c) => <span key={c} role="columnheader">{c}</span>)}
      </div>
      {rows.map((row) => (
        <div key={row.task} className={styles.resultsRow} data-highlight={row.highlight} role="row">
          <span role="rowheader" className={styles.resultsTask}>
            {row.task}
            {row.highlight && <span className={styles.srOnly}>{row.highlight === "problem" ? ", problem task" : ", fixed"}</span>}
          </span>
          {row.values.map((v, i) => (
            <span key={columns[i]} role="cell"><Gauge value={v} kind={kinds[i]} max={timeMax} /></span>
          ))}
        </div>
      ))}
    </div>
  );
}
