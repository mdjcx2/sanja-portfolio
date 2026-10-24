export default function DarkPageHero({ label, heading, sub, className }) {
  return (
    <div className={className}>
      <p style={{
        fontFamily: "var(--font-display)", fontSize: "0.6875rem", letterSpacing: "0.12em",
        textTransform: "uppercase", color: "var(--dp-text)", marginBottom: 20,
      }}>
        {label}
      </p>
      <h1 style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: "clamp(2.4rem, 6vw, 5rem)", letterSpacing: "-0.03em",
        color: "var(--dp-text)", lineHeight: 1.05, margin: "0 0 28px",
      }}>
        {heading}
      </h1>
      <p style={{
        fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
        color: "var(--dp-text-muted)", lineHeight: 1.6, maxWidth: 680, margin: 0,
      }}>
        {sub}
      </p>
    </div>
  );
}
