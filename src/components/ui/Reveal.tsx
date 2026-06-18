import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/** Reveal-on-scroll wrapper. Respects reduced motion via CSS (.fw-rise). */
export function Reveal({ children, delay = 0, as = "div", className = "", style }: RevealProps) {
  // Polymorphic element ref — typed loosely on purpose.
  const ref = useRef<any>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref} className={`fw-rise ${seen ? "fw-in" : ""} ${className}`.trim()} style={{ animationDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}
