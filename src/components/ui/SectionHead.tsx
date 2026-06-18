import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

export interface SectionHeadProps {
  index?: string;
  kicker: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  maxLead?: string;
}

/** Standard section header: eyebrow + title + optional lead. */
export function SectionHead({ index, kicker, title, lead, align = "left", maxLead }: SectionHeadProps) {
  return (
    <div
      className="fw-section-head"
      style={{
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
      }}
    >
      <Reveal><Eyebrow index={index} marker>{kicker}</Eyebrow></Reveal>
      <Reveal delay={60} as="h2" className="fw-h1" style={{ maxWidth: "20ch" }}>{title}</Reveal>
      {lead && (
        <Reveal delay={110}>
          <p className="fw-lead" style={{ maxWidth: maxLead || (align === "center" ? "60ch" : "52ch"), marginInline: align === "center" ? "auto" : 0 }}>
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
