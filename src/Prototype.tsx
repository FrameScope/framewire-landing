import { type MouseEvent } from "react";
import { Button } from "./components/ui/Button";
import { Wordmark } from "./components/ui/Wordmark";
import { Refrain } from "./components/ui/Refrain";
import { Section } from "./components/ui/Section";
import { HeroProductMotion } from "./components/proto/HeroProductMotion";
import { IntelligenceFlow } from "./components/proto/IntelligenceFlow";
import { AudienceWorkspace } from "./components/proto/AudienceWorkspace";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "./config";

function scrollTo(e: MouseEvent, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Prototype() {
  return (
    <>
      <a href="#flow" className="fw-skip">Skip to content</a>

      <nav className="fw-nav" aria-label="Primary">
        <div className="fw-container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={24} />
          <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)", textTransform: "uppercase", letterSpacing: "0.14em" }}>Contextual intelligence</span>
        </div>
      </nav>

      <main>
        {/* A. Hero product motion */}
        <header id="top" className="fw-section" style={{ position: "relative", paddingTop: "clamp(40px,6vw,72px)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--fw-glow-signal)", pointerEvents: "none" }} />
          <div className="fw-container" style={{ position: "relative" }}>
            <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 30px" }}>
              <div className="mo-eyebrow" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                <span>Observe</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
                <span>Question</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
                <span>Investigate</span><span style={{ color: "var(--fw-ink-4)" }}>·</span>
                <span className="fw-signal">Understand</span>
              </div>
              <h1 className="fw-display" style={{ fontSize: "clamp(2.4rem,1.4rem+4vw,4rem)", margin: "16px auto 0", maxWidth: "15ch" }}>Understand Before Concluding.</h1>
              <p className="mo-sub" style={{ marginTop: 16 }}>Watch how FrameWire turns scattered signals into a traceable, evidence-backed report.</p>
              <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 22, flexWrap: "wrap" }}>
                <Button variant="primary" size="lg" href="#flow" onClick={(e) => scrollTo(e, "#flow")} icon={<span>↓</span>}>See How FrameWire Works</Button>
              </div>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 18 }}><Refrain>AI assists. Humans decide.</Refrain></div>
            </div>
            <div style={{ maxWidth: 920, margin: "0 auto" }}><HeroProductMotion /></div>
          </div>
        </header>

        {/* B. Main intelligence-flow motion */}
        <Section id="flow" band>
          <div className="mo-head">
            <div className="mo-eyebrow">The intelligence flow</div>
            <h2 className="mo-h">Narrative → Sentiment → Emotion → Threat → Geography → Report</h2>
            <p className="mo-sub">One connected sequence — watch each lens add to the same investigation.</p>
          </div>
          <IntelligenceFlow />
        </Section>

        {/* C. Audience mode switcher */}
        <Section id="modes">
          <div className="mo-head">
            <div className="mo-eyebrow">Built for different investigators</div>
            <h2 className="mo-h">One workspace. Every role.</h2>
            <p className="mo-sub">Pick a role — sources, question, lenses and output change. The evidence rules don&rsquo;t.</p>
          </div>
          <AudienceWorkspace />
        </Section>
      </main>

      <footer style={{ borderTop: "1px solid var(--fw-line)", background: "var(--fw-black)" }}>
        <div className="fw-container" style={{ paddingBlock: "clamp(36px,5vw,56px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Wordmark size={24} />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "var(--fw-ink)" }}>Understand Before Concluding.</span>
          </div>
          <a href={CONTACT_MAILTO} className="fw-signal fw-mono" style={{ fontSize: 13, textDecoration: "none" }}>{CONTACT_EMAIL}</a>
        </div>
      </footer>
    </>
  );
}
