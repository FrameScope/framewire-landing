import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Clarify } from "./components/sections/Clarify";
import { HelpsYouDo } from "./components/sections/HelpsYouDo";
import { Problem } from "./components/sections/Problem";
import { Pipeline, Collect, ArchiveFirst, CleanVerify } from "./components/sections/Pipeline";
import { Investigation, ExampleInvestigation } from "./components/sections/Investigation";
import { IntelligenceLenses } from "./components/sections/IntelligenceLenses";
import { ReportStudio } from "./components/sections/ReportStudio";
import { Trust, Memory, UseCases, WhyDifferent } from "./components/sections/Trust";
import { Language } from "./components/sections/Language";
import { Beta, FinalCTA, Footer } from "./components/sections/Beta";
import {
  FlowSection, SegregationSection, ConnectedLensesSection,
  RelationshipsSection, TimelineSection, LineageSection,
} from "./components/sections/GraphSections";

export default function App() {
  return (
    <>
      <a href="#do" className="fw-skip">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Clarify />
        <HelpsYouDo />
        <Problem />
        <Pipeline />
        <FlowSection />
        <Collect />
        <ArchiveFirst />
        <SegregationSection />
        <CleanVerify />
        <Investigation />
        <IntelligenceLenses />
        <ConnectedLensesSection />
        <ReportStudio />
        <RelationshipsSection />
        <ExampleInvestigation />
        <TimelineSection />
        <LineageSection />
        <Trust />
        <Memory />
        <UseCases />
        <WhyDifferent />
        <Language />
        <Beta />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
