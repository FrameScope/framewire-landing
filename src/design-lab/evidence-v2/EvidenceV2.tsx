import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { EvidenceVisual } from "./EvidenceVisual";
import { evidenceDefinitions, evidenceFromHash, evidenceIds, type EvidenceDefinition, type EvidenceId } from "./evidenceData";

const evidenceGroups = ["Collect & Preserve", "Prepare & Govern", "Trace & Inspect", "Analyze & Conclude", "Export & Continue"] as const;

function moveTo(id: string) {
  window.history.pushState(null, "", `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })));
}

function EvidenceModel({ selectedId, onSelect, onClose }: { selectedId: EvidenceId; onSelect: (id: EvidenceId) => void; onClose: () => void }) {
  return (
    <section id="evidence-model" className="e2-model" aria-labelledby="e2-model-title">
      <div className="p2-container">
        <header><div><span>COMPLETE EVIDENCE MODEL</span><h2 id="e2-model-title">Preserve the origin.<br />Keep every use reviewable.</h2></div><button type="button" onClick={onClose}><X size={16} aria-hidden="true" /> Close model</button></header>
        <div className="e2-model-groups">
          {evidenceGroups.map((group) => <section key={group}><h3>{group}</h3><div>{evidenceDefinitions.filter((item) => item.group === group).map((item) => <button key={item.id} type="button" className={item.id === selectedId ? "active" : ""} aria-current={item.id === selectedId ? "true" : undefined} onClick={() => onSelect(item.id)}><strong>{item.name}</strong><span>{item.technicalFlow.join(" → ")}</span></button>)}</div></section>)}
        </div>
        <p>Public Source Material → Governed Acquisition → Canonical Raw Archive → Cleaning, OCR &amp; Enrichment → Quarantine &amp; Eligibility → Provenance &amp; Lineage → Source Inspection → Investigation-Scoped Evidence → Independent Lens Observations → Verification &amp; Human Findings → Evidence-Linked Report → Export &amp; Continuing Memory.</p>
      </div>
    </section>
  );
}

function EvidencePresentation({ evidence, onPrevious, onNext, onShowModel }: { evidence: EvidenceDefinition; onPrevious?: () => void; onNext?: () => void; onShowModel: () => void }) {
  return (
    <section id={evidence.id} key={evidence.id} className="e2-presentation" aria-labelledby={`${evidence.id}-title`}>
      <div className="p2-container">
        <header className="e2-presentation-heading"><span>{evidence.group}</span><h2 id={`${evidence.id}-title`}>{evidence.name}</h2><p>{evidence.subtitle}</p></header>
        <div className="e2-purpose"><span>WHAT THIS EVIDENCE FUNCTION DOES</span><p>{evidence.purpose}</p></div>
        <EvidenceVisual evidence={evidence} />
        <div className="e2-information-grid">
          <section><span>HOW IT WORKS</span><p>{evidence.mechanism}</p></section>
          <section><span>WHAT IT PRESERVES</span><ul>{evidence.preserves.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><span>EVIDENCE STATES</span><ul>{evidence.states.map((item) => <li key={item}>{item}</li>)}</ul></section>
          <section><span>TECHNICAL FLOW</span><ol>{evidence.technicalFlow.map((item) => <li key={item}>{item}</li>)}</ol></section>
          <aside><ShieldCheck size={20} aria-hidden="true" /><div><span>AUTHORITY BOUNDARY</span><p>{evidence.boundary}</p></div></aside>
        </div>
        <nav className="e2-topic-actions" aria-label={`${evidence.name} navigation`}><button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} aria-hidden="true" />Previous Evidence Topic</button><button type="button" className="model" onClick={onShowModel}>View Evidence Model</button><button type="button" onClick={onNext} disabled={!onNext}>Next Evidence Topic<ArrowRight size={16} aria-hidden="true" /></button></nav>
      </div>
    </section>
  );
}

function EvidenceAuthority() {
  const levels = [
    ["Raw Archive","What FrameWire collected."],["Eligible Evidence","What may enter governed analysis."],["Lens Observation","What an analytical lens calculated from evidence."],["Verification Finding","How support, contradiction, independence and sufficiency were assessed."],["Human Finding","What the investigator judged inside the case."],["Finalized Report","The governed point-in-time human conclusion."],
  ];
  const alternate = ["Insufficient","Quarantined","Excluded","Unresolved","Contradicted","Unavailable"];
  return (
    <section className="e2-authority" aria-labelledby="e2-authority-title">
      <div className="p2-container">
        <header data-p2-reveal><span>EVIDENCE AUTHORITY</span><h2 id="e2-authority-title">Different records carry<br />different authority.</h2><p>These levels are related, but they are not an automatic guaranteed progression. Every transition requires its own evidence, governance or human decision.</p></header>
        <div className="e2-authority-grid" data-p2-reveal>{levels.map(([name, description]) => <article key={name}><h3>{name}</h3><p>{description}</p></article>)}</div>
        <div className="e2-alternate-states" data-p2-reveal><strong>ALTERNATE STATES REMAIN VISIBLE</strong><ul>{alternate.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>
  );
}

function EvidencePrinciple() {
  const doctrine = ["Archive First","Original Material Preserved","Clean Without Rewriting","Eligibility Before Analysis","Exact Evidence Where Possible","Provenance Always Visible","Repetition Is Not Corroboration","Missing Is Not Neutral","Analysis Is Not Evidence","AI Assists","Humans Decide"];
  return (
    <section className="e2-principle" aria-labelledby="e2-principle-title"><div className="p2-container"><span>THE EVIDENCE PRINCIPLE</span><h2 id="e2-principle-title">FrameWire preserves the source before interpreting it, keeps every transformation reviewable, and never allows an analytical result to replace the evidence from which it was derived.</h2><ul>{doctrine.map((item) => <li key={item}><CheckCircle2 size={15} aria-hidden="true" />{item}</li>)}</ul></div></section>
  );
}

export default function EvidenceV2Page() {
  usePublicReveal();
  const [selectedEvidence, setSelectedEvidence] = useState(evidenceFromHash);
  const [modelOpen, setModelOpen] = useState(() => window.location.hash === "#evidence-model");
  const selectedIndex = evidenceDefinitions.findIndex((item) => item.id === selectedEvidence.id);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "FrameWire Evidence — Archive-First Reviewable Intelligence";
    const initialHash = window.location.hash.slice(1);
    if (initialHash) window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(initialHash)?.scrollIntoView({ block: "start" })));
    return () => { document.title = previousTitle; };
  }, []);

  useEffect(() => {
    const onLocationChange = () => {
      if (window.location.hash === "#evidence-model") { setModelOpen(true); return; }
      const id = window.location.hash.slice(1) as EvidenceId;
      if (!evidenceIds.includes(id)) { setSelectedEvidence(evidenceDefinitions[0]); setModelOpen(false); return; }
      const evidence = evidenceDefinitions.find((item) => item.id === id);
      if (evidence) { setSelectedEvidence(evidence); setModelOpen(false); }
    };
    window.addEventListener("hashchange", onLocationChange); window.addEventListener("popstate", onLocationChange);
    return () => { window.removeEventListener("hashchange", onLocationChange); window.removeEventListener("popstate", onLocationChange); };
  }, []);

  const selectEvidence = (id: EvidenceId) => { const evidence = evidenceDefinitions.find((item) => item.id === id); if (!evidence) return; setSelectedEvidence(evidence); setModelOpen(false); moveTo(id); };
  const showModel = () => { setModelOpen(true); moveTo("evidence-model"); };
  const closeModel = () => { setModelOpen(false); moveTo(selectedEvidence.id); };

  return (
    <div className="p2-page e2-page"><PublicHeaderV2 activePage="evidence" /><main id="p2-main">
      <section className="e2-hero" aria-labelledby="e2-hero-title"><div className="p2-container"><div className="e2-hero-grid"><div className="e2-hero-copy" data-p2-reveal><span>FRAMEWIRE EVIDENCE</span><h1 id="e2-hero-title">From collected material<br />to reviewable evidence.</h1><p>FrameWire preserves original source material before analysis, records how it was acquired and transformed, determines whether it is eligible for analytical use, and keeps important observations and conclusions connected to the evidence that supports them.</p><div className="p2-hero-actions"><a href="#public-source">Explore Evidence <ArrowRight size={17} aria-hidden="true" /></a><a href="#evidence-model">View Evidence Model <ArrowDown size={17} aria-hidden="true" /></a></div></div><aside className="e2-hero-record" data-p2-reveal><div><span>ORIGINAL MATERIAL</span><strong>Preserved first</strong></div><dl><div><dt>Source</dt><dd>Official public record</dd></div><div><dt>Collection</dt><dd>Governed route</dd></div><div><dt>Archive state</dt><dd>Original preserved</dd></div><div><dt>Verification</dt><dd>Not established by preservation</dd></div></dl><p>Illustrative evidence structure</p></aside></div><div className="e2-doctrine-strip" data-p2-reveal><span>Archive First</span><i /><span>Original Preserved</span><i /><span>Eligibility Before Analysis</span><i /><span>Provenance Visible</span><i /><span>Human Review</span></div></div></section>
      {modelOpen && <EvidenceModel selectedId={selectedEvidence.id} onSelect={selectEvidence} onClose={closeModel} />}
      <EvidencePresentation evidence={selectedEvidence} onPrevious={selectedIndex > 0 ? () => selectEvidence(evidenceDefinitions[selectedIndex-1].id) : undefined} onNext={selectedIndex < evidenceDefinitions.length-1 ? () => selectEvidence(evidenceDefinitions[selectedIndex+1].id) : undefined} onShowModel={showModel} />
      <EvidenceAuthority /><EvidencePrinciple />
    </main><PublicFooterV2 /></div>
  );
}
