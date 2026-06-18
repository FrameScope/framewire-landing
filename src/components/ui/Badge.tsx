import type { CSSProperties, ReactNode } from "react";

export type Tone =
  | "verified" | "caution" | "conflict" | "narrative" | "archive" | "signal" | "neutral";

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  style?: CSSProperties;
}

/** A small status/evidence pill. `tone` carries meaning only, never decoration. */
export function Badge({ children, tone = "neutral", dot = false, style }: BadgeProps) {
  const tones: Record<Tone, { fg: string; wash: string; edge: string }> = {
    verified: { fg: "var(--fw-verified)", wash: "var(--fw-verified-wash)", edge: "var(--fw-verified-edge)" },
    caution: { fg: "var(--fw-caution)", wash: "var(--fw-caution-wash)", edge: "var(--fw-caution-edge)" },
    conflict: { fg: "var(--fw-conflict)", wash: "var(--fw-conflict-wash)", edge: "var(--fw-conflict-edge)" },
    narrative: { fg: "var(--fw-neutral-mark)", wash: "var(--fw-neutral-wash)", edge: "var(--fw-neutral-edge)" },
    archive: { fg: "var(--fw-archive)", wash: "var(--fw-archive-wash)", edge: "var(--fw-archive-edge)" },
    signal: { fg: "var(--fw-signal-bright)", wash: "var(--fw-signal-wash)", edge: "var(--fw-signal-edge)" },
    neutral: { fg: "var(--fw-ink-2)", wash: "rgba(255,255,255,0.04)", edge: "var(--fw-line-strong)" },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: dot ? "4px 11px 4px 9px" : "4px 11px",
        borderRadius: "var(--radius-pill)",
        border: `1px solid ${t.edge}`,
        background: t.wash,
        color: t.fg,
        fontFamily: "var(--font-body)",
        fontSize: "12px",
        fontWeight: 500,
        lineHeight: 1.3,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {dot && <span style={{ width: "6px", height: "6px", borderRadius: "999px", background: t.fg, flexShrink: 0 }} />}
      {children}
    </span>
  );
}
