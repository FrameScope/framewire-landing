import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

const STEPS = [
  { icon: "search", t: "Search or introduce a subject", d: "Start from a question, a name, a place, or a signal worth following." },
  { icon: "folder-search", t: "Collect supporting material", d: "Gather articles, posts, documents and data from many kinds of source." },
  { icon: "database", t: "Preserve original sources", d: "Every item is archived exactly as collected, with its provenance." },
  { icon: "eye", t: "Inspect evidence and claims", d: "Read the underlying material — not just a summary of it." },
  { icon: "network", t: "Compare actors, places & timelines", d: "See how people, organizations, narratives and locations connect." },
  { icon: "shield-check", t: "Verify and retain uncertainty", d: "Keep what is checked separate from what is not — and say what's unknown." },
  { icon: "file-text", t: "Produce an evidence-linked report", d: "Every claim stays tied to the source that supports it." },
  { icon: "history", t: "Return with the context intact", d: "Come back later and the investigation, evidence and history are still there." },
];

export function HelpsYouDo() {
  return (
    <Section id="do">
      <SectionHead kicker="What you can do" align="center"
        title="What FrameWire helps you do."
        lead="The practical result once you're inside — from a first question to a report you can stand behind." />
      <div className="fw-helps-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.t} delay={Math.min(i * 45, 300)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, height: "100%", padding: "18px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 32, height: 32, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-line-strong)", background: "var(--fw-surface-inset)" }}>
                  <Icon name={s.icon} size={15} color="var(--fw-signal)" />
                </span>
                <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)" }}>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--fw-ink)", lineHeight: 1.35 }}>{s.t}</span>
              <span style={{ fontSize: 13, lineHeight: 1.5, color: "var(--fw-ink-3)" }}>{s.d}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
