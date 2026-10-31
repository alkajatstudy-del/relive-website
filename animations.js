
// ======================================
// RE:LIVE - Premium Scroll Animations
// ======================================

document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    return;
  }

  // Animate only selected page sections.
  // Avoid forms, tables, modals and hidden content.

  const selectors = [
    ".hero h1",
    ".hero > p",
    ".intro",
    ".mission-section",
    ".four-r-section",
    ".objectives-section",
    ".cta-section",
    ".contact-info",
    ".form-card",
    ".contact-cta",
    ".bottom-cta",
    ".section-heading"
  ];

  const elements = document.querySelectorAll(
    selectors.join(",")
  );

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "relive-visible"
          );

          currentObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -20px 0px"
    }
  );

  elements.forEach(element => {

    if (element.closest("[hidden], .modal")) {
      return;
    }

    element.classList.add("relive-reveal");

    observer.observe(element);

  });

});
