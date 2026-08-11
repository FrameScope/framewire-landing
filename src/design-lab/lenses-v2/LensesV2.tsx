import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { LensGraph } from "./LensGraphs";
import { ContextualLensExplainer } from "./ContextualLensExplainer";
import { lensDefinitions, lensFromHash, lensIds, type LensDefinition, type LensId } from "./lensData";

function moveToLens(id: LensId) {
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }));
}

function LensPresentation({ lens, onPrevious, onNext, onShowAll }: { lens: LensDefinition; onPrevious?: () => void; onNext?: () => void; onShowAll: () => void }) {
  return (
    <section id={lens.id} key={lens.id} className={`l2-presentation accent-${lens.accent}`} aria-labelledby={`${lens.id}-title`}>
      <div className="p2-container">
        <header className="l2-presentation-heading">
          <div className="l2-code" aria-hidden="true">{lens.code}</div>
          <div><p>{lens.subtitle}</p><h2 id={`${lens.id}-title`}>{lens.name}</h2></div>
        </header>

        <div className="l2-question-context">
          <div className="l2-question">
            <span>THE QUESTION THIS LENS ASKS</span>
            <p>{lens.question}</p>
          </div>
          <ContextualLensExplainer lens={lens} />
        </div>

        <div className="l2-intro-grid">
          <div><span>WHAT IT EXAMINES</span><p>{lens.purpose}</p></div>
          <div><span>HOW IT WORKS</span><p>{lens.mechanism}</p></div>
        </div>

        <LensGraph lens={lens} />

        <div className="l2-output-grid">
          <section><span>EVIDENCE IT READS</span><ul>{lens.evidence.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><span>WHAT IT PRODUCES</span><ul>{lens.outputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <aside><ShieldCheck size={20} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p>{lens.boundary}</p><small>{lens.limitation}</small></div></aside>
        </div>

        <nav className="l2-lens-actions" aria-label={`${lens.name} navigation`}>
          <button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} aria-hidden="true" /><span>Previous Lens</span></button>
          <button type="button" className="all" onClick={onShowAll}>View All Lenses</button>
          <button type="button" onClick={onNext} disabled={!onNext}><span>Next Lens</span><ArrowRight size={16} aria-hidden="true" /></button>
        </nav>
      </div>
    </section>
  );
}

function LensOverview({ selectedId, onSelect, onClose }: { selectedId: LensId; onSelect: (id: LensId) => void; onClose: () => void }) {
  return (
    <section id="all-lenses" className="l2-overview" aria-labelledby="all-lenses-title">
      <div className="p2-container">
        <header><div><span>THE TEN INDEPENDENT LENSES</span><h2 id="all-lenses-title">One evidence set.<br />Ten different questions.</h2></div><button type="button" onClick={onClose}><X size={16} aria-hidden="true" /> Close overview</button></header>
        <div className="l2-overview-grid">
          {lensDefinitions.map((lens) => (
            <button key={lens.id} type="button" className={lens.id === selectedId ? "active" : ""} aria-current={lens.id === selectedId ? "true" : undefined} onClick={() => onSelect(lens.id)}>
              <span>{lens.code}</span><strong>{lens.name}</strong><small>{lens.overview}</small>
            </button>
          ))}
        </div>
        <p>Every lens reads investigation-scoped evidence independently. Shared evidence supports comparison; it does not collapse the observations into one automatic score.</p>
      </div>
    </section>
  );
}

function LensDoctrine() {
  const doctrine = ["Investigation-scoped evidence", "Independent readings", "Missing is not neutral", "Correlation is not causation", "Repetition is not corroboration", "AI assists", "Humans decide"];
  return (
    <section className="l2-doctrine" aria-labelledby="l2-doctrine-title">
      <div className="p2-container">
        <header><span>LENS DOCTRINE</span><h2 id="l2-doctrine-title">Analysis remains bounded<br />by evidence and human judgment.</h2><p>Lens observations may reinforce, contradict or qualify one another. None becomes a finding or report conclusion without review.</p></header>
        <ul>{doctrine.map((item) => <li key={item}><CheckCircle2 size={16} aria-hidden="true" />{item}</li>)}</ul>
      </div>
    </section>
  );
}

export default function LensesV2Page() {
  usePublicReveal();
  const [selectedLens, setSelectedLens] = useState(lensFromHash);
  const [overviewOpen, setOverviewOpen] = useState(() => window.location.hash === "#all-lenses");
  const selectedIndex = lensDefinitions.findIndex((lens) => lens.id === selectedLens.id);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FrameWire Intelligence Lenses — Independent Evidence-Backed Analysis";
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      if (window.location.hash === "#all-lenses") {
        setOverviewOpen(true);
        window.requestAnimationFrame(() => document.getElementById("all-lenses")?.scrollIntoView({ block: "start" }));
        return;
      }
      const id = window.location.hash.slice(1) as LensId;
      if (!lensIds.includes(id)) {
        setSelectedLens(lensDefinitions[0]);
        setOverviewOpen(false);
        return;
      }
      const lens = lensDefinitions.find((item) => item.id === id);
      if (lens) {
        setSelectedLens(lens);
        setOverviewOpen(false);
      }
    };
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  const selectLens = (id: LensId) => {
    const lens = lensDefinitions.find((item) => item.id === id);
    if (!lens) return;
    setSelectedLens(lens);
    setOverviewOpen(false);
    moveToLens(id);
  };

  const showOverview = () => {
    setOverviewOpen(true);
    window.history.pushState(null, "", "#all-lenses");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const closeOverview = () => {
    setOverviewOpen(false);
    window.history.pushState(null, "", `#${selectedLens.id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => document.getElementById(selectedLens.id)?.scrollIntoView({ block: "start" }));
  };

  return (
    <div className="p2-page l2-page">
      <PublicHeaderV2 activePage="lenses" />
      <main id="p2-main">
        <section className="l2-hero" aria-labelledby="l2-hero-title">
          <div className="p2-container">
            <div className="l2-hero-copy" data-p2-reveal>
              <span>FRAMEWIRE INTELLIGENCE LENSES</span>
              <h1 id="l2-hero-title">Examine the same evidence<br />from different analytical perspectives.</h1>
              <p>FrameWire applies independent intelligence lenses to investigation-scoped evidence. Each lens asks a different question, preserves its own evidence-backed observations, and exposes uncertainty and limitations rather than collapsing analysis into one automatic answer.</p>
              <div className="p2-hero-actions"><a href="#narrative">Explore the Lenses <ArrowRight size={17} aria-hidden="true" /></a><a href="#all-lenses">View All Ten <ArrowDown size={17} aria-hidden="true" /></a></div>
            </div>
            <div className="l2-doctrine-strip" data-p2-reveal><span>Shared Evidence</span><i /><span>Independent Reading</span><i /><span>Separate Observations</span><i /><span>Human Review</span></div>
          </div>
        </section>

        {overviewOpen && <LensOverview selectedId={selectedLens.id} onSelect={selectLens} onClose={closeOverview} />}
        <LensPresentation
          lens={selectedLens}
          onPrevious={selectedIndex > 0 ? () => selectLens(lensDefinitions[selectedIndex - 1].id) : undefined}
          onNext={selectedIndex < lensDefinitions.length - 1 ? () => selectLens(lensDefinitions[selectedIndex + 1].id) : undefined}
          onShowAll={showOverview}
        />
        <LensDoctrine />
      </main>
      <PublicFooterV2 />
    </div>
  );
}
