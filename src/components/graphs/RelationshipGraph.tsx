import { useState } from "react";
import { Icon } from "../ui/Icon";
import { GraphFigure } from "./graphUtils";

interface RGNode { id: string; label: string; icon: string; x: number; y: number; tone?: string }
interface RGEdge { a: string; b: string; rel: string }

const RG_NODES: RGNode[] = [
  { id: "source", label: "Source", icon: "rss", x: 14, y: 32 },
  { id: "claim", label: "Claim", icon: "message-square", x: 40, y: 30, tone: "signal" },
  { id: "evA", label: "Evidence", icon: "check", x: 30, y: 82, tone: "verified" },
  { id: "evB", label: "Evidence", icon: "split", x: 58, y: 84, tone: "conflict" },
  { id: "narrative", label: "Narrative", icon: "trending-up", x: 54, y: 12 },
  { id: "org", label: "Organization", icon: "landmark", x: 76, y: 30 },
  { id: "person", label: "Person", icon: "users", x: 88, y: 58 },
  { id: "location", label: "Location", icon: "map-pin", x: 78, y: 80 },
];
const RG_EDGES: RGEdge[] = [
  { a: "source", b: "claim", rel: "published" },
  { a: "claim", b: "evA", rel: "supported by" },
  { a: "claim", b: "evB", rel: "contradicted by" },
  { a: "org", b: "narrative", rel: "connected to" },
  { a: "person", b: "org", rel: "belongs to" },
  { a: "narrative", b: "location", rel: "observed in" },
];
const rgAt = (id: string) => RG_NODES.find((n) => n.id === id)!;
const rgTone = (t?: string) =>
  t === "signal" ? "var(--fw-signal)" : t === "verified" ? "var(--fw-verified)" : t === "conflict" ? "var(--fw-conflict)" : "var(--fw-ink-2)";

export function RelationshipGraph() {
  const [active, setActive] = useState<string | null>(null);
  const incident = (e: RGEdge) => !!active && (e.a === active || e.b === active);
  const related = new Set<string>();
  if (active) {
    related.add(active);
    RG_EDGES.forEach((e) => { if (e.a === active) related.add(e.b); if (e.b === active) related.add(e.a); });
  }
  return (
    <GraphFigure
      title="Illustrative relationship view"
      label="hover or focus a node to reveal its relationships"
      desc="An illustrative relationship view. A Source published a Claim, supported by one Evidence and contradicted by another. A Person belongs to an Organization, connected to a Narrative, observed in a Location. No real people or organizations are shown."
      badge={<span className="fw-mono" style={{ fontSize: 10.5, color: "var(--fw-ink-4)" }}>illustrative</span>}
    >
      <div className="fw-rel-canvas" onMouseLeave={() => setActive(null)}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="fw-rel-svg" aria-hidden="true">
          {RG_EDGES.map((e) => {
            const A = rgAt(e.a), B = rgAt(e.b);
            const on = incident(e);
            return (
              <line key={e.a + e.b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={on ? "var(--fw-signal)" : "var(--fw-line-bright)"} strokeWidth={on ? 1.5 : 1} vectorEffect="non-scaling-stroke" style={{ opacity: active && !on ? 0.18 : 1, transition: "stroke .26s, opacity .26s" }} />
            );
          })}
        </svg>
        {active && RG_EDGES.filter(incident).map((e) => {
          const A = rgAt(e.a), B = rgAt(e.b);
          return <span key={"l" + e.a + e.b} className="fw-rel-edge-label fw-mono" style={{ left: `${(A.x + B.x) / 2}%`, top: `${(A.y + B.y) / 2}%` }}>{e.rel}</span>;
        })}
        {RG_NODES.map((n) => {
          const dim = active && !related.has(n.id);
          return (
            <button key={n.id} className="fw-rel-node" aria-label={n.label} style={{ left: `${n.x}%`, top: `${n.y}%`, opacity: dim ? 0.32 : 1, borderColor: active === n.id ? rgTone(n.tone) : "var(--fw-line-strong)", boxShadow: active === n.id ? `0 0 0 1px ${rgTone(n.tone)}` : "none" }} onMouseEnter={() => setActive(n.id)} onFocus={() => setActive(n.id)} onBlur={() => setActive(null)}>
              <Icon name={n.icon} size={14} color={rgTone(n.tone)} /><span>{n.label}</span>
            </button>
          );
        })}
      </div>
      <ul className="fw-rel-list">
        {RG_EDGES.map((e) => (
          <li key={"m" + e.a + e.b}>
            <span className="fw-rel-li-node"><Icon name={rgAt(e.a).icon} size={13} color={rgTone(rgAt(e.a).tone)} />{rgAt(e.a).label}</span>
            <span className="fw-rel-li-rel fw-mono">{e.rel}</span>
            <span className="fw-rel-li-node"><Icon name={rgAt(e.b).icon} size={13} color={rgTone(rgAt(e.b).tone)} />{rgAt(e.b).label}</span>
          </li>
        ))}
      </ul>
    </GraphFigure>
  );
}
