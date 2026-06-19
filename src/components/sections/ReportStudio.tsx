import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { Refrain } from "../ui/Refrain";
import { Badge } from "../ui/Badge";
import { ReportStudioGraph } from "../graphs/ReportStudioGraph";

const CAPABILITIES = [
  { icon: "list-plus", t: "Capture findings", d: "Choose the findings that matter from any intelligence lens without copying disconnected text between tools." },
  { icon: "link", t: "Preserve evidence", d: "Every captured finding retains its source, evidence references, verification state, and investigation context." },
  { icon: "layout-list", t: "Organize the report", d: "Arrange selected findings into background, evidence, analysis, competing explanations, limitations, and conclusions." },
  { icon: "git-compare", t: "Compare perspectives", d: "Place supporting, contradicting, incomplete, and uncertain material beside each other before reaching a conclusion." },
  { icon: "history", t: "Track change and drift", d: "See when captured findings become stale, change after new evidence, or no longer match the live investigation." },
  { icon: "user-check", t: "Review before finalizing", d: "FrameWire assists with organization and traceability while you retain control over the final interpretation and report." },
  { icon: "file-check", t: "Produce and continue", d: "Create a usable report while preserving links back to the investigation, evidence, timeline, actors, claims, and future updates." },
];

const CAN_DO = [
  "Select findings from every intelligence lens",
  "Add individual findings to a report",
  "Retain evidence references",
  "Organize findings into report sections",
  "Compare supporting and contradicting evidence",
  "Preserve confidence reasons and limitations",
  "Record uncertainty and missing context",
  "Retain investigation subject and scope",
  "Review changes before finalizing",
  "Produce an evidence-linked professional report",
  "Return to the investigation from any report finding",
];

const REPORT_STRUCTURE = [
  "Investigation Subject", "Scope and Questions", "Background", "Key Findings", "Evidence",
  "Supporting Information", "Contradictions", "Actors and Relationships", "Geographic Context",
  "Timeline", "Confidence and Limitations", "Unresolved Questions", "Conclusion", "Evidence References",
];

export function ReportStudio() {
  return (
    <Section id="report-studio" band>
      <SectionHead kicker="From investigation to report" align="center"
        title="Turn connected findings into a report that remains connected to its evidence."
        lead="Report Studio brings selected findings from FrameWire's intelligence lenses into one structured workspace while preserving sources, evidence, verification state, uncertainty, and investigation context."
        maxLead="66ch" />
      <Reveal>
        <p className="fw-body" style={{ textAlign: "center", maxWidth: "64ch", margin: "-28px auto 0", color: "var(--fw-ink-3)" }}>
          You decide what enters the report. FrameWire helps organize the material, preserve its lineage, and show where conclusions require caution or further review.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11, flexWrap: "wrap", margin: "30px auto 44px", maxWidth: 720, padding: "14px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--fw-signal-edge)", background: "var(--fw-signal-wash)", textAlign: "center" }}>
          <Icon name="link" size={17} color="var(--fw-signal)" />
          <span style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 500, color: "var(--fw-ink)" }}>
            A report is not separated from the investigation that produced it.
          </span>
        </div>
      </Reveal>

      {/* Capabilities */}
      <div className="fw-clarify-grid">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.t} delay={Math.min(i * 40, 280)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, height: "100%", padding: "20px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
                <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-line-strong)", background: "var(--fw-surface-inset)" }}>
                  <Icon name={c.icon} size={16} color="var(--fw-signal)" />
                </span>
                <span className="fw-h3" style={{ fontSize: 16 }}>{c.t}</span>
              </span>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{c.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* What you can do + illustrative report structure */}
      <div className="fw-rs-struct-grid" style={{ marginTop: 40 }}>
        <Reveal>
          <div>
            <div className="fw-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fw-ink-4)", marginBottom: 16 }}>What you can do</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {CAN_DO.map((c) => (
                <div key={c} style={{ display: "flex", gap: 11 }}>
                  <Icon name="check" size={16} color="var(--fw-verified)" style={{ marginTop: 1, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{ border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--fw-surface)" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--fw-line)", display: "flex", alignItems: "center", gap: 10 }}>
              <Badge tone="neutral">Illustrative report structure</Badge>
            </div>
            <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {REPORT_STRUCTURE.map((s, i) => (
                <li key={s} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", borderBottom: i < REPORT_STRUCTURE.length - 1 ? "1px solid var(--fw-line)" : 0 }}>
                  <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)", width: 20, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 14, color: "var(--fw-ink-2)" }}>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40, marginBottom: 36 }}>
          <Refrain icon="file-check" tone="signal">Select what matters. Keep the evidence attached. Explain what remains uncertain.</Refrain>
        </div>
      </Reveal>

      <Reveal><ReportStudioGraph /></Reveal>
    </Section>
  );
}
