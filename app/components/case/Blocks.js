import styles from "./case.module.css";
import { Figure, VideoFigure } from "./Figure";
import Metrics from "./Metrics";
import CardGrid from "./CardGrid";
import ChipSwitcher from "./ChipSwitcher";
import CompareRow from "./CompareRow";
import HotspotImage from "./HotspotImage";
import ProcessSteps from "./ProcessSteps";
import ResultsTable from "./ResultsTable";
import Shortcuts from "./Shortcuts";
import Gallery from "./Gallery";

function Text({ body }) {
  return (
    <div className={styles.text}>
      {body.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
    </div>
  );
}

function List({ items, ordered }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={styles.list}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </Tag>
  );
}

// One case for each block type in lib/caseStudy/blocks.js.
export function renderBlock(block, key) {
  switch (block.type) {
    case "text": return <Text key={key} {...block} />;
    case "list": return <List key={key} {...block} />;
    case "figure": return <Figure key={key} {...block} />;
    case "video": return <VideoFigure key={key} {...block} />;
    case "metrics": return <Metrics key={key} {...block} />;
    case "cards": return <CardGrid key={key} {...block} />;
    case "process": return <ProcessSteps key={key} {...block} />;
    case "compare": return <CompareRow key={key} {...block} />;
    case "results": return <ResultsTable key={key} {...block} />;
    case "hotspot": return <HotspotImage key={key} {...block} />;
    case "chips": return <ChipSwitcher key={key} {...block} />;
    case "shortcuts": return <Shortcuts key={key} {...block} />;
    case "gallery": return <Gallery key={key} {...block} />;
    default:
      if (process.env.NODE_ENV !== "production") throw new Error(`Unknown case study block type "${block.type}"`);
      return null;
  }
}
