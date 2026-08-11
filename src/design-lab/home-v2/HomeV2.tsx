import { useEffect } from "react";
import { ArrowDown, ArrowRight, Archive, GitBranch, ScanSearch, ShieldCheck } from "lucide-react";
import { BETA_MAILTO } from "../../config";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { GuidedCognitionDemo, GovernedReportDemo, InvestigationTheater, OperatingWorkbench } from "../platform-v2/ProductDemos";
import { ContinuitySection, EvidenceLineageDemo, GovernanceFrame, LensExplorer, PlatformJourney } from "../platform-v2/PlatformSections";

const principles = [
  { title: "Archive First", body: "Original material is preserved before analysis.", icon: Archive },
  { title: "Independent Lenses", body: "Each lens produces its own bounded observation.", icon: ScanSearch },
  { title: "Human Control", body: "People decide what becomes a finding or report conclusion.", icon: ShieldCheck },
  { title: "Visible Lineage", body: "Material outputs remain connected to their evidence.", icon: GitBranch },
] as const;

function PrinciplesStrip() {
  return (
    <section className="p2-principles" aria-label="FrameWire operating principles" data-p2-reveal>
      <div className="p2-container">
        {principles.map(({ title, body, icon: Icon }) => <article key={title}><Icon size={20} aria-hidden="true" /><div><strong>{title.toUpperCase()}</strong><p>{body}</p></div></article>)}
      </div>
    </section>
  );
}

function BetaCTA() {
  return (
    <section id="beta" className="p2-beta-cta" aria-labelledby="beta-title" data-p2-reveal>
      <div className="p2-container">
        <span>FRAMEWIRE PRIVATE BETA</span>
        <h2 id="beta-title">Investigate public information<br />without losing sight of the evidence.</h2>
        <p>FrameWire is being developed for journalists, researchers, civil-society teams, public institutions, analysts, and others who need transparent contextual intelligence.</p>
        <div><a href={BETA_MAILTO}>Apply for Beta <ArrowRight size={17} /></a><a href="/platform">Explore the Platform</a></div>
        <small>Understand Before Concluding.</small>
      </div>
    </section>
  );
}

export default function HomeV2Page() {
  usePublicReveal();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FrameWire — Understand Before Concluding";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="p2-page">
      <PublicHeaderV2 activePage="home" />
      <main id="p2-main">
        <section className="p2-hero" aria-labelledby="p2-hero-title">
          <div className="p2-container">
            <div className="p2-hero-copy" data-p2-reveal>
              <span>ARCHIVE-FIRST CONTEXTUAL INTELLIGENCE</span>
              <h1 id="p2-hero-title">Understand public information <br />before drawing conclusions.</h1>
              <p>FrameWire preserves original material, narrows evidence into investigations, applies independent intelligence lenses, and helps humans build transparent reports.</p>
              <div className="p2-hero-actions"><a href="/platform">Explore the Platform <ArrowRight size={17} /></a><a href="#evidence">See How Evidence Moves <ArrowDown size={17} /></a></div>
              <small>Archive First <i /> Evidence Before Conclusion <i /> AI Assists <i /> Humans Decide</small>
            </div>
            <div data-p2-reveal><OperatingWorkbench /></div>
          </div>
        </section>
        <PrinciplesStrip />
        <div data-p2-reveal><PlatformJourney /></div>
        <div data-p2-reveal><InvestigationTheater /></div>
        <div data-p2-reveal><LensExplorer /></div>
        <div data-p2-reveal><EvidenceLineageDemo /></div>
        <div data-p2-reveal><GuidedCognitionDemo /></div>
        <div data-p2-reveal><GovernedReportDemo /></div>
        <div data-p2-reveal><ContinuitySection /></div>
        <div data-p2-reveal><GovernanceFrame /></div>
        <BetaCTA />
      </main>
      <PublicFooterV2 />
    </div>
  );
}
