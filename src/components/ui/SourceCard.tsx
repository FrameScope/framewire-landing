import { useState, type CSSProperties } from "react";
import { Badge, type Tone } from "./Badge";

export interface SourceCardProps {
  title: string;
  source?: string;
  time?: string;
  provider?: string;
  hash?: string;
  status?: Tone;
  statusLabel?: string;
  kind?: string;
  interactive?: boolean;
  style?: CSSProperties;
}

/**
 * A preserved item in the archive. Shows provenance (source, time, provider,
 * hash) and a verification status — the "archive first" motif.
 */
export function SourceCard({
  title, source, time, provider, hash, status = "archive", statusLabel, kind, interactive = true, style,
}: SourceCardProps) {
  const [hover, setHover] = useState(false);
  const labels: Partial<Record<Tone, string>> = {
    verified: "Verified", caution: "Needs review", conflict: "Failed check",
    archive: "Archived", narrative: "Tracked", neutral: "Collected",
  };

  return (
    <div
      onMouseEnter={interactive ? () => setHover(true) : undefined}
      onMouseLeave={interactive ? () => setHover(false) : undefined}
      style={{
        background: "var(--fw-surface)",
        border: `1px solid ${hover ? "var(--fw-line-bright)" : "var(--fw-line-strong)"}`,
        borderRadius: "var(--radius-md)",
        padding: "16px 16px 14px",
        transition: "border-color var(--motion-calm) var(--ease-calm)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
        <div style={{ minWidth: 0 }}>
          {kind && (
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fw-ink-4)", marginBottom: "6px" }}>{kind}</div>
          )}
          <div style={{ fontFamily: "var(--font-body)", fontSize: "14.5px", fontWeight: 600, color: "var(--fw-ink)", lineHeight: 1.35 }}>{title}</div>
        </div>
        <Badge tone={status} dot>{statusLabel || labels[status] || "Archived"}</Badge>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", paddingTop: "11px", borderTop: "1px solid var(--fw-line)", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--fw-ink-3)" }}>
        {source && <span><span style={{ color: "var(--fw-ink-4)" }}>src </span>{source}</span>}
        {time && <span><span style={{ color: "var(--fw-ink-4)" }}>t </span>{time}</span>}
        {provider && <span><span style={{ color: "var(--fw-ink-4)" }}>via </span>{provider}</span>}
        {hash && <span style={{ color: "var(--fw-archive)" }}>#{hash}</span>}
      </div>
    </div>
  );
}
