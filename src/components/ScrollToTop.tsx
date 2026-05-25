import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll to top instantly
    window.scrollTo(0, 0);

    // 2. Perform IntersectionObserver setup with a short delay to await SPA rendering
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".reveal-element, .reveal-heading, .reveal-group, .reveal-zoom-img"
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;

              // Apply visible tags based on classes
              if (el.classList.contains("reveal-element")) {
                el.classList.add("is-visible");
              } else if (el.classList.contains("reveal-heading")) {
                el.classList.add("is-visible");
              } else if (el.classList.contains("reveal-zoom-img")) {
                el.classList.add("is-visible");
              } else if (el.classList.contains("reveal-group")) {
                const staggerItems = el.querySelectorAll(".stagger-item");
                staggerItems.forEach((child, idx) => {
                  const ch = child as HTMLElement;
                  ch.style.transitionDelay = `${idx * 80}ms`;
                  ch.classList.add("is-visible");
                });
                el.classList.add("is-visible");
              }

              // De-register will-change properties to release GPU layers after transition done
              setTimeout(() => {
                el.style.willChange = "auto";
                const staggerItems = el.querySelectorAll(".stagger-item");
                staggerItems.forEach((child) => {
                  (child as HTMLElement).style.willChange = "auto";
                });
              }, 1200);

              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      elements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
      };
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
