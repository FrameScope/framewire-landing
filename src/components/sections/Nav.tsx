import { useEffect, useState, type MouseEvent } from "react";
import { Icon } from "../ui/Icon";
import { Wordmark } from "../ui/Wordmark";
import { SIGNIN_URL } from "../../config";

const NAV_LINKS = [
  { label: "How It Works", href: "#how" },
  { label: "Investigation", href: "#investigation" },
  { label: "Lenses", href: "#lenses" },
  { label: "Trust", href: "#trust" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Private Beta", href: "#beta" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const go = (e: MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="fw-nav" data-scrolled={scrolled} aria-label="Primary">
      <div className="fw-container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 18 }}>
        <a href="#top" onClick={(e) => go(e, "#top")} aria-label="FrameWire home" style={{ textDecoration: "none" }}>
          <Wordmark size={24} />
        </a>

        <div className="fw-desk" style={{ display: "flex", alignItems: "center", gap: 26 }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}
              style={{ fontSize: 14, color: "var(--fw-ink-2)", textDecoration: "none", letterSpacing: "-0.005em", transition: "color var(--motion-quick) var(--ease-calm)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fw-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fw-ink-2)")}>{l.label}</a>
          ))}
          {SIGNIN_URL && (
            <a href={SIGNIN_URL} style={{ fontSize: 14, color: "var(--fw-ink-2)", textDecoration: "none", letterSpacing: "-0.005em", transition: "color var(--motion-quick) var(--ease-calm)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fw-ink)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fw-ink-2)")}>Sign In</a>
          )}
        </div>

        <button className="fw-mobnav" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}
          style={{ background: "transparent", border: "1px solid var(--fw-line-strong)", borderRadius: "var(--radius-sm)", color: "var(--fw-ink)", width: 40, height: 40, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Icon name={open ? "x" : "menu"} size={18} />
        </button>
      </div>

      {open && (
        <div className="fw-mobnav" style={{ position: "absolute", top: "var(--nav-height)", left: 0, right: 0, flexDirection: "column", background: "rgba(5,6,10,0.97)", borderBottom: "1px solid var(--fw-line)", padding: "10px var(--gutter) 20px", gap: 2, backdropFilter: "blur(14px)" }}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}
              style={{ fontSize: 16, color: "var(--fw-ink-2)", textDecoration: "none", padding: "13px 4px", borderBottom: "1px solid var(--fw-line)" }}>{l.label}</a>
          ))}
          {SIGNIN_URL && (
            <a href={SIGNIN_URL} onClick={() => setOpen(false)} style={{ fontSize: 16, color: "var(--fw-ink-2)", textDecoration: "none", padding: "13px 4px", borderBottom: "1px solid var(--fw-line)" }}>Sign In</a>
          )}
        </div>
      )}
    </nav>
  );
}
