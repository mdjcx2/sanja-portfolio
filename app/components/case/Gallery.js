import styles from "./case.module.css";

// { src, width, height, alt }[] as either
// - grid: an even grid (2 columns on phones, `columns` from tablet up), for
//   sets of same-shaped work like logos; or
// - stack: one image per row at the column width, never enlarged past its own
//   width, for mixed shapes (panoramic strips, portraits, product shots).
export default function Gallery({ items, columns = 3, layout = "grid" }) {
  const stack = layout === "stack";
  return (
    <ul className={stack ? styles.galleryStack : styles.gallery} style={stack ? undefined : { "--gallery-cols": columns }}>
      {items.map((item) => (
        <li key={item.src} className={styles.galleryItem} style={stack ? { maxWidth: item.width } : undefined}>
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
}
