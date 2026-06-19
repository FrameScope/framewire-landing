import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

/* Direct answers to the questions early visitors asked — kept at the top of the
   page, not buried in a tour or the footer. (Tester-feedback correction.) */
const ANSWERS = [
  {
    icon: "help-circle",
    q: "What is FrameWire?",
    a: "A trusted intelligence and investigation workspace. It turns scattered information into traceable, evidence-backed investigations — with every source kept connected.",
  },
  {
    icon: "users",
    q: "Who is it for?",
    a: "Professionals whose conclusions get questioned: journalists, researchers, NGOs, analysts, and risk, security and policy teams.",
  },
  {
    icon: "git-branch",
    q: "What can I do after signing in?",
    a: "Introduce a subject, collect supporting material, inspect the evidence and claims, compare actors, places and timelines, then produce an evidence-linked report you can return to later.",
  },
  {
    icon: "lock",
    q: "How is my information handled?",
    a: "Originals are archived with their source and provenance. Raw data isn't treated as trusted until it is cleaned and verified, and final conclusions stay under your control. A formal privacy policy will be published before general availability.",
  },
  {
    icon: "languages",
    q: "English & Nepali support?",
    a: "The interface is in English today. FrameWire can already collect and archive multilingual sources, with OCR and normalization handled at verification. Nepali and other languages are on the roadmap — we don't claim full multilingual coverage yet.",
  },
];

export function Clarify() {
  return (
    <Section id="start" band>
      <SectionHead kicker="Start here" align="center"
        title="FrameWire, in under two minutes."
        lead="Five quick answers before you go deeper." />
      <div className="fw-clarify-grid">
        {ANSWERS.map((item, i) => (
          <Reveal key={item.q} delay={Math.min(i * 50, 250)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 11, height: "100%", padding: "20px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
                <span style={{ width: 34, height: 34, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-signal-edge)", background: "var(--fw-signal-wash)" }}>
                  <Icon name={item.icon} size={16} color="var(--fw-signal)" />
                </span>
                <span className="fw-h3" style={{ fontSize: 16 }}>{item.q}</span>
              </span>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--fw-ink-2)" }}>{item.a}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
