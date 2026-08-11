import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { WorkflowVisual } from "./WorkflowVisual";
import { workflowDefinitions, workflowFromHash, workflowIds, type WorkflowDefinition, type WorkflowId } from "./workflowData";

const workflowGroups = ["Observe & Discover", "Evidence & Investigation", "Analyze & Understand", "Scenario & Output", "Continue"] as const;

function moveTo(id: string) {
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }));
}

function WorkflowOverview({ selectedId, onSelect, onClose }: { selectedId: WorkflowId; onSelect: (id: WorkflowId) => void; onClose: () => void }) {
  return (
    <section id="all-workflows" className="w2-overview" aria-labelledby="w2-overview-title">
      <div className="p2-container">
        <header><div><span>THE COMPLETE OPERATING JOURNEY</span><h2 id="w2-overview-title">Fourteen accountable movements.<br />One human-led investigation system.</h2></div><button type="button" onClick={onClose}><X size={16} aria-hidden="true" /> Close overview</button></header>
        <div className="w2-overview-groups">
          {workflowGroups.map((group) => <section key={group}><h3>{group}</h3><div>{workflowDefinitions.filter((workflow) => workflow.group === group).map((workflow) => <button key={workflow.id} type="button" className={workflow.id === selectedId ? "active" : ""} aria-current={workflow.id === selectedId ? "true" : undefined} onClick={() => onSelect(workflow.id)}><strong>{workflow.name}</strong><span>{workflow.subtitle}</span></button>)}</div></section>)}
        </div>
        <p>Each movement preserves its own authority boundary. System actions prepare, organize and compare; human actions create scope, interpretation, findings and conclusions.</p>
      </div>
    </section>
  );
}

function WorkflowPresentation({ workflow, onPrevious, onNext, onShowAll }: { workflow: WorkflowDefinition; onPrevious?: () => void; onNext?: () => void; onShowAll: () => void }) {
  return (
    <section id={workflow.id} key={workflow.id} className="w2-presentation" aria-labelledby={`${workflow.id}-title`}>
      <div className="p2-container">
        <header className="w2-presentation-heading">
          <span>{workflow.group}</span>
          <h2 id={`${workflow.id}-title`}>{workflow.name}</h2>
          <p>{workflow.subtitle}</p>
        </header>

        <div className="w2-purpose"><span>WHAT THIS WORKFLOW ACCOMPLISHES</span><p>{workflow.purpose}</p></div>
        <div className="w2-start"><span>HOW IT STARTS</span><p>{workflow.howItStarts}</p></div>
        <WorkflowVisual workflow={workflow} />

        <div className="w2-responsibility-grid">
          <section><span>SYSTEM ACTIONS</span><ul>{workflow.systemActions.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><span>HUMAN DECISIONS</span><ul>{workflow.humanActions.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><span>RESULTS</span><ul>{workflow.outputs.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <aside><ShieldCheck size={20} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p>{workflow.boundary}</p></div></aside>
        </div>

        <nav className="w2-workflow-actions" aria-label={`${workflow.name} navigation`}>
          <button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} aria-hidden="true" /><span>Previous Workflow</span></button>
          <button type="button" className="all" onClick={onShowAll}>View All Workflows</button>
          <button type="button" onClick={onNext} disabled={!onNext}><span>Next Workflow</span><ArrowRight size={16} aria-hidden="true" /></button>
        </nav>
      </div>
    </section>
  );
}

function CompleteWorkflow() {
  const stages = [
    ["Observe", "Live public information"], ["Discover", "Raw ecosystem search"], ["Preserve", "Evidence intake"], ["Investigate", "Human question and scope"], ["Analyze", "Independent lenses"], ["Understand", "Cross-lens context"], ["Reason", "Guided human cognition"], ["Report", "Reviewed finalization"], ["Continue", "Tracking and memory"],
  ];
  return (
    <section id="complete-workflow" className="w2-complete" aria-labelledby="w2-complete-title">
      <div className="p2-container">
        <header data-p2-reveal><span>COMPLETE WORKFLOW</span><h2 id="w2-complete-title">A continuous chain.<br />Never an automatic conclusion.</h2><p>FrameWire connects observation, evidence, independent analysis and human judgment while keeping each system output inspectable and bounded.</p></header>
        <div className="w2-complete-map" data-p2-reveal>
          <ol>{stages.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small>{index < stages.length - 1 && <i aria-hidden="true" />}</li>)}</ol>
          <aside><span>OPTIONAL SIDE PATH</span><strong>What-If Simulation</strong><p>Hypotheses branch from reviewed context and return as non-canonical scenario notes. They do not predict the future or rewrite evidence.</p></aside>
        </div>
        <div className="w2-complete-doctrine" data-p2-reveal><CheckCircle2 size={18} aria-hidden="true" /><p><strong>Public information becomes preserved evidence.</strong> Evidence supports independent observations. Humans decide what becomes a finding, a report, or a reason to continue investigating.</p></div>
      </div>
    </section>
  );
}

export default function WorkflowsV2Page() {
  usePublicReveal();
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflowFromHash);
  const [overviewOpen, setOverviewOpen] = useState(() => window.location.hash === "#all-workflows");
  const selectedIndex = workflowDefinitions.findIndex((workflow) => workflow.id === selectedWorkflow.id);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FrameWire Workflows — From Public Information to Human Action";
    const initialHash = window.location.hash.slice(1);
    if (initialHash) window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
      document.getElementById(initialHash)?.scrollIntoView({ block: "start" });
    }));
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      if (window.location.hash === "#all-workflows") { setOverviewOpen(true); return; }
      const id = window.location.hash.slice(1) as WorkflowId;
      if (!workflowIds.includes(id)) return;
      const workflow = workflowDefinitions.find((item) => item.id === id);
      if (workflow) { setSelectedWorkflow(workflow); setOverviewOpen(false); }
    };
    window.addEventListener("hashchange", onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => { window.removeEventListener("hashchange", onLocationChange); window.removeEventListener("popstate", onLocationChange); };
  }, []);

  const selectWorkflow = (id: WorkflowId) => {
    const workflow = workflowDefinitions.find((item) => item.id === id);
    if (!workflow) return;
    setSelectedWorkflow(workflow);
    setOverviewOpen(false);
    moveTo(id);
  };
  const showOverview = () => { setOverviewOpen(true); moveTo("all-workflows"); };
  const closeOverview = () => { setOverviewOpen(false); moveTo(selectedWorkflow.id); };

  return (
    <div className="p2-page w2-page">
      <PublicHeaderV2 activePage="workflows" />
      <main id="p2-main">
        <section className="w2-hero" aria-labelledby="w2-hero-title">
          <div className="p2-container">
            <div className="w2-hero-copy" data-p2-reveal>
              <span>FRAMEWIRE WORKFLOWS</span>
              <h1 id="w2-hero-title">Move from observation<br />to accountable human action.</h1>
              <p>FrameWire separates observation, discovery, evidence preservation, investigation, analysis, reasoning, reporting, export and continuity into clear workflows. The system assists at every stage, but it does not silently turn machine output into human conclusion.</p>
              <div className="p2-hero-actions"><a href="#live-observation">Explore Workflows <ArrowRight size={17} aria-hidden="true" /></a><a href="#complete-workflow">View Complete Workflow <ArrowDown size={17} aria-hidden="true" /></a></div>
            </div>
            <div className="w2-doctrine-strip" data-p2-reveal><span>Observe</span><i /><span>Discover</span><i /><span>Investigate</span><i /><span>Understand</span><i /><span>Report</span><i /><span>Continue</span></div>
          </div>
        </section>

        {overviewOpen && <WorkflowOverview selectedId={selectedWorkflow.id} onSelect={selectWorkflow} onClose={closeOverview} />}
        <WorkflowPresentation workflow={selectedWorkflow} onPrevious={selectedIndex > 0 ? () => selectWorkflow(workflowDefinitions[selectedIndex - 1].id) : undefined} onNext={selectedIndex < workflowDefinitions.length - 1 ? () => selectWorkflow(workflowDefinitions[selectedIndex + 1].id) : undefined} onShowAll={showOverview} />
        <CompleteWorkflow />
      </main>
      <PublicFooterV2 />
    </div>
  );
}
