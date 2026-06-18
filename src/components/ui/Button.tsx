import { useState, type CSSProperties, type MouseEventHandler, type ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  children?: ReactNode;
  style?: CSSProperties;
  "aria-label"?: string;
}

/**
 * FrameWire Button — calm, precise, one institutional accent.
 * primary (signal fill), secondary (hairline outline), ghost (text), link.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  disabled = false,
  type = "button",
  onClick,
  children,
  style,
  ...props
}: ButtonProps) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const sizes: Record<Size, { padding: string; font: string; radius: string; gap: string }> = {
    sm: { padding: "7px 14px", font: "13px", radius: "var(--radius-sm)", gap: "7px" },
    md: { padding: "11px 20px", font: "15px", radius: "var(--radius-sm)", gap: "9px" },
    lg: { padding: "15px 28px", font: "16px", radius: "var(--radius-sm)", gap: "10px" },
  };
  const s = sizes[size];

  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1,
    letterSpacing: "-0.005em",
    padding: variant === "link" ? "0" : s.padding,
    borderRadius: variant === "link" ? "0" : s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition:
      "background var(--motion-quick) var(--ease-calm), border-color var(--motion-quick) var(--ease-calm), color var(--motion-quick) var(--ease-calm), transform var(--motion-quick) var(--ease-calm)",
    transform: active && !disabled ? "translateY(0.5px)" : "none",
    WebkitTapHighlightColor: "transparent",
  };

  const variants: Record<Variant, CSSProperties> = {
    primary: {
      background: hover ? "var(--fw-signal-bright)" : "var(--fw-signal)",
      color: "#fff",
      borderColor: hover ? "var(--fw-signal-bright)" : "var(--fw-signal)",
      boxShadow: hover ? "var(--shadow-signal)" : "0 0 0 1px var(--fw-signal-edge)",
    },
    secondary: {
      background: hover ? "rgba(255,255,255,0.04)" : "transparent",
      color: "var(--fw-ink)",
      borderColor: hover ? "var(--fw-line-bright)" : "var(--fw-line-strong)",
    },
    ghost: {
      background: hover ? "rgba(255,255,255,0.05)" : "transparent",
      color: hover ? "var(--fw-ink)" : "var(--fw-ink-2)",
      borderColor: "transparent",
    },
    link: {
      background: "transparent",
      color: hover ? "var(--fw-signal-bright)" : "var(--fw-signal)",
      borderBottom: "1px solid",
      borderColor: hover ? "var(--fw-signal-bright)" : "var(--fw-signal-edge)",
      paddingBottom: "2px",
    },
  };

  const composed: CSSProperties = { ...base, ...variants[variant], ...style };
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => { setHover(false); setActive(false); },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span style={{ display: "inline-flex" }}>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span style={{ display: "inline-flex" }}>{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} style={composed} onClick={onClick} {...handlers} {...props}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} style={composed} {...handlers} {...props}>
      {content}
    </button>
  );
}
