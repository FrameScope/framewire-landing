import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { canonicalPlatformStages, type CanonicalPlatformStage, type CanonicalStageId } from "./canonicalPlatformData";
import { CanonicalStageVisual } from "./CanonicalStageVisuals";

const stageIds = canonicalPlatformStages.map((stage) => stage.id);

function stageFromHash() {
  const hash = window.location.hash.slice(1) as CanonicalStageId;
  return canonicalPlatformStages.find((stage) => stage.id === hash) ?? canonicalPlatformStages[0];
}

function SelectedFunction({ stage, onPrevious, onNext, onShowJourney }: { stage: CanonicalPlatformStage; onPrevious?: () => void; onNext?: () => void; onShowJourney: () => void }) {
  return (
    <section id={stage.id} key={stage.id} className="p2-function-presentation" aria-labelledby={`${stage.id}-title`}>
      <div className="p2-container">
        <header className="p2-function-heading">
          <p>{stage.subtitle}</p>
          <h2 id={`${stage.id}-title`}>{stage.name}</h2>
        </header>

        <div className="p2-function-layout">
          <article className="p2-function-copy">
            <p className="p2-function-lead">{stage.description}</p>
            <div className="p2-function-how"><span>HOW IT WORKS</span><p>{stage.howItWorks}</p></div>
            <div className="p2-function-capabilities">
              <span>CAPABILITY LABELS</span>
              <ul>{stage.capabilities.map((capability) => <li key={`${capability.code ?? "cap"}-${capability.label}`}>{capability.code && <b>{capability.code}</b>}<span>{capability.label}</span></li>)}</ul>
            </div>
          </article>

          <div className="p2-function-demonstration">
            <div className="p2-function-demo-head"><span>INTERACTIVE PROCESS</span><small>Focus or select a card to inspect its role</small></div>
            <CanonicalStageVisual kind={stage.visual} />
            <div className="p2-function-technical-flow" aria-label={`${stage.name} technical flow`}>
              <span>TECHNICAL FLOW</span>
              <ol>{stage.technicalFlow.map((step, index) => <li key={step}><strong>{step}</strong>{index < stage.technicalFlow.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol>
            </div>
          </div>
        </div>

        <aside className="p2-function-boundary">
          <ShieldCheck size={19} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p>{stage.boundary}</p></div>
        </aside>

        <nav className="p2-function-actions" aria-label={`${stage.name} function navigation`}>
          <button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} aria-hidden="true" /><span>Previous Function</span></button>
          <button type="button" className="journey" onClick={onShowJourney}>View Complete Journey</button>
          <button type="button" onClick={onNext} disabled={!onNext}><span>Next Function</span><ArrowRight size={16} aria-hidden="true" /></button>
        </nav>
      </div>
    </section>
  );
}

function CompleteJourney({ selectedId, onSelect, onClose }: { selectedId: CanonicalStageId; onSelect: (id: CanonicalStageId) => void; onClose: () => void }) {
  return (
    <section id="stage-overview" className="p2-complete-journey" aria-labelledby="stage-overview-title">
      <div className="p2-container">
        <header>
          <div><span>THE COMPLETE PLATFORM FLOW</span><h2 id="stage-overview-title">One traceable journey.<br />Thirteen distinct functions.</h2></div>
          <button type="button" onClick={onClose}><X size={16} aria-hidden="true" /> Close journey</button>
        </header>
        <div className="p2-complete-journey-frame">
          <div className="p2-complete-control"><ShieldCheck size={16} aria-hidden="true" /><strong>GOVERNANCE SURROUNDS THE JOURNEY</strong><span>Access · provider controls · budgets · capabilities · audit · operational safeguards</span></div>
          <ol>{canonicalPlatformStages.map((stage, index) => <li key={stage.id}><button type="button" className={stage.id === selectedId ? "active" : ""} aria-current={stage.id === selectedId ? "step" : undefined} onClick={() => onSelect(stage.id)}><strong>{stage.navigationName}</strong><small>{stage.subtitle}</small></button>{index < canonicalPlatformStages.length - 1 && <ArrowRight size={14} aria-hidden="true" />}</li>)}</ol>
        </div>
      </div>
    </section>
  );
}

export function CanonicalPlatformJourney() {
  const [selectedStage, setSelectedStage] = useState(stageFromHash);
  const [journeyOpen, setJourneyOpen] = useState(() => window.location.hash === "#stage-overview");
  const selectedIndex = canonicalPlatformStages.findIndex((stage) => stage.id === selectedStage.id);

  const selectStage = (id: CanonicalStageId) => {
    const stage = canonicalPlatformStages.find((item) => item.id === id);
    if (!stage) return;
    setSelectedStage(stage);
    setJourneyOpen(false);
    window.history.pushState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })));
  };

  const showJourney = () => {
    setJourneyOpen(true);
    window.history.pushState(null, "", "#stage-overview");
    window.requestAnimationFrame(() => document.getElementById("stage-overview")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  };

  const closeJourney = () => {
    setJourneyOpen(false);
    window.history.pushState(null, "", `#${selectedStage.id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    window.requestAnimationFrame(() => document.getElementById(selectedStage.id)?.scrollIntoView({ block: "start" }));
  };

  useEffect(() => {
    const onLocationChange = () => {
      if (window.location.hash === "#stage-overview") {
        setJourneyOpen(true);
        window.requestAnimationFrame(() => document.getElementById("stage-overview")?.scrollIntoView({ block: "start" }));
        return;
      }
      const hash = window.location.hash.slice(1) as CanonicalStageId;
      if (!stageIds.includes(hash)) {
        setSelectedStage(canonicalPlatformStages[0]);
        setJourneyOpen(false);
        return;
      }
      const stage = canonicalPlatformStages.find((item) => item.id === hash);
      if (stage) {
        setSelectedStage(stage);
        setJourneyOpen(false);
      }
    };
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener("hashchange", onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return (
    <>
      {journeyOpen && <CompleteJourney selectedId={selectedStage.id} onSelect={(id) => selectStage(id)} onClose={closeJourney} />}

      <SelectedFunction
        stage={selectedStage}
        onPrevious={selectedIndex > 0 ? () => selectStage(canonicalPlatformStages[selectedIndex - 1].id) : undefined}
        onNext={selectedIndex < canonicalPlatformStages.length - 1 ? () => selectStage(canonicalPlatformStages[selectedIndex + 1].id) : undefined}
        onShowJourney={showJourney}
      />
    </>
  );
}

export function PlatformDoctrine() {
  const doctrine = ["Archive First", "Evidence Before Conclusion", "Independent Lenses", "Missing Is Not Neutral", "AI Assists", "Humans Decide", "Understand Before Concluding"];
  return (
    <section id="platform-doctrine" className="p2-doctrine" aria-labelledby="platform-doctrine-title">
      <div className="p2-container">
        <div className="p2-canonical-heading dark" data-p2-reveal><div><span>SUPPORTING DOCTRINE</span><h2 id="platform-doctrine-title">The operating rules stay visible.</h2></div><p>These principles protect the distinction between collected material, analytical observation, human finding, and finalized report.</p></div>
        <ul data-p2-reveal>{doctrine.map((item) => <li key={item}><CheckCircle2 size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>
      </div>
    </section>
  );
}
