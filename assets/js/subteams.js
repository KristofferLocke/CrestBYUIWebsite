/* Manual subteam slideshow. Without JavaScript, every subteam remains readable. */
(() => {
  "use strict";
  const carousel = document.querySelector("[data-subteams]");
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll("[data-subteam-slide]")];
  const controls = carousel.querySelector("[data-subteam-controls]");
  const selectors = [...controls.querySelectorAll("[data-slide-to]")];
  const status = carousel.querySelector("[data-slide-status]");
  let current = 0;
  const show = (index, announce = true) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    selectors.forEach((button, i) => { button.setAttribute("aria-pressed", String(i === current)); });
    if (announce) status.textContent = slides[current].querySelector("h3").textContent;
  };
  carousel.setAttribute("aria-roledescription", "carousel");
  slides.forEach(slide => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
  });
  controls.querySelector("[data-slide-prev]").addEventListener("click", () => show(current - 1));
  controls.querySelector("[data-slide-next]").addEventListener("click", () => show(current + 1));
  selectors.forEach(button => button.addEventListener("click", () => show(Number(button.dataset.slideTo))));
  controls.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    show(current + (event.key === "ArrowRight" ? 1 : -1));
  });
  show(0, false);
  controls.hidden = false;
})();
