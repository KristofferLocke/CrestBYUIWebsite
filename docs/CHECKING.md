# Checking changes

## Local file checker

From the project root:

```bash
python scripts/check_site.py
```

The checker requires Python 3.9+ and uses only Python's standard library. It checks all four HTML pages, duplicate IDs and attributes, one primary heading and main landmark per page, document titles, UTF-8 declarations, viewport settings, image alt attributes, document descriptions, local links and fragment IDs, referenced scripts/styles, and CSS image/font paths. It also checks quoted local asset paths in shared JavaScript and configuration, plus JSON syntax and duplicate JSON properties in the editor settings and source palette. Local paths must stay inside the project and match filename capitalization. A nonzero exit means something needs attention.

It does not execute JavaScript, fully validate HTML/CSS syntax, check external services, or deliver messages. It does not certify accessibility, university branding, or factual accuracy. JSON palette validation does not alter the original brand file.

## Browser review after layout or behavior changes

1. Open each page at a desktop width and at a phone width around 390px; also check 320px for overflow and both sides of the 768px navigation breakpoint. For cleanup work, compare before/after screenshots at matching sizes with fonts and images fully loaded.
2. Open the About dropdown on desktop. On a phone width, open the menu and its About dropdown, use Tab and Shift+Tab, follow each link, and press Escape. Check focus returns to the menu button after closing.
3. Use the keyboard to reach **Skip to content** and activate it.
4. On Home, use the subteam arrows, slide selectors, and keyboard arrow keys. Confirm only the selected slide appears; with JavaScript disabled, all three should remain readable.
5. On Contact, confirm required fields block empty or whitespace-only submissions. In browser checks, replace the form action with a local POST receiver: verify all named fields are submitted, duplicate submissions are blocked, and returning with Back re-enables the submit button without clearing the message. Verify there is no AJAX request or premature success message.
6. Check the real Formspree endpoint, POST fields, topic-based subject, and links that preselect a contact topic. Without JavaScript, confirm the same visible form posts correctly. A real submission sends data to an external service; test hosted CAPTCHA, confirmation, and delivery separately with an explicitly approved message, then verify it in the Formspree dashboard and recipient inbox.
7. Check any new photos, sponsor links, or PDF downloads and confirm no horizontal scrolling occurs.

Use the browser's developer tools Console and Network panels to catch broken assets or JavaScript errors. Test on your actual phone before sharing the public URL. The implementation targets current Chrome, Edge, Safari, and Firefox with native modal dialog support.

Repeat a navigation check with JavaScript disabled: all four fallback page links, the footer links, the direct email link, and the main content should remain usable. Check reduced-motion mode, keyboard focus, and skip links. Keep local screenshots, browser profiles, and other temporary review output outside published files.
