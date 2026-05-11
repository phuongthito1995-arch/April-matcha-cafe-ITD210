// Scroll-reveal: elements with [data-reveal] fade in once they enter view.
(function () {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.revealDelay || "0", 10);
        setTimeout(() => el.classList.add("is-revealed"), delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el) => io.observe(el));
})();

// Subtle parallax drift on the hero leaves as the user scrolls.
(function () {
  const leaves = document.querySelectorAll(".leaf-field .leaf");
  if (!leaves.length) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  if (prefersReduced) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        leaves.forEach((leaf, i) => {
          const speed = 0.05 + (i % 3) * 0.04;
          leaf.style.setProperty("--parallax", `${y * speed}px`);
        });
        ticking = false;
      });
    },
    { passive: true }
  );
})();
