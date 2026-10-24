// The site's button styles (the button sheet on /design-system), plus `link`
// for inline text buttons. Old variant names still work and map onto the sheet.

export const BUTTON_VARIANTS = ["filled", "raised", "outline", "tonal", "ghost"];

const ALIASES = {
  primary: "filled",
  secondary: "outline",
  light: "raised",
  "ghost-light": "tonal",
};

export function resolveVariant(variant) {
  if (BUTTON_VARIANTS.includes(variant) || variant === "link") return variant;
  return ALIASES[variant] ?? "outline";
}
