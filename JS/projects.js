// Reveal project cards as they scroll into view.
// If the person has "reduce motion" set, skip the animation entirely —
// cards just show up already visible (see the CSS media query too).

(function () {
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  var cards = document.querySelectorAll(".project-card");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    cards.forEach(function (card) {
      card.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();