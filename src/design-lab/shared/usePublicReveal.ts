import { useEffect } from "react";

export function usePublicReveal() {
  useEffect(() => {
    const root = document.querySelector(".p2-page");
    const targets = Array.from(root?.querySelectorAll<HTMLElement>("[data-p2-reveal]") ?? []);
    if (!targets.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach((target) => target.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}
