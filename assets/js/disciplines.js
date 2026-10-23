/* Shared work/contribution selector. Keep all text panels readable without JS. */
(() => {
  "use strict";
  const explorer = document.querySelector("[data-disciplines]");
  if (!explorer) return;
  const controls = explorer.querySelector(".discipline-controls");
  const buttons = [...controls.querySelectorAll("button")];
  const panels = [...explorer.querySelectorAll("[data-discipline-panel]")];
  const status = explorer.querySelector("[data-discipline-status]");
  const dropdown = explorer.hasAttribute("data-discipline-dropdown");
  const descriptions = dropdown ? panels.map((panel, index) => {
    const button = buttons[index];
    const item = document.createElement("div");
    item.className = "discipline-choice";
    button.before(item);
    item.append(button);
    const copy = panel.querySelector(".discipline-copy");
    copy.id = `${button.getAttribute("aria-controls")}-copy`;
    button.setAttribute("aria-controls", `${button.getAttribute("aria-controls")} ${copy.id}`);
    item.append(copy);
    return copy;
  }) : [];
  const select = (index, announce = true) => {
    panels.forEach((panel, i) => {
      panel.hidden = !dropdown && i !== index;
      if (dropdown) {
        panel.classList.toggle("is-selected", i === index);
        panel.inert = i !== index;
      }
    });
    buttons.forEach((button, i) => {
      button.setAttribute("aria-pressed", String(i === index));
      if (dropdown) {
        button.setAttribute("aria-expanded", String(i === index));
        button.parentElement.classList.toggle("is-selected", i === index);
        descriptions[i].hidden = i !== index;
      }
    });
    if (announce) {
      status.textContent = (dropdown ? descriptions[index] : panels[index].querySelector(".discipline-copy")).textContent;
    }
  };
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => select(index));
  });
  select(0, false);
  explorer.classList.add("is-interactive");
  controls.hidden = false;
})();
