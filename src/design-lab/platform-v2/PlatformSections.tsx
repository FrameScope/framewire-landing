import { useState } from "react";
import { AlertCircle, BarChart3, CheckCircle2, Database, FileSearch, GitBranch, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import { governanceGroups, lensRegistry, platformStages } from "./platformData";
import { LensSemanticInfographic, PlatformOperationalInfographic } from "./HomeSemanticInfographics";

const journeyStages = platformStages.filter((stage) => stage.id !== "control");

export function PlatformJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = journeyStages[activeIndex];

  return (
    <section id="platform" className="p2-light-section p2-platform-journey" aria-labelledby="platform-title">
      <div className="p2-container">
        <div className="p2-section-heading split">
          <div><span>THE FRAMEWIRE PLATFORM</span><h2 id="platform-title">One operating journey.<br />Distinct authority boundaries.</h2></div>
          <p>Collection, preservation, discovery, investigation, analysis, reasoning, reporting, and monitoring remain separate so users can see where every observation came from and who made the final decision.</p>
        </div>
        <div className="p2-journey-control-frame">
          <div className="p2-journey-control-label"><ShieldCheck size={16} /><strong>CONTROL</strong><span>Providers · Models · BYOK · Access · Cost · Governance · Operations</span></div>
          <div className="p2-journey-selector" role="tablist" aria-label="Platform journey stages">
            {journeyStages.map((stage, index) => (
              <button id={`stage-${stage.id}`} key={stage.id} type="button" role="tab" aria-selected={activeIndex === index} aria-controls="p2-journey-panel" className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)}>
                <span>{stage.number}</span><strong>{stage.title}</strong>
              </button>
            ))}
          </div>
          <article id="p2-journey-panel" className="p2-journey-panel" role="tabpanel" aria-live="polite">
            <div className="p2-journey-copy">
              <span>{activeStage.number} / {activeStage.title.toUpperCase()}</span>
              <h3>{activeStage.description}</h3>
              <ul>{activeStage.capabilities.map((capability) => <li key={capability}><CheckCircle2 size={15} aria-hidden="true" />{capability}</li>)}</ul>
              <p><strong>AUTHORITY BOUNDARY</strong>{activeStage.boundary}</p>
              <div className="p2-journey-controls">
                <button type="button" onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} disabled={activeIndex === 0}>Previous</button>
                <span>{String(activeIndex + 1).padStart(2, "0")} / {String(journeyStages.length).padStart(2, "0")}</span>
                <button type="button" onClick={() => setActiveIndex((index) => Math.min(journeyStages.length - 1, index + 1))} disabled={activeIndex === journeyStages.length - 1}>Next</button>
              </div>
            </div>
            <PlatformOperationalInfographic stage={activeStage} />
          </article>
        </div>
      </div>
    </section>
  );
}

export function LensExplorer() {
  const [activeCode, setActiveCode] = useState("NA");
  const activeLens = lensRegistry.find((lens) => lens.code === activeCode) ?? lensRegistry[0];

  return (
    <section id="lenses" className="p2-light-section p2-lenses" aria-labelledby="lenses-title">
      <div className="p2-container">
        <div className="p2-section-heading">
          <span>INDEPENDENT INTELLIGENCE LENSES</span>
          <h2 id="lenses-title">Ten ways to examine the same evidence<br />without forcing one automatic answer.</h2>
        </div>
        <div className="p2-lens-selector" role="tablist" aria-label="Intelligence lenses">
          {lensRegistry.map((lens) => <button key={lens.code} type="button" role="tab" aria-selected={activeLens.code === lens.code} aria-controls="p2-lens-panel" className={activeLens.code === lens.code ? "active" : ""} onClick={() => setActiveCode(lens.code)}><span>{lens.code}</span><small>{lens.name.replace(" Intelligence", "")}</small></button>)}
        </div>
        <article id="p2-lens-panel" className="p2-lens-panel" role="tabpanel" aria-live="polite">
          <div className="p2-lens-copy">
            <span>{activeLens.code}</span>
            <h3>{activeLens.name}</h3>
            <dl><div><dt>WHAT IT EXAMINES</dt><dd>{activeLens.examines}</dd></div><div><dt>WHAT IT PRODUCES</dt><dd>{activeLens.produces}</dd></div></dl>
            <p><AlertCircle size={17} aria-hidden="true" /><span><strong>AUTHORITY BOUNDARY</strong>{activeLens.boundary}</span></p>
          </div>
          <LensSemanticInfographic lens={activeLens} />
        </article>
      </div>
    </section>
  );
}

type InspectorSelection = "original" | "archive" | "prepared" | "eligibility" | "scope" | "observation" | "finding" | "citation";

type InspectorDetail = {
  id: InspectorSelection;
  label: string;
  status: string;
  meaning: string;
  groups: Array<{ label: string; items: string[] }>;
  doesNotMean: string[];
};

const lineageDetails: InspectorDetail[] = [
  {
    id: "original", label: "Original Source", status: "Source material", meaning: "The public material as collected from its source.",
    groups: [{ label: "Preserves", items: ["Source identity", "Available publication context", "Retrieval context"] }],
    doesNotMean: ["Verified", "Corroborated", "True"],
  },
  {
    id: "archive", label: "Raw Archive", status: "Canonical preservation", meaning: "Canonical preservation of what FrameWire collected before analytical use.",
    groups: [{ label: "Preserves", items: ["Original material", "Retrieval metadata", "Source context", "Stable reference where available"] }],
    doesNotMean: ["Verified", "Eligible", "Human-approved"],
  },
  {
    id: "prepared", label: "Prepared Evidence", status: "Derived representation", meaning: "A cleaned or extracted representation derived from the preserved source.",
    groups: [{ label: "May include", items: ["Normalized text", "OCR output", "Evidence spans", "Language information"] }, { label: "Does not replace", items: ["Original source"] }],
    doesNotMean: ["Independent verification", "Human finding"],
  },
  {
    id: "scope", label: "Investigation Scope", status: "Human-selected case scope", meaning: "Evidence deliberately included in a bounded investigation.",
    groups: [{ label: "Authority", items: ["Human-selected case scope"] }, { label: "Excludes by default", items: ["Broad ecosystem material unless explicitly added"] }],
    doesNotMean: ["All collected material", "Automatic relevance"],
  },
  {
    id: "observation", label: "Lens Observation", status: "Analytical observation", meaning: "An analytical observation derived from investigation-scoped evidence.",
    groups: [{ label: "Example analytical structure", items: ["Narrative observation", "Exact evidence span", "Visible limitation"] }, { label: "Authority", items: ["Bounded analytical observation"] }],
    doesNotMean: ["Human finding", "Final report conclusion"],
  },
  {
    id: "finding", label: "Human Finding", status: "Human investigation judgment", meaning: "The investigator’s reviewed judgment based on evidence and analytical context.",
    groups: [{ label: "Must remain", items: ["Evidence-linked", "Reviewable", "Attributable to the investigator"] }],
    doesNotMean: ["Automatic system conclusion", "Unqualified certainty"],
  },
  {
    id: "citation", label: "Report Citation", status: "Human-finalized report context", meaning: "A finalized statement remains traceable through findings and observations to evidence and archived source material.",
    groups: [{ label: "Retains", items: ["Finding context", "Evidence path", "Contradictions and limitations", "Archive connection"] }],
    doesNotMean: ["Mutable source material", "Automatic truth verdict"],
  },
];

const eligibilityDetail: InspectorDetail = {
  id: "eligibility", label: "Evidence Eligibility", status: "Governed admission state", meaning: "Determines whether prepared material is sufficiently grounded to enter governed analytical workflows.",
  groups: [{ label: "Possible outcomes", items: ["Eligible", "Insufficient", "Quarantined", "Excluded"] }, { label: "Requires", items: ["Archive linkage", "Usable content", "Source context", "Permission"] }],
  doesNotMean: ["True", "Verified", "Corroborated"],
};

const inspectorDetails = [...lineageDetails.slice(0, 3), eligibilityDetail, ...lineageDetails.slice(3)];

export function EvidenceLineageDemo() {
  const [activeId, setActiveId] = useState<InspectorSelection>("original");
  const activeDetail = inspectorDetails.find((item) => item.id === activeId) ?? inspectorDetails[0];
  const selectedLineageIndex = lineageDetails.findIndex((item) => item.id === activeId);
  const provenanceBoundary = selectedLineageIndex >= 0 ? selectedLineageIndex : 2;

  const metadata: Array<{ label: string; value: string; selection?: InspectorSelection }> = [
    { label: "SOURCE", value: "Public Institution", selection: "original" },
    { label: "ACQUISITION", value: "Governed Retrieval" },
    { label: "ARCHIVE STATE", value: "Original Preserved", selection: "archive" },
    { label: "CONTENT STATE", value: "Full Text Available", selection: "prepared" },
    { label: "EVIDENCE STATE", value: "Eligible for Review", selection: "eligibility" },
    { label: "VERIFICATION", value: "Not Yet Established" },
  ];

  return (
    <section id="evidence" className="p2-light-section p2-lineage" aria-labelledby="lineage-title">
      <div className="p2-container">
        <div className="p2-section-heading split">
          <div><span>VISIBLE EVIDENCE LINEAGE</span><h2 id="lineage-title">Every material observation should lead back to what FrameWire actually collected.</h2></div>
          <p>Lineage remains inspectable from the report citation to the untouched raw record.</p>
        </div>
        <div className="p2-lineage-demo p2-inspector-preview">
          <header className="p2-inspector-head">
            <div><span>SAMPLE PREVIEW</span><h3>Source Inspector</h3><p>Official public record · Public policy announcement</p></div>
            <strong><LockKeyhole size={15} aria-hidden="true" />ORIGINAL PRESERVED</strong>
          </header>

          <div className="p2-inspector-metadata" aria-label="Source and evidence context">
            {metadata.map((item) => item.selection ? (
              <button key={item.label} type="button" className={activeId === item.selection ? "active" : ""} aria-pressed={activeId === item.selection} onClick={() => setActiveId(item.selection!)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveId(item.selection!); } }}><span>{item.label}</span><strong>{item.value}</strong></button>
            ) : (
              <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>
            ))}
          </div>

          <div className="p2-lineage-workspace">
            <section className="p2-semantic-lineage" aria-labelledby="p2-provenance-path-title">
              <header><div><span>PROVENANCE &amp; AUTHORITY</span><h4 id="p2-provenance-path-title">Source → evidence → human-finalized report</h4></div><small>Selection reveals meaning and authority. Progression is never implied.</small></header>
              <div role="group" aria-label="Interactive evidence lineage">
                {lineageDetails.map((stage, index) => {
                  const relationship = stage.id === activeId ? "selected" : index < provenanceBoundary ? "upstream" : "downstream";
                   return <button key={stage.id} type="button" className={relationship} aria-pressed={stage.id === activeId} aria-controls="p2-lineage-state-detail" onClick={() => setActiveId(stage.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveId(stage.id); } }}><i aria-hidden="true" /><span>{stage.label}</span><small>{relationship === "selected" ? "Selected state" : relationship === "upstream" ? "Upstream provenance" : "Downstream use"}</small></button>;
                })}
              </div>
              <footer><span>Possible stopped states</span><b>Insufficient</b><b>Quarantined</b><b>Excluded</b><b>Unresolved</b></footer>
            </section>

            <aside id="p2-lineage-state-detail" className={`p2-lineage-detail detail-${activeDetail.id}`} aria-live="polite">
              <header><span>SELECTED STATE</span><h4>{activeDetail.label}</h4><small>{activeDetail.status}</small></header>
              <div className="p2-detail-meaning"><strong>Meaning</strong><p>{activeDetail.meaning}</p></div>
              <div className={`p2-detail-groups ${activeDetail.groups.length === 1 ? "single" : ""}`}>{activeDetail.groups.map((group) => <section key={group.label}><strong>{group.label}</strong><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div>
              <footer><strong>Does not mean</strong><div>{activeDetail.doesNotMean.map((item) => <span key={item}>{item}</span>)}</div></footer>
            </aside>
          </div>

          <footer className="p2-inspector-limitation"><ShieldCheck size={18} aria-hidden="true" /><div><strong>AUTHORITY LIMITATION</strong><p>Archive preservation records what FrameWire collected. It does not establish that a source claim is true. Prepared evidence remains derived, eligibility remains separate from verification, and humans decide what enters a final report.</p></div></footer>
        </div>
      </div>
    </section>
  );
}

const continuityItems = [
  { title: "Tracked Items", detail: "Records continuing interest without making a conclusion.", icon: FileSearch },
  { title: "Watchlists", detail: "Matches remain candidates for human review.", icon: Database },
  { title: "Change Detection", detail: "Observed changes remain linked to prior context.", icon: GitBranch },
  { title: "Alerts", detail: "Operational notices do not become findings.", icon: AlertCircle },
  { title: "EMAX Continuity", detail: "Preserves navigation context across investigations.", icon: Network },
];

export function ContinuitySection() {
  return (
    <section id="continuity" className="p2-light-section p2-continuity" aria-labelledby="continuity-title">
      <div className="p2-container">
        <div className="p2-section-heading split"><div><span>CONTINUITY AFTER THE REPORT</span><h2 id="continuity-title">Keep the investigation connected<br />to what changes next.</h2></div><p>Reviewed work can support continuity without turning an old observation into a current fact.</p></div>
        <div className="p2-continuity-timeline">
          {continuityItems.map(({ title, detail, icon: Icon }, index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><Icon aria-hidden="true" /><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
        <div className="p2-boundary-row"><span>Missing updates do not prove a condition ended.</span><span>EMAX preserves navigation context only.</span></div>
      </div>
    </section>
  );
}

export function GovernanceFrame() {
  return (
    <section id="governance" className="p2-dark-section p2-governance" aria-labelledby="governance-title">
      <div className="p2-container">
        <div className="p2-section-heading dark split"><div><span>CONTROL ACROSS THE PLATFORM</span><h2 id="governance-title">Govern providers, access, cost,<br />capabilities, and operation.</h2></div><p>Control surrounds the operating journey. It is not an automatic conclusion stage.</p></div>
        <div className="p2-governance-frame">
          <div className="p2-governance-rail"><LockKeyhole size={17} /><strong>DESIGNED FOR GOVERNED OPERATION</strong><span>PUBLIC INFORMATION → EVIDENCE → INVESTIGATION → REPORT</span></div>
          <div className="p2-governance-grid">
            {governanceGroups.map((group) => <article key={group.id}><span>{group.title.toUpperCase()}</span><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
          </div>
          <div className="p2-governance-disclosure"><BarChart3 size={17} /><p>Coverage, fallback, cost, and runtime state should remain visible. Historical governance gaps are not presented as already resolved.</p></div>
        </div>
      </div>
    </section>
  );
}
