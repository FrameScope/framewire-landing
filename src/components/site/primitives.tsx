import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { Wordmark } from "../ui/Wordmark";
import { Icon } from "../ui/Icon";
import { useReducedMotion } from "../motion/sceneClock";
import { CONTACT_EMAIL, CONTACT_MAILTO, SIGNIN_URL } from "../../config";

/* Shared homepage primitives: scroll-triggered clock, narrow detection,
   sticky navigation, section wrapper, and footer. */

const BETA_MAILTO = `mailto:${CONTACT_EMAIL}?subject=FrameWire%20Private%20Beta%20Application`;

export function useIsNarrow(): boolean {
  const [n, setN] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const on = () => setN(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return n;
}

/** Scene clock that stays at 0 until the element scrolls into view, then plays once and settles. */
export function useInViewClock(runFor = 6): [RefObject<HTMLDivElement>, number] {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(reduced ? 999 : 0);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }),
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) { setT(999); return; }
    if (!inView) return;
    setT(0);
    const start = performance.now();
    let raf = 0;
    const loop = () => { setT((performance.now() - start) / 1000); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const stop = setTimeout(() => cancelAnimationFrame(raf), runFor * 1000 + 600);
    return () => { cancelAnimationFrame(raf); clearTimeout(stop); };
  }, [inView, reduced, runFor]);
  return [ref, t];
}

function scrollTo(e: React.MouseEvent, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const NAV_LINKS: [string, string][] = [
  ["How It Works", "#how-it-works"],
  ["Ingestion", "#ingestion"],
  ["Lenses", "#lenses"],
  ["Investigation Tools", "#tools"],
  ["Guided Tour", "#tour"],
  ["Report Studio", "#report-studio"],
  ["Who It's For", "#audiences"],
  ["Trust", "#trust"],
  ["Contact", "#contact"],
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fw-nav" aria-label="Primary">
      <div className="fw-container site-nav">
        <a href="#top" className="site-nav-brand" onClick={(e) => scrollTo(e, "#top")}><Wordmark size={24} /></a>
        <div className="site-nav-links fw-desk">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => scrollTo(e, href)}>{label}</a>
          ))}
          {SIGNIN_URL && <a href={SIGNIN_URL} className="site-nav-signin">Sign In</a>}
        </div>
        <button className="site-nav-toggle fw-mobnav" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name={open ? "x" : "menu"} size={20} />
        </button>
      </div>
      {open && (
        <div className="site-nav-drawer">
          {NAV_LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={(e) => { scrollTo(e, href); setOpen(false); }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  band?: boolean;
  center?: boolean;
}

export function Section({ id, eyebrow, title, lead, children, band, center }: SectionProps) {
  return (
    <section id={id} className={`site-section${band ? " band" : ""}`}>
      <div className="fw-container">
        {(eyebrow || title || lead) && (
          <header className={`site-head${center ? " center" : ""}`}>
            {eyebrow && <div className="site-eyebrow">{eyebrow}</div>}
            {title && <h2 className="site-title">{title}</h2>}
            {lead && <p className="site-lead">{lead}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function Footer() {
  const links: [string, string][] = [
    ["How It Works", "#how-it-works"], ["Lenses", "#lenses"], ["Investigation", "#tools"],
    ["Guided Tour", "#tour"], ["Report Studio", "#report-studio"], ["Who It's For", "#audiences"],
    ["Trust", "#trust"], ["Contact", "#contact"],
  ];
  return (
    <footer id="contact" className="site-footer">
      <div className="fw-container">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Wordmark size={26} />
            <span className="site-footer-tag">Understand Before Concluding.</span>
          </div>
          <nav className="site-footer-links" aria-label="Footer">
            {links.map(([l, h]) => <a key={h} href={h} onClick={(e) => scrollTo(e, h)}>{l}</a>)}
            <a href={BETA_MAILTO}>Apply for Beta</a>
          </nav>
        </div>
        <div className="site-footer-bottom">
          <a href={CONTACT_MAILTO} className="fw-signal fw-mono">{CONTACT_EMAIL}</a>
          <span className="fw-mono">© FrameWire</span>
        </div>
      </div>
    </footer>
  );
}
