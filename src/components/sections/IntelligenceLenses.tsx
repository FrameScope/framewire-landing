import { useState, type KeyboardEvent } from "react";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

interface Lens {
  icon: string;
  title: string;
  purpose: string;
  questions: string[];
  result: string;
  limitation?: string;
}

const LENSES: Lens[] = [
  {
    icon: "trending-up", title: "Narrative",
    purpose: "Follow how stories and interpretations emerge, grow, decline, recur, compete, or collide across sources.",
    questions: ["Which narratives are gaining attention?", "Which narratives are weakening?", "Where do competing explanations appear?", "Which actors and sources repeatedly carry them?"],
    result: "A traceable view of narrative movement and the evidence behind it.",
  },
  {
    icon: "activity", title: "Sentiment",
    purpose: "Observe how tone and positioning shift across sources, actors, locations, and time.",
    questions: ["Is coverage becoming more positive, negative, or divided?", "Which sources are driving the movement?", "Is the shift broad or concentrated?"],
    limitation: "Sentiment signals are not the same as public opinion.",
    result: "Evidence-linked changes in tone without presenting them as population-wide belief.",
  },
  {
    icon: "heart", title: "Emotion",
    purpose: "Identify emotional signals such as fear, anger, hope, trust, or uncertainty within observed content.",
    questions: ["Which emotional signals are increasing?", "Which narratives or events appear connected to them?", "Are the signals isolated or recurring?"],
    limitation: "Emotion analysis describes observed content, not the private emotions of individuals or entire populations.",
    result: "A contextual view of emotional signals connected to sources and narratives.",
  },
  {
    icon: "triangle-alert", title: "Threat and Escalation",
    purpose: "Examine evidence-backed indicators of escalation, recurrence, convergence, and potential risk.",
    questions: ["Are multiple indicators appearing together?", "Is a pattern recurring?", "Which locations, actors, and narratives are involved?", "What evidence supports the concern?"],
    limitation: "Threat indicators support investigation. They are not automatic predictions or final security judgments.",
    result: "A transparent view of risk indicators, supporting evidence, and uncertainty.",
  },
  {
    icon: "badge-check", title: "Claims and Verification",
    purpose: "Compare claims with supporting, contradicting, incomplete, or changing evidence.",
    questions: ["What exactly is being claimed?", "Which sources support it?", "Which evidence contradicts it?", "Has the verification status changed?"],
    result: "A claim history connected to evidence, corrections, and limitations.",
  },
  {
    icon: "map", title: "Geography",
    purpose: "Understand where signals, claims, events, narratives, and evidence are concentrated or changing.",
    questions: ["Where is activity occurring?", "Which locations appear repeatedly?", "Are patterns local, regional, or distributed?", "What evidence supports the geographic connection?"],
    result: "Location-aware investigation without reducing the subject to a decorative map.",
  },
  {
    icon: "landmark", title: "Actors and Institutions",
    purpose: "Examine political actors, institutions, relationships, alignments, claims, and recurring involvement.",
    questions: ["Which actors and institutions appear?", "How are they connected?", "Which narratives or claims are associated with them?", "How have relationships changed over time?"],
    limitation: "Connections remain evidence-backed and do not imply guilt, endorsement, or causation without proof.",
    result: "A traceable actor and institution view grounded in observed evidence.",
  },
  {
    icon: "network", title: "Entities and Relationships",
    purpose: "Connect people, organizations, places, claims, sources, and recurring associations.",
    questions: ["Which entities repeatedly appear together?", "Which relationships are directly supported?", "Which connections remain suggested or uncertain?", "Where has the same entity appeared before?"],
    result: "A bounded relationship view that distinguishes evidence from inference.",
  },
  {
    icon: "file-search", title: "Sources and Provenance",
    purpose: "Inspect where information originated, how it entered FrameWire, and how it changed during processing.",
    questions: ["Who published the material?", "When was it collected?", "Was it duplicated, cleaned, corrected, or isolated?", "Which findings rely on it?"],
    result: "A complete source path from original material to investigation use.",
  },
  {
    icon: "clock", title: "Timeline and Recurrence",
    purpose: "Follow how evidence, claims, events, findings, and corrections develop over time.",
    questions: ["What appeared first?", "What changed later?", "Which patterns returned?", "When did interpretation or verification change?"],
    result: "A chronological investigation record that preserves change instead of overwriting history.",
  },
  {
    icon: "history", title: "Investigation Memory",
    purpose: "Keep evidence, findings, corrections, relationships, reports, and later updates connected after the investigation ends.",
    questions: ["Has this pattern appeared before?", "What did the team previously conclude?", "What evidence supported that conclusion?", "What has changed since then?"],
    result: "Evidence-backed institutional continuity across investigations and time.",
  },
];

function LensCard({ lens, open, onToggle }: { lens: Lens; open: boolean; onToggle: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={lens.title}
      onClick={onToggle}
      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      style={{
        cursor: "pointer", height: "100%", display: "flex", flexDirection: "column",
        padding: "20px", background: "var(--fw-surface)",
        border: `1px solid ${open ? "var(--fw-signal-edge)" : "var(--fw-line-strong)"}`,
        borderRadius: "var(--radius-md)",
        transition: "border-color var(--motion-calm) var(--ease-calm), background var(--motion-calm) var(--ease-calm)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 11, minWidth: 0 }}>
          <span style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: `1px solid ${open ? "var(--fw-signal-edge)" : "var(--fw-line-strong)"}`, background: open ? "var(--fw-signal-wash)" : "var(--fw-surface-inset)" }}>
            <Icon name={lens.icon} size={17} color={open ? "var(--fw-signal)" : "var(--fw-ink-2)"} />
          </span>
          <span className="fw-h3" style={{ fontSize: 16 }}>{lens.title}</span>
        </span>
        <Icon name={open ? "minus" : "plus"} size={16} color="var(--fw-ink-4)" />
      </div>

      <p style={{ margin: "13px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{lens.purpose}</p>

      {!open && (
        <p className="fw-mono" style={{ margin: "12px 0 0", fontSize: 11.5, lineHeight: 1.45, color: "var(--fw-ink-4)" }}>
          e.g. {lens.questions[0]}
        </p>
      )}

      <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-settle) var(--ease-calm)" }}>
        <div style={{ overflow: "hidden" }}>
          <div style={{ paddingTop: 16, marginTop: 16, borderTop: "1px solid var(--fw-line)", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div className="fw-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fw-signal)", marginBottom: 8 }}>Helps answer</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                {lens.questions.map((q) => (
                  <li key={q} style={{ display: "flex", gap: 9, fontSize: 13, lineHeight: 1.45, color: "var(--fw-ink-2)" }}>
                    <Icon name="help-circle" size={14} color="var(--fw-ink-4)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
            {lens.limitation && (
              <div style={{ display: "flex", gap: 9, padding: "11px 13px", border: "1px solid var(--fw-caution-edge)", background: "var(--fw-caution-wash)", borderRadius: "var(--radius-sm)" }}>
                <Icon name="info" size={14} color="var(--fw-caution)" style={{ marginTop: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--fw-ink-2)" }}>{lens.limitation}</span>
              </div>
            )}
            <div>
              <div className="fw-mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--fw-verified)", marginBottom: 6 }}>Illustrative result</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{lens.result}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IntelligenceLenses() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <Section id="lenses">
      <SectionHead kicker="Multiple lenses. One investigation." align="center"
        title="Understand the same subject from every important angle."
        lead="FrameWire connects narratives, tone, emotion, claims, geography, actors, risk, sources, relationships, and time around the same evidence-backed investigation."
        maxLead="64ch" />
      <Reveal>
        <p className="fw-body" style={{ textAlign: "center", maxWidth: "64ch", margin: "-28px auto 0", color: "var(--fw-ink-3)" }}>
          Each lens reveals a different part of the picture. Together, they help investigators identify patterns, contradictions, relationships, uncertainty, and missing context.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 11, flexWrap: "wrap", margin: "30px auto 40px", maxWidth: 720, padding: "14px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--fw-signal-edge)", background: "var(--fw-signal-wash)", textAlign: "center" }}>
          <Icon name="eye" size={17} color="var(--fw-signal)" />
          <span style={{ fontSize: "clamp(14px, 1.3vw, 16px)", fontWeight: 500, color: "var(--fw-ink)" }}>
            The lenses assist understanding. They do not replace evidence or human judgment.
          </span>
        </div>
      </Reveal>

      <div className="fw-lens-grid">
        {LENSES.map((lens, i) => (
          <Reveal key={lens.title} delay={Math.min(i * 35, 280)}>
            <LensCard lens={lens} open={openIdx === i} onToggle={() => setOpenIdx((cur) => (cur === i ? null : i))} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="fw-muted" style={{ textAlign: "center", fontSize: 13, marginTop: 24 }}>Tap any lens to see the questions it helps answer.</p>
      </Reveal>
    </Section>
  );
}
