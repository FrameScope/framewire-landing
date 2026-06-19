import { type MouseEvent } from "react";
import { Button } from "./components/ui/Button";
import { Icon } from "./components/ui/Icon";
import { Refrain } from "./components/ui/Refrain";
import { SiteNav, Section, Footer, useInViewClock, useIsNarrow } from "./components/site/primitives";
import { FlowStrip, HeroScene, WorkflowScene, MultilingualScene, MemoryScene } from "./components/site/scenes";
import { LensExplorer } from "./components/site/LensExplorer";
import { ToolsWorkspace } from "./components/site/ToolsWorkspace";
import { AudienceExplorer } from "./components/site/AudienceExplorer";
import { GuidedTour } from "./components/site/GuidedTour";
import { LensConceptScene } from "./components/motion/scenes/LensConceptScene";
import { ReportStudioScene } from "./components/motion/scenes/ReportStudioScene";
import { PipelineScene } from "./components/motion/scenes/PipelineScene";
import { useReducedMotion } from "./components/motion/sceneClock";
import type { SceneProps } from "./components/motion/scenes/shared";
import { FLOW_DEFINITION, FLOW_VERBS, FLOW_RECAP } from "./site/content";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "./config";

const BETA_MAILTO = `mailto:${CONTACT_EMAIL}?subject=FrameWire%20Private%20Beta%20Application`;

function scrollTo(e: MouseEvent, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Renders a guided-tour scene standalone, played when it scrolls into view. */
function InViewScene({ Component, runFor = 6 }: { Component: (p: SceneProps) => JSX.Element; runFor?: number }) {
  const reduced = useReducedMotion();
  const compact = useIsNarrow();
  const [ref, t] = useInViewClock(runFor);
  return <div ref={ref} className="iv-scene"><Component t={t} reduced={reduced} compact={compact} /></div>;
}

export default function CompleteHomepage() {
  const narrow = useIsNarrow();
  return (
    <>
      <a href="#what" className="fw-skip">Skip to content</a>
      <SiteNav />

      <main>
        {/* ── Hero ── */}
        <header id="top" className="site-hero">
          <div aria-hidden="true" className="site-hero-glow" />
          <div className="fw-container">
            <div className="site-hero-copy">
              <div className="site-eyebrow center">Observe · Question · Investigate · <span className="fw-signal">Understand</span></div>
              <h1 className="site-hero-h1">Understand Before Concluding.</h1>
              <p className="site-hero-lead">FrameWire helps people investigate complex subjects through connected intelligence lenses, trace every finding to evidence, and produce reports that remain under human control.</p>
              <div className="site-hero-cta">
                <Button variant="primary" size="lg" href="#lenses" onClick={(e) => scrollTo(e, "#lenses")} icon={<Icon name="layers-3" size={16} />}>Explore FrameWire</Button>
                <Button variant="ghost" size="lg" href="#tour" onClick={(e) => scrollTo(e, "#tour")} icon={<Icon name="play" size={15} />}>Watch the Guided Tour</Button>
              </div>
              <div className="site-hero-refrain"><Refrain>AI assists. Humans decide.</Refrain></div>
            </div>
            <HeroScene />
            <p className="site-hero-msg">One subject. Multiple lenses. One evidence-backed investigation.</p>
          </div>
        </header>

        {/* ── What FrameWire is ── */}
        <Section id="what" band eyebrow="What FrameWire is" title="A contextual intelligence and investigation system" center
          lead="FrameWire keeps sources, evidence, analysis, reporting, and institutional memory connected — from first signal to final report.">
          <FlowStrip steps={FLOW_DEFINITION} icons={["search", "folder-open", "git-branch", "eye", "file-check", "history"]} />
          <div className="verb-row">{FLOW_VERBS.map((v) => <span key={v}>{v}</span>)}</div>
        </Section>

        {/* ── What is an intelligence lens? ── */}
        <Section id="lens-intro" eyebrow="The core idea" title="What is an intelligence lens?" center
          lead="An intelligence lens examines one dimension of an investigation while remaining connected to the same evidence, entities, claims, locations, questions, and timeline.">
          <InViewScene Component={LensConceptScene} runFor={12} />
          <p className="site-statement">The investigation is the product. The engines are the lenses used to understand it.</p>
        </Section>

        {/* ── Full lens explorer ── */}
        <Section id="lenses" band eyebrow="Interactive lens explorer" title="One investigation, thirteen lenses" center
          lead="Pick a lens. The investigation stays put; the lens reveals what it examines, what it identifies, and what you learn — with one honest limitation.">
          <LensExplorer />
        </Section>

        {/* ── Investigation tools ── */}
        <Section id="tools" eyebrow="Investigation tools" title="One workspace, every tool" center
          lead="The tools that start, shape, and finish an investigation — shown as one transforming workspace.">
          <ToolsWorkspace />
          <p className="site-statement">Search and Live Timeline begin investigations. They do not automatically create conclusions.</p>
        </Section>

        {/* ── Guided tour ── */}
        <Section id="tour" band eyebrow="Technical intelligence guided tour" title="Watch FrameWire reason through an investigation" center
          lead="Follow the intelligence process through animated evidence paths, lens calculations, human review, and engine safeguards.">
          <GuidedTour compact={narrow} />
        </Section>

        {/* ── How FrameWire works ── */}
        <Section id="how-it-works" eyebrow="How FrameWire works" title="One claim, one complete investigation" center
          lead="A major public claim spreads across news, social sources, documents, public records, and local reports. FrameWire connects the whole investigation around it.">
          <WorkflowScene />
          <p className="site-statement">FrameWire does not replace investigation. It connects and strengthens it.</p>
        </Section>

        {/* ── Report studio & human verification ── */}
        <Section id="report-studio" band eyebrow="Report Studio & human verification" title="A report is verified into existence" center
          lead="Lens findings → user selection → evidence review → AI assistance → human verification → final approval → evidence-linked report.">
          <InViewScene Component={ReportStudioScene} runFor={6} />
          <div className="rs-split">
            <div className="rs-half">
              <div className="rs-half-h"><Icon name="wand-sparkles" size={15} color="var(--fw-signal)" /> AI may assist with</div>
              <ul>{["Organizing findings", "Suggesting structure", "Finding contradictions", "Highlighting missing context", "Preserving citations", "Identifying stale findings"].map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="rs-half">
              <div className="rs-half-h"><Icon name="user-check" size={15} color="var(--fw-verified)" /> Humans must control</div>
              <ul>{["Which findings enter", "Which claims are accepted", "Whether evidence is sufficient", "How uncertainty is presented", "What conclusions are written", "Whether the report is finalized"].map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          <p className="site-statement">AI assists. Humans decide. The user decides what enters the report, and remains responsible for the final conclusion.</p>
        </Section>

        {/* ── Robust technical system ── */}
        <Section id="trust" eyebrow="The robust system underneath" title="Flexible for people. Reliable underneath." center
          lead="FrameWire allows broad investigation while preventing raw, malformed, quarantined, or unverified material from moving directly into intelligence analysis.">
          <div className="src-row">{[["rss", "RSS"], ["globe", "Websites"], ["plug", "APIs"], ["upload", "Uploads"], ["scan-text", "OCR"], ["database", "Public data"], ["waypoints", "Integrations"]].map(([ic, l]) => <span key={l}><Icon name={ic} size={13} color="var(--fw-ink-3)" />{l}</span>)}</div>
          <InViewScene Component={PipelineScene} runFor={6} />
          <ul className="rules">
            {["Every source enters Archive first.", "Cleaning is not verification.", "Collection does not equal truth.", "Raw material cannot enter a lens.", "Quarantined material cannot enter a lens.", "Failed extraction cannot become a trusted finding.", "Automated analysis cannot become a final human conclusion."].map((r) => (
              <li key={r}><Icon name="shield-check" size={13} color="var(--fw-verified)" /> {r}</li>
            ))}
          </ul>
        </Section>

        {/* ── Multilingual ── */}
        <Section id="multilingual" band eyebrow="Multilingual intelligence" title="Different languages. One connected investigation." center
          lead="Multilingual sources and scanned documents normalize into one investigation while their original language, source, and context stay attached.">
          <MultilingualScene />
          <p className="site-statement">Multilingual evidence remains connected to its original source, language, and context.</p>
          <p className="site-note">FrameWire does not claim universal language support, and translation never replaces original evidence.</p>
        </Section>

        {/* ── Who can use FrameWire ── */}
        <Section id="audiences" eyebrow="Who it's for" title="One workspace. Every investigator." center
          lead="Pick a role — the starting subject, sources, question, lenses, output, and safeguard change. The evidence rules underneath do not.">
          <AudienceExplorer />
        </Section>

        {/* ── Institutional memory ── */}
        <Section id="memory" band eyebrow="Institutional memory" title="Most systems forget. This one remembers." center
          lead="Completed investigations enter memory. When new evidence appears, earlier findings reconnect and understanding updates — without erasing what came before.">
          <MemoryScene />
          <p className="site-statement">A memory system for evidence-backed institutional understanding.</p>
        </Section>

        {/* ── Final recap ── */}
        <Section id="recap" eyebrow="The whole picture" title="From a subject to a traceable report — and back to memory" center>
          <FlowStrip steps={FLOW_RECAP} accent="var(--fw-signal)" />
          <div className="recap-quote">
            <p>&ldquo;Wiring your frame through different lenses.&rdquo;</p>
            <span>— FrameWire</span>
          </div>
        </Section>

        {/* ── Apply for beta ── */}
        <section id="beta" className="beta">
          <div aria-hidden="true" className="beta-bg"><FlowStrip steps={["Sources", "Investigation", "Lenses", "Findings", "Human review", "Report"]} accent="var(--fw-signal)" /></div>
          <div className="fw-container beta-inner">
            <div className="site-eyebrow center">Private beta</div>
            <h2 className="beta-h">Investigate with FrameWire.</h2>
            <p className="beta-desc">Apply to explore FrameWire, test its investigation workflow, and help shape an evidence-first intelligence system.</p>
            <Button variant="primary" size="lg" href={BETA_MAILTO} icon={<Icon name="arrow-right" size={16} />}>Apply for Beta</Button>
            <p className="beta-sec">Private beta access is reviewed individually.</p>
            <a href={CONTACT_MAILTO} className="beta-email fw-signal fw-mono">{CONTACT_EMAIL}</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
