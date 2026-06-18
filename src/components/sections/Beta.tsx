import { type MouseEvent } from "react";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Reveal } from "../ui/Reveal";
import { Refrain } from "../ui/Refrain";
import { Section } from "../ui/Section";
import { SectionHead } from "../ui/SectionHead";
import { Wordmark } from "../ui/Wordmark";
import { BETA_MAILTO, CONTACT_EMAIL, CONTACT_MAILTO, LOGO, SIGNIN_URL } from "../../config";

const BETA_TASKS = [
  { icon: "book-open", t: "Understand the product workflow" },
  { icon: "search", t: "Search or select a real subject" },
  { icon: "folder-search", t: "Inspect the collected evidence" },
  { icon: "git-branch", t: "Open an investigation" },
  { icon: "network", t: "Explore timelines, actors, claims and relationships" },
  { icon: "file-text", t: "Produce a report" },
  { icon: "message-square-text", t: "Give feedback on clarity, trust, usefulness and workflow" },
];

export function Beta() {
  return (
    <Section id="beta">
      <div className="fw-beta-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.95fr) minmax(0,1fr)", gap: "clamp(32px,5vw,72px)", alignItems: "start" }}>
        <div>
          <SectionHead index="13" kicker="Private beta"
            title="Test the real workflow — not a demo."
            lead="Beta access is targeted and controlled. What you find will shape final production decisions." />
          <Reveal delay={160}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
              <Refrain icon="users" tone="signal">Targeted</Refrain>
              <Refrain icon="lock" tone="signal">Controlled access</Refrain>
              <Refrain icon="messages-square" tone="signal">Feedback shapes production</Refrain>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <Button variant="primary" size="lg" href={BETA_MAILTO} icon={<span>→</span>}>Request Private Beta Access</Button>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <div style={{ border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "var(--fw-surface)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--fw-line)", display: "flex", alignItems: "center", gap: 10 }}>
              <Icon name="clipboard-check" size={17} color="var(--fw-signal)" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--fw-ink)" }}>What a beta tester will do</span>
            </div>
            {BETA_TASKS.map((t, i) => (
              <div key={t.t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 20px", borderBottom: i < BETA_TASKS.length - 1 ? "1px solid var(--fw-line)" : 0 }}>
                <span className="fw-mono" style={{ fontSize: 11, color: "var(--fw-ink-4)", width: 18, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                <Icon name={t.icon} size={16} color="var(--fw-ink-2)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14.5, color: "var(--fw-ink-2)" }}>{t.t}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <section id="final" className="fw-section" style={{ position: "relative", textAlign: "center" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--fw-glow-signal)", pointerEvents: "none" }} />
      <div className="fw-container fw-narrow" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        <Reveal><img src={LOGO} alt="" width={44} height={44} style={{ width: 44, height: 44 }} /></Reveal>
        <Reveal delay={60} as="h2" className="fw-display" style={{ fontSize: "clamp(2.2rem, 1.4rem + 3.4vw, 3.6rem)", maxWidth: "18ch" }}>
          The world has enough instant answers.
        </Reveal>
        <Reveal delay={110}>
          <p className="fw-lead" style={{ fontSize: "var(--type-lead)", maxWidth: "40ch", margin: "0 auto" }}>
            FrameWire helps people investigate what sits underneath them.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", marginTop: 6 }}>
            <Button variant="primary" size="lg" href={BETA_MAILTO} icon={<span>→</span>}>Join the Private Beta</Button>
            <Button variant="secondary" size="lg" href={CONTACT_MAILTO} icon={<Icon name="mail" size={16} />} iconPosition="left">Contact FrameWire</Button>
          </div>
        </Reveal>
        <Reveal delay={210}>
          <a href={CONTACT_MAILTO} className="fw-mono fw-signal" style={{ fontSize: 14, marginTop: 4, textDecoration: "none", borderBottom: "1px solid var(--fw-signal-edge)", paddingBottom: 2 }}>{CONTACT_EMAIL}</a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const accessLinks: [string, string][] = [
    ["Private Beta", "#beta"],
    ["Join the Beta", BETA_MAILTO],
    ["Contact", CONTACT_MAILTO],
  ];
  if (SIGNIN_URL) accessLinks.push(["Sign In", SIGNIN_URL]);

  const cols: { h: string; links: [string, string][] }[] = [
    { h: "Product", links: [["How It Works", "#how"], ["Investigation", "#investigation"], ["Example", "#example"], ["Trust", "#trust"]] },
    { h: "Audience", links: [["Use Cases", "#use-cases"], ["Why FrameWire", "#why"], ["Institutional Memory", "#memory"]] },
    { h: "Get access", links: accessLinks },
  ];
  const go = (e: MouseEvent, href: string) => {
    if (href.startsWith("#")) { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };
  return (
    <footer style={{ borderTop: "1px solid var(--fw-line)", background: "var(--fw-black)" }}>
      <div className="fw-container" style={{ paddingBlock: "clamp(48px,6vw,72px)" }}>
        <div className="fw-foot-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "clamp(28px,4vw,48px)" }}>
          <div>
            <Wordmark size={26} />
            <p className="fw-body" style={{ fontSize: 14, marginTop: 16, maxWidth: "34ch", color: "var(--fw-ink-3)" }}>
              Turn fragmented information into traceable, evidence-backed investigations.
            </p>
            <p style={{ marginTop: 14, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, letterSpacing: "-0.01em", color: "var(--fw-ink)" }}>
              Understand Before Concluding.
            </p>
            <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 11.5, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--fw-ink-3)", display: "flex", gap: 9, flexWrap: "wrap" }}>
              <span>Observe</span><span style={{ color: "var(--fw-ink-4)" }}>·</span><span>Question</span>
              <span style={{ color: "var(--fw-ink-4)" }}>·</span><span>Investigate</span>
              <span style={{ color: "var(--fw-ink-4)" }}>·</span><span className="fw-signal">Understand</span>
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="fw-mono" style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--fw-ink-4)", marginBottom: 15 }}>{c.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {c.links.map(([label, href]) => (
                  <a key={label} href={href} onClick={(e) => go(e, href)}
                    style={{ fontSize: 14, color: "var(--fw-ink-2)", textDecoration: "none", transition: "color var(--motion-quick) var(--ease-calm)", width: "fit-content" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fw-ink)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fw-ink-2)")}>{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="fw-rule" style={{ margin: "40px 0 24px" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13, color: "var(--fw-ink-3)" }}>
            <Icon name="shield-check" size={14} color="var(--fw-verified)" />AI assists. Humans decide.
          </span>
          <span style={{ fontSize: 13, color: "var(--fw-ink-4)" }}>
            <a href={CONTACT_MAILTO} className="fw-signal" style={{ textDecoration: "none" }}>{CONTACT_EMAIL}</a>
            <span style={{ margin: "0 10px", color: "var(--fw-ink-4)" }}>·</span>
            © {new Date().getFullYear()} FrameWire
          </span>
        </div>
      </div>
    </footer>
  );
}
