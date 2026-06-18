import type { CSSProperties, ReactNode } from "react";

export interface EyebrowProps {
  children: ReactNode;
  marker?: boolean;
  index?: string;
  tone?: "muted" | "signal" | "ink";
  style?: CSSProperties;
}

/** The wide-tracked uppercase label that opens sections. Optional index/marker. */
export function Eyebrow({ children, marker, index, tone = "muted", style }: EyebrowProps) {
  const tones = {
    muted: "var(--fw-ink-3)",
    signal: "var(--fw-signal)",
    ink: "var(--fw-ink-2)",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--font-display)",
        fontSize: "var(--type-eyebrow)",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "var(--tracking-eyebrow)",
        color: tones[tone],
        ...style,
      }}
    >
      {index != null && (
        <span style={{ fontFamily: "var(--font-mono)", color: "var(--fw-signal)", letterSpacing: "0.04em" }}>
          {index}
        </span>
      )}
      {marker && (
        <span style={{ width: "16px", height: "1px", background: "var(--fw-line-bright)", display: "inline-block" }} />
      )}
      {children}
    </span>
  );
}
