import { Badge, type Tone } from "../ui/Badge";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";

interface LangItem { icon: string; title: string; status: string; tone: Tone; body: string }

const LANGS: LangItem[] = [
  {
    icon: "languages", title: "English", status: "Available", tone: "verified",
    body: "The interface, documentation and generated reports are in English today. This is the language the private beta is tested in.",
  },
  {
    icon: "globe", title: "Nepali", status: "On the roadmap", tone: "caution",
    body: "Nepali is a priority. FrameWire can already collect and archive Nepali-language sources, but full interface localization is not available yet.",
  },
  {
    icon: "scan-text", title: "Multilingual sources & OCR", status: "Partial", tone: "neutral",
    body: "Sources in many languages can be collected and archived. OCR and text normalization run at the verification stage; coverage and accuracy vary by language during the beta.",
  },
];

export function Language() {
  return (
    <Section id="language">
      <SectionHead kicker="Language support" align="center"
        title="Where English and Nepali stand today."
        lead="An honest snapshot — not a promise of full multilingual coverage." />
      <div className="fw-lang-grid">
        {LANGS.map((l, i) => (
          <Reveal key={l.title} delay={Math.min(i * 60, 200)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 13, height: "100%", padding: "22px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", background: "var(--fw-surface)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 11 }}>
                  <span style={{ width: 36, height: 36, borderRadius: "var(--radius-sm)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--fw-line-strong)", background: "var(--fw-surface-inset)" }}>
                    <Icon name={l.icon} size={17} color="var(--fw-ink-2)" />
                  </span>
                  <span className="fw-h3" style={{ fontSize: 17 }}>{l.title}</span>
                </span>
                <Badge tone={l.tone} dot>{l.status}</Badge>
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: "var(--fw-ink-2)" }}>{l.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="fw-muted" style={{ textAlign: "center", fontSize: 13.5, marginTop: 24, maxWidth: "62ch", marginInline: "auto" }}>
          We don&rsquo;t claim every interface and engine is fully localized. If a language matters to your work, tell us during the beta and it helps set priorities.
        </p>
      </Reveal>
    </Section>
  );
}
