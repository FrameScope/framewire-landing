import { useState, type CSSProperties, type ReactNode } from "react";

type Padding = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps {
  children: ReactNode;
  interactive?: boolean;
  accent?: boolean;
  padding?: Padding;
  style?: CSSProperties;
}

/** A calm surface panel. Depth from layering, not shadow. */
export function Card({ children, interactive = false, accent = false, padding = "lg", style }: CardProps) {
  const [hover, setHover] = useState(false);
  const pads: Record<Padding, string> = { none: "0", sm: "16px", md: "20px", lg: "26px", xl: "32px" };

  return (
    <div
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background: "var(--fw-surface)",
        border: `1px solid ${accent ? "var(--fw-signal-edge)" : hover ? "var(--fw-line-bright)" : "var(--fw-line-strong)"}`,
        borderRadius: "var(--radius-md)",
        padding: pads[padding],
        boxShadow: accent ? "var(--shadow-signal)" : hover ? "var(--shadow-card)" : "none",
        transition:
          "border-color var(--motion-calm) var(--ease-calm), box-shadow var(--motion-calm) var(--ease-calm), transform var(--motion-calm) var(--ease-calm)",
        transform: hover && interactive ? "translateY(-2px)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
