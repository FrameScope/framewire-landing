import { useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PublicFooterV2 } from "../shared/PublicFooterV2";
import { usePublicReveal } from "../shared/usePublicReveal";
import { CanonicalPlatformJourney, PlatformDoctrine } from "./CanonicalPlatformJourney";
import { PublicHeaderV2 } from "./PlatformHeader";

export default function PlatformV2Page() {
  usePublicReveal();

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "The FrameWire Platform — Public Information to Human-Finalized Intelligence";
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <div className="p2-page p2-platform-page p2-canonical-page">
      <PublicHeaderV2 activePage="platform" />
      <main id="p2-main">
        <section className="p2-canonical-hero" aria-labelledby="p2-platform-hero-title">
          <div className="p2-container">
            <div className="p2-canonical-hero-copy" data-p2-reveal>
              <span>THE FRAMEWIRE PLATFORM</span>
              <h1 id="p2-platform-hero-title">From public information<br />to human-finalized intelligence.</h1>
              <p>FrameWire provides a governed path for collecting public information, preserving its original form, examining it through independent analytical lenses, and turning reviewed evidence into transparent reports. Each stage has a defined role, authority boundary, and visible connection to the evidence that came before it.</p>
              <div className="p2-hero-actions"><a href="#public-information">Explore the Platform <ArrowRight size={17} aria-hidden="true" /></a><a href="#stage-overview">View Complete Journey <ArrowDown size={17} aria-hidden="true" /></a></div>
              <small>Archive First <i /> Evidence Before Conclusion <i /> AI Assists <i /> Humans Decide</small>
            </div>
            <div className="p2-hero-authority" data-p2-reveal>
              <span>SOURCE MATERIAL</span><i /><span>PRESERVED EVIDENCE</span><i /><span>SCOPED INVESTIGATION</span><i /><span>HUMAN-FINALIZED REPORT</span>
            </div>
          </div>
        </section>
        <CanonicalPlatformJourney />
        <PlatformDoctrine />
      </main>
      <PublicFooterV2 />
    </div>
  );
}
