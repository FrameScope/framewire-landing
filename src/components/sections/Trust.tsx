import { useState, type KeyboardEvent } from "react";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { Wordmark } from "../ui/Wordmark";

const CONSTITUTION = [
  { t: "Open at the edge", d: "You can collect broadly — many sources, many formats." },
  { t: "Strict at the core", d: "What becomes trusted intelligence is tightly governed." },
  { t: "Archive first", d: "Originals are preserved before anything is analysed." },
  { t: "Clean and verify before engine", d: "No raw data reaches the engines unchecked." },
  { t: "Governed promotion before canonical write", d: "Data becomes authoritative only through controlled steps." },
];

const GOV_POINTS = [
  "Raw data remains non-canonical until governed promotion.",
  "No role can bypass the data pipeline.",
  "Admin and Super Admin authority does not make uploaded data true.",
  "Agents create traceable, recorded derived outputs.",
  "Quarantined material remains isolated.",
  "Final conclusions remain under human control.",
];

const GOV_LINES = [
  "Role authority is not data authority.",
  "Personal trust does not replace data validation.",
  "Every agent follows the same system rules.",
];

export function Trust() {
  return (
    <Section id="trust">
      <SectionHead index="09" kicker="Trust and governance"
        title="Authority over people is not authority over data."
        lead="FrameWire's discipline is structural. The rules apply to everyone — including the people who run it." />

      <div className="fw-trust-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
        <Reveal>
          <div>
            <div className="fw-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fw-ink-4)", marginBottom: 16 }}>The FrameWire constitution</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--fw-surface)" }}>
              {CONSTITUTION.map((c, i) => (
                <div key={c.t} style={{ padding: "16px 18px", borderBottom: i < CONSTITUTION.length - 1 ? "1px solid var(--fw-line)" : 0, display: "flex", gap: 13 }}>
                  <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-signal)", marginTop: 3 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--fw-ink)", marginBottom: 3 }}>{c.t}</div>
                    <div style={{ fontSize: 13.5, color: "var(--fw-ink-3)", lineHeight: 1.5 }}>{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, marginBottom: 26 }}>
              {GOV_POINTS.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <Icon name="lock" size={15} color="var(--fw-ink-3)" style={{ marginTop: 3, flexShrink: 0 }} />
                  <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {GOV_LINES.map((l) => (
                <div key={l} style={{ padding: "14px 18px", borderLeft: "2px solid var(--fw-signal)", background: "var(--fw-surface-inset)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15.5, color: "var(--fw-ink)" }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function Memory() {
  const points = [
    "Investigations do not disappear once a report is written.",
    "Evidence, findings, corrections, actors, relationships and timelines stay connected.",
    "Future work can resume with the original context intact.",
    "Validated history improves the quality of future analysis.",
  ];
  return (
    <Section id="memory" band>
      <div className="fw-mem-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,0.95fr)", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
        <div>
          <SectionHead index="10" kicker="Institutional memory" title="Knowledge that stays when people move on." />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {points.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Icon name="link" size={16} color="var(--fw-archive)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--fw-ink-2)" }}>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={140}>
          <div style={{ padding: "clamp(28px,4vw,44px)", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-lg)", background: "var(--fw-surface)", textAlign: "center" }}>
            <Icon name="archive" size={26} color="var(--fw-archive)" />
            <p style={{ margin: "18px 0 0", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(19px,2.2vw,24px)", lineHeight: 1.3, letterSpacing: "-0.02em", color: "var(--fw-ink)" }}>
              A memory system for evidence-backed institutional understanding.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

interface Persona { role: string; icon: string; problem: string; help: string; result: string }

const PERSONAS: Persona[] = [
  { role: "Journalist", icon: "newspaper", problem: "Claims spread faster than they can be checked.", help: "Collect the original sources, verify them, and keep every quote tied to its origin.", result: "A story published with citations that hold up to scrutiny." },
  { role: "Researcher", icon: "microscope", problem: "Evidence is spread across formats and gets lost between sessions.", help: "Archive material with provenance and resume work with full context later.", result: "A reproducible evidence base that survives the project." },
  { role: "NGO", icon: "heart-handshake", problem: "Small teams cannot track issues across many noisy sources.", help: "Watch signals, separate verified from unverified, and document what changed.", result: "A defensible record of an unfolding situation." },
  { role: "Government Analyst", icon: "landmark", problem: "Briefs must be traceable and free of unverified inputs.", help: "Keep findings linked to evidence and uncertainty stated plainly.", result: "A brief a decision-maker can question line by line." },
  { role: "Security & Risk Team", icon: "shield", problem: "Early signals are easy to miss and hard to corroborate.", help: "Connect actors, claims and places, and compare supporting evidence.", result: "An assessment that distinguishes signal from noise." },
  { role: "Political Research Team", icon: "vote", problem: "Narratives shift quickly and sources contradict each other.", help: "Track how a narrative grows and recurs while keeping contradictions visible.", result: "A timeline of how a story actually moved." },
  { role: "Compliance & Due Diligence", icon: "file-search", problem: "Findings need an auditable trail from claim to source.", help: "Record every transformation and keep the chain of evidence intact.", result: "A file that withstands review." },
  { role: "Diplomatic & Policy Team", icon: "globe-2", problem: "Context spans regions, languages and long time horizons.", help: "Hold geographic and temporal context together with the underlying evidence.", result: "Shared situational understanding across a team." },
];

function PersonaCard({ p, delay }: { p: Persona; delay: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onClick={() => setOpen((o) => !o)} role="button" tabIndex={0} aria-expanded={open}
        onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}
        style={{ cursor: "pointer", padding: "20px", height: "100%", border: `1px solid ${open ? "var(--fw-line-bright)" : "var(--fw-line-strong)"}`, borderRadius: "var(--radius-md)", background: "var(--fw-surface)", transition: "border-color var(--motion-calm) var(--ease-calm)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
            <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-line-strong)", background: "var(--fw-surface-inset)" }}>
              <Icon name={p.icon} size={16} color="var(--fw-ink-2)" />
            </span>
            <span className="fw-h3" style={{ fontSize: 16 }}>{p.role}</span>
          </span>
          <Icon name={open ? "minus" : "plus"} size={16} color="var(--fw-ink-4)" />
        </div>
        <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-settle) var(--ease-calm)" }}>
          <div style={{ overflow: "hidden" }}>
            <div style={{ paddingTop: 16, marginTop: 16, borderTop: "1px solid var(--fw-line)", display: "flex", flexDirection: "column", gap: 13 }}>
              {([["Problem", p.problem, "var(--fw-conflict)"], ["How FrameWire helps", p.help, "var(--fw-signal)"], ["Result", p.result, "var(--fw-verified)"]] as const).map(([k, v, c]) => (
                <div key={k}>
                  <div className="fw-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: c, marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function UseCases() {
  return (
    <Section id="use-cases">
      <SectionHead index="11" kicker="Professional use cases"
        title="Built for people whose conclusions are questioned."
        lead="Different teams, the same need: findings that can be traced back to evidence. Tap a card to expand." />
      <div className="fw-persona-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {PERSONAS.map((p, i) => <PersonaCard key={p.role} p={p} delay={Math.min(i * 45, 280)} />)}
      </div>
    </Section>
  );
}

interface CompareCol { who: string; icon: string | null; note: string; primary?: boolean; rows: boolean[] }
const COMPARE: CompareCol[] = [
  { who: "Ordinary monitoring tools", icon: "bell", note: "Show mentions and alerts", rows: [true, false, false, false, false, false] },
  { who: "Generic AI assistants", icon: "message-square", note: "Generate immediate answers", rows: [false, false, false, false, false, false] },
  { who: "FrameWire", icon: null, note: "Preserves, verifies, connects, traces", primary: true, rows: [true, true, true, true, true, true] },
];
const COMPARE_CRITERIA = ["Surfaces signals", "Preserves sources", "Verifies before analysis",
  "Connects evidence to findings", "Retains uncertainty", "Produces traceable reports"];

export function WhyDifferent() {
  return (
    <Section id="why" band>
      <SectionHead index="12" kicker="Why FrameWire is different" align="center"
        title="A calm comparison — no names, no noise."
        lead="Monitoring tools surface mentions. Assistants answer fast. FrameWire is built to be trusted." />
      <Reveal>
        <div style={{ overflowX: "auto", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
          <table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "left", padding: "16px 18px", borderBottom: "1px solid var(--fw-line-strong)", fontWeight: 500, color: "var(--fw-ink-4)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Capability</th>
                {COMPARE.map((c) => (
                  <th key={c.who} scope="col" style={{ padding: "16px 14px", borderBottom: "1px solid var(--fw-line-strong)", background: c.primary ? "var(--fw-signal-wash)" : "transparent", minWidth: 130 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      {c.primary ? <Wordmark size={18} /> : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--fw-ink)", fontWeight: 600 }}>
                          <Icon name={c.icon as string} size={15} color="var(--fw-ink-3)" />{c.who}
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: c.primary ? "var(--fw-signal)" : "var(--fw-ink-4)", fontWeight: 400, textAlign: "center" }}>{c.note}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_CRITERIA.map((crit, ri) => (
                <tr key={crit}>
                  <th scope="row" style={{ textAlign: "left", fontWeight: 400, padding: "14px 18px", borderBottom: ri < COMPARE_CRITERIA.length - 1 ? "1px solid var(--fw-line)" : 0, color: "var(--fw-ink-2)" }}>{crit}</th>
                  {COMPARE.map((c) => (
                    <td key={c.who} style={{ padding: "14px 14px", textAlign: "center", borderBottom: ri < COMPARE_CRITERIA.length - 1 ? "1px solid var(--fw-line)" : 0, background: c.primary ? "var(--fw-signal-wash)" : "transparent" }}>
                      {c.rows[ri] ? <Icon name="check" size={17} color={c.primary ? "var(--fw-signal)" : "var(--fw-verified)"} /> : <span style={{ color: "var(--fw-ink-4)" }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
