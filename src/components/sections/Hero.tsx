import { Fragment, type MouseEvent } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Refrain } from "../ui/Refrain";
import { BETA_MAILTO, LOGO } from "../../config";

const AUDIENCE = ["Journalists", "Researchers", "NGOs", "Analysts", "Risk & security teams", "Policy professionals"];

/** Quiet source → understanding line motif (structure, not a chart). */
function EvidenceTrail() {
  const nodes = [
    { label: "Source", icon: "rss", gate: false },
    { label: "Archive", icon: "database", gate: false },
    { label: "Verify", icon: "shield-check", gate: true },
    { label: "Understand", icon: "lightbulb", gate: false },
  ];
  return (
    <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap", maxWidth: 560, margin: "0 auto" }}>
      {nodes.map((n, i) => (
        <Fragment key={n.label}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
            <span style={{ width: 42, height: 42, borderRadius: "var(--radius-sm)", border: `1px solid ${n.gate ? "var(--fw-signal-edge)" : "var(--fw-line-strong)"}`, background: n.gate ? "var(--fw-signal-wash)" : "var(--fw-surface)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={n.icon} size={17} color={n.gate ? "var(--fw-signal)" : "var(--fw-ink-2)"} />
            </span>
            <span className="fw-mono" style={{ fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: n.gate ? "var(--fw-signal)" : "var(--fw-ink-4)" }}>{n.label}</span>
          </div>
          {i < nodes.length - 1 && (
            <span style={{ flex: 1, minWidth: 26, height: 1, background: "var(--fw-line-strong)", marginTop: -20, marginInline: 6, position: "relative" }} />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export function Hero() {
  const scrollTo = (e: MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <header id="top" style={{ position: "relative", paddingTop: "clamp(64px, 10vw, 130px)", paddingBottom: "clamp(56px, 8vw, 110px)" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--fw-glow-signal)", pointerEvents: "none" }} />
      <div className="fw-container" style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <Reveal><img src={LOGO} alt="FrameWire" width={56} height={56} style={{ width: 56, height: 56 }} /></Reveal>
        <Reveal delay={50}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--fw-ink-3)", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <span>Observe</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
            <span>Question</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
            <span>Investigate</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
            <span className="fw-signal">Understand</span>
          </div>
        </Reveal>
        <Reveal delay={90} as="h1" className="fw-display" style={{ maxWidth: "16ch" }}>Understand Before Concluding.</Reveal>
        <Reveal delay={140}>
          <p className="fw-lead" style={{ fontSize: "var(--type-lead)", color: "var(--fw-ink)", maxWidth: "36ch", margin: "0 auto" }}>
            FrameWire helps professionals turn fragmented information into traceable, evidence-backed investigations.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="fw-body" style={{ color: "var(--fw-ink-3)", maxWidth: "44ch", margin: "0 auto" }}>
            Collect widely. Preserve every source. Verify before analysis. Keep humans in control.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            <Button variant="primary" size="lg" href={BETA_MAILTO} icon={<span>→</span>}>Join the Private Beta</Button>
            <Button variant="secondary" size="lg" href="#how" onClick={(e) => scrollTo(e, "#how")}>See How FrameWire Works</Button>
          </div>
        </Reveal>
        <Reveal delay={280} style={{ marginTop: 10 }}><Refrain>AI assists. Humans decide.</Refrain></Reveal>
        <Reveal delay={320}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "center", fontSize: 13, color: "var(--fw-ink-4)" }}>
            <span className="fw-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em" }}>Built for</span>
            {AUDIENCE.map((a, i) => (
              <Fragment key={a}>
                {i > 0 && <span style={{ color: "var(--fw-line-bright)" }}>·</span>}
                <span style={{ color: "var(--fw-ink-3)" }}>{a}</span>
              </Fragment>
            ))}
          </div>
        </Reveal>
        <Reveal delay={360} style={{ width: "100%", marginTop: 22 }}><EvidenceTrail /></Reveal>
      </div>
    </header>
  );
}
