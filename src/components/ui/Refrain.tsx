import type { ReactNode } from "react";
import { Icon } from "./Icon";

export interface RefrainProps {
  icon?: string;
  children: ReactNode;
  tone?: "neutral" | "signal";
}

/** A quiet labelled statement chip (governance refrains). */
export function Refrain({ icon = "shield-check", children, tone = "neutral" }: RefrainProps) {
  const c = tone === "signal" ? "var(--fw-signal)" : "var(--fw-verified)";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 15px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-pill)", fontSize: 14, color: "var(--fw-ink-2)" }}>
      <Icon name={icon} size={15} color={c} />{children}
    </span>
  );
}
