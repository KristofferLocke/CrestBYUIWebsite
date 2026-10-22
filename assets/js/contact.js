/* Contact form: native HTML POST with Formspree-hosted verification.
 * No SDK or build step. The form action is the single source for the endpoint.
 */
(() => {
  "use strict";
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = document.querySelector("#form-status");
  const submit = form.querySelector('button[type="submit"]');
  const topics = ["General enquiry", "Sponsorship", "Joining the team", "Technical assistance"];
  const queryTopics = new Map([["sponsorship", "Sponsorship"], ["joining", "Joining the team"], ["technical", "Technical assistance"]]);
  const requestedTopic = queryTopics.get(new URLSearchParams(window.location.search).get("topic"));
  if (requestedTopic) form.elements.topic.value = requestedTopic;
  const updateSubject = () => {
    const topic = topics.includes(form.elements.topic.value) ? form.elements.topic.value : topics[0];
    form.elements.subject.value = `BYU-I Formula Racing — ${topic}`;
  };
  updateSubject();
  form.elements.topic.addEventListener("change", updateSubject);

  // Use native navigation so Formspree can show its hosted CAPTCHA.
  let submitting = false;
  window.addEventListener("pageshow", () => {
    // Back/forward cache can restore the form with its submit button disabled.
    submitting = false;
    submit.disabled = false;
    form.removeAttribute("aria-busy");
    status.textContent = "";
  });

  form.addEventListener("submit", event => {
    if (submitting) {
      event.preventDefault();
      return;
    }
    for (const name of ["name", "email", "organisation", "message"]) {
      form.elements[name].value = form.elements[name].value.trim();
    }
    if (!form.reportValidity()) {
      event.preventDefault();
      return;
    }
    updateSubject();
    submitting = true;
    // Keep named fields enabled so the browser includes them in the POST.
    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.textContent = "Opening Formspree to complete your submission…";
    // Allow the normal HTML POST; Formspree handles verification and results.
  });
})();
