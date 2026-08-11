import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, ExternalLink, Search, X } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import ResourceVisual from "./ResourceVisual";
import {
  resourceDefinitions,
  resourceFromHash,
  resourceGroupMeta,
  resourceGroups,
  resourceIds,
  type ResourceDefinition,
  type ResourceId,
} from "./resourceData";

type ResourceSurface = "presentation" | "library" | "model";

function moveTo(hash: string, focusTarget?: HTMLElement | null) {
  if (window.location.hash !== `#${hash}`) window.history.pushState(null, "", `#${hash}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    focusTarget?.focus({ preventScroll: true });
  }));
}

function ResourceHero() {
  return <section className="r2-hero" aria-labelledby="r2-hero-title"><div className="p2-container"><div className="r2-hero-grid"><div className="r2-hero-copy" data-p2-reveal><span>FRAMEWIRE RESOURCES</span><h1 id="r2-hero-title">Learn the platform.<br />Inspect the method.<br />Use it responsibly.</h1><p>FrameWire Resources is the public knowledge and trust center for understanding how the platform works, how evidence is governed, how intelligence lenses produce observations, and how users move from a question to a human-finalized report.</p><div className="p2-hero-actions"><a href="#getting-started">Explore Resources <ArrowRight size={17} /></a><a href="#resource-library">Open Resource Library <ArrowDown size={17} /></a></div></div><aside className="r2-hero-index" data-p2-reveal aria-label="Resource knowledge families">{resourceGroups.map((group) => { const count = resourceDefinitions.filter((item) => item.group === group).length; return <div key={group}><span>{resourceGroupMeta[group].label}</span><strong>{count} {count === 1 ? "area" : "areas"}</strong><p>{resourceGroupMeta[group].description}</p></div>; })}<small>Public knowledge · method · trust · guidance · support</small></aside></div><div className="r2-doctrine-strip" data-p2-reveal>{["Learn", "Inspect", "Understand", "Apply", "Verify", "Use Responsibly"].map((item, index) => <span key={item}>{index > 0 && <i />}{item}</span>)}</div></div></section>;
}

function ResourceSelector({ selected, onSelect, onLibrary }: { selected: ResourceDefinition; onSelect: (id: ResourceId) => void; onLibrary: () => void }) {
  return <section className="r2-selector" aria-label="Resource selection"><div className="p2-container"><div><span>SELECTED RESOURCE</span><small>{resourceGroupMeta[selected.group].label}</small></div><label><span className="sr-only">Choose a Resource area</span><select value={selected.id} onChange={(event) => onSelect(event.target.value as ResourceId)}>{resourceGroups.map((group) => <optgroup key={group} label={resourceGroupMeta[group].label}>{resourceDefinitions.filter((item) => item.group === group).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</optgroup>)}</select><ChevronDown size={16} aria-hidden="true" /></label><button type="button" onClick={onLibrary}>Resource Library</button></div></section>;
}

function ResourceLibrary({ selectedId, onSelect, onClose }: { selectedId: ResourceId; onSelect: (id: ResourceId, focus?: boolean) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return resourceDefinitions;
    return resourceDefinitions.filter((resource) => [resource.name, resourceGroupMeta[resource.group].label, resource.purpose, resource.contentType, resource.relatedArea, ...resource.primaryContent, ...resource.keywords].join(" ").toLowerCase().includes(normalized));
  }, [query]);

  return <section id="resource-library" className="r2-library" aria-labelledby="r2-library-title"><div className="p2-container"><header><div><span>RESOURCE LIBRARY</span><h2 id="r2-library-title">Four knowledge families.<br />One evidence-first method.</h2><p>Search this local Resource registry by title, family, purpose, or method keyword. This does not search external FrameWire documentation.</p></div><button ref={closeRef} type="button" onClick={onClose}><X size={16} />Close library</button></header><div className="r2-library-search"><label htmlFor="r2-resource-search">Search Resources</label><div><Search size={17} /><input id="r2-resource-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try provenance, report, API, or support" /><button type="button" disabled={!query} onClick={() => setQuery("")}>Clear</button></div><span aria-live="polite">{filtered.length} of {resourceDefinitions.length} Resource areas</span></div><div className="r2-library-groups">{resourceGroups.map((group) => { const entries = filtered.filter((item) => item.group === group); return <section key={group} aria-labelledby={`r2-library-${group}`}><header><span id={`r2-library-${group}`}>{resourceGroupMeta[group].label}</span><p>{resourceGroupMeta[group].description}</p></header><div>{entries.length ? entries.map((item) => <button type="button" key={item.id} className={item.id === selectedId ? "active" : ""} aria-current={item.id === selectedId ? "true" : undefined} onClick={() => onSelect(item.id as ResourceId, true)}><span><strong>{item.name}</strong><small>{item.purpose}</small></span><span><b>{item.contentType}</b><i>{item.relatedArea}</i></span><ArrowRight size={15} /></button>) : <p className="r2-library-empty">No matching Resources in this family.</p>}</div></section>; })}</div></div></section>;
}

function ResourceModel({ onClose }: { onClose: () => void }) {
  const stages = [
    ["Platform Knowledge", "Learn what FrameWire is and how its operating environment connects."],
    ["Method & Evidence Documentation", "Inspect Archive, provenance, eligibility, contradiction, and traceability."],
    ["Lens & Workflow Education", "Understand observations and complete practical tasks without collapsing authority."],
    ["Practical Guides & Templates", "Apply the method consistently inside and outside the interface."],
    ["Governance & Capability Disclosure", "Review safeguards, maturity, availability, and limitations."],
    ["Product Updates & Support", "Understand verified change and route uncertainty responsibly."],
    ["Responsible Platform Use", "Keep private evidence protected and human decisions accountable."],
  ];
  const [active, setActive] = useState(0);
  return <section id="resource-model" className="r2-model" aria-labelledby="r2-model-title"><div className="p2-container"><header><div><span>COMPLETE RESOURCE MODEL</span><h2 id="r2-model-title">Knowledge should lead<br />to responsible use.</h2></div><button type="button" onClick={onClose}><X size={16} />Close model</button></header><div className="r2-model-layout"><ol>{stages.map(([name], index) => <li key={name}><button type="button" className={active === index ? "active" : ""} aria-pressed={active === index} onClick={() => setActive(index)}><i /><span>{name}</span><ArrowRight size={14} /></button></li>)}</ol><aside aria-live="polite"><span>SELECTED KNOWLEDGE STAGE</span><h3>{stages[active][0]}</h3><p>{stages[active][1]}</p><small>Resources explains the platform. It does not replace technical contracts, capability verification, or human responsibility.</small></aside></div></div></section>;
}

function ResourcePresentation({ resource, onPrevious, onNext, onLibrary, onModel }: { resource: ResourceDefinition; onPrevious?: () => void; onNext?: () => void; onLibrary: () => void; onModel: () => void }) {
  return <section id={resource.id} key={resource.id} className="r2-presentation" aria-labelledby={`${resource.id}-title`}><div className="p2-container"><header className="r2-presentation-heading"><span>{resourceGroupMeta[resource.group].label}</span><h2 id={`${resource.id}-title`}>{resource.name}</h2><p>{resource.subtitle}</p></header><div className="r2-purpose"><span>PURPOSE</span><p>{resource.purpose}</p></div><ResourceVisual resource={resource} /><div className="r2-information-grid"><section><span>WHAT THIS RESOURCE COVERS</span><ul>{resource.primaryContent.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span>HOW TO USE IT</span><ol>{resource.technicalFlow.map((item) => <li key={item}>{item}</li>)}</ol></section>{resource.relatedRoutes && <section className="r2-related"><span>RELATED FRAMEWIRE SECTIONS</span><div>{resource.relatedRoutes.map((route) => <a key={route.href} href={route.href}>{route.label}<ExternalLink size={14} /></a>)}</div></section>}<aside><CheckCircle2 size={20} /><div><span>MATURITY & LIMITATION</span><p>{resource.limitation}</p></div></aside></div><nav className="r2-topic-actions" aria-label={`${resource.name} navigation`}><button type="button" onClick={onPrevious} disabled={!onPrevious}><ArrowLeft size={16} />Previous Resource</button><div><button type="button" onClick={onLibrary}>Resource Library</button><button type="button" onClick={onModel}>View Resource Model</button></div><button type="button" onClick={onNext} disabled={!onNext}>Next Resource<ArrowRight size={16} /></button></nav></div></section>;
}

function ResourceAuthority() {
  const items = [
    ["Resource Page", "Public explanation of a FrameWire concept or workflow."],
    ["Canonical Contract", "Technical authority for implementation requirements."],
    ["Capability Status", "Public maturity and availability statement."],
    ["Release Note", "Dated record of a verified product change."],
    ["Help Guide", "Operational assistance for completing a task."],
    ["Trust Center", "Public disclosure of governance principles and controls."],
  ];
  return <section id="resource-authority" className="r2-authority" aria-labelledby="r2-authority-title"><div className="p2-container"><header><span>RESOURCE AUTHORITY</span><h2 id="r2-authority-title">Public guidance is useful<br />because its authority is clear.</h2></header><div className="r2-authority-grid">{items.map(([name, detail]) => <article key={name}><strong>{name}</strong><p>{detail}</p></article>)}</div><div className="r2-authority-distinctions"><p>PUBLIC EXPLANATION <b>≠</b> TECHNICAL IMPLEMENTATION AUTHORITY</p><p>ROADMAP <b>≠</b> OPERATIONAL CAPABILITY</p></div></div></section>;
}

function ResourcesPrinciple() {
  const doctrine = ["Teach the Method", "Show the Evidence Standard", "Define Terms Consistently", "Disclose Capability Maturity", "Document Limitations", "Separate Public Guidance From Technical Authority", "Do Not Present Plans as Operational", "Protect Private Evidence and Secrets", "Keep Resources Current", "Support Responsible Use", "AI Assists", "Humans Decide"];
  return <section className="r2-principle" aria-labelledby="r2-principle-title"><div className="p2-container"><span>THE RESOURCES PRINCIPLE</span><h2 id="r2-principle-title">A transparent intelligence platform should explain not only what it produces, but how its evidence, analysis, workflows, governance, limitations, and human decisions work.</h2><ul>{doctrine.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul></div></section>;
}

export default function ResourcesV2Page() {
  usePublicReveal();
  const initialHash = window.location.hash.slice(1);
  const [selected, setSelected] = useState(() => resourceFromHash(initialHash));
  const [surface, setSurface] = useState<ResourceSurface>(() => initialHash === "resource-library" ? "library" : initialHash === "resource-model" ? "model" : "presentation");
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectedIndex = resourceDefinitions.findIndex((item) => item.id === selected.id);

  useEffect(() => {
    const previous = document.title;
    document.title = "FrameWire Resources — Knowledge, Method, Trust";
    const hash = window.location.hash.slice(1);
    if (hash) window.requestAnimationFrame(() => window.requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: "start" })));
    return () => { document.title = previous; };
  }, []);

  useEffect(() => {
    const onLocation = () => {
      const hash = window.location.hash.slice(1);
      if (hash === "resource-library") { setSurface("library"); return; }
      if (hash === "resource-model") { setSurface("model"); return; }
      if (hash === "resource-authority") { setSurface("presentation"); return; }
      if (!resourceIds.includes(hash)) { setSelected(resourceDefinitions[0]); setSurface("presentation"); return; }
      const resource = resourceDefinitions.find((item) => item.id === hash);
      if (resource) { setSelected(resource); setSurface("presentation"); }
    };
    window.addEventListener("hashchange", onLocation);
    window.addEventListener("popstate", onLocation);
    return () => { window.removeEventListener("hashchange", onLocation); window.removeEventListener("popstate", onLocation); };
  }, []);

  const selectResource = (id: ResourceId, focus = false) => {
    const resource = resourceDefinitions.find((item) => item.id === id);
    if (!resource) return;
    setSelected(resource);
    setSurface("presentation");
    moveTo(id, focus ? selectorRef.current?.querySelector<HTMLSelectElement>("select") : null);
  };
  const showSurface = (next: Exclude<ResourceSurface, "presentation">) => { setSurface(next); moveTo(next === "library" ? "resource-library" : "resource-model"); };
  const closeSurface = () => { setSurface("presentation"); moveTo(selected.id); };

  return <div className="p2-page r2-page"><PublicHeaderV2 activePage="resources" /><main id="p2-main"><ResourceHero /><div ref={selectorRef}><ResourceSelector selected={selected} onSelect={selectResource} onLibrary={() => showSurface("library")} /></div>{surface === "library" && <ResourceLibrary selectedId={selected.id as ResourceId} onSelect={selectResource} onClose={closeSurface} />}{surface === "model" && <ResourceModel onClose={closeSurface} />}{surface === "presentation" && <ResourcePresentation resource={selected} onPrevious={selectedIndex > 0 ? () => selectResource(resourceDefinitions[selectedIndex - 1].id as ResourceId) : undefined} onNext={selectedIndex < resourceDefinitions.length - 1 ? () => selectResource(resourceDefinitions[selectedIndex + 1].id as ResourceId) : undefined} onLibrary={() => showSurface("library")} onModel={() => showSurface("model")} />}<ResourceAuthority /><ResourcesPrinciple /></main><PublicFooterV2 /></div>;
}
