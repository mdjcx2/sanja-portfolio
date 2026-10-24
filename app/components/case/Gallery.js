import styles from "./case.module.css";

// { src, width, height, alt }[] as an even grid of images (2 columns on
// phones, `columns` from tablet up). For sets of same-shaped work, like logos.
export default function Gallery({ items, columns = 3 }) {
  return (
    <ul className={styles.gallery} style={{ "--gallery-cols": columns }}>
      {items.map((item) => (
        <li key={item.src} className={styles.galleryItem}>
          <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" />
        </li>
      ))}
    </ul>
  );
}
