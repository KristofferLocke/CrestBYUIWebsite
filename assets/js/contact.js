/* Contact form: local-only message preparation. No network requests or storage.
 * A configured email opens a mailto draft. With no address, visitors can save
 * or copy their message. Never report a message as sent by this static site.
 */
(() => {
  "use strict";
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const email = (window.SITE_CONFIG?.contactEmail || "").trim();
  const hasEmail = /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email);
  const status = document.querySelector("#form-status");
  const preview = document.querySelector("#message-preview");
  const previewText = document.querySelector("#preview-text");
  const emailLink = document.querySelector("#open-email");
  const emailValue = document.querySelector("#contact-email");
  const help = document.querySelector("#contact-help");
  const submit = form.querySelector('button[type="submit"]');
  let preparedText = "";

  if (hasEmail) {
    emailValue.setAttribute("aria-label", `Email ${email}`);
    emailValue.title = `Email ${email}`;
    emailValue.querySelector("[data-email-address]").textContent = email;
    emailValue.href = `mailto:${email}`;
    emailValue.hidden = false;
    document.querySelector("#email-pending").hidden = true;
    help.textContent = "Prepare your message, then open a draft in your email app. You choose when to send it. This site does not send or store messages.";
    submit.textContent = "Prepare email draft";
  }

  const topics = ["General enquiry", "Sponsorship", "Joining the team", "Technical assistance"];
  const queryTopics = { sponsorship: "Sponsorship", joining: "Joining the team", technical: "Technical assistance" };
  const requestedTopic = queryTopics[new URLSearchParams(window.location.search).get("topic")];
  if (requestedTopic) form.elements.topic.value = requestedTopic;

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const senderEmail = form.elements.email.value.trim();
    const organisation = form.elements.organisation.value.trim();
    const topic = topics.includes(form.elements.topic.value) ? form.elements.topic.value : topics[0];
    const message = form.elements.message.value.trim();
    if (!name || !message) {
      status.textContent = "Please add your name and a message using more than spaces.";
      (!name ? form.elements.name : form.elements.message).focus();
      return;
    }
    const subject = `BYU-I Formula Racing — ${topic}`;
    const body = ["Hello BYU-I Formula Racing,", "", message, "", `From: ${name}`,
      `Reply email: ${senderEmail}`, organisation ? `Organisation: ${organisation}` : ""].filter((line, i, list) => line || i < list.length - 1).join("\n");
    preparedText = `Subject: ${subject}\n\n${body}`;
    previewText.textContent = preparedText;
    preview.hidden = false;
    if (hasEmail) {
      emailLink.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      emailLink.hidden = false;
      status.textContent = "Draft prepared. Select ‘Open email app’ below to review and send it. No message has been sent by this site.";
    } else {
      status.textContent = "Message prepared. Save or copy it below. The team’s contact address is coming soon; your message has not been sent.";
    }
  });

  // Hide an older prepared draft as soon as its source fields change.
  form.addEventListener("input", () => {
    preview.hidden = true;
    status.textContent = "";
    preparedText = "";
  });

  document.querySelector("#save-message").addEventListener("click", () => {
    if (!preparedText) return;
    const url = URL.createObjectURL(new Blob([preparedText], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "byui-formula-enquiry.txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = "Your message was saved as a text file. It has not been sent.";
  });

  document.querySelector("#copy-message").addEventListener("click", async () => {
    if (!preparedText) return;
    try {
      await navigator.clipboard.writeText(preparedText);
      status.textContent = "Message copied. It has not been sent.";
    } catch {
      const range = document.createRange();
      range.selectNodeContents(previewText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Automatic copying is unavailable. Your message is selected; use your device’s Copy command.";
    }
  });

  // Progressive enhancement: show these controls only after handlers exist.
  document.querySelector("#contact-interactive").hidden = false;
})();
