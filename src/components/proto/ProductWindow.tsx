import type { ReactNode } from "react";

/** Software-style window chrome reused across the homepage motion scenes. */
export function ProductWindow({ title, tools, children }: { title: string; tools?: ReactNode; children: ReactNode }) {
  return (
    <div className="pw">
      <div className="pw-bar">
        <span className="pw-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="pw-title">{title}</span>
        {tools && <span className="pw-tools">{tools}</span>}
      </div>
      <div className="pw-body">{children}</div>
    </div>
  );
}
