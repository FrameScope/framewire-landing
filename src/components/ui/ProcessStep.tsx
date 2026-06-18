import { useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

export interface ProcessStepProps {
  index: string;
  label: ReactNode;
  summary: ReactNode;
  detail?: ReactNode;
  gate?: boolean;
  defaultOpen?: boolean;
  style?: CSSProperties;
}

/**
 * One stage in the governed pipeline. Click/hover reveals a deeper explanation.
 * A "gate" step marks the verification boundary.
 */
export function ProcessStep({
  index, label, summary, detail, gate = false, defaultOpen = false, style,
}: ProcessStepProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const expanded = open || hover;

  return (
    <div
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); }
      }}
      style={{
        position: "relative",
        background: "var(--fw-surface)",
        border: `1px solid ${gate ? "var(--fw-signal-edge)" : expanded ? "var(--fw-line-bright)" : "var(--fw-line-strong)"}`,
        borderRadius: "var(--radius-md)",
        padding: "18px 18px 16px",
        cursor: "pointer",
        outline: "none",
        transition: "border-color var(--motion-calm) var(--ease-calm), background var(--motion-calm) var(--ease-calm)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.04em", color: gate ? "var(--fw-signal)" : "var(--fw-ink-4)" }}>{index}</span>
        <span style={{ flex: 1, height: "1px", background: "var(--fw-line)" }} />
        {gate && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fw-signal)", border: "1px solid var(--fw-signal-edge)", borderRadius: "999px", padding: "2px 7px" }}>gate</span>
        )}
      </div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: 600, color: "var(--fw-ink)", letterSpacing: "-0.01em", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", lineHeight: 1.5, color: "var(--fw-ink-3)" }}>{summary}</div>
      {detail && (
        <div style={{ display: "grid", gridTemplateRows: expanded ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-settle) var(--ease-calm)" }}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--fw-line)", fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.55, color: "var(--fw-ink-2)" }}>{detail}</div>
          </div>
        </div>
      )}
    </div>
  );
}
