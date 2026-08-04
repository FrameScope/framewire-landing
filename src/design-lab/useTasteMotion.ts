import { useLayoutEffect, useRef, useState } from "react";

const revealSelector = "[data-taste-reveal]";
const progressSelector = "[data-taste-scroll]";
const navigationSelector = "[data-taste-nav]";

export function useTasteMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeNavigation, setActiveNavigation] = useState("");

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealTargets = [...root.querySelectorAll<HTMLElement>(revealSelector)];
    const progressTargets = [...root.querySelectorAll<HTMLElement>(progressSelector)];
    const navigationTargets = [...root.querySelectorAll<HTMLElement>(navigationSelector)];
    const activeProgressTargets = new Set<HTMLElement>();
    const activeNavigationTargets = new Map<HTMLElement, IntersectionObserverEntry>();
    let reducedMotion = motionPreference.matches;
    let animationFrame = 0;

    root.classList.add("taste-motion-enhanced");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("taste-visible");
          element.dataset.tasteRevealed = "true";
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const updateActiveNavigation = () => {
      const visibleTargets = [...activeNavigationTargets.entries()]
        .filter(([, entry]) => entry.isIntersecting)
        .sort(([, first], [, second]) => Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top));
      const activeTarget = visibleTargets[0]?.[0];
      if (activeTarget?.dataset.tasteNav) setActiveNavigation(activeTarget.dataset.tasteNav);
    };

    const navigationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => activeNavigationTargets.set(entry.target as HTMLElement, entry));
        updateActiveNavigation();
      },
      { rootMargin: "-18% 0px -68%", threshold: [0, 0.01] },
    );

    const updateScrollProgress = () => {
      animationFrame = 0;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - viewportHeight;
      const pageProgress = documentHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / documentHeight)) : 0;
      root.style.setProperty("--taste-page-progress", String(pageProgress));
      root.classList.toggle("taste-page-scrolled", window.scrollY > 24);

      activeProgressTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        element.style.setProperty("--taste-scroll-progress", String(progress));
      });
    };

    const scheduleScrollProgress = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateScrollProgress);
    };

    const progressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) activeProgressTargets.add(element);
          else activeProgressTargets.delete(element);
        });
        scheduleScrollProgress();
      },
      { rootMargin: "90% 0px", threshold: 0 },
    );

    const updateMotionPreference = () => {
      reducedMotion = motionPreference.matches;
      root.classList.toggle("taste-motion-reduced", reducedMotion);
      root.classList.toggle("taste-motion-ready", !reducedMotion);
      if (reducedMotion) revealTargets.forEach((element) => {
        element.classList.add("taste-visible");
        element.dataset.tasteRevealed = "true";
      });
      else revealTargets.filter((element) => !element.classList.contains("taste-visible")).forEach((element) => revealObserver.observe(element));
      scheduleScrollProgress();
    };

    revealTargets.forEach((element) => revealObserver.observe(element));
    progressTargets.forEach((element) => progressObserver.observe(element));
    navigationTargets.forEach((element) => navigationObserver.observe(element));
    motionPreference.addEventListener("change", updateMotionPreference);
    window.addEventListener("scroll", scheduleScrollProgress, { passive: true });
    window.addEventListener("resize", scheduleScrollProgress, { passive: true });
    updateMotionPreference();
    scheduleScrollProgress();

    return () => {
      revealObserver.disconnect();
      progressObserver.disconnect();
      navigationObserver.disconnect();
      motionPreference.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", scheduleScrollProgress);
      window.removeEventListener("resize", scheduleScrollProgress);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      root.style.removeProperty("--taste-page-progress");
    };
  }, []);

  return { rootRef, activeNavigation };
}
