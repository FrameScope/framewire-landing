import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

const EXPERIENCE = [
  { label: "Observe", icon: "eye", text: "Detect signals, changes, sources and emerging issues." },
  { label: "Question", icon: "help-circle", text: "Turn a signal into a subject worth investigating." },
  { label: "Investigate", icon: "git-branch", text: "Inspect evidence, timelines, actors, places, claims and relationships." },
  { label: "Understand", icon: "scale", text: "Compare interpretations, convergence, confidence and uncertainty." },
  { label: "Produce", icon: "file-text", text: "Create a traceable report with its evidence and limitations." },
  { label: "Remember", icon: "history", text: "Preserve the investigation, its changes, corrections and continuity." },
];

export function Investigation() {
  return (
    <Section id="investigation">
      <SectionHead index="06" kicker="Investigation experience"
        title="A disciplined path from signal to understanding."
        lead="The human workflow that runs on top of the governed pipeline — six moves, in order." />
      <div className="fw-exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {EXPERIENCE.map((e, i) => (
          <Reveal key={e.label} delay={Math.min(i * 60, 320)}>
            <Card style={{ height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 13 }}>
                <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-line-strong)", background: "var(--fw-surface-inset)" }}>
                  <Icon name={e.icon} size={16} color="var(--fw-ink-2)" />
                </span>
                <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)" }}>{String(i + 1).padStart(2, "0")}</span>
                <span className="fw-h3" style={{ fontSize: 17 }}>{e.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--fw-ink-3)" }}>{e.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const OUTCOMES = [
  { icon: "trending-up", t: "Follow how narratives grow, decline, recur and collide" },
  { icon: "activity", t: "Observe sentiment and emotional signals — without treating them as public opinion" },
  { icon: "network", t: "Connect actors, organizations, sources, claims and places" },
  { icon: "scale", t: "Compare claims with the evidence behind them" },
  { icon: "map-pin", t: "Understand geographic context" },
  { icon: "clock", t: "Inspect timelines and recurrence" },
  { icon: "split", t: "Identify contradictions and missing context" },
  { icon: "git-fork", t: "Preserve uncertainty and competing explanations" },
  { icon: "file-check", t: "Produce evidence-linked reports" },
];

const LAYERS = ["Narrative", "Sentiment", "Emotion", "Threat", "Geography", "Politico",
  "Verification", "Entities", "Sources", "Timeline", "Memory"];

export function Understand() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="understand" band>
      <SectionHead index="07" kicker="What you understand" align="center"
        title="Outcomes first — not engine names."
        lead="FrameWire is built to answer questions, not to show you a control panel. Here is what it helps you see." />
      <div className="fw-out-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {OUTCOMES.map((o, i) => (
          <Reveal key={o.t} delay={Math.min(i * 45, 300)}>
            <div style={{ display: "flex", gap: 13, padding: "18px 18px", height: "100%", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
              <Icon name={o.icon} size={18} color="var(--fw-signal)" style={{ marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--fw-ink-2)" }}>{o.t}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div style={{ marginTop: 34, maxWidth: 760, marginInline: "auto" }}>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", cursor: "pointer", textAlign: "left", background: "var(--fw-surface)", color: "var(--fw-ink)", border: `1px solid ${open ? "var(--fw-signal-edge)" : "var(--fw-line-strong)"}`, borderRadius: open ? "var(--radius-md) var(--radius-md) 0 0" : "var(--radius-md)", transition: "border-color var(--motion-calm) var(--ease-calm)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
              <Icon name="layers" size={18} color="var(--fw-signal)" />
              <span style={{ fontSize: 15.5, fontWeight: 600 }}>Explore the intelligence layers</span>
            </span>
            <Icon name={open ? "minus" : "plus"} size={18} color="var(--fw-ink-3)" />
          </button>
          <div style={{ display: "grid", gridTemplateRows: open ? "1fr" : "0fr", transition: "grid-template-rows var(--motion-settle) var(--ease-calm)" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ padding: "20px", border: "1px solid var(--fw-signal-edge)", borderTop: 0, borderRadius: "0 0 var(--radius-md) var(--radius-md)", background: "var(--fw-surface-inset)" }}>
                <p style={{ margin: "0 0 16px", fontSize: 13.5, color: "var(--fw-ink-3)", lineHeight: 1.55 }}>
                  Under the hood, these capabilities are organised as named layers. You rarely need to think about them — but they are there.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 9 }}>
                  {LAYERS.map((l) => (
                    <span key={l} className="fw-mono" style={{ fontSize: 12.5, padding: "6px 12px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-pill)", color: "var(--fw-ink-2)", background: "var(--fw-surface)" }}>{l}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const EXAMPLE_STEPS = [
  { icon: "radio", t: "A major public claim begins spreading", d: "It appears across news and social sources within hours." },
  { icon: "download", t: "FrameWire collects the original materials", d: "Each article, post and document is captured as first seen." },
  { icon: "database", t: "Every source is archived", d: "Source, time, provider and hash are recorded for each item." },
  { icon: "copy-minus", t: "Duplicates are removed", d: "Re-shares and republished copies are folded together." },
  { icon: "calendar-check", t: "Dates and source identities are checked", d: "Freshness and provenance are verified before analysis." },
  { icon: "network", t: "People, organizations, places and claims are extracted", d: "The entities and their relationships are mapped." },
  { icon: "scale", t: "Supporting and contradicting evidence is compared", d: "Convergence and conflict are held side by side." },
  { icon: "clock", t: "The story's change over time is shown", d: "A timeline reveals how the claim grew and shifted." },
  { icon: "file-text", t: "A report is produced", d: "With citations, reasons for confidence, and stated limitations." },
];

export function ExampleInvestigation() {
  const [active, setActive] = useState(0);
  const step = EXAMPLE_STEPS[active];
  return (
    <Section id="example">
      <SectionHead index="08" kicker="Example investigation"
        title="One illustrative workflow, start to finish."
        lead="A walk-through of how FrameWire handles a spreading public claim. Click through the steps." />
      <Reveal>
        <div style={{ marginBottom: 18 }}>
          <Badge tone="neutral" style={{ whiteSpace: "normal", maxWidth: "100%", lineHeight: 1.4 }}><Icon name="info" size={13} style={{ marginRight: 4, flexShrink: 0 }} />Illustrative workflow — not a real event, organization, or finding</Badge>
        </div>
      </Reveal>
      <div className="fw-ex-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,360px) minmax(0,1fr)", gap: "clamp(22px,3vw,40px)", alignItems: "start" }}>
        <Reveal>
          <div role="tablist" aria-label="Example steps" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {EXAMPLE_STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button key={i} role="tab" aria-selected={on} onClick={() => setActive(i)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", cursor: "pointer", textAlign: "left", background: on ? "var(--fw-signal-wash)" : "transparent", border: "1px solid", borderColor: on ? "var(--fw-signal-edge)" : "transparent", borderRadius: "var(--radius-sm)", transition: "all var(--motion-quick) var(--ease-calm)" }}>
                  <span className="fw-mono" style={{ fontSize: 11, color: on ? "var(--fw-signal)" : "var(--fw-ink-4)", width: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 13.5, color: on ? "var(--fw-ink)" : "var(--fw-ink-3)", fontWeight: on ? 600 : 400 }}>{s.t}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ position: "sticky", top: "calc(var(--nav-height) + 20px)" }}>
            <Card accent padding="xl">
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                <span style={{ width: 46, height: 46, borderRadius: "var(--radius-md)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--fw-signal-wash)", border: "1px solid var(--fw-signal-edge)" }}>
                  <Icon name={step.icon} size={20} color="var(--fw-signal)" />
                </span>
                <span className="fw-mono" style={{ fontSize: 12, color: "var(--fw-ink-4)" }}>Step {active + 1} of {EXAMPLE_STEPS.length}</span>
              </div>
              <h3 className="fw-h2" style={{ fontSize: 24, marginBottom: 12 }}>{step.t}</h3>
              <p className="fw-body" style={{ fontSize: 16 }}>{step.d}</p>
              <hr className="fw-rule" style={{ margin: "22px 0" }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <Button variant="ghost" size="sm" disabled={active === 0} onClick={() => setActive((a) => Math.max(0, a - 1))}>← Back</Button>
                <div style={{ display: "flex", gap: 5 }}>
                  {EXAMPLE_STEPS.map((_, i) => (
                    <span key={i} onClick={() => setActive(i)} style={{ width: i === active ? 18 : 6, height: 6, borderRadius: 999, background: i === active ? "var(--fw-signal)" : "var(--fw-line-bright)", cursor: "pointer", transition: "all var(--motion-calm) var(--ease-calm)" }} />
                  ))}
                </div>
                <Button variant="secondary" size="sm" disabled={active === EXAMPLE_STEPS.length - 1} onClick={() => setActive((a) => Math.min(EXAMPLE_STEPS.length - 1, a + 1))}>Next →</Button>
              </div>
            </Card>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
