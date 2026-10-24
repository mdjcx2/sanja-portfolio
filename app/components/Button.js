"use client";
import { forwardRef } from "react";
import Link from "next/link";
import { resolveVariant } from "../../lib/buttonVariant.js";
import styles from "./Button.module.css";

/**
 * Button
 *
 * variant   filled | raised | outline | tonal | ghost | link
 *           (old names still work: primary → filled, secondary → outline,
 *           light → raised, ghost-light → tonal)
 * size      sm | md | lg
 * iconLeft / iconRight   any node, usually an <svg>
 * href      renders a Next <Link> (or <a> for external) instead of <button>
 *
 * Icon-only usage: pass an icon and an `aria-label`, no children.
 */
const Button = forwardRef(function Button({
  variant = "outline",
  size = "md",
  iconLeft,
  iconRight,
  href,
  className = "",
  children,
  ...rest
}, ref) {
  const iconOnly = !children && (iconLeft || iconRight);
  if (iconOnly && !rest["aria-label"]) {
    console.warn("Button: icon-only buttons need an aria-label.");
  }

  const variantClass = styles[resolveVariant(variant)];

  const cls = [
    styles.btn,
    variantClass,
    styles[size],
    iconOnly ? styles.iconOnly : "",
    className,
  ].filter(Boolean).join(" ");

  const content = (
    <>
      {iconLeft  && <span className={styles.icon} aria-hidden="true">{iconLeft}</span>}
      {children  && <span>{children}</span>}
      {iconRight && <span className={styles.icon} aria-hidden="true">{iconRight}</span>}
    </>
  );

  if (href) {
    const external = /^https?:\/\//.test(href);
    if (rest.disabled) {
      const { disabled, ...linkRest } = rest;
      return <span ref={ref} className={cls} aria-disabled="true" {...linkRest}>{content}</span>;
    }
    return external
      ? <a ref={ref} href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{content}</a>
      : <Link ref={ref} href={href} className={cls} {...rest}>{content}</Link>;
  }

  return <button ref={ref} type="button" className={cls} {...rest}>{content}</button>;
});

export default Button;

/** Segmented row of buttons sharing one border. */
export function ButtonGroup({ children, className = "", ...rest }) {
  return (
    <div role="group" className={[styles.group, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
