import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

const PROBLEM_TOOLS = ["Browser tabs", "Spreadsheets", "Bookmarks", "Monitoring dashboards",
  "Disconnected documents", "Messaging channels", "Separate AI tools", "Manual reports"];
const PROBLEM_COSTS = [
  "Sources become disconnected",
  "Evidence history is lost",
  "Analysts repeat work",
  "AI conclusions are hard to verify",
  "Reports drift from their evidence",
  "Institutional memory leaves with people",
];

export function Problem() {
  return (
    <Section id="problem" band>
      <div className="fw-problem-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
        <div>
          <SectionHead index="01" kicker="The problem" title="Investigation is scattered across a dozen tools." />
          <Reveal delay={140}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
              {PROBLEM_TOOLS.map((t) => (
                <span key={t} style={{ fontSize: 13, color: "var(--fw-ink-3)", padding: "7px 13px", border: "1px solid var(--fw-line)", borderRadius: "var(--radius-sm)", background: "var(--fw-surface-inset)" }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--fw-surface)" }}>
            {PROBLEM_COSTS.map((c) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 12, padding: "15px 18px", borderBottom: "1px solid var(--fw-line)" }}>
                <Icon name="unlink" size={16} color="var(--fw-conflict)" />
                <span style={{ fontSize: 14.5, color: "var(--fw-ink-2)" }}>{c}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
