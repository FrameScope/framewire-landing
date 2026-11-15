import { useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PublicHeaderV2 } from "../platform-v2/PlatformHeader";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";

const byokPrinciples = [
  ["Provider flexibility", "Connect credentials for supported AI providers instead of depending exclusively on one provider."],
  ["Model choice", "Select supported models and provider-routing options according to the investigation task and governance context."],
  ["Greater control", "Manage provider credentials, permissions, usage arrangements, and budget limits within governed boundaries."],
  ["Extensible architecture", "Accommodate additional provider and model integrations, including custom-model pathways where supported."],
  ["Reduced vendor dependence", "Retain flexibility when choosing AI services without treating every provider as interchangeable."],
  ["Cost visibility and governance", "Make provider usage visible and bounded without promising unlimited access or complete cost coverage."],
] as const;

const specifications = [
  ["Frontend", "Next.js, React, TypeScript", "Application interface and interactive web experiences"],
  ["Backend", "Node.js, Next.js APIs", "Application services and server-side processing"],
  ["Primary database", "PostgreSQL", "Structured records, canonical evidence, and governed data storage"],
  ["Database access", "Prisma, SQL", "Data access and relational operations"],
  ["Knowledge graph", "Neo4j", "Representing derived evidence relationships, entities, sources, and connections"],
  ["Background processing", "Redis, BullMQ", "Job queues, scheduling, and asynchronous processing"],
  ["AI infrastructure", "BYOK, multi-provider LLM architecture", "Provider flexibility, model integration, and governed AI access"],
  ["Analytics", "Python, TypeScript", "Structured analysis, processing, and analytical workflows"],
  ["Data visualization", "D3, Recharts, React Flow", "Interactive charts, analytical views, and relationship visualizations"],
  ["Document processing", "OCR, PDF extraction", "Processing and organizing supported document content"],
  ["Interface styling", "Tailwind CSS", "Consistent, responsive application styling"],
  ["Authentication", "Auth.js / NextAuth", "Authentication and application access management"],
  ["Testing", "Playwright, automated tests, TypeScript checks", "Browser testing and software verification"],
] as const;

const architecturePrinciples = [
  ["Archive-first foundation", "FrameWire is designed to preserve source information and its provenance before analytical interpretation."],
  ["Relational and graph architecture", "PostgreSQL provides the canonical data foundation. Neo4j supports derived relationships and investigative graph exploration without replacing canonical authority."],
  ["Independent analytical lenses", "Narrative, Sentiment, Emotion, Threat, Fact Check, Geography, Entity and Relationship, and source intelligence retain separate analytical responsibilities."],
  ["Evidence-driven intelligence", "Analytical outputs retain connections to supporting evidence, source provenance, and investigation context."],
  ["Flexible AI infrastructure", "BYOK and multi-provider architecture support provider choice and future integration flexibility within governed limits."],
  ["Reporting and investigation", "Collected information, analytical observations, evidence relationships, and reporting remain connected inside an investigation-oriented workflow."],
] as const;

const description = "Explore FrameWire's BYOK freedom, multi-provider AI architecture, evidence foundations, and the technologies supporting investigation workflows.";

function setMeta(selector: string, attribute: "content" | "href", value: string) {
  document.querySelector<HTMLElement>(selector)?.setAttribute(attribute, value);
}

export default function TechnologyV2Page() {
  usePublicReveal();

  useEffect(() => {
    const canonicalUrl = "https://framewire.io/technology";
    document.title = "Technology & Architecture — FrameWire";
    setMeta('meta[name="description"]', "content", description);
    setMeta('link[rel="canonical"]', "href", canonicalUrl);
    setMeta('meta[property="og:title"]', "content", "Technology & Architecture — FrameWire");
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", "Technology & Architecture — FrameWire");
    setMeta('meta[name="twitter:description"]', "content", description);
  }, []);

  return (
    <div className="p2-page t2-page">
      <PublicHeaderV2 activePage="technology" />
      <main id="p2-main">
        <section className="t2-hero" aria-labelledby="t2-title">
          <div className="p2-container t2-hero-layout">
            <div data-p2-reveal>
              <span>FRAMEWIRE TECHNOLOGY</span>
              <h1 id="t2-title">Technology<br />&amp; Architecture</h1>
            </div>
            <div className="t2-hero-copy" data-p2-reveal>
              <p>Explore the technologies and architectural foundations behind FrameWire — an evidence-driven intelligence and investigation platform built around flexible AI integration, structured information, and independent analytical systems.</p>
              <div className="p2-hero-actions">
                <a href="#byok">Explore BYOK <ArrowRight size={17} /></a>
                <a href="#technical-specifications">Technical specifications <ArrowDown size={17} /></a>
              </div>
            </div>
          </div>
          <div className="p2-container t2-doctrine" aria-label="Technology principles" data-p2-reveal>
            <span>Provider choice</span><i /><span>Canonical evidence</span><i /><span>Independent lenses</span><i /><span>Human authority</span>
          </div>
        </section>

        <section id="byok" className="t2-byok" aria-labelledby="t2-byok-title">
          <div className="p2-container">
            <header className="t2-section-heading" data-p2-reveal>
              <span>FREEDOM OF BYOK</span>
              <h2 id="t2-byok-title">Your keys. Your AI-provider choices. A flexible intelligence platform.</h2>
              <p>Bring Your Own Key gives organizations architectural freedom to connect supported AI providers while keeping provider access, usage, and governance decisions under their control.</p>
            </header>
            <div className="t2-byok-grid">
              {byokPrinciples.map(([title, detail]) => <article key={title} data-p2-reveal><span>{String(byokPrinciples.findIndex((item) => item[0] === title) + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}
            </div>
            <aside className="t2-boundary" data-p2-reveal>
              <strong>Architectural boundary</strong>
              <p>BYOK describes provider flexibility and governed access. It does not imply unlimited use, universal model compatibility, automatic cost coverage, or availability of every provider integration.</p>
            </aside>
          </div>
        </section>

        <section id="technical-specifications" className="t2-specifications" aria-labelledby="t2-specifications-title">
          <div className="p2-container">
            <header className="t2-section-heading t2-section-heading-light" data-p2-reveal>
              <span>TECHNICAL SPECIFICATIONS</span>
              <h2 id="t2-specifications-title">A structured foundation for evidence-led investigation.</h2>
              <p>This overview describes the wider FrameWire platform stack and the architectural purpose of each technology. It is not a dependency inventory for this public website.</p>
            </header>
            <div className="t2-table-wrap" data-p2-reveal>
              <table>
                <caption>FrameWire platform technology categories, technologies, and architectural purposes</caption>
                <thead><tr><th scope="col">Technology category</th><th scope="col">Technology</th><th scope="col">Purpose</th></tr></thead>
                <tbody>{specifications.map(([category, technology, purpose]) => <tr key={category}><th scope="row">{category}</th><td data-label="Technology">{technology}</td><td data-label="Purpose">{purpose}</td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="architecture" className="t2-architecture" aria-labelledby="t2-architecture-title">
          <div className="p2-container t2-architecture-layout">
            <header className="t2-section-heading t2-architecture-heading" data-p2-reveal>
              <span>ARCHITECTURE OVERVIEW</span>
              <h2 id="t2-architecture-title">Clear authority boundaries from source to report.</h2>
              <p>FrameWire separates preservation, structured storage, derived relationships, analytical observation, and human decision so each layer remains inspectable.</p>
            </header>
            <ol className="t2-principles">
              {architecturePrinciples.map(([title, detail], index) => <li key={title} data-p2-reveal><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></li>)}
            </ol>
          </div>
        </section>

        <section className="t2-authority" aria-labelledby="t2-authority-title">
          <div className="p2-container" data-p2-reveal>
            <span>CANONICAL AUTHORITY</span>
            <h2 id="t2-authority-title">Structured records remain authoritative. Derived relationships remain rebuildable.</h2>
            <div><p><strong>PostgreSQL</strong> preserves the canonical relational foundation for governed records and evidence.</p><p><strong>Neo4j</strong> supports derived connections and graph exploration without becoming the canonical source of truth.</p><p><strong>Human review</strong> decides what analytical observations responsibly enter a final report.</p></div>
          </div>
        </section>
      </main>
      <PublicFooterV2 />
    </div>
  );
}
