/* Shared work/contribution selector. Keep all text panels readable without JS. */
(() => {
  "use strict";
  const explorer = document.querySelector("[data-disciplines]");
  if (!explorer) return;
  const controls = explorer.querySelector(".discipline-controls");
  const buttons = [...controls.querySelectorAll("button")];
  const panels = [...explorer.querySelectorAll("[data-discipline-panel]")];
  const status = explorer.querySelector("[data-discipline-status]");
  const select = (index, announce = true) => {
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    buttons.forEach((button, i) => {
      button.setAttribute("aria-pressed", String(i === index));
    });
    if (announce) {
      status.textContent = panels[index].querySelector(".discipline-copy").textContent;
    }
  };
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => select(index));
  });
  select(0, false);
  explorer.classList.add("is-interactive");
  controls.hidden = false;
})();
