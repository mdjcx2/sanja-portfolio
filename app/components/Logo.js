// Sanja's SD mark, traced from sanjadevic.com as one stroke so it stays sharp
// and takes the surrounding text colour (light and dark themes alike).
export const LOGO_PATH =
  "M36.25 24 H25.6 C23.25 24 21.5 26.25 21.5 29.6 C21.5 33 23.25 35.25 25.6 35.25 H42.5 C46.25 35.25 49 37.5 49 40 C49 42.75 46.25 44.75 42.5 44.75 H17.5 Q11.9 44.75 11.9 39.1 V21.25 Q11.9 15.6 17.5 15.6 H45 C56.25 15.6 62.5 24.4 62.5 33.75 C62.5 45 52.5 53.75 37.5 55";

export default function Logo({ size = 32, title, style }) {
  return (
    <svg
      viewBox="8 12 58 46"
      width={size * (58 / 46)}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="4.2"
      strokeLinejoin="round"
      style={{ display: "block", ...style }}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={LOGO_PATH} />
    </svg>
  );
}
