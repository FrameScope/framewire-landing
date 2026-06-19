import { Badge } from "../ui/Badge";
import { Icon } from "../ui/Icon";
import { ProcessStep } from "../ui/ProcessStep";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { SourceCard } from "../ui/SourceCard";

const PIPELINE = [
  { i: "01", label: "Collect", icon: "search", gate: false, summary: "Search, scrape, upload, or connect providers — gather broadly at the edge.", detail: "You have flexibility at the collection edge: RSS, websites, APIs, uploads and user-owned keys. Every source still enters the same traceable workflow." },
  { i: "02", label: "Archive", icon: "database", gate: false, summary: "Every incoming item is preserved first — with its source, time, provider and hash.", detail: "Failed, quarantined, stale and duplicate material stays separated. Raw information does not become trusted intelligence automatically." },
  { i: "03", label: "Clean", icon: "wand-sparkles", gate: false, summary: "HTML, documents, OCR, tables, dates, names, entities and locations are normalized.", detail: "Cleaning makes material legible and comparable. Cleaning is not verification — it does not decide whether information is true." },
  { i: "04", label: "Verify", icon: "shield-check", gate: true, summary: "Provenance, integrity, freshness, duplication, schema and context are checked.", detail: "Only verified material moves on to analysis. Even authoritative sources need the collected copy checked before it is used." },
  { i: "05", label: "Investigate", icon: "git-branch", gate: false, summary: "Inspect evidence, timelines, actors, places, claims and the relationships between them.", detail: "Findings stay connected to the evidence that supports them, so any conclusion can be traced back to a source." },
  { i: "06", label: "Understand", icon: "scale", gate: false, summary: "Compare interpretations, convergence, confidence and remaining uncertainty.", detail: "Competing explanations are kept side by side. Uncertainty is preserved, not flattened into a single answer." },
  { i: "07", label: "Produce", icon: "file-text", gate: false, summary: "Create a traceable report with its evidence, reasons for confidence, and limitations.", detail: "Reports remain linked to original sources, so a reader can follow every claim back to where it came from." },
  { i: "08", label: "Remember", icon: "history", gate: false, summary: "Preserve the investigation, its changes and corrections for future continuity.", detail: "Validated history remains available so future work resumes with the original context intact." },
];

export function Pipeline() {
  return (
    <Section id="how">
      <SectionHead index="02" kicker="How FrameWire works" align="center"
        title="From collection to report — one evidence-aware workflow."
        lead="Eight stages take fragmented input and turn it into evidence that a human can stand behind." />

      <Reveal delay={60}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", margin: "0 auto 40px", maxWidth: 760, padding: "16px 22px", borderRadius: "var(--radius-md)", border: "1px solid var(--fw-signal-edge)", background: "var(--fw-signal-wash)", textAlign: "center" }}>
          <Icon name="shield-check" size={18} color="var(--fw-signal)" />
          <span style={{ fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 500, color: "var(--fw-ink)" }}>
            Nothing reaches FrameWire&rsquo;s intelligence lenses before cleaning and verification.
          </span>
        </div>
      </Reveal>

      <div className="fw-pipe-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {PIPELINE.map((s, idx) => (
          <Reveal key={s.i} delay={Math.min(idx * 50, 300)}>
            <ProcessStep index={s.i}
              label={<span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><Icon name={s.icon} size={16} color={s.gate ? "var(--fw-signal)" : "var(--fw-ink-3)"} />{s.label}</span>}
              gate={s.gate} summary={s.summary} detail={s.detail} style={{ height: "100%" }} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <p className="fw-muted" style={{ textAlign: "center", fontSize: 13, marginTop: 22 }}>Hover or tap any stage to read what it does.</p>
      </Reveal>
    </Section>
  );
}

const COLLECT_SOURCES = [
  { label: "RSS feeds", icon: "rss" }, { label: "Websites", icon: "globe" },
  { label: "JS-rendered pages", icon: "code-2" }, { label: "Bounded crawls", icon: "waypoints" },
  { label: "APIs", icon: "plug" }, { label: "Search & social providers", icon: "search" },
  { label: "Uploaded files", icon: "upload" }, { label: "Scanned documents · OCR", icon: "scan-text" },
  { label: "Open-data portals", icon: "folder-open" }, { label: "User-owned provider keys", icon: "key" },
];

export function Collect() {
  return (
    <Section id="collect" band>
      <SectionHead index="03" kicker="Collect broadly"
        title="Flexible for people. Reliable underneath."
        lead="FrameWire works with many kinds of source. Whatever the origin, every item enters the same traceable workflow." />
      <div className="fw-collect-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {COLLECT_SOURCES.map((s, i) => (
          <Reveal key={s.label} delay={Math.min(i * 40, 240)}>
            <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "15px 18px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-sm)", background: "var(--fw-surface)" }}>
              <span style={{ width: 34, height: 34, borderRadius: "var(--radius-xs)", flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--fw-surface-inset)", border: "1px solid var(--fw-line)" }}>
                <Icon name={s.icon} size={16} color="var(--fw-ink-2)" />
              </span>
              <span style={{ fontSize: 14.5, color: "var(--fw-ink-2)" }}>{s.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={120}>
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 26, fontSize: 14, color: "var(--fw-ink-3)" }}>
          <Icon name="git-merge" size={16} color="var(--fw-signal)" />
          Your workflow stays flexible at the collection edge — every source still enters the same traceable workflow.
        </div>
      </Reveal>
    </Section>
  );
}

export function ArchiveFirst() {
  const points = [
    "The original material is preserved, exactly as collected.",
    "Source, time, provider, hash and provenance are recorded.",
    "Failed, quarantined, stale and duplicate material stays separated.",
    "Raw information does not become trusted intelligence automatically.",
  ];
  return (
    <Section id="archive">
      <div className="fw-archive-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)", gap: "clamp(32px,5vw,64px)", alignItems: "center" }}>
        <div>
          <SectionHead index="04" kicker="Archive first" title="Preserve everything before trusting anything." />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {points.map((p, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ display: "flex", gap: 12 }}>
                  <Icon name="check" size={17} color="var(--fw-verified)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--fw-ink-2)" }}>{p}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={260}>
            <div style={{ marginTop: 26, padding: "18px 20px", borderLeft: "2px solid var(--fw-signal)", background: "var(--fw-surface-inset)", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0" }}>
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.4, color: "var(--fw-ink)" }}>
                A successful collection proves access. It does not prove truth.
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <SourceCard kind="News · RSS" title="Provisional district totals published by official portal" source="SRC-0427" time="09:42 UTC" provider="RSS" hash="9f2c·a17e" status="archive" statusLabel="Archived" />
            <SourceCard kind="Social · API" title="Same claim re-shared across three channels" source="SRC-0431" time="10:08 UTC" provider="API" hash="b3d1·77a0" status="caution" statusLabel="Quarantined" />
            <SourceCard kind="Upload · OCR" title="Scanned bulletin — duplicate of SRC-0427" source="SRC-0433" time="10:20 UTC" provider="Upload" hash="9f2c·a17e" status="neutral" statusLabel="Duplicate" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function CleanVerify() {
  const checks = ["Provenance", "Integrity", "Freshness", "Duplication", "Schema", "Context"];
  return (
    <Section id="verify" band>
      <SectionHead index="05" kicker="Clean and verify"
        title="Cleaning makes data legible. Verification decides if it can be used."
        lead="FrameWire checks provenance, integrity, freshness, duplication, schema and context — before anything reaches analysis." />

      <div className="fw-cv-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(28px,4vw,56px)", alignItems: "start" }}>
        <Reveal>
          <div style={{ border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--fw-surface)" }}>
            <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--fw-line)", display: "flex", alignItems: "center", gap: 9 }}>
              <Badge tone="neutral">Illustrative example</Badge>
              <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)" }}>election-commission-result</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", gap: 13, padding: "18px", borderBottom: "1px solid var(--fw-line)" }}>
                <Icon name="building-2" size={18} color="var(--fw-verified)" style={{ marginTop: 1, flexShrink: 0 }} />
                <div><div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--fw-ink)", marginBottom: 3 }}>An official source publishes a correct result.</div>
                  <div style={{ fontSize: 13.5, color: "var(--fw-ink-3)", lineHeight: 1.5 }}>The authority is trustworthy and the figure is right.</div></div>
              </div>
              <div style={{ display: "flex", gap: 13, padding: "18px", borderBottom: "1px solid var(--fw-line)" }}>
                <Icon name="triangle-alert" size={18} color="var(--fw-conflict)" style={{ marginTop: 1, flexShrink: 0 }} />
                <div><div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--fw-ink)", marginBottom: 3 }}>A scraper still extracts the wrong number.</div>
                  <div style={{ fontSize: 13.5, color: "var(--fw-ink-3)", lineHeight: 1.5 }}>A layout change or parsing slip corrupts the collected copy.</div></div>
              </div>
              <div style={{ display: "flex", gap: 13, padding: "18px", background: "var(--fw-signal-wash)" }}>
                <Icon name="shield-check" size={18} color="var(--fw-signal)" style={{ marginTop: 1, flexShrink: 0 }} />
                <div><div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--fw-ink)", marginBottom: 3 }}>FrameWire verifies its collected copy before it is used.</div>
                  <div style={{ fontSize: 13.5, color: "var(--fw-ink-2)", lineHeight: 1.5 }}>A trusted source is not enough — the ingested copy is checked too.</div></div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <div className="fw-mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fw-ink-4)", marginBottom: 14 }}>What gets checked</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {checks.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-sm)", background: "var(--fw-surface)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--fw-signal)" }} />
                  <span style={{ fontSize: 14, color: "var(--fw-ink-2)" }}>{c}</span>
                </div>
              ))}
            </div>
            <p className="fw-body" style={{ fontSize: 14, marginTop: 18, color: "var(--fw-ink-3)" }}>
              Cleaning does not equal verification. Even authoritative sources require ingestion verification.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
