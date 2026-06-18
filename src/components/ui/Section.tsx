import type { CSSProperties, ReactNode } from "react";

export interface SectionProps {
  id?: string;
  band?: boolean;
  narrow?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

/** Section shell with optional band background + anchor id. */
export function Section({ id, band, narrow, children, style }: SectionProps) {
  return (
    <section id={id} className={`fw-section ${band ? "fw-band" : ""}`.trim()} style={style}>
      <div className={`fw-container ${narrow ? "fw-narrow" : ""}`.trim()}>{children}</div>
    </section>
  );
}
