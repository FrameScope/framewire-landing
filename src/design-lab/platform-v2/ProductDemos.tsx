import { useState } from "react";
import { ArrowRight, Check, FileCheck2, FileText, FolderLock, Globe2, MessageSquareText, Search, ShieldCheck, Upload } from "lucide-react";
import { lensRegistry, workbenchStates } from "./platformData";

const sourceCards = [
  { label: "Media", icon: Globe2 },
  { label: "Social", icon: MessageSquareText },
  { label: "Public Records", icon: FileText },
  { label: "Uploaded Documents", icon: Upload },
] as const;

export function OperatingWorkbench() {
  const [activeState, setActiveState] = useState(0);

  return (
    <section className="p2-workbench-shell" aria-labelledby="workbench-title">
      <div className="p2-workbench-chrome">
        <div><span /><span /><span /></div>
        <p>FRAMEWIRE / OPERATING WORKBENCH</p>
        <small>ILLUSTRATIVE INTERFACE</small>
      </div>
      <div className="p2-workbench-control"><ShieldCheck size={15} /><span>CONTROL SURROUNDING JOURNEY</span><small>Providers · Access · Cost · Governance</small></div>
      <div className="p2-workbench-flow" style={{ "--workbench-step": activeState } as React.CSSProperties}>
        <div className="p2-source-cluster">
          <span className="p2-ui-label">PUBLIC INFORMATION</span>
          {sourceCards.map(({ label, icon: Icon }) => <article key={label}><Icon size={16} aria-hidden="true" /><span>{label}</span></article>)}
        </div>
        <div className={`p2-flow-node gateway ${activeState >= 0 ? "reached" : ""}`}>
          <span>GOVERNED</span><strong>Acquisition</strong><small>Retrieval context attached</small>
        </div>
        <ArrowRight className="p2-flow-arrow" aria-hidden="true" />
        <div className={`p2-flow-node archive ${activeState >= 1 ? "reached" : ""}`}>
          <FolderLock aria-hidden="true" /><span>CANONICAL</span><strong>Raw Archive</strong><small>Original preserved</small>
        </div>
        <ArrowRight className="p2-flow-arrow" aria-hidden="true" />
        <div className={`p2-flow-node scope ${activeState >= 3 ? "reached" : ""}`}>
          <Search aria-hidden="true" /><span>HUMAN-SELECTED</span><strong>Investigation Scope</strong><small>Question + bounded evidence</small>
        </div>
        <div className={`p2-lens-channel ${activeState >= 4 ? "reached" : ""}`}>
          <span className="p2-ui-label">INDEPENDENT LENSES</span>
          <div>{lensRegistry.map((lens) => <i key={lens.code}>{lens.code}</i>)}</div>
          <small>Observations remain separate</small>
        </div>
        <ArrowRight className="p2-flow-arrow" aria-hidden="true" />
        <div className={`p2-review-node ${activeState >= 5 ? "reached" : ""}`}>
          <span>HUMAN REVIEW</span>
          <div><i><Check size={13} /> Include</i><i>Qualify</i><i>Needs evidence</i></div>
        </div>
        <ArrowRight className="p2-flow-arrow" aria-hidden="true" />
        <div className={`p2-report-artifact ${activeState >= 6 ? "reached" : ""}`}>
          <FileCheck2 aria-hidden="true" /><span>REPORT</span><strong>Evidence-backed</strong><small>Human finalized</small>
        </div>
      </div>
      <div className="p2-workbench-states" role="group" aria-label="Workbench state">
        {workbenchStates.map((state, index) => (
          <button key={state} type="button" className={activeState === index ? "active" : activeState > index ? "passed" : ""} onClick={() => setActiveState(index)} aria-pressed={activeState === index}>
            <i aria-hidden="true" />{state}
          </button>
        ))}
      </div>
      <p id="workbench-title" className="p2-workbench-note">Archive precedes analysis. Investigation begins through human selection. Only reviewed material reaches the report.</p>
    </section>
  );
}

const investigationTabs = ["Evidence", "Timeline", "Lenses", "Notes"] as const;

function InvestigationPanel({ tab }: { tab: typeof investigationTabs[number] }) {
  if (tab === "Timeline") return <div className="p2-timeline-panel"><i /><article><span>RETRIEVAL</span><strong>Public material preserved</strong><small>Archive reference attached</small></article><article><span>SCOPE</span><strong>Evidence selected</strong><small>Human decision recorded</small></article><article><span>REVIEW</span><strong>Claim unresolved</strong><small>Additional corroboration required</small></article></div>;
  if (tab === "Lenses") return <div className="p2-theater-lenses">{lensRegistry.map((lens) => <article key={lens.code}><span>{lens.code}</span><strong>{lens.name.replace(" Intelligence", "")}</strong><small>Observation bounded</small></article>)}</div>;
  if (tab === "Notes") return <div className="p2-notes-panel"><article><span>HUMAN NOTE</span><p>Compare the preserved statement with the original public record before disposition.</p></article><article><span>UNRESOLVED QUESTION</span><p>Does an independent source support the time and location described?</p></article><article><span>LIMITATION</span><p>Available material does not support a final attribution.</p></article></div>;
  return <div className="p2-evidence-stream"><article className="selected"><span>EVIDENCE SELECTED</span><strong>Official notice concerning a public policy announcement</strong><small>Original source preserved · Archive link available</small></article><article><span>SOURCE PRESERVED</span><strong>Uploaded supporting document</strong><small>Original and extracted content retained</small></article><article><span>EXCLUDED FROM SCOPE</span><strong>Related material without sufficient support</strong><small>Human scope decision · exclusion reason retained</small></article></div>;
}

export function InvestigationTheater() {
  const [activeTab, setActiveTab] = useState<typeof investigationTabs[number]>("Evidence");
  return (
    <section id="investigation" className="p2-dark-section p2-investigation" aria-labelledby="investigation-title">
      <div className="p2-container">
        <div className="p2-section-heading dark">
          <span>INVESTIGATION-CENTERED</span>
          <h2 id="investigation-title">Move from a broad information environment<br />to a bounded evidence universe.</h2>
          <p>Search reveals what exists. A human defines what belongs inside an investigation.</p>
        </div>
        <div className="p2-investigation-window">
          <aside>
            <span className="p2-ui-label">INVESTIGATION</span>
            <h3>Public record comparison</h3>
            <p>How do the available materials describe the announced policy and its implementation context?</p>
            <dl><div><dt>Scope</dt><dd>Human-defined</dd></div><div><dt>Evidence</dt><dd>Selected</dd></div><div><dt>State</dt><dd>In review</dd></div></dl>
            <nav aria-label="Investigation views">{investigationTabs.map((tab) => <button key={tab} type="button" className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab}>{tab}</button>)}</nav>
          </aside>
          <div className="p2-investigation-center">
            <div className="p2-window-toolbar"><span>{activeTab.toUpperCase()}</span><small>ILLUSTRATIVE WORKSPACE</small></div>
            <InvestigationPanel tab={activeTab} />
          </div>
          <aside className="p2-investigation-review">
            <span className="p2-ui-label">REVIEW CONTEXT</span>
            <article><strong>Claim unresolved</strong><small>No automatic disposition</small></article>
            <article><strong>Additional corroboration required</strong><small>Insufficiency preserved</small></article>
            <article><strong>Human note</strong><small>Reasoning remains attributable</small></article>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function GuidedCognitionDemo() {
  return (
    <section id="reasoning" className="p2-light-section p2-reasoning" aria-labelledby="reasoning-title">
      <div className="p2-container">
        <div className="p2-section-heading split">
          <div><span>CONTEXTUAL GUIDED COGNITION</span><h2 id="reasoning-title">FrameWire helps investigators compare interpretations, not surrender judgment.</h2></div>
          <p>Guidance organizes competing readings of the same evidence. It does not produce one authoritative AI answer.</p>
        </div>
        <div className="p2-reasoning-panel">
          <div className="p2-reasoning-input">
            <span>EVIDENCE</span>
            <article><strong>Preserved source A</strong><small>Supports sequence, not attribution</small></article>
            <article><strong>Preserved source B</strong><small>Contradicts timing</small></article>
            <article><strong>Missing record</strong><small>Requested, not available</small></article>
          </div>
          <div className="p2-interpretations">
            <article><span>INTERPRETATION A</span><p>The available material may support the documented sequence.</p><small>Support remains partial</small></article>
            <article><span>INTERPRETATION B</span><p>The timing conflict may change how the sequence should be described.</p><small>Contradiction preserved</small></article>
          </div>
          <div className="p2-human-reasoning">
            <span>HUMAN REASONING</span>
            <ul><li>Compare contradictions</li><li>Record missing evidence</li><li>Add attributable notes</li><li>Choose report disposition</li></ul>
            <strong>Reviewed finding</strong>
          </div>
        </div>
        <div className="p2-simple-flow" aria-label="Reasoning sequence"><span>Evidence</span><i>→</i><span>Competing Interpretations</span><i>→</i><span>Human Reasoning</span><i>→</i><span>Reviewed Finding</span></div>
      </div>
    </section>
  );
}

const dispositions = ["Include", "Revise", "Exclude", "Needs evidence", "Approved"] as const;

export function GovernedReportDemo() {
  const [disposition, setDisposition] = useState<typeof dispositions[number]>("Needs evidence");
  return (
    <section id="report" className="p2-light-section p2-report-section" aria-labelledby="report-title">
      <div className="p2-container">
        <div className="p2-section-heading">
          <span>GOVERNED REPORTING</span>
          <h2 id="report-title">A report is assembled from reviewed evidence,<br />not generated as automatic truth.</h2>
        </div>
        <div className="p2-report-studio">
          <aside>
            <span>REPORT INPUTS</span>
            {["Evidence references", "Lens observations", "Analytics artifacts", "Contradictions", "Limitations"].map((item) => <button type="button" key={item}><i />{item}</button>)}
          </aside>
          <article className="p2-report-canvas">
            <div><small>FRAMEWIRE / REVIEW DRAFT</small><span>{disposition.toUpperCase()}</span></div>
            <h3>Public record comparison</h3>
            <section><strong>Summary</strong><p>The reviewed materials describe a public policy announcement with unresolved differences in timing and attribution.</p></section>
            <section><strong>Reviewed finding</strong><p>Available evidence supports a bounded description of the sequence. Attribution remains qualified.</p><sup>Archive identity retained · exact evidence span available</sup></section>
            <section><strong>Contradictions & limitations</strong><p>One preserved source conflicts with the reported timing. An additional public record was not available.</p></section>
            <footer>Methodology and source citations remain attached.</footer>
          </article>
          <aside className="p2-dispositions">
            <span>HUMAN DISPOSITION</span>
            {dispositions.map((item) => <button type="button" key={item} className={disposition === item ? "active" : ""} aria-pressed={disposition === item} onClick={() => setDisposition(item)}>{item}{disposition === item && <Check size={14} />}</button>)}
            <small>Finalization remains a human decision.</small>
          </aside>
        </div>
        <div className="p2-simple-flow" aria-label="Report sequence"><span>Selected Evidence</span><i>→</i><span>Reviewed Observation</span><i>→</i><span>Human Finding</span><i>→</i><span>Finalized Report</span><i>→</i><span>Distribution</span></div>
      </div>
    </section>
  );
}
