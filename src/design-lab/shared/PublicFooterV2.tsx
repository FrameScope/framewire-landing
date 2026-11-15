import { CONTACT_MAILTO, LOGO } from "../../config";

const footerGroups = [
  { title: "Platform", links: [["Public Information", "/platform#public-information"], ["Preserve", "/platform#raw-archive"], ["Discover", "/platform#discover"], ["Investigate", "/platform#decide-to-investigate"], ["Analyze", "/platform#intelligence-lenses"], ["Report", "/platform#governed-report"]] },
  { title: "Capabilities", links: [["Workflows", "/workflows#live-observation"], ["Lenses", "/lenses#narrative"], ["Evidence", "/evidence#public-source"], ["Guided Cognition", "/workflows#guided-reasoning"], ["Data Analytics", "/platform#cross-lens-context"], ["Source Inspector", "/evidence#source-inspector"], ["Tracking", "/workflows#tracking-alerts"]] },
  { title: "Governance", links: [["BYOK", "/governance#byok"], ["Provider Control", "/governance#provider-model"], ["Access", "/governance#roles-ownership"], ["Cost", "/governance#cost-budget"], ["Operations", "/governance#runtime-truth"]] },
  { title: "Company", links: [["About", "/#beta"], ["Technology", "/technology"], ["Use Cases", "/use-cases#breaking-event"], ["Resources", "/resources#getting-started"], ["Contact", CONTACT_MAILTO]] },
] as const;

export function PublicFooterV2() {
  return (
    <footer id="footer" className="p2-footer">
      <div className="p2-container">
        <div className="p2-footer-brand"><a href="/"><img src={LOGO} width="34" height="34" alt="" /><span>FRAMEWIRE</span></a><p>Archive-first contextual intelligence.</p></div>
        <div className="p2-footer-links">{footerGroups.map((group) => <nav key={group.title} aria-label={`${group.title} links`}><strong>{group.title}</strong>{group.links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>)}</div>
        <div className="p2-footer-bottom"><span>FrameWire · Archive-first contextual intelligence.</span><span>AI Assists. Humans Decide.</span></div>
      </div>
    </footer>
  );
}
