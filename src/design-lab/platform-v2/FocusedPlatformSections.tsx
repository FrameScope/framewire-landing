import { useState, type KeyboardEvent } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, CircleStop, ShieldCheck } from "lucide-react";
import { PlatformStageVisual } from "./PlatformStageVisuals";
import { platformStages } from "./platformData";

const journeyStages = platformStages.filter((stage) => stage.id !== "control");

export function FocusedPlatformJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = platformStages[activeIndex];

  const selectStage = (index: number, restoreFocus = false) => {
    const nextIndex = Math.min(Math.max(index, 0), platformStages.length - 1);
    setActiveIndex(nextIndex);
    if (restoreFocus) window.requestAnimationFrame(() => document.getElementById(`stage-${platformStages[nextIndex].id}`)?.focus());
  };

  const onStageKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyTargets: Record<string, number> = { ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: platformStages.length - 1 };
    if (!(event.key in keyTargets)) return;
    event.preventDefault();
    selectStage(keyTargets[event.key], true);
  };

  return (
    <section id="platform-journey" className="p2-platform-focus" aria-labelledby="platform-journey-title">
      <div className="p2-container">
        <div className="p2-section-heading split">
          <div><span>THE OPERATING JOURNEY</span><h2 id="platform-journey-title">A complete path.<br />No collapsed authority.</h2></div>
          <p>Public information moves through nine distinct operating stages. Control surrounds the journey without becoming its final output.</p>
        </div>

        <div id="platform-map" className="p2-platform-map">
          <div className="p2-platform-map-control"><ShieldCheck size={16} /><strong>CONTROL</strong><span>BYOK · Providers and Models · Access and Permissions · Cost and Budgets · Capability Governance · Operations</span></div>
          <div className="p2-platform-map-track" aria-label="Public information through the FrameWire operating journey">
            <div className="p2-map-origin"><span>INPUT</span><strong>Public Information</strong></div>
            {journeyStages.map((stage, index) => <button key={stage.id} type="button" className={activeStage.id === stage.id ? "active" : ""} onClick={() => selectStage(index)}><span>{stage.number}</span><strong>{stage.title}</strong>{index < journeyStages.length - 1 && <ArrowRight size={13} aria-hidden="true" />}</button>)}
          </div>
          <div className="p2-platform-map-footer"><span>Control authorizes and limits every stage.</span><span>It does not create an analytical conclusion.</span></div>
        </div>

        <div className="p2-stage-workspace">
          <nav className="p2-stage-index" aria-label="Platform stages" role="tablist" aria-orientation="vertical">
            {platformStages.map((stage, index) => (
              <button id={`stage-${stage.id}`} key={stage.id} type="button" role="tab" aria-selected={activeIndex === index} aria-controls="platform-stage-panel" className={activeIndex === index ? "active" : ""} onClick={() => selectStage(index)} onKeyDown={(event) => onStageKeyDown(event, index)}>
                <span>{stage.number}</span><strong>{stage.title}</strong><i aria-hidden="true" />
              </button>
            ))}
          </nav>
          <article id="platform-stage-panel" className="p2-stage-panel" role="tabpanel" aria-live="polite" aria-labelledby={`stage-${activeStage.id}`}>
            <div className="p2-stage-copy">
              <span>{activeStage.number} / {activeStage.title.toUpperCase()}</span>
              <h3>{activeStage.purpose}</h3>
              <div><strong>HOW IT WORKS</strong><p>{activeStage.mechanism}</p></div>
              <div><strong>CAPABILITIES</strong><ul>{activeStage.capabilities.map((capability) => <li key={capability}><CheckCircle2 size={14} aria-hidden="true" />{capability}</li>)}</ul></div>
              <aside><AlertTriangle size={17} aria-hidden="true" /><p><strong>AUTHORITY BOUNDARY</strong>{activeStage.boundary}</p></aside>
            </div>
            <PlatformStageVisual type={activeStage.visualType} />
          </article>
        </div>
      </div>
    </section>
  );
}
const authorityStates = [
  ["COLLECTED", "FrameWire received the material."],
  ["PRESERVED", "The original record and retrieval context were stored."],
  ["ELIGIBLE", "The material may enter bounded evidence workflows."],
  ["DISCOVERED", "The material appeared in a raw ecosystem search."],
  ["SCOPED", "A human included it in an investigation."],
  ["OBSERVED", "A lens produced a bounded analytical observation."],
  ["REVIEWED", "A human evaluated the observation and supporting evidence."],
  ["FINALIZED", "A human approved it within a report snapshot."],
] as const;

const stoppedStates = ["QUARANTINED", "INSUFFICIENT", "EXCLUDED", "UNRESOLVED", "STALE"];

export function AuthorityBoundaries() {
  return (
    <section id="authority" className="p2-authority-section" aria-labelledby="authority-title">
      <div className="p2-container">
        <div className="p2-section-heading split"><div><span>WHY THE STAGES STAY SEPARATE</span><h2 id="authority-title">Different stages carry<br />different authority.</h2></div><p>These states describe what happened to material. They are not a guaranteed progression and do not silently promote one another.</p></div>
        <div className="p2-authority-map">
          <div className="p2-authority-track">
            {authorityStates.map(([state, description], index) => <article key={state}><span>{String(index + 1).padStart(2, "0")}</span><i aria-hidden="true" /><strong>{state}</strong><p>{description}</p></article>)}
          </div>
          <aside className="p2-stop-branches">
            <div><CircleStop size={17} aria-hidden="true" /><strong>MATERIAL MAY STOP</strong><p>Not every record becomes eligible, scoped, reviewed, or finalized.</p></div>
            <ul>{stoppedStates.map((state) => <li key={state}>{state}</li>)}</ul>
          </aside>
        </div>
        <p className="p2-missing-boundary">Missing evidence is not neutral, false, safe, verified, or zero.</p>
      </div>
    </section>
  );
}

const architectureClasses = [
  ["SURFACES", "Where users observe and work."],
  ["WORKFLOWS", "Controlled sequences of user and system action."],
  ["ENGINES", "Systems that retrieve, calculate, extract, coordinate, or transform."],
  ["SUBSTRATES", "Shared Archive, identity, context, lineage, and memory."],
  ["GOVERNANCE", "Controls that authorize, limit, audit, or stop operation."],
  ["OUTPUTS", "Reports, exports, monitoring, alerts, and integrations."],
] as const;

export function PlatformArchitectureSummary() {
  return (
    <section id="architecture" className="p2-architecture-summary" aria-labelledby="architecture-title">
      <div className="p2-container">
        <div className="p2-section-heading split"><div><span>PLATFORM ARCHITECTURE</span><h2 id="architecture-title">One platform.<br />Separate systems.<br />Shared evidence.</h2></div><p>FrameWire is larger than its ten intelligence lenses. The lenses depend on acquisition, Archive preservation, Search, investigation scope, context, identity, analytics, reporting, provider controls, access, and runtime governance.</p></div>
        <div className="p2-architecture-layers">{architectureClasses.map(([title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><p>{description}</p></article>)}</div>
        <small className="p2-registry-note">The canonical FrameWire registry defines 70 systems across nine architecture layers.</small>
      </div>
    </section>
  );
}
